import {readFile} from "node:fs/promises"
import {dirname, join} from "node:path"
import {fileURLToPath} from "node:url"

const configPath = join(dirname(fileURLToPath(import.meta.url)), "..", "tensorbuzz.yml")
const requiredRootPaths = [
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "eslint.config.js",
  "spec/support/jasmine.json",
  "tensorbuzz.yml"
]

/**
 * @returns {Promise<string[]>} The configured path rules for the checks build.
 */
async function configuredPaths() {
  const lines = (await readFile(configPath, "utf8")).split("\n")
  const start = lines.indexOf("    paths:")

  return lines.slice(start + 1).flatMap(line => {
    const match = line.match(/^\s{6}- (.+)$/)
    return match ? [match[1].replace(/^['"]|['"]$/g, "")] : []
  })
}

/**
 * @param {string} rule - A small TensorBuzz glob used by this config.
 * @param {string} path - A repository-relative path.
 * @returns {boolean} Whether the rule matches the path.
 */
function matchesRule(rule, path) {
  const expression = rule.split("**")
    .map(part => part
      .replace(/[.+^${}()|[\]\\]/g, "\\$&")
      .replace(/\*/g, "[^/]*"))
    .join(".*")

  return new RegExp(`^${expression}$`).test(path)
}

/**
 * @param {string[]} rules - Ordered TensorBuzz path rules.
 * @param {string} path - A repository-relative path.
 * @returns {boolean} Whether the last matching rule includes the path.
 */
function isIncluded(rules, path) {
  let included = false

  for (const rule of rules) {
    const negated = rule.startsWith("!")
    const pattern = negated ? rule.slice(1) : rule

    if (matchesRule(pattern, path)) included = !negated
  }

  return included
}

describe("TensorBuzz path filter", () => {
  it("defines the checks lane and explicit root configuration inputs", async () => {
    const config = await readFile(configPath, "utf8")
    const paths = await configuredPaths()

    expect(config).toContain("builds:")
    expect(config).toContain("  checks:")
    expect(config).toContain('      - "!**/*.md"')
    expect(config).toContain('      - "!*.md"')
    expect(paths).toContain("**")

    for (const rootPath of requiredRootPaths) {
      expect(paths).toContain(rootPath)
    }
  })

  it("uses last-match-wins to skip docs but run code and config changes", async () => {
    const paths = await configuredPaths()

    expect(isIncluded(paths, "src/index.js")).toBe(true)
    expect(isIncluded(paths, "spec/dig-spec.js")).toBe(true)
    expect(isIncluded(paths, "README.md")).toBe(false)
    expect(isIncluded(paths, "docs/usage.md")).toBe(false)
    expect(isIncluded(paths, "package.json")).toBe(true)
    expect(isIncluded(paths, "tensorbuzz.yml")).toBe(true)
  })
})
