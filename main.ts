import { serveDir } from "@std/http/file-server";

console.log("🚀 SharedWorker Dashboard Server running on http://localhost:8000");

Deno.serve({ port: 8000 }, (req) => {
  return serveDir(req, {
    fsRoot: "./public",
    showDirListing: false,
    enableCors: true,
  });
});
