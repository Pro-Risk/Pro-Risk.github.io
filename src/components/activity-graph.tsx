import { activityDays, activityStart } from "@/data/activity";
import { cn } from "@/lib/utils";

const MONTHS = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const LEVELS = ["fill-muted", "fill-foreground/20", "fill-foreground/40", "fill-foreground/65", "fill-foreground/90"];
const CELL = 11;
const STEP = 14;
const LEFT = 22;
const TOP = 16;

function level(v: number) {
  if (v === 0) return 0;
  if (v < 10) return 1;
  if (v < 25) return 2;
  if (v < 50) return 3;
  return 4;
}

function buildGraph() {
  const start = new Date(`${activityStart}T00:00:00Z`).getTime();
  const months: { x: number; label: string }[] = [];
  let lastMonth = -1;

  const cells = activityDays.map((v, i) => {
    const date = new Date(start + i * 86_400_000);
    const week = Math.floor(i / 7);
    const dow = i % 7;
    const m = date.getUTCMonth();
    if (dow === 0 && m !== lastMonth) {
      months.push({ x: LEFT + week * STEP, label: MONTHS[m] });
      lastMonth = m;
    }
    return { v, week, dow, label: `${date.getUTCDate()} ${MONTHS[m]}: ${v}` };
  });

  return { cells, months, weeks: Math.ceil(activityDays.length / 7) };
}

const graph = buildGraph();

// График коммитов по дням: столбец — неделя, строка — день недели.
export function ActivityGraph() {
  const { cells, months, weeks } = graph;

  return (
    <div>
      <svg
        viewBox={`0 0 ${LEFT + weeks * STEP} ${TOP + 7 * STEP}`}
        className="w-full max-w-2xl"
        role="img"
        aria-label="Коммиты по дням с апреля по октябрь 2026"
      >
        {months.map((m) => (
          <text key={m.x} x={m.x} y={10} className="fill-muted-foreground text-[9px]">
            {m.label}
          </text>
        ))}
        {[
          ["пн", 0],
          ["ср", 2],
          ["пт", 4],
        ].map(([d, row]) => (
          <text key={d} x={0} y={TOP + Number(row) * STEP + 9} className="fill-muted-foreground text-[9px]">
            {d}
          </text>
        ))}
        {cells.map((c) => (
          <rect
            key={`${c.week}-${c.dow}`}
            x={LEFT + c.week * STEP}
            y={TOP + c.dow * STEP}
            width={CELL}
            height={CELL}
            rx={2}
            className={cn(LEVELS[level(c.v)])}
          >
            <title>{c.label}</title>
          </rect>
        ))}
      </svg>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>меньше</span>
        {LEVELS.map((l) => (
          <svg key={l} viewBox="0 0 11 11" className="size-2.5">
            <rect width="11" height="11" rx="2" className={l} />
          </svg>
        ))}
        <span>больше</span>
      </div>
    </div>
  );
}
