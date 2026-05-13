from manim import *


class CyrusScene(Scene):
    def title_bar(self, title, subtitle):
        heading = Text(title, font_size=34, weight=BOLD)
        sub = Text(subtitle, font_size=18, color=GRAY_C)
        group = VGroup(heading, sub).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        group.to_edge(UP).to_edge(LEFT)
        self.play(FadeIn(group, shift=DOWN * 0.15))
        return group

    def formula_tag(self, tex, corner=DOWN):
        formula = MathTex(tex, font_size=30)
        max_width = config.frame_width - 1.0
        if formula.width > max_width:
            formula.scale_to_fit_width(max_width)
        box = RoundedRectangle(
            corner_radius=0.16,
            width=formula.width + 0.8,
            height=formula.height + 0.42,
            stroke_color=GRAY_B,
            fill_color=BLACK,
            fill_opacity=0.04,
        )
        box.move_to(formula)
        group = VGroup(box, formula)
        group.to_edge(corner)
        self.play(FadeIn(group, shift=UP * 0.1))
        return group


class SlamProjectionScene(CyrusScene):
    def construct(self):
        self.title_bar("SLAM projection", "A 3D point becomes a pixel through camera geometry")

        camera = Polygon(LEFT * 0.42 + DOWN * 0.32, RIGHT * 0.42 + DOWN * 0.32, UP * 0.46)
        camera.set_fill(BLACK, opacity=0.08).set_stroke(WHITE, opacity=0.95)
        camera.move_to(LEFT * 4.6 + DOWN * 0.2)
        cam_label = Text("camera", font_size=18).next_to(camera, DOWN, buff=0.18)

        image_plane = Line(UP * 1.65, DOWN * 1.65).move_to(LEFT * 0.85)
        image_plane.set_stroke(WHITE, width=5)
        plane_label = Text("image plane", font_size=18).next_to(image_plane, UP, buff=0.18)

        world_point = Dot(RIGHT * 3.0 + UP * 1.05, radius=0.11, color=WHITE)
        point_label = Text("X=(X,Y,Z)", font_size=24, font="Menlo").next_to(world_point, RIGHT, buff=0.22)

        camera_center = camera.get_center() + UP * 0.1
        projected = Dot(image_plane.point_from_proportion(0.35), radius=0.09, color=BLACK)
        ray = Line(camera_center, world_point.get_center(), stroke_width=3, color=GRAY_A)
        ray_to_plane = Line(camera_center, projected.get_center(), stroke_width=4, color=WHITE)
        pixel = Text("u", font_size=28, font="Menlo").next_to(projected, LEFT, buff=0.16)

        norm_plane = Rectangle(width=1.9, height=1.1, stroke_color=GRAY_B)
        norm_plane.move_to(RIGHT * 1.0 + DOWN * 1.3)
        norm_point = Dot(norm_plane.get_center() + RIGHT * 0.28 + UP * 0.16, radius=0.07)
        norm_label = Text("(X/Z, Y/Z)", font_size=20, font="Menlo").next_to(norm_plane, DOWN, buff=0.15)

        self.play(FadeIn(camera), Write(cam_label))
        self.play(Create(image_plane), Write(plane_label))
        self.play(FadeIn(world_point, scale=0.7), Write(point_label))
        self.play(Create(ray))
        self.play(Create(ray_to_plane), FadeIn(projected, scale=0.6), Write(pixel))
        self.play(Create(norm_plane), FadeIn(norm_point), Write(norm_label))
        self.formula_tag(r"u=f_x\frac{X}{Z}+c_x,\quad v=f_y\frac{Y}{Z}+c_y")
        self.wait(1.2)


class PoseGraphLoopClosureScene(CyrusScene):
    def construct(self):
        self.title_bar("Pose graph loop closure", "One loop edge turns accumulated drift into a global constraint")

        nodes = [
            LEFT * 4.4 + DOWN * 1.0,
            LEFT * 2.9 + UP * 0.35,
            LEFT * 1.25 + UP * 0.75,
            RIGHT * 0.45 + UP * 0.25,
            RIGHT * 2.0 + DOWN * 0.5,
            RIGHT * 3.4 + DOWN * 1.0,
        ]
        dots = VGroup(*[Dot(pos, radius=0.11, color=WHITE) for pos in nodes])
        labels = VGroup(*[Text(f"T{i}", font_size=20, font="Menlo").next_to(dots[i], UP, buff=0.12) for i in range(len(nodes))])
        odom_edges = VGroup(*[Line(nodes[i], nodes[i + 1], stroke_width=4, color=GRAY_B) for i in range(len(nodes) - 1)])
        drift_curve = VMobject(color=GRAY_D, stroke_width=2).set_points_smoothly(nodes)

        loop_edge = ArcBetweenPoints(nodes[-1], nodes[0], angle=-TAU / 4, color=WHITE, stroke_width=6)
        loop_label = Text("loop closure", font_size=20).next_to(loop_edge, DOWN, buff=0.2)

        landmarks = VGroup(
            Dot(LEFT * 2.1 + DOWN * 1.25, radius=0.07),
            Dot(RIGHT * 0.95 + UP * 1.25, radius=0.07),
            Dot(RIGHT * 2.65 + UP * 0.45, radius=0.07),
        )
        landmark_lines = VGroup(
            Line(nodes[1], landmarks[0].get_center(), stroke_width=2, color=GRAY_C),
            Line(nodes[3], landmarks[1].get_center(), stroke_width=2, color=GRAY_C),
            Line(nodes[4], landmarks[2].get_center(), stroke_width=2, color=GRAY_C),
        )

        self.play(Create(drift_curve), FadeIn(dots), Write(labels))
        self.play(Create(odom_edges))
        self.play(FadeIn(landmarks), Create(landmark_lines))
        self.play(Create(loop_edge), Write(loop_label))
        self.play(
            dots[-1].animate.move_to(LEFT * 4.0 + DOWN * 0.9),
            labels[-1].animate.next_to(LEFT * 4.0 + DOWN * 0.9, UP, buff=0.12),
            loop_label.animate.set_color(BLACK),
            run_time=1.2,
        )
        self.formula_tag(r"\min_{T,X}\sum_{ij}\lVert z_{ij}-h(T_i,X_j)\rVert^2+\sum_{kl}\lVert e_{kl}\rVert^2")
        self.wait(1.2)


class QuaternionRotationScene(CyrusScene):
    def construct(self):
        self.title_bar("Quaternion rotation", "Unit quaternions encode 3D orientation without gimbal lock")

        sphere = Circle(radius=1.35, color=WHITE)
        sphere.shift(LEFT * 3.25 + DOWN * 0.2)
        equator = Ellipse(width=2.7, height=0.78, color=GRAY_B).move_to(sphere)
        axis = Line(sphere.get_center() + LEFT * 1.55 + DOWN * 0.34, sphere.get_center() + RIGHT * 1.55 + UP * 0.34)
        axis.set_stroke(GRAY_A, width=4)
        axis_label = MathTex(r"\hat{u}", font_size=28).next_to(axis, UP, buff=0.12)

        q_point = Dot(sphere.get_center() + RIGHT * 0.72 + UP * 0.78, radius=0.1, color=WHITE)
        minus_q_point = Dot(sphere.get_center() + LEFT * 0.72 + DOWN * 0.78, radius=0.1, color=GRAY_B)
        q_label = MathTex(r"q", font_size=30).next_to(q_point, RIGHT, buff=0.14)
        minus_q_label = MathTex(r"-q", font_size=30).next_to(minus_q_point, LEFT, buff=0.14)
        cover_label = Text("same 3D rotation", font_size=18, color=GRAY_C).next_to(sphere, DOWN, buff=0.26)

        vector_origin = RIGHT * 1.2 + DOWN * 0.75
        v = Arrow(vector_origin, vector_origin + RIGHT * 1.35 + UP * 0.22, buff=0, color=GRAY_C)
        v_rot = Arrow(vector_origin, vector_origin + RIGHT * 0.5 + UP * 1.35, buff=0, color=WHITE)
        arc = Arc(radius=0.9, start_angle=0.15, angle=1.05, color=WHITE).move_arc_center_to(vector_origin)
        v_label = MathTex(r"v", font_size=28).next_to(v.get_end(), RIGHT, buff=0.12)
        v_rot_label = MathTex(r"v'", font_size=28).next_to(v_rot.get_end(), UP, buff=0.12)

        rules = VGroup(
            MathTex(r"i^2=j^2=k^2=ijk=-1", font_size=30),
            MathTex(r"q=\cos\frac{\theta}{2}+\sin\frac{\theta}{2}(u_xi+u_yj+u_zk)", font_size=30),
            MathTex(r"v'=qvq^{-1}", font_size=34),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        rules.move_to(RIGHT * 2.3 + UP * 1.0)

        self.play(Create(sphere), Create(equator), Create(axis), Write(axis_label))
        self.play(FadeIn(q_point, scale=0.7), Write(q_label), FadeIn(minus_q_point, scale=0.7), Write(minus_q_label))
        self.play(Write(cover_label))
        self.play(GrowArrow(v), Write(v_label))
        self.play(Create(arc), TransformFromCopy(v, v_rot), Write(v_rot_label))
        self.play(LaggedStart(*[Write(rule) for rule in rules], lag_ratio=0.18))
        self.formula_tag(r"q\sim -q,\quad v'=qvq^{-1}")
        self.wait(1.2)


class ReconstructionPipelineScene(CyrusScene):
    def construct(self):
        self.title_bar("3D reconstruction pipeline", "Capture turns into a validation asset through geometry and rendering")

        labels = ["Images", "Features", "SfM poses", "MVS dense", "3DGS", "Asset"]
        xs = [-5.0, -3.0, -1.0, 1.0, 3.0, 5.0]
        cards = VGroup()
        arrows = VGroup()
        for index, label in enumerate(labels):
            rect = RoundedRectangle(corner_radius=0.16, width=1.45, height=0.8, stroke_color=WHITE)
            text = Text(label, font_size=20)
            card = VGroup(rect, text).move_to(RIGHT * xs[index] + UP * 0.95)
            cards.add(card)
            if index > 0:
                arrows.add(Arrow(RIGHT * xs[index - 1] + UP * 0.95 + RIGHT * 0.78, RIGHT * xs[index] + UP * 0.95 + LEFT * 0.78, buff=0.08))

        sparse = VGroup(*[Dot(LEFT * 0.7 + RIGHT * (i % 5) * 0.32 + DOWN * (i // 5) * 0.24, radius=0.035) for i in range(18)])
        dense = VGroup(*[Dot(RIGHT * 0.9 + RIGHT * (i % 9) * 0.18 + DOWN * (i // 9) * 0.14, radius=0.025, color=GRAY_B) for i in range(72)])
        gaussians = VGroup(
            *[
                Ellipse(width=0.18, height=0.1, stroke_width=0, fill_color=WHITE, fill_opacity=0.65)
                .rotate((i % 5) * 0.3)
                .move_to(RIGHT * 3.0 + LEFT * 0.5 + RIGHT * (i % 8) * 0.14 + DOWN * (i // 8) * 0.12)
                for i in range(40)
            ]
        )
        sensor_grid = VGroup(
            Rectangle(width=1.3, height=0.75, stroke_color=GRAY_B),
            Text("simctl KPI", font_size=18),
        ).move_to(RIGHT * 5.0 + DOWN * 0.9)

        self.play(LaggedStart(*[FadeIn(card, shift=UP * 0.08) for card in cards], lag_ratio=0.08))
        self.play(LaggedStart(*[GrowArrow(arrow) for arrow in arrows], lag_ratio=0.08))
        self.play(FadeIn(sparse, lag_ratio=0.02))
        self.play(TransformFromCopy(sparse, dense), run_time=1.2)
        self.play(TransformFromCopy(dense, gaussians), run_time=1.2)
        self.play(FadeIn(sensor_grid, shift=LEFT * 0.2))
        self.formula_tag(r"\mathrm{baseline}\rightarrow\mathrm{disparity}\rightarrow\mathrm{depth}\rightarrow\mathrm{asset}")
        self.wait(1.2)


class SpatialIntelligenceScene(CyrusScene):
    def construct(self):
        self.title_bar("Spatial intelligence loop", "Observation becomes a world model, then reasoning, then action")

        blocks = [
            ("Observation", LEFT * 4.2 + UP * 0.6),
            ("3D world", LEFT * 1.4 + UP * 0.6),
            ("Reasoning", RIGHT * 1.4 + UP * 0.6),
            ("Action", RIGHT * 4.2 + UP * 0.6),
        ]
        cards = VGroup()
        for label, position in blocks:
            rect = RoundedRectangle(corner_radius=0.18, width=1.85, height=0.86, stroke_color=WHITE)
            text = Text(label, font_size=20)
            cards.add(VGroup(rect, text).move_to(position))

        arrows = VGroup(
            Arrow(blocks[0][1] + RIGHT * 1.0, blocks[1][1] + LEFT * 1.0, buff=0.08),
            Arrow(blocks[1][1] + RIGHT * 1.0, blocks[2][1] + LEFT * 1.0, buff=0.08),
            Arrow(blocks[2][1] + RIGHT * 1.0, blocks[3][1] + LEFT * 1.0, buff=0.08),
        )
        world = VGroup(
            Rectangle(width=2.0, height=1.15, stroke_color=GRAY_B),
            Dot(LEFT * 1.65 + DOWN * 1.0),
            Dot(LEFT * 1.15 + DOWN * 0.58),
            Dot(LEFT * 0.72 + DOWN * 1.1),
            Line(LEFT * 1.65 + DOWN * 1.0, LEFT * 1.15 + DOWN * 0.58, color=GRAY_C),
            Line(LEFT * 1.15 + DOWN * 0.58, LEFT * 0.72 + DOWN * 1.1, color=GRAY_C),
        ).move_to(LEFT * 1.4 + DOWN * 1.0)
        planner = VGroup(
            MathTex(r"a_t=\pi(o_t,\hat{W}_{3D})", font_size=30),
            Text("planner reads the world", font_size=18, color=GRAY_C),
        ).arrange(DOWN, buff=0.18).move_to(RIGHT * 1.65 + DOWN * 1.0)

        self.play(LaggedStart(*[FadeIn(card, shift=UP * 0.08) for card in cards], lag_ratio=0.1))
        self.play(LaggedStart(*[GrowArrow(arrow) for arrow in arrows], lag_ratio=0.12))
        self.play(Create(world), Write(planner))
        self.formula_tag(r"p(W_{3D}\mid I_{1:n}),\quad \hat{W}_{3D}=G_\theta(c)")
        self.wait(1.2)


def make_guided_lesson_scene(title, subtitle, formula, bullets):
    class GuidedLessonScene(CyrusScene):
        def construct(self):
            self.title_bar(title, subtitle)

            nodes = VGroup()
            labels = ["Concept", "Formula", "GoodNotes"]
            positions = [LEFT * 3.8 + UP * 0.45, ORIGIN + UP * 0.45, RIGHT * 3.8 + UP * 0.45]
            for label, position in zip(labels, positions):
                circle = Circle(radius=0.62, stroke_color=WHITE)
                text = Text(label, font_size=18)
                nodes.add(VGroup(circle, text).move_to(position))

            arrows = VGroup(
                Arrow(positions[0] + RIGHT * 0.7, positions[1] + LEFT * 0.7, buff=0.08),
                Arrow(positions[1] + RIGHT * 0.7, positions[2] + LEFT * 0.7, buff=0.08),
            )

            bullet_text = VGroup(
                *[Text(item, font_size=18, color=GRAY_C) for item in bullets]
            ).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
            bullet_text.move_to(DOWN * 1.1)

            self.play(LaggedStart(*[FadeIn(node, shift=UP * 0.08) for node in nodes], lag_ratio=0.12))
            self.play(LaggedStart(*[GrowArrow(arrow) for arrow in arrows], lag_ratio=0.15))
            self.play(LaggedStart(*[Write(item) for item in bullet_text], lag_ratio=0.12))
            self.formula_tag(formula)
            self.wait(1.0)

    return GuidedLessonScene


guided_lesson_scenes = [
    (
        "GuidedStateSpaceScene",
        "State space model",
        "state, input, and dynamics as one animation",
        r"\dot{x}=Ax+Bu",
        ["x is the state", "A carries natural dynamics", "B injects control input"],
    ),
    (
        "GuidedControllabilityScene",
        "Controllability rank test",
        "input directions propagate through A",
        r"\mathcal{C}=[B\ AB\ \cdots\ A^{n-1}B]",
        ["start from B", "propagate to AB", "rank decides reachable directions"],
    ),
    (
        "GuidedStabilityScene",
        "Stability and eigenvalues",
        "eigenvalue real parts decide convergence",
        r"x(t)=e^{At}x(0)",
        ["negative real part contracts", "positive real part diverges", "matrix A shapes modes"],
    ),
    (
        "GuidedObservabilityScene",
        "Observability",
        "outputs reveal or hide state directions",
        r"\mathcal{O}=\begin{bmatrix}C\\CA\\\cdots\end{bmatrix}",
        ["sensor sees Cx", "dynamics reveal CAx", "rank decides hidden states"],
    ),
    (
        "GuidedLyapunovScene",
        "Lyapunov stability",
        "energy decreases along the trajectory",
        r"V=x^TPx,\quad \dot{V}<0",
        ["positive energy", "descending derivative", "stability without solving x(t)"],
    ),
    (
        "GuidedStateFeedbackScene",
        "State feedback",
        "feedback moves closed-loop poles",
        r"u=-Kx,\quad \dot{x}=(A-BK)x",
        ["measure state", "apply feedback", "move poles left"],
    ),
    (
        "GuidedLqrScene",
        "LQR",
        "Q and R trade tracking error against effort",
        r"J=\int(x^TQx+u^TRu)dt",
        ["Q penalizes state", "R penalizes control", "Riccati gives K"],
    ),
    (
        "GuidedKalmanScene",
        "Kalman filter",
        "prediction and observation fuse by gain",
        r"K=P^-C^T(CP^-C^T+R)^{-1}",
        ["predict state", "measure residual", "gain chooses trust"],
    ),
    (
        "GuidedLqgScene",
        "LQG",
        "estimation feeds optimal control",
        r"\hat{x}_{k|k}=\hat{x}^-+K(y-C\hat{x}^-),\quad u=-L\hat{x}",
        ["Kalman estimates", "LQR controls", "separation has assumptions"],
    ),
    (
        "GuidedMpcScene",
        "MPC",
        "optimize a horizon and execute the first action",
        r"\min_{u_{0:N-1}}\sum x_k^TQx_k+u_k^TRu_k",
        ["roll out horizon", "respect constraints", "execute first step"],
    ),
    (
        "GuidedRobustControlScene",
        "Robust control",
        "uncertainty stays inside a stability envelope",
        r"\|T_{zw}\|_\infty<\gamma",
        ["model has uncertainty", "disturbance enters", "gain bound protects output"],
    ),
    (
        "GuidedNonlinearControlScene",
        "Nonlinear control",
        "linearize locally and compare with true curved motion",
        r"\dot{x}=f(x,u),\quad A=\frac{\partial f}{\partial x}",
        ["nonlinear dynamics", "local Jacobian", "feedback near operating point"],
    ),
    (
        "GuidedStochasticControlScene",
        "Stochastic control",
        "dynamic programming backs up value under uncertainty",
        r"V_t(x)=\min_u \mathbb{E}[c(x,u)+V_{t+1}(x')]",
        ["state branches by probability", "future value returns", "policy chooses action"],
    ),
    (
        "GuidedWorldSpatialInterfaceScene",
        "World and spatial model interface",
        "latent dynamics meet 3D geometry",
        r"p(z_{t+1}\mid z_t,a_t),\quad p(W_{3D}\mid I_{1:n})",
        ["encode observation", "predict world", "connect to planning"],
    ),
    (
        "GuidedRigidCameraProjectionScene",
        "Rigid camera projection",
        "world points become image pixels",
        r"s\tilde{u}=K[R\mid t]\tilde{X}",
        ["pose transforms point", "K projects camera ray", "pixel error drives SLAM"],
    ),
    (
        "GuidedEpipolarGeometryScene",
        "Epipolar geometry",
        "two views constrain feature matches",
        r"\tilde{x}_2^TF\tilde{x}_1=0,\quad E=[t]_\times R",
        ["match feature", "check epipolar line", "triangulate 3D point"],
    ),
    (
        "GuidedSlamBackendPoseGraphScene",
        "SLAM backend pose graph",
        "residuals pull poses and landmarks into agreement",
        r"\min_{T,X}\sum\|u-\pi(TX)\|^2",
        ["pose nodes", "measurement edges", "loop closure reduces drift"],
    ),
    (
        "GuidedReconstructionRepresentationScene",
        "Reconstruction representations",
        "COLMAP poses feed NeRF and 3DGS assets",
        r"\hat{C}(r)=\sum_iT_i(1-e^{-\sigma_i\delta_i})c_i",
        ["SfM recovers poses", "MVS densifies", "3DGS renders asset"],
    ),
    (
        "GuidedQuaternionOrientationScene",
        "Quaternion orientation",
        "unit quaternions rotate vectors by sandwich product",
        r"q\sim -q,\quad v'=qvq^{-1}",
        ["unit quaternion", "double cover", "rotation sandwich"],
    ),
    (
        "GuidedVioImuPreintegrationScene",
        "VIO and IMU preintegration",
        "camera keyframes fuse with high-rate inertial motion",
        r"\Delta R_{ij},\Delta v_{ij},\Delta p_{ij}",
        ["camera keyframes", "IMU preintegration", "bias drift"],
    ),
    (
        "GuidedLidarSlamIcpScene",
        "LiDAR SLAM and ICP",
        "point clouds align through rigid transforms and residuals",
        r"\min_{R,t}\sum_i\|Rp_i+t-q_i\|^2",
        ["scan-to-map", "point-to-plane residual", "LIO factor graph"],
    ),
    (
        "GuidedSemanticNeuralSlamScene",
        "Semantic and neural SLAM maps",
        "geometry gains labels and continuous neural fields",
        r"F_\theta(x)\rightarrow(\sigma,c,s)",
        ["semantic map", "neural field", "validation boundary"],
    ),
    (
        "GuidedSensorCalibrationScene",
        "Sensor calibration chain",
        "camera, LiDAR, and IMU agree through transforms and time",
        r"s\tilde{u}=K[R\mid t]\tilde{X},\quad T_{camera\leftarrow lidar},\quad \Delta t",
        ["camera intrinsics", "extrinsic chain", "time offset"],
    ),
    (
        "GuidedStereoDepthMvsScene",
        "Stereo depth and dense MVS",
        "disparity becomes depth, then multi-view consistency densifies geometry",
        r"Z=\frac{fb}{d},\quad D(u,v)",
        ["baseline and disparity", "depth map", "dense MVS"],
    ),
    (
        "GuidedDynamicReconstructionScene",
        "Dynamic reconstruction",
        "static background separates from moving scene flow",
        r"\mathbf{v}(x,t),\quad F_\theta(x,t)\rightarrow(\sigma,c)",
        ["static background", "scene flow", "motion decomposition"],
    ),
    (
        "GuidedReconstructionEvaluationScene",
        "Reconstruction evaluation",
        "trajectory, geometry, and rendering metrics feed a validation gate",
        r"ATE,\ RPE,\quad d_{Chamfer}(P,Q),\quad PSNR",
        ["trajectory error", "geometry distance", "validation gate"],
    ),
]

for scene_name, title, subtitle, formula, bullets in guided_lesson_scenes:
    scene_cls = make_guided_lesson_scene(title, subtitle, formula, bullets)
    scene_cls.__name__ = scene_name
    scene_cls.__qualname__ = scene_name
    globals()[scene_name] = scene_cls
