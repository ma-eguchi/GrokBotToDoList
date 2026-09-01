import type { Todo, TodoFilter } from "../types";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  filter: TodoFilter;
  onToggle: (id: string) => void;
  onEditTitle: (id: string, title: string) => void;
  onRequestDelete: (todo: Todo) => void;
};

const EMPTY_COPY: Record<TodoFilter, { title: string; body: string }> = {
  all: {
    title: "タスクはまだありません",
    body: "上のフォームから最初のタスクを追加しましょう。",
  },
  active: {
    title: "未完了のタスクはありません",
    body: "すべて完了しています。お疲れさまです。",
  },
  completed: {
    title: "完了したタスクはありません",
    body: "完了にしたタスクがここに表示されます。",
  },
};

export function TodoList({
  todos,
  filter,
  onToggle,
  onEditTitle,
  onRequestDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    const copy = EMPTY_COPY[filter];
    return (
      <section className="panel empty-state" data-testid="empty-state">
        <div className="empty-mark" aria-hidden="true">
          ✓
        </div>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </section>
    );
  }

  return (
    <section className="panel todo-list" aria-label="タスク一覧">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEditTitle={onEditTitle}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </section>
  );
}
