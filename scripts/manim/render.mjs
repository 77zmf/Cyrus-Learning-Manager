import { existsSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(new URL("../..", import.meta.url).pathname);
const sceneFile = join(root, "scripts", "manim", "spatial_scenes.py");
const mediaDir = join(root, "output", "manim");
const publicDir = join(root, "public", "manim");

const sceneMap = new Map([
  ["SlamProjectionScene", "slam_projection.mp4"],
  ["PoseGraphLoopClosureScene", "pose_graph_loop.mp4"],
  ["ReconstructionPipelineScene", "reconstruction_pipeline.mp4"],
  ["SpatialIntelligenceScene", "spatial_intelligence.mp4"]
]);

const requestedScenes = process.argv.slice(2);
const scenes = requestedScenes.length > 0 ? requestedScenes : [...sceneMap.keys()];
const manimBin = process.env.MANIM_BIN ?? "manim";

function run(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: "pipe"
  });
}

function assertManimAvailable() {
  const check = run(manimBin, ["--version"]);

  if (check.status === 0) {
    process.stdout.write(check.stdout);
    return;
  }

  const stderr = check.stderr ?? check.error?.message ?? "";
  process.stderr.write(
    [
      "Manim is not available on PATH.",
      "Install Manim Community first, then rerun this command:",
      "  python3 -m pip install manim",
      "or set MANIM_BIN to a custom executable.",
      "",
      stderr.trim()
    ]
      .filter(Boolean)
      .join("\n") + "\n"
  );
  process.exit(1);
}

function findRenderedVideo(sceneName) {
  const expected = join(mediaDir, "videos", "spatial_scenes", "480p15", `${sceneName}.mp4`);
  if (existsSync(expected)) {
    return expected;
  }

  const candidates = [];
  function walk(dir) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const current = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(current);
      } else if (entry.isFile() && entry.name === `${sceneName}.mp4`) {
        candidates.push(current);
      }
    }
  }

  walk(mediaDir);
  return candidates[0];
}

assertManimAvailable();
mkdirSync(publicDir, { recursive: true });

for (const sceneName of scenes) {
  const outputName = sceneMap.get(sceneName);

  if (!outputName) {
    process.stderr.write(`Unknown Manim scene: ${sceneName}\n`);
    process.stderr.write(`Known scenes: ${[...sceneMap.keys()].join(", ")}\n`);
    process.exit(1);
  }

  process.stdout.write(`Rendering ${sceneName}...\n`);
  const result = run(manimBin, ["-ql", "--media_dir", mediaDir, sceneFile, sceneName]);

  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  const renderedVideo = findRenderedVideo(sceneName);
  if (!renderedVideo) {
    process.stderr.write(`Rendered video for ${sceneName} was not found under ${mediaDir}.\n`);
    process.exit(1);
  }

  const target = join(publicDir, outputName);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(renderedVideo, target);
  process.stdout.write(`Copied ${basename(renderedVideo)} -> public/manim/${outputName}\n`);
}
