import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const expectedVersion = "1.0.0-beta.5";
const packagePath = resolve("node_modules/vinext/package.json");
const prerenderPath = resolve("node_modules/vinext/dist/build/prerender.js");

const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
if (packageJson.version !== expectedVersion) {
  throw new Error(
    `Refusing to patch vinext ${packageJson.version}; expected ${expectedVersion}. ` +
      "Review whether the upstream basePath prerender fix is available before updating the lockfile.",
  );
}

let source = await readFile(prerenderPath, "utf8");
const replacements = [
  {
    originals: [
      "const htmlRequest = new Request(`http://localhost${urlPath}`, { headers: htmlHeaders });",
      "const htmlRequest = new Request(`http://localhost${config.basePath ?? \"\"}${urlPath}`, { headers: htmlHeaders });",
    ],
    patched:
      "const htmlRequest = new Request(`http://localhost${config.basePath ?? \"\"}${urlPath}${config.trailingSlash && urlPath !== \"/\" ? \"/\" : \"\"}`, { headers: htmlHeaders });",
  },
  {
    originals: [
      "const rscRequest = new Request(`http://localhost${urlPath}`, { headers: rscHeaders });",
      "const rscRequest = new Request(`http://localhost${config.basePath ?? \"\"}${urlPath}`, { headers: rscHeaders });",
    ],
    patched:
      "const rscRequest = new Request(`http://localhost${config.basePath ?? \"\"}${urlPath}${config.trailingSlash && urlPath !== \"/\" ? \"/\" : \"\"}`, { headers: rscHeaders });",
  },
];

let changed = false;
for (const { originals, patched } of replacements) {
  if (source.includes(patched)) continue;
  const original = originals.find((candidate) => source.includes(candidate));
  if (!original) {
    throw new Error(
      `Unable to patch ${prerenderPath}: expected vinext source was not found.`,
    );
  }
  source = source.replace(original, patched);
  changed = true;
}

if (changed) {
  await writeFile(prerenderPath, source);
  console.log(`Patched vinext ${expectedVersion} prerender requests for basePath.`);
} else {
  console.log(`vinext ${expectedVersion} basePath prerender patch is already applied.`);
}
