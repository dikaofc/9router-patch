export default {
  id: "opencode",
  priority: 40,
  hasFree: true,
  alias: "oc",
  uiAlias: "oc",
  display: {
    name: "OpenCode Free",
    icon: "terminal",
    color: "#E87040",
    textIcon: "OC",
  },
  category: "free",
  noAuth: true,
  transport: {
    baseUrl: "https://opencode.ai",
    headers: {
      "x-opencode-client": "desktop",
    },
    forceStream: true,
    noAuth: true,
    quirks: {
      forceAutoToolChoiceModels: ["muse-spark-1.3-contributor-free"],
    },
  },
  models: [
    // Live free catalog probed 2026-09-20 against https://opencode.ai/zen/v1/models
    // (Bearer public). `union-alpha` was retired upstream — requesting it now
    // returns 401 `ModelError: Model union-alpha is not supported`, so it is
    // deliberately NOT offered. Endpoint formats differ per model, so declare
    // non-chat models explicitly. `passthroughModels` stays true so future
    // free ids still route instead of 404ing locally.
    { id: "muse-spark-1.2-contributor-free", name: "Muse Spark 1.2 Contributor Free", targetFormat: "openai-responses" },
    { id: "muse-spark-1.3-contributor-free", name: "Muse Spark 1.3 Contributor Free", targetFormat: "openai-responses" },
    // NOTE: deepseek-v4-flash-free removed — upstream returns
    // 400 "Model is unavailable" for this id (probed live 2026-09-20).
    // It stays in DEAD_FREE_OPENCODE_MODELS (suggested-models filter) so the
    // live fetcher never re-offers it either.
    { id: "nemotron-3-ultra-free", name: "Nemotron 3 Ultra Free" },
    { id: "nemotron-3.5-lightning-free", name: "Nemotron 3.5 Lightning Free" },
    { id: "mimo-v2.5-free", name: "MiMo V2.5 Free" },
    { id: "ling-3.0-flash-fin-free", name: "Ling 3.0 Flash Fin Free" },
    { id: "jev-1.13-free", name: "Jev 1.13 Free" },
    { id: "big-pickle", name: "Big Pickle Free" },
  ],
  modelsFetcher: { url: "https://opencode.ai/zen/v1/models", type: "opencode-free" },
  passthroughModels: true,
};
