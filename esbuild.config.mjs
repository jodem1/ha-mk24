import { context } from "esbuild";

const watch = process.argv.includes("--watch");

const ctx = await context({
  entryPoints: ["src/main.js"],
  bundle: true,
  outfile: "dist/ha-mk24.js",
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
