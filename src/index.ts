import { agent, llmOpenAI, mcp, createVolcanoTelemetry } from "volcano-sdk";

const gatewayEndpoint = process.env.GATEWAY_ENDPOINT || "http://localhost:8000";
const serviceName = process.env.OTEL_SERVICE_NAME || "api-summit-session-guide";
const otlpEndpoint =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318";

const telemetry = createVolcanoTelemetry({
  serviceName: serviceName,
  endpoint: otlpEndpoint,
});

const llm = llmOpenAI({
  apiKey: "dummy-api-key",
  model: "gpt-4o-mini",
  baseURL: `${gatewayEndpoint}/openai`,
});

const sessionsRetriever = mcp(`${gatewayEndpoint}/sessions`);

const userInput =
  "Kong API Summit Japan 2025でAIとAPIの関連性について勉強したいです。どのセッションがおすすめですか？";

const results = await agent({
  llm,
  telemetry, // enabled opentelemetry instrumentation.
})
  .then({
    instructions:
      "あなたは、Kong API Summit Japan 2025において参加者に適切に案内を出すガイドです。",
    prompt: `与えられた質問に回答するために、セッション情報の一覧を取得してください。 質問:${userInput}`,
    mcps: [sessionsRetriever],
  })
  .then({
    // instructions: "あなたは、要約のプロです。",
    prompt: `得られたセッション情報とユーザーの質問から質問の意図にあったセッションをまとめてください。その際に関連性も含めてコメントをしてください。`,
  })
  .run();

results.forEach((result, index) => {
  console.log(`[Mcp] ${index}: ${result.mcp}`);
  console.log(`[LLM output] ${index}: ${result.llmOutput}`);
});
