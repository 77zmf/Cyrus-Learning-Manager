import type { LearningTask } from "../domain/types";

interface DashboardProps {
  tasks: LearningTask[];
}

export function Dashboard({ tasks }: DashboardProps) {
  const active = tasks.filter((task) => task.status === "active").length;
  const done = tasks.filter((task) => task.status === "done").length;
  const blocked = tasks.filter((task) => task.status === "blocked").length;
  const dueSoon = tasks.filter((task) => {
    if (!task.dueDate || task.status === "done" || task.status === "archived") return false;
    const dueTime = Date.parse(task.dueDate);
    if (Number.isNaN(dueTime)) return false;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return dueTime >= now && dueTime <= now + sevenDays;
  }).length;

  return (
    <section aria-label="Dashboard metrics">
      <div className="metric-grid">
        <Metric label="Active" value={active} />
        <Metric label="Done" value={done} />
        <Metric label="Blocked" value={blocked} />
        <Metric label="Due in 7 days" value={dueSoon} />
        <Metric label="Total" value={tasks.length} />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
