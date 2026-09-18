// Gate: so kết quả test hiện tại với baseline known-fails.
// PASS nếu KHÔNG có test nào pass(baseline) → fail(now). Test mới được phép.
//
// Usage:
//   cd tests && npx vitest run --reporter=json --outputFile=/tmp/current.json
//   node __baseline__/verify-no-regression.mjs /tmp/current.json
//
// known-fails.txt keys look like "tests/unit/foo.test.js :: full test name".
// vitest's json reporter reports absolute file paths, so normalise whatever the
// checkout root is (CI used to run from /app, contributors run from anywhere).
import { readFileSync } from "fs";

const knownFails = new Set(
  readFileSync(new URL("./known-fails.txt", import.meta.url), "utf8")
    .split("\n").map(s => s.trim()).filter(Boolean)
);

const resultsPath = process.argv[2];
if (!resultsPath) { console.error("Missing results.json path"); process.exit(2); }

// Absolute vitest path → repo-relative "tests/..." path.
const toRepoRelative = (filePath) => {
  const marker = filePath.lastIndexOf("/tests/");
  return marker >= 0 ? filePath.slice(marker + 1) : filePath;
};

const r = JSON.parse(readFileSync(resultsPath, "utf8"));
const nowFails = r.testResults.flatMap(f =>
  f.assertionResults.filter(a => a.status === "failed")
    .map(a => toRepoRelative(f.name) + " :: " + a.fullName)
);

// Regression = fail bây giờ NHƯNG không có trong baseline known-fails
const regressions = nowFails.filter(f => !knownFails.has(f));

if (regressions.length) {
  console.error(`\n❌ REGRESSION: ${regressions.length} test pass→fail:\n`);
  regressions.forEach(f => console.error("  - " + f));
  process.exit(1);
}
console.log(`✅ No regression. (now fails=${nowFails.length}, baseline known=${knownFails.size}, all known)`);
