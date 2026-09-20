# Graph Report - 9router-patch  (2026-09-20)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 7092 nodes · 19380 edges · 280 communities (251 shown, 29 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 524 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `710edc84`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 117
- Community 118
- Community 119
- Community 120
- Community 121
- Community 122
- Community 123
- Community 124
- Community 125
- Community 126
- Community 127
- Community 128
- Community 129
- Community 130
- Community 131
- Community 132
- Community 133
- Community 134
- Community 135
- Community 136
- Community 137
- Community 138
- Community 139
- Community 140
- Community 141
- Community 142
- Community 143
- Community 144
- Community 145
- Community 146
- Community 147
- Community 148
- Community 149
- Community 150
- Community 151
- Community 152
- Community 153
- Community 154
- Community 155
- Community 156
- Community 157
- Community 158
- Community 159
- Community 160
- Community 161
- Community 162
- Community 163
- Community 164
- Community 165
- Community 166
- Community 167
- Community 168
- Community 169
- Community 170
- Community 171
- Community 172
- Community 173
- Community 174
- Community 175
- Community 176
- Community 177
- Community 178
- Community 179
- Community 180
- Community 181
- Community 182
- Community 183
- Community 184
- Community 185
- Community 186
- Community 187
- Community 188
- Community 189
- Community 190
- Community 191
- Community 192
- Community 193
- Community 194
- Community 195
- Community 196
- Community 197
- Community 198
- Community 199
- Community 200
- Community 201
- Community 202
- Community 203
- Community 204
- Community 205
- Community 206
- Community 207
- Community 208
- Community 209
- Community 210
- Community 211
- Community 212
- Community 213
- Community 214
- Community 215
- Community 216
- Community 217
- Community 218
- Community 219
- Community 220
- Community 221
- Community 222
- Community 223
- Community 224
- Community 225
- Community 226
- Community 227
- Community 228
- Community 229
- Community 230
- Community 231
- Community 232
- Community 233
- Community 234
- Community 235
- Community 236
- Community 237
- Community 238
- Community 239
- Community 240
- Community 241
- Community 242
- Community 243
- Community 244
- Community 245
- Community 246
- Community 247
- Community 248
- Community 249
- Community 250
- Community 251
- Community 252
- Community 253
- Community 255
- Community 256
- Community 257
- Community 258
- Community 259
- Community 260
- Community 261
- Community 262
- Community 263
- Community 264
- Community 265
- Community 266
- Community 270
- Community 271
- Community 272
- Community 273
- Community 277

## God Nodes (most connected - your core abstractions)
1. `vitest` - 268 edges
2. `next` - 167 edges
3. `proxyAwareFetch()` - 115 edges
4. `getSettings()` - 97 edges
5. `getAdapter()` - 78 edges
6. `FORMATS` - 75 edges
7. `handleChatCore()` - 65 edges
8. `Button()` - 62 edges
9. `PROVIDERS` - 60 edges
10. `Card()` - 56 edges

## Surprising Connections (you probably didn't know these)
- `chatWith()` --calls--> `proxyAwareFetch()`  [EXTRACTED]
  tests/unit/mimo-free.live.test.js → open-sse/utils/proxyFetch.js
- `getStaticProviderModels()` --calls--> `getModelsByProviderId()`  [EXTRACTED]
  src/app/api/providers/[id]/models/route.js → open-sse/config/providerModels.js
- `chatModels()` --calls--> `getModelsByProviderId()`  [EXTRACTED]
  tests/translator/real/file-base64-survey.real.test.js → open-sse/config/providerModels.js
- `firstLlmModel()` --calls--> `getModelsByProviderId()`  [EXTRACTED]
  tests/translator/real/smoke-providers.real.test.js → open-sse/config/providerModels.js
- `chatModels()` --calls--> `getModelsByProviderId()`  [EXTRACTED]
  tests/translator/real/vision-capability-survey.real.test.js → open-sse/config/providerModels.js

## Import Cycles
- 3-file cycle: `src/shared/components/KiroAuthModal.js -> src/shared/components/index.js -> src/shared/components/KiroOAuthWrapper.js -> src/shared/components/KiroAuthModal.js`
- 3-file cycle: `src/shared/components/KiroOAuthWrapper.js -> src/shared/components/KiroSocialOAuthModal.js -> src/shared/components/index.js -> src/shared/components/KiroOAuthWrapper.js`
- 3-file cycle: `src/shared/components/KiroOAuthWrapper.js -> src/shared/components/OAuthModal.js -> src/shared/components/index.js -> src/shared/components/KiroOAuthWrapper.js`
- 3-file cycle: `open-sse/config/kiroConstants.js -> open-sse/translator/concerns/thinkingUnified.js -> open-sse/providers/thinkingLevels.js -> open-sse/config/kiroConstants.js`

## Communities (280 total, 29 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.04
Nodes (88): DEFAULT_MAX_TOKENS, DEFAULT_MIN_TOKENS, baseModelId(), isResponsesModel(), nativeSession(), normalizeResponsesTools(), normalizeSession(), OpenCodeGoExecutor (+80 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (64): prop-types, ref_react, API_TYPE_OPTIONS, VARIANT_CONFIG, ConnectionRow(), AddCustomModelModal(), defaultCaps(), BulkImportCodexModal() (+56 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (59): detectFormat(), captureThinking, ensureToolCallIds(), fixMissingToolResponses(), generateToolCallId(), getToolCallIds(), hasToolResults(), sanitizeToolId() (+51 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (82): @xyflow/react, ANTHROPIC_COMPATIBLE_DEFAULTS, CUSTOM_EMBEDDING_DEFAULTS, dynamic, GET(), OPENAI_COMPATIBLE_DEFAULTS, POST(), dynamic (+74 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (75): buildKimiHeaders(), getAppPackageVersion(), CLAUDE_CONFIG, fetchClaudeUsageRaw(), getClaudeUsage(), getClaudeUsageLegacy(), oauthCooldown, usageCache (+67 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (74): supportsGrokCliReasoningEffort(), getExecutor(), handleChatCore(), extractCustomToolInput(), handleNonStreamingResponse(), openAICompletionToClaudeMessage(), openAICompletionToResponses(), parseToolArguments() (+66 more)

### Community 7 - "Community 7"
Cohesion: 0.03
Nodes (78): resolveKiroEffortPath(), supportsKiroAdditionalModelRequestFields(), CODEX_GPT_56_DEFAULT_CAPS, CODEX_GPT_56_SOL_CAPS, COMMANDCODE_TEXT_ONLY, DEFAULT_CAPABILITIES, getCapabilitiesForModel(), getCatalogSource() (+70 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (66): HTTP_STATUS, buildModelLockUpdate(), formatRetryAfter(), getModelLockKey(), isModelLockActive(), getComboModelsFromData(), handleComboChat(), errorResponse() (+58 more)

### Community 9 - "Community 9"
Cohesion: 0.04
Nodes (42): AzureExecutor, CodeBuddyExecutor, CodeBuddyIntlExecutor, applyAuth(), AUTH_DESCRIPTORS, BEARER, DefaultExecutor, HEADER_HOOKS (+34 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (60): next, ApiKeySelect(), BaseUrlSelect(), buildOptions(), ensureV1(), ClaudeToolCard(), CONTEXT_OPTIONS, matchKnownEndpoint() (+52 more)

### Community 11 - "Community 11"
Cohesion: 0.05
Nodes (45): clampCooldown(), computeBackoff(), nextBackoffLevel(), parseRetryAfter(), BreakerState, CircuitBreaker, hydrateBreaker(), NOTE: use ?? not || for `since` — a valid epoch of 0 must be preserved. (+37 more)

### Community 12 - "Community 12"
Cohesion: 0.05
Nodes (51): fmt(), fmtCost(), OverviewCards(), CollapsibleSection(), fetchProviderNames(), getCacheCreationTokens(), getCachedTokens(), getInputTokens() (+43 more)

### Community 13 - "Community 13"
Cohesion: 0.06
Nodes (23): chalk, ref_config_index_js, ref_crypto, open, ora, ../config/index.js, NO_BROWSER, openBrowser() (+15 more)

### Community 14 - "Community 14"
Cohesion: 0.07
Nodes (59): OAUTH_ENDPOINTS, isTokenExpiringSoon(), invalidateProjectId(), removeConnection(), dedupRefresh(), refreshDedupCache, formatProviderCredentials(), getAccessToken() (+51 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (52): convertProviderEvent(), createErrorChunk(), enqueueSseObject(), initProviderState(), normalizeStatus(), unwrapZedLine(), wrapZedCompletionStream(), ZED_PROVIDER (+44 more)

### Community 16 - "Community 16"
Cohesion: 0.04
Nodes (41): ANTIGRAVITY_DEFAULT_SYSTEM, ANTIGRAVITY_HEADERS, ANTIGRAVITY_LOAD_CODE_ASSIST_HEADERS, CC_DEFAULT_TOOLS, CLAUDE_SYSTEM_PROMPT, CLIENT_METADATA, CLOUD_CODE_API, GEMINI_CLI_API_CLIENT (+33 more)

### Community 17 - "Community 17"
Cohesion: 0.05
Nodes (40): CODEX_DEFAULT_INSTRUCTIONS, BLOCKED_HOSTS, FETCH_TIMEOUT_MS, IMAGE_SIGNATURES, MAX_IMAGE_BYTES, resolveRetryEntry(), CODEX_HOSTED_TOOL_TYPES, CODEX_PASSTHROUGH_TOOL_TYPES (+32 more)

### Community 18 - "Community 18"
Cohesion: 0.06
Nodes (43): ANTIGRAVITY_CONFIG, AWS_REGION_PATTERN, CLAUDE_CONFIG, CLINE_CONFIG, CLINEPASS_CONFIG, CODEBUDDY_CONFIG, CODEBUDDY_INTL_CONFIG, CODEX_CONFIG (+35 more)

### Community 19 - "Community 19"
Cohesion: 0.07
Nodes (41): DOT_VERSION_PROVIDERS, findModel(), findModelName(), getModelQuotaFamily(), getModelStrip(), getModelSupportedFormats(), getModelTargetFormat(), getModelType() (+33 more)

### Community 20 - "Community 20"
Cohesion: 0.05
Nodes (35): ../../cloud/src/handlers/embeddings.js, ../../cloud/src/services/storage.js, ../../cloud/src/utils/apiKey.js, nextConfig, projectRoot, projectRoot, ref_node_fs, ref_node_os (+27 more)

### Community 21 - "Community 21"
Cohesion: 0.06
Nodes (45): buildModelListHeaders(), fetchClineRawModels(), resolveClineModels(), resolveClinepassModels(), buildKimchiModelsUrl(), cacheKey(), catalogCache, clearKimchiCatalog() (+37 more)

### Community 22 - "Community 22"
Cohesion: 0.06
Nodes (47): baseModelId(), bodyHasSessionHints(), cloakOpencodeTools(), deriveRequestId(), generateRequestId(), generateSessionId(), hasValidOpencodeVersion(), identityKey() (+39 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (54): completeXaiManualCode(), GET(), POST(), ZED_HOSTED_CONFIG, src_lib_oauth_providers_exchangetokens, src_lib_oauth_providers_generateauthdata, src_lib_oauth_providers_getprovider, exchangeTokens() (+46 more)

### Community 24 - "Community 24"
Cohesion: 0.08
Nodes (48): dynamic, GET, POST(), dynamic, maxDuration, POST(), dynamic, GET() (+40 more)

### Community 25 - "Community 25"
Cohesion: 0.08
Nodes (57): ref_node_machine_id, checkIsAdmin(), checkPrivilege(), DELETE(), GET(), getPassword(), normalizeMitmRouterBaseUrlInput(), PATCH() (+49 more)

### Community 26 - "Community 26"
Cohesion: 0.07
Nodes (49): CLAUDE_CLI_SPOOF_HEADERS, appendCodexQuotaWindows(), CODEX_CONFIG, consumeCodexRateLimitResetCredit(), errorMessage(), formatCodexWindow(), getCodexAccountId(), getCodexRateLimitBody() (+41 more)

### Community 27 - "Community 27"
Cohesion: 0.05
Nodes (33): ref_react_dom, zustand, getLocaleFromCookie(), ProfilePage(), ModelAvailabilityBadge(), STATUS_CONFIG, ChangelogModal(), HeaderMenu() (+25 more)

### Community 28 - "Community 28"
Cohesion: 0.09
Nodes (46): DELETE(), dynamic, GET(), POST(), dynamic, parsePortFromUrl(), POST(), dynamic (+38 more)

### Community 29 - "Community 29"
Cohesion: 0.06
Nodes (51): applyCliToolSettings(), AUTH_DIR, CLI_SECRET_FILE, config, createApiKey(), createApiKeyProvider(), createCombo(), createProviderNode() (+43 more)

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (51): handleCreateKey(), handleDeleteKey(), claudeQuickSetup(), claudeSelectModel(), codexQuickSetup(), droidQuickSetup(), getFirstApiKey(), hermesQuickSetup() (+43 more)

### Community 31 - "Community 31"
Cohesion: 0.08
Nodes (48): checkCertInstalled(), checkCertInstalledLinux(), checkCertInstalledMac(), checkCertInstalledWindows(), crypto, { exec }, { execWithPassword, isSudoAvailable }, fs (+40 more)

### Community 32 - "Community 32"
Cohesion: 0.08
Nodes (41): STREAM_STALL_TIMEOUT_MS, dbg(), isDebugEnabled, ts(), buildAbortedResponsesTerminalBytes(), formatIncompleteOpenAIResponsesStreamFailure(), getOpenAIResponsesEventName(), isOpenAIResponsesTerminalEvent() (+33 more)

### Community 33 - "Community 33"
Cohesion: 0.10
Nodes (34): getModelsByProviderId(), getTtsVoicesForModel(), buildInfo(), GET(), KIND_ENDPOINT, lookup(), TTS_VOICES_API, EmbeddingExampleCard() (+26 more)

### Community 34 - "Community 34"
Cohesion: 0.07
Nodes (35): CLIToolsPageClient(), src_app_dashboard_dashboard_cli_tools_components_index_mitmlinkcard, MitmLinkCard(), getStatus(), ToolSummaryCard(), CLIToolsPage(), ToolDetailPage(), ToolDetailClient() (+27 more)

### Community 35 - "Community 35"
Cohesion: 0.09
Nodes (34): augmentModelsWithCapacityAdapter(), blockLength(), CAPABILITY_KEYS, getActiveAdapterStrategy(), getCapacityAdapterConfig(), getCapacityAdapterModels(), getCapacityAdapterStrategy(), HARD_CAPS (+26 more)

### Community 36 - "Community 36"
Cohesion: 0.08
Nodes (30): CLAUDE_TOOL_SUFFIX, anchorClaudeCache(), buildThinkingPlaceholder(), CACHE_CONTROL_1H, CACHE_CONTROL_5M, capCacheControlBlocks(), countCacheControlBlocks(), fixToolUseOrdering() (+22 more)

### Community 37 - "Community 37"
Cohesion: 0.07
Nodes (38): GET(), VALID_PERIODS, GET(), GET(), GET(), dynamic, GET(), VALID_PERIODS (+30 more)

### Community 38 - "Community 38"
Cohesion: 0.07
Nodes (44): ref_http2, ref_tls, extractModel(), fs, getToolForHost(), isBinaryData(), isChatRequest(), LOG_BLACKLIST_URL_PARTS (+36 more)

### Community 39 - "Community 39"
Cohesion: 0.09
Nodes (35): BACKUP_EXCLUDE_TABLES, backupDbLite(), backupFile(), makeBackupDir(), pruneOldBackups(), getMetaSync(), setMetaSync(), importLegacyDetails() (+27 more)

### Community 40 - "Community 40"
Cohesion: 0.08
Nodes (40): showApiKeysMenu(), showKeyActions(), ALL_PROVIDERS, api, APIKEY_PROVIDERS, buildProviderHeader(), { clearScreen, showStatus, showHeader }, COLORS (+32 more)

### Community 41 - "Community 41"
Cohesion: 0.10
Nodes (39): AUTO_PING_SETTINGS_KEYS, AUTO_PING_TOOLTIPS, formatCreditDate(), formatTimeRemaining(), getCodexResetCreditCount(), getConnectionSecondaryLabel(), KIRO_METHOD_LABELS, kiroMethodLabel() (+31 more)

### Community 42 - "Community 42"
Cohesion: 0.11
Nodes (41): enableTailscale(), isTailscaleReconnecting(), svc, throwIfCancelled(), bgRefreshBin(), bgRefreshFunnelUrl(), bgRefreshLoggedIn(), bgRefreshRunning() (+33 more)

### Community 43 - "Community 43"
Cohesion: 0.07
Nodes (39): args, checkForUpdate(), compareVersions(), createSpinner(), customServerPath, { ensureSqliteRuntime, buildEnvWithRuntime }, { ensureTrayRuntime }, fs (+31 more)

### Community 44 - "Community 44"
Cohesion: 0.10
Nodes (34): getDefaultModel(), resolveXiaomiTokenplanBaseUrl(), GET(), POST(), probeMediaProvider(), probeWebProvider(), BasicChatPageClient(), loadData() (+26 more)

### Community 45 - "Community 45"
Cohesion: 0.14
Nodes (38): checkGrokInstalled(), DELETE(), execAsync, GET(), getGrokBinPath(), getGrokConfigPath(), getGrokDir(), has9RouterConfig() (+30 more)

### Community 46 - "Community 46"
Cohesion: 0.09
Nodes (35): ref_zlib, src_mitm_config_is_dev, removeAllDNSEntries(), { err, createResponseDumper }, { fetchRouter, pipeSSE }, intercept(), { IS_DEV }, fetchRouter() (+27 more)

### Community 47 - "Community 47"
Cohesion: 0.09
Nodes (24): bareModel(), PREVIEW_MODELS, __test__, XiaomiMimoExecutor, absorbSetCookie(), acquireServiceCookie(), _cache, cookieHeader() (+16 more)

### Community 48 - "Community 48"
Cohesion: 0.08
Nodes (25): BACKOFF_CONFIG, COOLDOWN, COOLDOWN_MS, DEFAULT_ERROR_MESSAGES, ERROR_RULES, ERROR_TYPES, MAX_RATE_LIMIT_COOLDOWN_MS, TRANSIENT_COOLDOWN_MS (+17 more)

### Community 49 - "Community 49"
Cohesion: 0.09
Nodes (25): better-sqlite3, ref_fs, ref_module, ref_os, ref_path, DELETE(), GET(), get9RouterEntry() (+17 more)

### Community 50 - "Community 50"
Cohesion: 0.15
Nodes (28): DELETE(), dynamic, GET(), POST(), DELETE(), GET(), PATCH(), parseJson() (+20 more)

### Community 51 - "Community 51"
Cohesion: 0.09
Nodes (25): countGrokCliUserTurns(), EFFORT_LEVELS, _getGrokCliTurnStoreSize(), GROK_CLI_FREEFORM_TOOL_PARAMETERS, GrokCliExecutor, HOSTED_TOOL_TYPES, isNativeGrokCliItemId(), normalizeGrokCliEffort() (+17 more)

### Community 52 - "Community 52"
Cohesion: 0.11
Nodes (31): open_sse_providers_capabilities_copy_2, baseId(), CATALOG_FILE, CATALOG_RAW_FILE, CATALOG_VERSION, EMPTY, getCatalogLimits(), getCatalogModalities() (+23 more)

### Community 53 - "Community 53"
Cohesion: 0.08
Nodes (28): downloadToFile(), FAILED_STATUSES, fs, gatewayRequest(), gatewayRequestWithConnection(), http, https, imageInputToUrl() (+20 more)

### Community 54 - "Community 54"
Cohesion: 0.10
Nodes (27): capabilitiesFromServiceKind(), DELETE(), dynamic, GET(), PUT(), GET(), PUT(), GET() (+19 more)

### Community 55 - "Community 55"
Cohesion: 0.11
Nodes (25): CAVEMAN_LEVELS, CAVEMAN_PROMPTS, injectContextSaver(), CONTEXT_SAVER_LEVELS, CONTEXT_SAVER_PROMPTS, injectFastCode(), FAST_CODE_LEVELS, FAST_CODE_PROMPTS (+17 more)

### Community 56 - "Community 56"
Cohesion: 0.12
Nodes (25): POST(), TokenSaverClient(), DEFAULT_LOCALE, isSupportedLocale(), LOCALE_COOKIE, LOCALE_NAMES, LOCALES, normalizeLocale() (+17 more)

### Community 57 - "Community 57"
Cohesion: 0.08
Nodes (28): POST(), POST(), POST(), GROK_CLI_CONFIG, XAI_API_BASE, XAI_AUTH_ENDPOINT_PATH, XAI_CALLBACK_PATH, XAI_CLIENT_ID (+20 more)

### Community 58 - "Community 58"
Cohesion: 0.11
Nodes (32): cleanup(), disableAutoStart(), disableLinux(), disableMacOS(), disableWindows(), enableAutoStart(), enableLinux(), enableMacOS() (+24 more)

### Community 59 - "Community 59"
Cohesion: 0.08
Nodes (17): AG_DEFAULT_TOOLS, AG_TOOL_SUFFIX, ANTIGRAVITY_PROMPT_REWRITES, AG_DECOY_TOOLS, ANTIGRAVITY_REQUEST_BLACKLIST, ANTIGRAVITY_TRANSIENT_ERROR_PATTERNS, ANTIGRAVITY_TRANSIENT_STATUSES, AntigravityExecutor (+9 more)

### Community 60 - "Community 60"
Cohesion: 0.11
Nodes (27): CODEX_MAX_REFRESH_AGE_MS, getCredentialExpiryMs(), getCredentialLastRefreshMs(), getRefreshLockKey(), isCodexRefreshStale(), mergeProviderSpecificData(), mergeRefreshedCredentials(), parseTimeMs() (+19 more)

### Community 61 - "Community 61"
Cohesion: 0.12
Nodes (24): buildChatMessage(), buildGetChatMessageRequest(), buildMetadata(), buildModelOrAlias(), concatBytes(), decodeCompletionChunk(), decodeDoneChunk(), decodeStringField() (+16 more)

### Community 62 - "Community 62"
Cohesion: 0.16
Nodes (16): executeViaExecutor(), resolveImageInput(), nowSec(), POLL_INTERVAL_MS, POLL_TIMEOUT_MS, sizeToAspectRatio(), sleep(), parseResponse() (+8 more)

### Community 63 - "Community 63"
Cohesion: 0.10
Nodes (28): POST(), GET(), isCliRequest(), POST(), dynamic, GET(), PATCH(), PROTECTED_SETTING_KEYS (+20 more)

### Community 64 - "Community 64"
Cohesion: 0.09
Nodes (32): appPort, finalize(), fs, http, isAppPortBusy(), lingerMs, logFile, maxRetries (+24 more)

### Community 65 - "Community 65"
Cohesion: 0.09
Nodes (30): fs, generateCert(), { generateRootCA, loadRootCA, generateLeafCert }, getCertForDomain(), { MITM_DIR }, path, fs, generateLeafCert() (+22 more)

### Community 66 - "Community 66"
Cohesion: 0.12
Nodes (30): { ensureSqliteRuntime }, { ensureTrayRuntime }, ensureRuntimeDir(), ensureSqliteRuntime(), { execSync, spawnSync }, fs, getBetterSqliteBinary(), getDataDir() (+22 more)

### Community 67 - "Community 67"
Cohesion: 0.08
Nodes (20): RFC-3339, clearQoderUploadCache(), QODER_CHAT_URL_ENCODED, QODER_DEVICE_TOKEN_URL, QODER_LOGIN_URL, QODER_MODEL_MAP, QODER_USERINFO_URL, base64Url() (+12 more)

### Community 68 - "Community 68"
Cohesion: 0.10
Nodes (7): BaseExecutor, CommandCodeExecutor, createReplayedStream(), inspectAndWrapCommandCodeResponse(), parseCommandCodeError(), wrapNdjsonAsOpenAISse(), IFlowExecutor

### Community 69 - "Community 69"
Cohesion: 0.12
Nodes (30): b64url(), b64urlPadded(), buildZedUserAuthHeader(), createZedNativeAuthData(), decodeZedPrivateKeyVerifier(), decryptZedAccessToken(), encodeZedPrivateKeyVerifier(), fetchJson() (+22 more)

### Community 70 - "Community 70"
Cohesion: 0.13
Nodes (16): ref_bun_sqlite, ref_node_child_process, sql.js, createBetterSqliteAdapter(), createBunSqliteAdapter(), NOTE: provider API keys are NOT seeded from Vercel env vars. They belong in, initAdapter(), _shouldSync() (+8 more)

### Community 71 - "Community 71"
Cohesion: 0.09
Nodes (23): api, { clearScreen, showStatus, showHeader }, { copyToClipboard }, displayApiKeys(), { getEndpoint }, handleCopyKey(), handleViewFullKey(), { maskKey, formatDate, getRelativeTime } (+15 more)

### Community 72 - "Community 72"
Cohesion: 0.12
Nodes (25): ANTIGRAVITY_IDE_USER_AGENT, ANTIGRAVITY_IDE_VERSION, cacheKey(), _clearWeeklyCache(), fetchAntigravityWeeklyQuota(), GROUP_MATCHERS, parseWeeklyQuotaSummary(), WEEKLY_CONFIG (+17 more)

### Community 73 - "Community 73"
Cohesion: 0.13
Nodes (25): POST(), POST(), POST(), GET(), DELETE(), GET(), normalizeProxyConfig(), normalizeProxyPoolUpdate() (+17 more)

### Community 74 - "Community 74"
Cohesion: 0.13
Nodes (27): POST(), POST(), POST(), POST(), killAllBridges(), isCloudflaredRunning(), disableTunnel(), getTunnelService() (+19 more)

### Community 75 - "Community 75"
Cohesion: 0.12
Nodes (25): DATA_DIR, defaultDir(), getDataDir(), BIN_DIR, BIN_PATH, dlState, downloadFile(), ensureCloudflared() (+17 more)

### Community 76 - "Community 76"
Cohesion: 0.10
Nodes (29): buildEventStreamFrame(), buildInitialResponseFrame(), codeWhispererToMessages(), convertAssistantResponseMessage(), convertOpenAIToKiro(), convertUserInputMessage(), crc32(), CRC32_TABLE (+21 more)

### Community 77 - "Community 77"
Cohesion: 0.06
Nodes (25): crypto, fs, http, origCreate, path, { pathToFileURL }, PEER_TOKEN, ref_http (+17 more)

### Community 78 - "Community 78"
Cohesion: 0.17
Nodes (30): buildChatRequest(), buildToolResultRequest(), CLIENT_SIDE_TOOL_V2, concatArrays(), encodeClientSideToolV2Call(), encodeClientSideToolV2Result(), encodeCursorSetting(), encodeField() (+22 more)

### Community 79 - "Community 79"
Cohesion: 0.16
Nodes (29): bootstrapDeploymentMode(), buildCustomEntries(), buildLocalBridgeEntries(), checkInstalled(), cleanup1pLegacy(), DELETE(), ensureMeta(), GET() (+21 more)

### Community 80 - "Community 80"
Cohesion: 0.13
Nodes (20): buildQoderRequestBody(), extractText(), isBillingBlock(), lastUserText(), normalizeContent(), normalizeMessages(), peekFirstQoderFrame(), QoderExecutor (+12 more)

### Community 81 - "Community 81"
Cohesion: 0.07
Nodes (30): dependencies, bcryptjs, chalk, confbox, @dnd-kit/core, @dnd-kit/modifiers, @dnd-kit/sortable, @dnd-kit/utilities (+22 more)

### Community 82 - "Community 82"
Cohesion: 0.12
Nodes (28): api, buildClaudeHeader(), buildCodexHeader(), buildDroidHeader(), buildHermesHeader(), buildOpenClawHeader(), buildOpenCodeHeader(), CLAUDE_MODEL_TYPES (+20 more)

### Community 83 - "Community 83"
Cohesion: 0.07
Nodes (27): eslintConfig, allowScripts, better-sqlite3@13.0.3, unrs-resolver@1.12.2, comment_better_sqlite3, description, react, name (+19 more)

### Community 84 - "Community 84"
Cohesion: 0.12
Nodes (20): cacheKey(), catalogCache, clearCursorModelCache(), fetchCursorCatalog(), firstString(), getCursorModelsUrl(), http2PostProto(), parseCursorUsableModels() (+12 more)

### Community 85 - "Community 85"
Cohesion: 0.17
Nodes (25): appendText(), canonicalizeKiroConversation(), cleanSchemaValue(), cleanUserContext(), clone(), flattenAllStructuredTools(), flattenResults(), KIRO_EMPTY_USER_PLACEHOLDER (+17 more)

### Community 86 - "Community 86"
Cohesion: 0.11
Nodes (22): appDir, assertRequiredApiArtifacts(), buildCliPackage(), ensureModuleInBundle(), buildDistDir, buildHomeDir, cliDir, copyRecursive() (+14 more)

### Community 87 - "Community 87"
Cohesion: 0.18
Nodes (19): POST(), GET(), GET(), GET(), getDashboardAuthSession(), recordSuccess(), isOidcConfigured(), buildSamlAuthorizeUrl() (+11 more)

### Community 88 - "Community 88"
Cohesion: 0.16
Nodes (21): GROK_CLI_BASE_URL, GROK_CLI_CLIENT_IDENTIFIER, GROK_CLI_MODEL, GROK_CLI_USER_AGENT, GROK_CLI_VERSION, buildHeaders(), modelEntries(), parseGrokCliModels() (+13 more)

### Community 89 - "Community 89"
Cohesion: 0.13
Nodes (19): resolveOllamaLocalHost(), OllamaLocalExecutor, buildClineHeaders(), getClineAccessToken(), getClineAuthorizationHeader(), POST(), classifyOAuthProbeResult(), CLOUD_CODE_ASSIST_TEST_BODY (+11 more)

### Community 90 - "Community 90"
Cohesion: 0.12
Nodes (13): createRequestContextResponse(), CursorExecutor, decodeAgentFrames(), extractAgentString(), isAgentTextRequest(), generateCursorBody(), wrapConnectRPCFrame(), credentials (+5 more)

### Community 91 - "Community 91"
Cohesion: 0.14
Nodes (20): hasBrew(), POST(), setUnexpectedExitHandler(), HEALTH_CHECK, WORKER_URL, probeUrlAlive(), waitForHealth(), enableTunnel() (+12 more)

### Community 92 - "Community 92"
Cohesion: 0.12
Nodes (12): ANTHROPIC_BETA_BASE, ANTHROPIC_BETA_HEAVY_AGENT, ANTIGRAVITY_IDE_BASE_URL, ANTIGRAVITY_OAUTH_CLIENT, CLAUDE_API_HEADERS, CLAUDE_CLI_VERSION, GOOGLE_OAUTH_CLIENT, KIMI_CODING_BASE_URL (+4 more)

### Community 93 - "Community 93"
Cohesion: 0.12
Nodes (18): appendUserTurn(), buildJudgePrompt(), collectPanel(), comboRotationState, extractPanelText(), flattenToolHistory(), FUSION_DEFAULTS, getRotatedModels() (+10 more)

### Community 94 - "Community 94"
Cohesion: 0.12
Nodes (24): QODER_CENTER_BASE, QODER_CHAT_BASE, QODER_CHAT_SIG_PATH, QODER_CHAT_URL, QODER_CLIENT_TYPE, QODER_CONTEXT_TIER_ENV, QODER_DATA_POLICY, QODER_IDE_VERSION (+16 more)

### Community 95 - "Community 95"
Cohesion: 0.13
Nodes (21): POST(), POST(), buildUsageMap(), GET(), normalizeProxyPoolInput(), POST(), toBoolean(), VALID_PROXY_TYPES (+13 more)

### Community 96 - "Community 96"
Cohesion: 0.15
Nodes (15): createTtsResponse(), handleTtsCore(), parseModelVoice(), fetchEdgeTtsVoices(), fetchElevenLabsVoices(), _voicesCache, getTtsAdapter(), SPECIAL_ADAPTERS (+7 more)

### Community 97 - "Community 97"
Cohesion: 0.16
Nodes (23): ALWAYS_PROTECTED, canAccessLocalOnlyRoute(), canAccessPublicLlmApi(), extractApiKey(), hasValidApiKey(), hasValidCliToken(), hasValidToken(), isAuthenticated() (+15 more)

### Community 98 - "Community 98"
Cohesion: 0.13
Nodes (21): KIRO_CODEWHISPERER_TARGET, KIRO_ENDPOINT_FALLBACK_STATUSES, STREAM_FIRST_CHUNK_TIMEOUT_MS, concatChunks(), crc32(), CRC32_TABLE, decoder, encoder (+13 more)

### Community 99 - "Community 99"
Cohesion: 0.14
Nodes (22): MEMORY_CONFIG, accumulateAssistantText(), assistantCleanup, assistantSessionStore, assistantTextSessionId(), cleanupInterval, clearSessionStore(), continuationStore (+14 more)

### Community 100 - "Community 100"
Cohesion: 0.18
Nodes (19): decodeFields(), decodeGrokCreditsFrame(), extractNestedMessage(), extractResetAt(), extractUsageRatio(), findDataFramePayload(), probeFrameHeader(), readField() (+11 more)

### Community 101 - "Community 101"
Cohesion: 0.17
Nodes (19): getDispatcher(), undici, countBoundConnections(), DELETE(), GET(), normalizeProxyPoolUpdate(), PUT(), POST() (+11 more)

### Community 102 - "Community 102"
Cohesion: 0.23
Nodes (20): clearOidcCookies(), GET(), GET(), canAccessTestRoute(), POST(), buildOidcAuthorizationUrl(), createOidcNonce(), createOidcState() (+12 more)

### Community 103 - "Community 103"
Cohesion: 0.18
Nodes (18): DELETE(), GET(), PUT(), createApiKey(), deleteApiKey(), getApiKeyById(), getApiKeys(), rowToKey() (+10 more)

### Community 104 - "Community 104"
Cohesion: 0.16
Nodes (21): dynamic, POST(), runtime, dynamic, GET(), runtime, collapseRepeated(), crypto (+13 more)

### Community 105 - "Community 105"
Cohesion: 0.17
Nodes (6): POST(), POST(), GET(), POST(), assertValidAwsRegion(), KiroService

### Community 106 - "Community 106"
Cohesion: 0.11
Nodes (12): parseQuotaData(), USAGE_APIKEY_PROVIDERS, USAGE_SUPPORTED_PROVIDERS, CREDITS, jsonResponse(), mockHappyPath(), SUBS, WHOAMI (+4 more)

### Community 107 - "Community 107"
Cohesion: 0.24
Nodes (16): applyKiroThinkingOverride(), buildKiroAdditionalModelRequestFieldsForModel(), buildThinkingSystemPrefix(), KIRO_AGENTIC_SYSTEM_PROMPT, resolveDefaultProfileArn(), resolveKiroModelIntent(), usesKiroNativeGptEffort(), kiroEmptyUserContent() (+8 more)

### Community 108 - "Community 108"
Cohesion: 0.16
Nodes (13): bootstrapJwt(), generateFingerprint(), generateSessionId(), injectSystemMarker(), MIMO_SYSTEM_MARKER, MimoFreeExecutor, parseJwtExp(), resetJwtCache() (+5 more)

### Community 109 - "Community 109"
Cohesion: 0.18
Nodes (19): autoDetectFilter(), countMatches(), isGrepLine(), isLineNumbered(), isMostlyPorcelain(), isPathLike(), looksLikeJson(), looksLikeStackTrace() (+11 more)

### Community 110 - "Community 110"
Cohesion: 0.17
Nodes (19): resolveRealIP(), ref_dns, ref_util, STATUS_GETTERS, candidateDevinPaths(), checkDevinInstalled(), execAsync, GET() (+11 more)

### Community 111 - "Community 111"
Cohesion: 0.09
Nodes (21): bin, 9router, comment_sqlite, comment_systray, description, devDependencies, esbuild, nodemon (+13 more)

### Community 112 - "Community 112"
Cohesion: 0.19
Nodes (16): agentBool(), agentMessage(), agentString(), buildAgentRunFrame(), COMPRESS_FLAG, concatBuffers(), createErrorResponse(), debugLog() (+8 more)

### Community 113 - "Community 113"
Cohesion: 0.14
Nodes (21): buildKiroAdditionalModelRequestFields(), containsTagInText(), containsThinkingModeTag(), extractKiroEffortLevel(), extractKiroGptEffortLevel(), isAgenticModel(), isThinkingEnabled(), isThinkingModel() (+13 more)

### Community 114 - "Community 114"
Cohesion: 0.17
Nodes (16): buildNonStreamingResponse(), buildPplxRequestBody(), buildQuery(), buildStreamingResponse(), cleanResponse(), extractContent(), formatToolsHint(), MODEL_MAP (+8 more)

### Community 115 - "Community 115"
Cohesion: 0.19
Nodes (20): buildBraveRequest(), BUILDERS, buildExaRequest(), buildGlmSearchRequest(), buildGooglePseRequest(), buildLinkupRequest(), buildOllamaSearchRequest(), buildPerplexityRequest() (+12 more)

### Community 116 - "Community 116"
Cohesion: 0.20
Nodes (17): responseToBase64(), throwUpstreamError(), cartesia(), coqui(), deepgram(), fishAudio(), FORMAT_HANDLERS, huggingface() (+9 more)

### Community 117 - "Community 117"
Cohesion: 0.15
Nodes (16): GET(), langNames, GET(), langNames, addVoice(), GET(), inferLanguage(), MINIMAX_VOICE_ENDPOINTS (+8 more)

### Community 118 - "Community 118"
Cohesion: 0.18
Nodes (20): buildGeminiNativeAuthHeaders(), buildGeminiNativeUrl(), convertGeminiToInternal(), convertOpenAIResponseToGemini(), corsHeadersFrom(), ensureInitialized(), extractGeminiClientApiKey(), FINISH_REASON_MAP (+12 more)

### Community 119 - "Community 119"
Cohesion: 0.13
Nodes (13): CAPACITY_ADAPTER_CAPS, CombosPage(), EMPTY_CAP_ENTRY, EMPTY_CAPACITY_ADAPTER, normalizeCapEntry(), STRATEGY_OPTIONS, ModelRow(), CapacityBadges() (+5 more)

### Community 120 - "Community 120"
Cohesion: 0.16
Nodes (14): buildHeaders(), buildUpstreamUrl(), combineSignals(), getVideoConfig(), handleVideoProxyCore(), sanitizeSecrets(), VIDEO_ACTIONS, VIDEO_FETCH_TIMEOUT_MS (+6 more)

### Community 121 - "Community 121"
Cohesion: 0.14
Nodes (6): safeApply(), RAW_CAP, compressKiroFormat(), compressMessages(), compressText(), formatRtkLog()

### Community 122 - "Community 122"
Cohesion: 0.17
Nodes (18): GIT_DIFF_CONTEXT_KEEP, JSON_ARRAY_HEAD, JSON_ARRAY_MIN, JSON_ARRAY_TAIL, JSON_COMPACT_MAX, JSON_COMPACT_THRESHOLD, JSON_OBJ_MAX_KEYS, JSON_OBJ_SHOW (+10 more)

### Community 123 - "Community 123"
Cohesion: 0.14
Nodes (19): ref_child_process, checkBinary(), detectIdeInstalled(), execAsync, IDE_BINARIES, IDE_PATHS, pathExists(), detectPlatform() (+11 more)

### Community 124 - "Community 124"
Cohesion: 0.20
Nodes (17): GET(), execAsync, GET(), hasBrew(), isCustomDaemonRunning(), getDownloadStatus(), getTunnelStatus(), NETWORK_CHECK_INTERVAL_MS (+9 more)

### Community 125 - "Community 125"
Cohesion: 0.17
Nodes (10): getProviderModels(), unwrapClineEnvelope(), createSilentWavFile(), getInternalHeaders(), pingModelByKind(), POST(), POST(), getInternalRequestToken() (+2 more)

### Community 126 - "Community 126"
Cohesion: 0.18
Nodes (14): parseVertexAdcJson(), resolveProjectId(), VertexExecutor, buildRequest(), decodeJobId(), encodeJobId(), fromVertexOperation(), modelPathOf() (+6 more)

### Community 127 - "Community 127"
Cohesion: 0.23
Nodes (18): convertOpenAIContentToParts(), generateProjectId(), generateRequestId(), generateSessionId(), normalizeGeminiContents(), tryParseJSON(), generateUUID(), isClaudeModel() (+10 more)

### Community 128 - "Community 128"
Cohesion: 0.16
Nodes (12): TRAE_CONFIG, WINDSURF_CONFIG, extractJsonPath(), fetchTraeExchangeToken(), fetchTraeLoginGuidance(), fetchTraeUserInfo(), trae, traeApiOrigins() (+4 more)

### Community 129 - "Community 129"
Cohesion: 0.11
Nodes (18): antigravityBody, BUILDERS, claudeBody, COMMON, CRED_ISSUE, drainSSE(), firstLlmModel(), FORMATS (+10 more)

### Community 130 - "Community 130"
Cohesion: 0.11
Nodes (16): initWinTray(), path, readline, sendCommand(), { spawn }, COLORS, primeRawOnce(), readline (+8 more)

### Community 131 - "Community 131"
Cohesion: 0.15
Nodes (10): buildClientToolsMcp(), buildPromptText(), CLIENT_TOOLS_MCP_SCRIPT, DevinCliExecutor, ensureClientToolsScript(), extractClientToolResults(), NOTE: this replaces the user's global devin MCP config for the subprocess., resolveDevinBin() (+2 more)

### Community 132 - "Community 132"
Cohesion: 0.22
Nodes (18): buildMultipartFile(), decodedBytes(), defaultUploadImage(), extractUrlFromUploadResponse(), imageUrlBlock(), mimeExt(), payloadBytes(), rewriteBlock() (+10 more)

### Community 133 - "Community 133"
Cohesion: 0.19
Nodes (16): validateKiroConversation(), applyKiroSessionReplay(), canReplaceSessionStart(), cleanup, clearKiroSessionReplayStore(), clone(), ensureHistoryModelIds(), ensureUserMessageModelId() (+8 more)

### Community 134 - "Community 134"
Cohesion: 0.19
Nodes (14): bcryptjs, isTunnelRequest(), NO_STORE_HEADERS, POST(), NOTE: this intentionally leaves no remote self-service password-change, attempts, checkLock(), getClientIp() (+6 more)

### Community 135 - "Community 135"
Cohesion: 0.20
Nodes (16): ref_events, DELETE(), GET(), dynamic, GET(), appendLine(), clearConsoleLogs(), consoleLevels (+8 more)

### Community 136 - "Community 136"
Cohesion: 0.18
Nodes (15): GET(), GET(), getProviderNodes(), ensureShutdownHandler(), flushToDatabase(), generateDetailId(), getDistinctProviders(), getObservabilityConfig() (+7 more)

### Community 137 - "Community 137"
Cohesion: 0.18
Nodes (18): createVercelAdapter(), adapter, all(), close(), exec(), flush(), get(), paramsObj() (+10 more)

### Community 138 - "Community 138"
Cohesion: 0.16
Nodes (4): appendRepairInstruction(), encodeSSEError(), envPositiveInt(), KiroExecutor

### Community 139 - "Community 139"
Cohesion: 0.18
Nodes (10): bearerAuth(), ADAPTERS, OPENAI_COMPAT_PROVIDERS, createOpenAIEmbeddingAdapter(), embedCfg(), embedUrl(), ENDPOINTS, baseAdapter (+2 more)

### Community 140 - "Community 140"
Cohesion: 0.24
Nodes (15): resetComboRotation(), uuid, DELETE(), GET(), PUT(), dynamic, GET(), POST() (+7 more)

### Community 141 - "Community 141"
Cohesion: 0.20
Nodes (16): capForClaudeBlock(), capForMime(), capForOpenAIBlock(), filterBlocks(), ph(), PLACEHOLDER_CURRENT, PLACEHOLDER_PREV, stripClaude() (+8 more)

### Community 142 - "Community 142"
Cohesion: 0.25
Nodes (16): buildModelBlock(), checkHermesInstalled(), DELETE(), execAsync, GET(), getHermesConfigPath(), getHermesDir(), getHermesEnvPath() (+8 more)

### Community 143 - "Community 143"
Cohesion: 0.16
Nodes (9): FEATURES, CLI_TOOLS, FlowAnimation(), PROVIDERS, Footer(), GetStarted(), HeroSection(), HowItWorks() (+1 more)

### Community 144 - "Community 144"
Cohesion: 0.22
Nodes (15): debug(), error(), errorLine(), formatData(), formatTime(), info(), line(), LOG_LEVELS (+7 more)

### Community 145 - "Community 145"
Cohesion: 0.33
Nodes (14): buildData(), handleFetchCore(), parseJinaTitle(), readJsonOrText(), runExa(), runFirecrawl(), runJina(), runOllama() (+6 more)

### Community 146 - "Community 146"
Cohesion: 0.14
Nodes (11): DEDUP_LINE_MAX, FILTERS, SEARCH_LIST_PER_DIR_MAX, SEARCH_LIST_TOTAL_DIR_MAX, TREE_MAX_LINES, dedupLog(), SEARCH_LIST_HEADER_RE, searchList() (+3 more)

### Community 147 - "Community 147"
Cohesion: 0.17
Nodes (9): DETECT_WINDOW, GIT_DIFF_HUNK_MAX_LINES, GIT_LOG_MAX_LINES, STATUS_MAX_FILES, STATUS_MAX_UNTRACKED, buildOutput(), gitDiff(), gitLog() (+1 more)

### Community 148 - "Community 148"
Cohesion: 0.20
Nodes (13): ALIAS_TO_PROVIDER_ID, BUILTIN_MODEL_ALIASES, getModelInfoCore(), inferProviderFromModelName(), MEDIA_ONLY_ALIASES, MODEL_PREFIX_PROVIDERS, parseModel(), resolveModelAliasFromMap() (+5 more)

### Community 149 - "Community 149"
Cohesion: 0.12
Nodes (17): scripts, build, build:bun, build:low-mem, cli:pack, cli:publish, dev, dev:bun (+9 more)

### Community 150 - "Community 150"
Cohesion: 0.12
Nodes (16): build, builder, dockerfilePath, watchPatterns, deploy, healthcheckGracePeriod, healthcheckInterval, healthcheckMethod (+8 more)

### Community 151 - "Community 151"
Cohesion: 0.22
Nodes (16): createSupabaseAdapter(), adapter, all(), close(), exec(), get(), paramsObj(), persist() (+8 more)

### Community 152 - "Community 152"
Cohesion: 0.18
Nodes (14): checksum(), concat(), crc32(), credentials, encodeHeader(), encoder, execute(), fetchMock (+6 more)

### Community 154 - "Community 154"
Cohesion: 0.23
Nodes (15): makeResult(), normalizeBrave(), normalizeExa(), normalizeGlmSearch(), normalizeGooglePse(), normalizeLinkup(), normalizeOllamaSearch(), normalizePerplexity() (+7 more)

### Community 155 - "Community 155"
Cohesion: 0.16
Nodes (14): cacheKey(), catalogCache, cosyCredsFromConnection(), exchangeJobToken(), fetchQoderCatalogRaw(), fetchUserIdForJobToken(), inflight, invalidateQoderCatalog() (+6 more)

### Community 156 - "Community 156"
Cohesion: 0.21
Nodes (13): cleanJSONSchemaForAntigravity(), convertConstToEnum(), convertEnumValuesToStrings(), convertPrefixItems(), DEFAULT_SAFETY_SETTINGS, ensureArrayItems(), ensureObjectType(), flattenAnyOfOneOf() (+5 more)

### Community 157 - "Community 157"
Cohesion: 0.16
Nodes (15): buildTargetUrl(), DELETE, dynamic, forwardedHeaders(), GET, getTargetBase(), HEAD, HOP_BY_HOP_HEADERS (+7 more)

### Community 158 - "Community 158"
Cohesion: 0.16
Nodes (11): COMBO_BASE_NAMES, COMBO_KINDS, getEffectiveStatus(), MediaProviderCard(), MediaProviderKindPage(), getEffectiveStatus(), ProviderCard(), WebProvidersPage() (+3 more)

### Community 159 - "Community 159"
Cohesion: 0.23
Nodes (16): createUpstashAdapter(), all(), close(), exec(), flush(), get(), paramsObj(), persistNow() (+8 more)

### Community 160 - "Community 160"
Cohesion: 0.18
Nodes (13): normalizeLegacyProxy(), normalizeString(), resolveConnectionProxyConfig(), rotateState, applyActiveStrikeBlocks(), _doRefresh(), inflightRefresh, lastRefreshAt (+5 more)

### Community 161 - "Community 161"
Cohesion: 0.25
Nodes (14): assertPublicUrlResolved(), BLOCKED_HOSTNAMES, BLOCKED_SUFFIXES, BLOCKED_V4_RANGES, fetchPublic(), ipv4ToInt(), isBlockedHost(), isBlockedIpv4() (+6 more)

### Community 162 - "Community 162"
Cohesion: 0.17
Nodes (9): checksum(), concat(), crc32(), credentials, encodeHeader(), encoder, fetchMock, frame() (+1 more)

### Community 163 - "Community 163"
Cohesion: 0.12
Nodes (15): buildCommand, framework, functions, src/app/api/**/*.js, src/app/api/v1/**/*.js, src/app/api/v1beta/**/*.js, headers, installCommand (+7 more)

### Community 164 - "Community 164"
Cohesion: 0.25
Nodes (13): buildSearchRequest(), errorResult(), handleSearchCore(), jsonResponse(), NON_RETRIABLE, sanitizeHeaders(), sanitizeQuery(), successResult() (+5 more)

### Community 165 - "Community 165"
Cohesion: 0.26
Nodes (12): QODER_CONTEXT_TIER_HEADROOM, QODER_CONTEXT_TIER_MODES, applyQoderContextTier(), estimateQoderPromptTokens(), findNamedTier(), getQoderContextTiers(), normalizeMode(), parseTierTokenCount() (+4 more)

### Community 166 - "Community 166"
Cohesion: 0.30
Nodes (14): confbox, checkCodexInstalled(), DELETE(), deleteNestedSection(), execAsync, GET(), getCodexAuthPath(), getCodexConfigPath() (+6 more)

### Community 167 - "Community 167"
Cohesion: 0.25
Nodes (12): POST(), canAccessTestRoute(), POST(), clearDashboardAuthCookie(), createDashboardAuthToken(), getDashboardAuthSecret(), getSecret(), loadJwtSecret() (+4 more)

### Community 168 - "Community 168"
Cohesion: 0.33
Nodes (14): calculate_memory_limits(), check_dependencies(), cleanup(), detect_system(), log_debug(), log_error(), log_info(), log_warn() (+6 more)

### Community 169 - "Community 169"
Cohesion: 0.36
Nodes (14): calculate_memory_limits(), check_dependencies(), cleanup(), detect_system(), install_systemd_service(), log_error(), log_info(), log_warn() (+6 more)

### Community 170 - "Community 170"
Cohesion: 0.24
Nodes (11): ACTIVE_BILLING, buildCreditsResponseBuffer(), EMPTY_GRPC_WEB_FRAME, encodeFixed32Field(), encodeLengthDelimited(), encodeTag(), encodeTimestampField(), encodeVarint() (+3 more)

### Community 171 - "Community 171"
Cohesion: 0.16
Nodes (5): buildProviderRequest(), normalizeZedProvider(), ZedExecutor, CHAT_BODY, makeExecutor()

### Community 172 - "Community 172"
Cohesion: 0.34
Nodes (13): addMiniMaxQuota(), buildMiniMaxQuota(), formatMiniMaxQuotaName(), getMiniMaxField(), getMiniMaxModelName(), getMiniMaxProvidedPercent(), getMiniMaxResetAt(), getMiniMaxSessionTotal() (+5 more)

### Community 173 - "Community 173"
Cohesion: 0.25
Nodes (9): fromOpenAIFinish(), extractReasoningText(), convertFinishReason(), isValidPdfPagesArg(), openaiToClaudeResponse(), sanitizeReadArgs(), sanitizeToolArgs(), stopTextBlock() (+1 more)

### Community 174 - "Community 174"
Cohesion: 0.30
Nodes (13): buildExaMcpEntry(), checkClaudeInstalled(), DELETE(), EXA_PLUGIN, execAsync, GET(), getClaudeJsonPath(), getClaudeSettingsPath() (+5 more)

### Community 175 - "Community 175"
Cohesion: 0.37
Nodes (13): checkJcodeInstalled(), DELETE(), execAsync, GET(), getConfigPath(), getJcodeConfigDir(), getProviderEnvPath(), has9RouterConfig() (+5 more)

### Community 176 - "Community 176"
Cohesion: 0.20
Nodes (11): dynamic, GET(), POST(), getCliToken(), AUTH_DIR, CLI_SECRET_FILE, getConsistentMachineId(), getRawMachineId() (+3 more)

### Community 177 - "Community 177"
Cohesion: 0.30
Nodes (9): POST(), buildExternalIdpRefreshParams(), decodeJwtPayload(), MICROSOFT_TOKEN_ENDPOINT_HOSTS, normalizeKiroExternalIdpAuth(), normalizeScope(), normalizeString(), resolveExpiresAt() (+1 more)

### Community 178 - "Community 178"
Cohesion: 0.17
Nodes (12): appDir, BUILD_CONFIG, buildEntry(), cliDir, cliMitmDir, ENTRIES, esbuild, EXTERNALS (+4 more)

### Community 179 - "Community 179"
Cohesion: 0.21
Nodes (5): createLogSession(), createNoOpLogger(), createRequestLogger(), ensureNodeModules(), formatTimestamp()

### Community 180 - "Community 180"
Cohesion: 0.18
Nodes (9): GOOGLE_TTS_LANGUAGES, buildTtsProviderModels(), GEMINI_VOICES, MIMO_VOICES, TTS_MODELS_CONFIG, v(), VOICES, VOICES_FULL (+1 more)

### Community 181 - "Community 181"
Cohesion: 0.26
Nodes (10): buildNonStreamingResponse(), buildStreamingResponse(), extractContent(), generateStatsigId(), GrokWebExecutor, MODEL_MAP, parseOpenAIMessages(), randomHex() (+2 more)

### Community 182 - "Community 182"
Cohesion: 0.27
Nodes (3): flattenQuery(), STREAM_TIMEOUT_MS, TraeExecutor

### Community 183 - "Community 183"
Cohesion: 0.27
Nodes (12): addOptionalFields(), base64ToBytes(), buildJsonBody(), buildMultipartBody(), getDimensions(), imageItemFromString(), MULTIPART_MODELS, normalizeCloudflareResponse() (+4 more)

### Community 184 - "Community 184"
Cohesion: 0.19
Nodes (8): buildPrompt(), fetchGeminiVoices(), KNOWN_MODELS, parseGeminiModelVoice(), pcmToWav(), PREBUILT_VOICES, synthesize(), ref_node_buffer

### Community 185 - "Community 185"
Cohesion: 0.26
Nodes (9): POST(), probeMcp(), fetchWithTimeout(), getChatErrorMessage(), getErrorMessage(), getModelsErrorMessage(), isValidUrl(), POST() (+1 more)

### Community 186 - "Community 186"
Cohesion: 0.35
Nodes (12): checkOpenClawInstalled(), DELETE(), execAsync, GET(), getOpenClawDir(), getOpenClawSettingsPath(), has9RouterConfig(), POST() (+4 more)

### Community 187 - "Community 187"
Cohesion: 0.26
Nodes (9): ACCESS_TOKEN_KEYS, execFileAsync, extractTokensViaBetterSqlite(), extractTokensViaCLI(), GET(), getCandidatePaths(), MACHINE_ID_KEYS, normalize() (+1 more)

### Community 188 - "Community 188"
Cohesion: 0.27
Nodes (3): GET(), POST(), CursorService

### Community 189 - "Community 189"
Cohesion: 0.31
Nodes (10): POST(), POST(), collectAppPids(), ensureRuntimeUpdater(), getDataDir(), killAppProcesses(), killMitmByPidFile(), resolveBundledUpdaterPath() (+2 more)

### Community 190 - "Community 190"
Cohesion: 0.26
Nodes (11): ProviderLimitCard(), formatResetTimeDisplay(), getColorClasses(), QuotaProgressBar(), formatResetTimeDisplay(), getColorClasses(), QuotaTable(), sortQuotas() (+3 more)

### Community 192 - "Community 192"
Cohesion: 0.15
Nodes (12): description, devDependencies, vitest, engines, node, name, private, scripts (+4 more)

### Community 193 - "Community 193"
Cohesion: 0.55
Nodes (11): buildAuthHeaders(), handleSttCore(), jsonResponse(), resolveAudioContentType(), transcribeAssemblyAI(), transcribeDeepgram(), transcribeGemini(), transcribeHuggingFace() (+3 more)

### Community 194 - "Community 194"
Cohesion: 0.23
Nodes (10): CFG_KIND, __dirname, DRY, files, formatConfig(), formatEntry(), emitKey(), formatInlineObject() (+2 more)

### Community 195 - "Community 195"
Cohesion: 0.36
Nodes (11): build9RouterConfig(), checkDeepSeekInstalled(), DELETE(), execAsync, GET(), getDeepSeekConfigPath(), getDeepSeekDir(), has9RouterConfig() (+3 more)

### Community 196 - "Community 196"
Cohesion: 0.36
Nodes (10): DELETE(), PUT(), deleteProviderConnectionsByProvider(), createProviderNode(), deleteProviderNode(), getProviderNodeById(), nodeToRow(), rowToNode() (+2 more)

### Community 197 - "Community 197"
Cohesion: 0.24
Nodes (7): CODEX_CLI_VERSION, buildSseResponse(), CODEX_TOOL_IMAGE_MODELS, parseResponse(), parseStream(), resolveCodexImageModels(), stripImageSuffix()

### Community 198 - "Community 198"
Cohesion: 0.45
Nodes (10): checkInstalled(), DELETE(), execAsync, GET(), getDataDir(), getGlobalStatePath(), getSecretsPath(), has9RouterConfig() (+2 more)

### Community 199 - "Community 199"
Cohesion: 0.40
Nodes (10): checkOpenCodeInstalled(), DELETE(), execAsync, GET(), getConfigDir(), getConfigPath(), has9RouterConfig(), PATCH() (+2 more)

### Community 200 - "Community 200"
Cohesion: 0.36
Nodes (10): checkPiAgentInstalled(), DELETE(), dynamic, execAsync, GET(), getConfigPath(), getConfigPaths(), has9RouterConfig() (+2 more)

### Community 201 - "Community 201"
Cohesion: 0.29
Nodes (10): GET(), isUsageEligible(), maskName(), parsePositiveInt(), SAFE_FIELDS, SAFE_PSD_FIELDS, sanitize(), sortConnections() (+2 more)

### Community 202 - "Community 202"
Cohesion: 0.31
Nodes (9): CopyButton(), SkillRow(), SkillsPage(), getSkillBlobUrl(), getSkillRawUrl(), SKILLS, SKILLS_BLOB_BASE, SKILLS_RAW_BASE (+1 more)

### Community 203 - "Community 203"
Cohesion: 0.22
Nodes (5): formatBytes(), formatUptime(), SystemStatusPage(), footerLinks, APP_CONFIG

### Community 204 - "Community 204"
Cohesion: 0.25
Nodes (9): CREATIVE, ELEGANT, FILTERS, getM(), Preview, ThemeCard, THEMES, ThemesPage() (+1 more)

### Community 205 - "Community 205"
Cohesion: 0.36
Nodes (11): createSqlJsAdapter(), all(), close(), exec(), get(), paramsObj(), persist(), run() (+3 more)

### Community 206 - "Community 206"
Cohesion: 0.29
Nodes (8): GITHUB_COPILOT, buildHeaders(), cacheKey(), catalogCache, expandCatalog(), fetchCatalogRaw(), resolveCopilotModels(), open_sse_services_tokenrefresh_refreshcopilottoken

### Community 207 - "Community 207"
Cohesion: 0.20
Nodes (5): DEFAULT_THINKING_AG_SIGNATURE, DEFAULT_THINKING_CLAUDE_SIGNATURE, DEFAULT_THINKING_GEMINI_CLI_SIGNATURE, DEFAULT_THINKING_TEXT, DEFAULT_THINKING_VERTEX_SIGNATURE

### Community 208 - "Community 208"
Cohesion: 0.20
Nodes (9): open_sse_executors_cursor_isagentcapablerequest, open_sse_utils_cursorprotobuf_decodeagentvalue, open_sse_utils_cursorprotobuf_decodemcpargs, open_sse_utils_cursorprotobuf_encodeagentvalue, open_sse_utils_cursorprotobuf_encodemcpresulterror, open_sse_utils_cursorprotobuf_encodemcpresultsuccess, open_sse_utils_cursorprotobuf_encodemcpresulttoolnotfound, open_sse_utils_cursorprotobuf_encodemcptooldefinition (+1 more)

### Community 209 - "Community 209"
Cohesion: 0.24
Nodes (5): AG_SEARCH_GENERATION_CONFIG, CHAT_SEARCH_CONFIG, handleChatSearch(), searchModel(), toResult()

### Community 210 - "Community 210"
Cohesion: 0.27
Nodes (8): UA, cache, getToken(), synthesize(), ttsRequest(), cache, getToken(), synthesize()

### Community 211 - "Community 211"
Cohesion: 0.24
Nodes (7): FIND_PER_DIR_MAX, FIND_TOTAL_DIR_MAX, GREP_PER_FILE_MAX, find(), grep(), UNIX_PATHS, WIN_PATHS

### Community 212 - "Community 212"
Cohesion: 0.24
Nodes (8): SIGNAL_LINE_RE, SMART_TRUNCATE_HEAD, SMART_TRUNCATE_MID_KEEP, SMART_TRUNCATE_MIN_LINES, SMART_TRUNCATE_TAIL, READ_NUMBERED_LINE_RE, readNumbered(), smartTruncate()

### Community 213 - "Community 213"
Cohesion: 0.31
Nodes (6): bodyChars(), compressWithPxpipe(), estTokens(), formatPxpipeLog(), skipped(), bigText

### Community 214 - "Community 214"
Cohesion: 0.40
Nodes (9): getGeminiThoughtSignature(), getGeminiThoughtSignatureSync(), isCompatible(), maybePrunePersisted(), memorySignatures, pruneMemoryExpired(), signatureFamily(), signatureKv (+1 more)

### Community 215 - "Community 215"
Cohesion: 0.27
Nodes (6): recharts, fmtTokens(), fmtUptime(), PxpipeClient(), REASON_LABELS, WINDOW_TABS

### Community 216 - "Community 216"
Cohesion: 0.33
Nodes (8): GET(), PUT(), getMitmAlias(), setMitmAliasAll(), CACHE_FILE, syncToJson(), writeAliasForTool(), writeAtomic()

### Community 217 - "Community 217"
Cohesion: 0.44
Nodes (9): checkDroidInstalled(), DELETE(), execAsync, GET(), getDroidDir(), getDroidSettingsPath(), has9RouterConfig(), POST() (+1 more)

### Community 218 - "Community 218"
Cohesion: 0.38
Nodes (7): CORS_HEADERS, countContentBlockChars(), countMessageChars(), countValueChars(), estimateAnthropicInputTokens(), POST(), countTokens()

### Community 219 - "Community 219"
Cohesion: 0.22
Nodes (6): material-symbols, @next/third-parties, src_app_globals, inter, metadata, viewport

### Community 220 - "Community 220"
Cohesion: 0.28
Nodes (5): ref_node_events, handle(), makeFakeChild(), runExecute(), { spawnMock }

### Community 221 - "Community 221"
Cohesion: 0.33
Nodes (8): DELETE(), dynamic, GET(), POST(), sanitizeCaps(), addCustomModel(), customKey(), deleteCustomModel()

### Community 222 - "Community 222"
Cohesion: 0.31
Nodes (6): src_mitm_antigravityideversion_antigravity_ide_version, applyAntigravityIdeVersionOverride(), rewriteAntigravityUserAgent(), shouldRewriteMetadata(), {
  ANTIGRAVITY_IDE_VERSION,
  applyAntigravityIdeVersionOverride,
}, require

### Community 223 - "Community 223"
Cohesion: 0.22
Nodes (6): chatModels(), CRED_ISSUE, FILE_TYPES, NON_CHAT_KINDS, PROVIDER_FILTER, results

### Community 224 - "Community 224"
Cohesion: 0.46
Nodes (7): execFileAsync, fetchLocalDeviceVoices(), fetchVoicesMac(), fetchVoicesWin(), synthesize(), synthesizeMacOrWin(), ref_node_util

### Community 225 - "Community 225"
Cohesion: 0.46
Nodes (7): convertFinishReason(), kiroToClaudeNonStreaming(), kiroToClaudeResponse(), IMPORTANT: This translator does NOT receive raw Kiro AWS-EventStream frames., restoreToolName(), stopTextBlock(), stopThinkingBlock()

### Community 226 - "Community 226"
Cohesion: 0.39
Nodes (8): decodeField(), decodeMessage(), decodeVarint(), extractTextAndThinking(), extractTextFromResponse(), extractToolCall(), log(), parseConnectRPCFrame()

### Community 227 - "Community 227"
Cohesion: 0.25
Nodes (3): ref_chalk_animation, ref_figlet, ref_gradient_string

### Community 229 - "Community 229"
Cohesion: 0.32
Nodes (5): colorLine(), ConsoleLogClient(), LOG_LEVEL_COLORS, dynamic, CONSOLE_LOG_CONFIG

### Community 230 - "Community 230"
Cohesion: 0.43
Nodes (6): envInt(), isDisabled(), isNonServerRuntime(), pruneOnce(), runCleanerOnce(), startCleaner()

### Community 232 - "Community 232"
Cohesion: 0.39
Nodes (7): api, DEFAULT_HEADERS, del(), get(), handleResponse(), post(), put()

### Community 233 - "Community 233"
Cohesion: 0.25
Nodes (7): ALIAS_TOKENS, baseline, current, here, resolved, snapPath, sortedIdToAlias

### Community 234 - "Community 234"
Cohesion: 0.32
Nodes (4): logOffset(), readLogSince(), ROUTES, waitForRtkLine()

### Community 235 - "Community 235"
Cohesion: 0.29
Nodes (7): scripts, build, dev, pack:cli, postinstall, prepublishOnly, publish:cli

### Community 236 - "Community 236"
Cohesion: 0.29
Nodes (6): compilerOptions, baseUrl, module, moduleResolution, paths, open-sse

### Community 237 - "Community 237"
Cohesion: 0.29
Nodes (5): DEFAULT_RETRY_CONFIG, FETCH_CONNECT_TIMEOUT_MS, ENDPOINT_DEFAULTS, PROVIDER_DEFAULTS, NOTE: runtime (index.js buildTransport) only re-applies `format`; the rest…

### Community 238 - "Community 238"
Cohesion: 0.52
Nodes (6): canonicalizeQoderUsage(), createQoderSseCoalescer(), finishReasonOf(), hasValuableDelta(), num(), parseInner()

### Community 239 - "Community 239"
Cohesion: 0.33
Nodes (4): DEAD_FREE_OPENCODE_MODELS, FILTERS, KNOWN_FREE_OPENCODE_MODELS, dynamic

### Community 241 - "Community 241"
Cohesion: 0.33
Nodes (6): dependencies, enquirer, node-forge, node-machine-id, react, react-dom

### Community 244 - "Community 244"
Cohesion: 0.47
Nodes (5): LS_EXT_SUMMARY_TOP, LS_NOISE_DIRS, humanSize(), ls(), parseLsLine()

### Community 245 - "Community 245"
Cohesion: 0.33
Nodes (6): devDependencies, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss

### Community 246 - "Community 246"
Cohesion: 0.47
Nodes (5): countryName(), GET(), LANG_NAMES, langName(), LOCALE_NAMES

### Community 247 - "Community 247"
Cohesion: 0.67
Nodes (5): EndpointPresetControl(), maskApiKey(), normalizePresets(), readPresets(), writePresets()

### Community 248 - "Community 248"
Cohesion: 0.60
Nodes (5): filterQuotasByVisibility(), getHiddenQuotaRows(), getProviderHiddenQuotaSet(), getQuotaVisibilityKey(), trimHiddenQuotaKeys()

### Community 251 - "Community 251"
Cohesion: 0.40
Nodes (4): PROVIDER_DISPLAY, resolveDisplay(), RISK_NOTICE, DISPLAY_FIELDS

### Community 252 - "Community 252"
Cohesion: 0.47
Nodes (5): CRED_ISSUE, drainSSE(), firstLlmModel(), prepare(), runChat()

### Community 256 - "Community 256"
Cohesion: 0.50
Nodes (4): formatCost(), getDefaultPricing(), GET_DEFAULTS(), PricingModal()

### Community 257 - "Community 257"
Cohesion: 0.40
Nodes (4): createBypassRequest(), ref_https, ref_net, INTERNET_CHECK

### Community 258 - "Community 258"
Cohesion: 0.70
Nodes (4): fetchAll(), gcache(), GET(), isDirectConnect()

### Community 259 - "Community 259"
Cohesion: 0.70
Nodes (4): compareVersions(), fetchLatestVersion(), GET(), getLatestVersionCached()

### Community 260 - "Community 260"
Cohesion: 0.60
Nodes (3): AddApiKeyModal(), parseLine(), planBulkAdd()

### Community 261 - "Community 261"
Cohesion: 0.40
Nodes (3): firstLlmModel(), PROVIDER_FILTER, providerIds

### Community 264 - "Community 264"
Cohesion: 1.00
Nodes (3): createOpenAIAdapter(), imageCfg(), imageUrl()

### Community 266 - "Community 266"
Cohesion: 0.67
Nodes (3): localRequest(), mocks, request()

## Knowledge Gaps
- **1190 isolated node(s):** `CLAUDE_TOOL_CHOICE_TYPES`, `API_TYPE_OPTIONS`, `VARIANT_CONFIG`, `AUTO_PING_SETTINGS_KEYS`, `authMethodOptions` (+1185 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1914 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 11`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 26`, `Community 28`, `Community 32`, `Community 34`, `Community 35`, `Community 36`, `Community 39`, `Community 45`, `Community 47`, `Community 48`, `Community 49`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 59`, `Community 60`, `Community 61`, `Community 67`, `Community 68`, `Community 72`, `Community 73`, `Community 75`, `Community 76`, `Community 77`, `Community 80`, `Community 84`, `Community 85`, `Community 87`, `Community 88`, `Community 89`, `Community 90`, `Community 92`, `Community 93`, `Community 96`, `Community 99`, `Community 100`, `Community 103`, `Community 105`, `Community 106`, `Community 107`, `Community 108`, `Community 109`, `Community 114`, `Community 115`, `Community 116`, `Community 117`, `Community 120`, `Community 121`, `Community 125`, `Community 127`, `Community 129`, `Community 133`, `Community 134`, `Community 138`, `Community 141`, `Community 145`, `Community 147`, `Community 148`, `Community 152`, `Community 160`, `Community 161`, `Community 162`, `Community 164`, `Community 165`, `Community 170`, `Community 171`, `Community 173`, `Community 177`, `Community 180`, `Community 185`, `Community 187`, `Community 192`, `Community 207`, `Community 208`, `Community 211`, `Community 213`, `Community 218`, `Community 220`, `Community 222`, `Community 223`, `Community 228`, `Community 234`, `Community 248`, `Community 251`, `Community 252`, `Community 253`, `Community 254`, `Community 255`, `Community 260`, `Community 261`, `Community 262`, `Community 266`, `Community 267`, `Community 271`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `next` connect `Community 10` to `Community 1`, `Community 2`, `Community 3`, `Community 8`, `Community 12`, `Community 21`, `Community 23`, `Community 24`, `Community 25`, `Community 27`, `Community 28`, `Community 33`, `Community 34`, `Community 37`, `Community 44`, `Community 45`, `Community 47`, `Community 49`, `Community 50`, `Community 52`, `Community 54`, `Community 56`, `Community 57`, `Community 63`, `Community 73`, `Community 74`, `Community 79`, `Community 83`, `Community 87`, `Community 89`, `Community 95`, `Community 96`, `Community 97`, `Community 101`, `Community 102`, `Community 103`, `Community 104`, `Community 105`, `Community 110`, `Community 117`, `Community 124`, `Community 125`, `Community 134`, `Community 135`, `Community 136`, `Community 140`, `Community 142`, `Community 143`, `Community 157`, `Community 158`, `Community 166`, `Community 167`, `Community 174`, `Community 175`, `Community 176`, `Community 177`, `Community 185`, `Community 186`, `Community 187`, `Community 188`, `Community 189`, `Community 195`, `Community 196`, `Community 198`, `Community 199`, `Community 200`, `Community 201`, `Community 203`, `Community 216`, `Community 217`, `Community 219`, `Community 221`, `Community 239`, `Community 246`, `Community 258`, `Community 265`, `Community 269`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `proxyAwareFetch()` connect `Community 4` to `Community 257`, `Community 2`, `Community 132`, `Community 8`, `Community 9`, `Community 14`, `Community 16`, `Community 21`, `Community 22`, `Community 153`, `Community 26`, `Community 155`, `Community 170`, `Community 172`, `Community 47`, `Community 182`, `Community 59`, `Community 61`, `Community 68`, `Community 69`, `Community 72`, `Community 206`, `Community 80`, `Community 88`, `Community 90`, `Community 101`, `Community 106`, `Community 108`, `Community 110`, `Community 112`, `Community 126`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `proxyAwareFetch()` (e.g. with `createDefaultDeps()` and `antigravity-weekly-quota.test.js`) actually correct?**
  _`proxyAwareFetch()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `getSettings()` (e.g. with `antigravity-mitm/route.js` and `tailscale-install/route.js`) actually correct?**
  _`getSettings()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CLAUDE_TOOL_CHOICE_TYPES`, `API_TYPE_OPTIONS`, `VARIANT_CONFIG` to the rest of the system?**
  _1190 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.039746031746031744 - nodes in this community are weakly interconnected._