import { context } from "esbuild";

const watch = process.argv.includes("--watch");

const ctx = await context({
  entryPoints: ["src/mk24-hello-card.ts"],
  bundle: true,
  outfile: "dist/mk24-hello-card.js",
  format: "esm",
  target: "es2020",
  sourcemap: true,
  logLevel: "info",
  minify: false
});

if (watch) {
  await ctx.watch();
  console.log("Watching for file changes...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
