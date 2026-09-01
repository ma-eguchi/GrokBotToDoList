import type { TodoFilter } from "../types";

const FILTERS: { id: TodoFilter; label: string }[] = [
  { id: "all", label: "すべて" },
  { id: "active", label: "未完了" },
  { id: "completed", label: "完了済み" },
];

type FilterBarProps = {
  filter: TodoFilter;
  onChange: (filter: TodoFilter) => void;
  activeCount: number;
  totalCount: number;
};

export function FilterBar({
  filter,
  onChange,
  activeCount,
  totalCount,
}: FilterBarProps) {
  return (
    <div className="panel filter-bar">
      <div className="filter-tabs" role="group" aria-label="表示フィルタ">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="filter-tab"
            aria-pressed={filter === item.id}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p>
        全{totalCount}件 / 未完了 {activeCount}件
      </p>
    </div>
  );
}
