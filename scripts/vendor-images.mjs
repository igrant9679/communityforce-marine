#!/usr/bin/env node
/**
 * vendor-images — fetch the site's images into client/public/images/.
 *
 * The site used to load every photograph straight off Manus's CloudFront
 * distribution, which meant each page view depended on Manus staying up. Every
 * reference is now a local /images/... path, and scripts/image-manifest.json is
 * the source of record for where each file originally came from.
 *
 * This runs as the `prebuild` hook, so a clean CI checkout ends up with the
 * images present. Files already committed to the repo are left alone, so
 * committing client/public/images/ turns this script into a no-op — which is
 * the end state worth aiming for.
 *
 * Failures are warnings by default: a deploy missing a few photos beats a build
 * that refuses to finish and leaves the previous version serving. Pass --strict
 * to make any failure fatal, which is what you want when running it by hand.
 *
 *   node scripts/vendor-images.mjs
 *   node scripts/vendor-images.mjs --strict
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "client", "public", "images");
const MANIFEST = path.join(__dirname, "image-manifest.json");

const STRICT = process.argv.includes("--strict");
const CONCURRENCY = 8;
const TIMEOUT_MS = 30_000;
const RETRIES = 2;

const log = (...a) => console.log("vendor-images:", ...a);

async function fetchOne(name, url) {
  const dest = path.join(OUT_DIR, name);

  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { signal: ac.signal, redirect: "follow" });
      if (!res.ok) {
        // 403/404 will not improve on retry — the object is private or gone.
        if (res.status === 403 || res.status === 404) {
          return { name, ok: false, reason: `HTTP ${res.status}` };
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) throw new Error("empty response body");

      // Write to a temp file and rename, so an interrupted run never leaves a
      // truncated image that a later run would treat as already present.
      const tmp = `${dest}.part`;
      fs.writeFileSync(tmp, buf);
      fs.renameSync(tmp, dest);
      return { name, ok: true, bytes: buf.length };
    } catch (err) {
      if (attempt === RETRIES) {
        return { name, ok: false, reason: err.name === "AbortError" ? "timeout" : err.message };
      }
      await new Promise((r) => setTimeout(r, 400 * 2 ** attempt));
    } finally {
      clearTimeout(timer);
    }
  }
}

async function main() {
  const { images } = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const entries = Object.entries(images);
  const missing = entries.filter(([name]) => !fs.existsSync(path.join(OUT_DIR, name)));
  const present = entries.length - missing.length;

  log(`${entries.length} images in manifest, ${present} already present`);
  if (missing.length === 0) {
    log("nothing to fetch");
    return;
  }
  log(`fetching ${missing.length}...`);

  const results = [];
  const queue = [...missing];
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      let job;
      while ((job = queue.shift())) results.push(await fetchOne(job[0], job[1]));
    })
  );

  const failed = results.filter((r) => !r.ok);
  const fetched = results.length - failed.length;
  const bytes = results.filter((r) => r.ok).reduce((n, r) => n + r.bytes, 0);
  log(`fetched ${fetched}/${results.length} (${(bytes / 1024 / 1024).toFixed(1)} MB)`);

  if (failed.length) {
    log(`${failed.length} failed:`);
    for (const f of failed.sort((a, b) => a.name.localeCompare(b.name))) {
      log(`  ${f.name} — ${f.reason}`);
    }
    log("see scripts/MISSING-IMAGES.md for the photographs that must be supplied by hand");
    if (STRICT) process.exit(1);
  }
}

main().catch((err) => {
  log("unexpected failure:", err.message);
  if (STRICT) process.exit(1);
});
