import {
  beginnerFoundations,
  guidedControlLessons,
  threeBlueOneBrownLearningPath
} from "../../domain/learning-workflow";

export function LearningDirectory() {
  const items = [
    { label: "小白入口", href: "#section-start", meta: "5 步开始" },
    { label: "前置概念", href: "#section-foundations", meta: `${beginnerFoundations.length} 张基础卡` },
    {
      label: "3Blue1Brown 数学桥",
      href: "#section-3blue1brown",
      meta: `${threeBlueOneBrownLearningPath.length} 条路线`
    },
    { label: "Manim Studio", href: "#section-manim-studio", meta: "SLAM / 3D / SI" },
    { label: "控制+SLAM课程目录", href: "#section-guided-path", meta: `${guidedControlLessons.length} 节课` },
    { label: "启动队列", href: "#section-launch-queue", meta: "想学时点一个" },
    { label: "互动题", href: "#section-tutor", meta: "即时反馈" }
  ];

  return (
    <nav aria-label="Learning directory" className="panel learning-directory">
      <div className="section-heading">
        <h2>Learning Directory</h2>
        <p>先用目录跳到你要学的部分；课程卡默认收起，展开当前要学的一张就够了。</p>
      </div>
      <div className="directory-grid">
        {items.map((item) => (
          <a aria-label={item.label} href={item.href} key={item.href}>
            <span>{item.label}</span>
            <em>{item.meta}</em>
          </a>
        ))}
      </div>
    </nav>
  );
}
