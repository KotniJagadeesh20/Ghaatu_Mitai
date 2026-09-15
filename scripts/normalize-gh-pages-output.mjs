import { access, cp, mkdir, readdir, rename, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";

if (process.env.GITHUB_PAGES !== "true") process.exit(0);

const clientRoot = resolve("dist/client");
const nestedRoot = join(clientRoot, "Ghaatu_Mitai");
const nestedNext = join(nestedRoot, "_next");
const targetNext = join(clientRoot, "_next");

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    return false;
  }
}

if (!(await exists(nestedNext))) {
  if (await exists(targetNext)) {
    console.log("GitHub Pages _next output is already at the artifact root.");
    process.exit(0);
  }
  throw new Error(`Expected generated _next directory at ${nestedNext}.`);
}

if (await exists(targetNext)) {
  throw new Error(
    `Refusing to normalize GitHub Pages output: both ${nestedNext} and ${targetNext} exist.`,
  );
}

await mkdir(dirname(targetNext), { recursive: true });
try {
  await rename(nestedNext, targetNext);
} catch (error) {
  if (error?.code !== "EXDEV") throw error;
  await cp(nestedNext, targetNext, {
    recursive: true,
    errorOnExist: true,
    force: false,
  });
  await rm(nestedNext, { recursive: true });
}

if ((await readdir(nestedRoot)).length === 0) await rm(nestedRoot, { recursive: true });
console.log("Moved GitHub Pages _next output to dist/client/_next.");
