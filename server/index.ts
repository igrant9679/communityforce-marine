import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const indexHtml = path.join(staticPath, "index.html");

  // Railway polls this to decide whether a deploy is healthy. It sits above the
  // static handler so it answers even if the build output is missing entirely —
  // a failed build should show up as an unhealthy deploy, not a 404 on a path
  // that happens to look like a file.
  app.get("/healthz", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(express.static(staticPath));

  // Client-side routing: unmatched requests fall through to the SPA so wouter
  // can resolve them — but only extensionless ones.
  //
  // The catch-all used to answer *every* unmatched request with index.html, so
  // a missing image returned 200 text/html and the browser rendered a broken
  // image with no clue why: no 404 in the network tab, nothing in the logs.
  // Anything that looks like a file now gets a real 404, which makes a missing
  // asset diagnosable.
  app.get("*", (req, res) => {
    if (path.extname(req.path)) {
      res.status(404).type("text/plain").send("Not found");
      return;
    }
    if (!fs.existsSync(indexHtml)) {
      res.status(500).type("text/plain").send("Build output missing");
      return;
    }
    res.sendFile(indexHtml);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
