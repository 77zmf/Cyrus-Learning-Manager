import { chmodSync, copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(new URL("../..", import.meta.url).pathname);
const sceneFile = join(root, "scripts", "manim", "spatial_scenes.py");
const mediaDir = join(root, "output", "manim");
const publicDir = join(root, "public", "manim");
const toolBinDir = join(mediaDir, ".bin");

const sceneMap = new Map([
  ["SlamProjectionScene", "slam_projection.mp4"],
  ["PoseGraphLoopClosureScene", "pose_graph_loop.mp4"],
  ["QuaternionRotationScene", "quaternion_rotation.mp4"],
  ["ReconstructionPipelineScene", "reconstruction_pipeline.mp4"],
  ["SpatialIntelligenceScene", "spatial_intelligence.mp4"],
  ["GuidedStateSpaceScene", "guided_state_space.mp4"],
  ["GuidedControllabilityScene", "guided_controllability.mp4"],
  ["GuidedStabilityScene", "guided_stability.mp4"],
  ["GuidedObservabilityScene", "guided_observability.mp4"],
  ["GuidedLyapunovScene", "guided_lyapunov.mp4"],
  ["GuidedStateFeedbackScene", "guided_state_feedback.mp4"],
  ["GuidedLqrScene", "guided_lqr.mp4"],
  ["GuidedKalmanScene", "guided_kalman.mp4"],
  ["GuidedLqgScene", "guided_lqg.mp4"],
  ["GuidedMpcScene", "guided_mpc.mp4"],
  ["GuidedRobustControlScene", "guided_robust_control.mp4"],
  ["GuidedNonlinearControlScene", "guided_nonlinear_control.mp4"],
  ["GuidedStochasticControlScene", "guided_stochastic_control.mp4"],
  ["GuidedWorldSpatialInterfaceScene", "guided_world_spatial_interface.mp4"],
  ["GuidedRigidCameraProjectionScene", "guided_rigid_camera_projection.mp4"],
  ["GuidedEpipolarGeometryScene", "guided_epipolar_geometry.mp4"],
  ["GuidedSlamBackendPoseGraphScene", "guided_slam_backend_pose_graph.mp4"],
  ["GuidedReconstructionRepresentationScene", "guided_reconstruction_representation.mp4"],
  ["GuidedQuaternionOrientationScene", "guided_quaternion_orientation.mp4"],
  ["GuidedVioImuPreintegrationScene", "guided_vio_imu_preintegration.mp4"],
  ["GuidedLidarSlamIcpScene", "guided_lidar_slam_icp.mp4"],
  ["GuidedSemanticNeuralSlamScene", "guided_semantic_neural_slam.mp4"]
]);

const requestedScenes = process.argv.slice(2);
const scenes = requestedScenes.length > 0 ? requestedScenes : [...sceneMap.keys()];
const manimBin = process.env.MANIM_BIN ?? "manim";
const originalPath = process.env.PATH ?? "";

function run(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    env: process.env,
    stdio: "pipe"
  });
}

function resolveExecutable(command) {
  const result = spawnSync("/bin/sh", ["-lc", `command -v ${command}`], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, PATH: originalPath },
    stdio: "pipe"
  });

  return result.status === 0 ? result.stdout.trim() : "";
}

function prepareTexEnvironment() {
  const dvisvgmBin = process.env.DVISVGM_BIN ?? resolveExecutable("dvisvgm");

  if (!dvisvgmBin) {
    return;
  }

  mkdirSync(toolBinDir, { recursive: true });
  const wrapperPath = join(toolBinDir, "dvisvgm");
  writeFileSync(wrapperPath, `#!/bin/sh\nexec "${dvisvgmBin}" --no-specials "$@"\n`);
  chmodSync(wrapperPath, 0o755);

  process.env.PATH = `${toolBinDir}:${originalPath}`;
  process.env.TEXMFCNF ??= "/opt/homebrew/share/texmf-dist/web2c";
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

mkdirSync(publicDir, { recursive: true });
prepareTexEnvironment();
assertManimAvailable();

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
