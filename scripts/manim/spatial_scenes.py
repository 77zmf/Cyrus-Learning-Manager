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
        formula = Text(tex, font_size=24, font="Menlo")
        box = RoundedRectangle(
            corner_radius=0.16,
            width=formula.width + 0.8,
            height=formula.height + 0.42,
            stroke_color=GRAY_B,
            fill_color=BLACK,
            fill_opacity=0.04,
        )
        group = VGroup(box, formula).move_to(formula)
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
        self.formula_tag("u = fx X/Z + cx,   v = fy Y/Z + cy")
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
        self.formula_tag("min sum ||z_ij - h(T_i, X_j)||^2 + sum ||e_kl||^2")
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
        self.formula_tag("baseline -> disparity -> depth -> renderable asset")
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
            Text("a_t = pi(o_t, W_3D)", font_size=26, font="Menlo"),
            Text("planner reads the world", font_size=18, color=GRAY_C),
        ).arrange(DOWN, buff=0.18).move_to(RIGHT * 1.65 + DOWN * 1.0)

        self.play(LaggedStart(*[FadeIn(card, shift=UP * 0.08) for card in cards], lag_ratio=0.1))
        self.play(LaggedStart(*[GrowArrow(arrow) for arrow in arrows], lag_ratio=0.12))
        self.play(Create(world), Write(planner))
        self.formula_tag("p(W_3D | I_1:n),   W_3D = G_theta(c)")
        self.wait(1.2)
