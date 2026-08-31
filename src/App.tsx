import { useState } from "react";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { FilterBar } from "./components/FilterBar";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { UndoToast } from "./components/UndoToast";
import { useTodos } from "./hooks/useTodos";
import type { Todo } from "./types";

export default function App() {
  const {
    todos,
    visibleTodos,
    filter,
    setFilter,
    activeCount,
    lastDeleted,
    addTodo,
    completeTodo,
    editTitle,
    removeTodo,
    undoDelete,
  } = useTodos();
  const [pendingDelete, setPendingDelete] = useState<Todo | null>(null);

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">GROKBOT TODOLIST</p>
          <h1>今日のタスクを整理する</h1>
          <p>追加、完了、編集、削除。データはブラウザに保存されます。</p>
        </div>
        <div className="stat-chip">未完了 {activeCount} 件</div>
      </header>

      <TodoForm onAdd={addTodo} />
      <FilterBar
        filter={filter}
        onChange={setFilter}
        activeCount={activeCount}
        totalCount={todos.length}
      />
      <TodoList
        todos={visibleTodos}
        filter={filter}
        onToggle={completeTodo}
        onEditTitle={editTitle}
        onRequestDelete={setPendingDelete}
      />

      {pendingDelete ? (
        <ConfirmDialog
          title="タスクを削除しますか？"
          message={`「${pendingDelete.title}」を削除します。あとから元に戻せます。`}
          confirmLabel="削除する"
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            removeTodo(pendingDelete.id);
            setPendingDelete(null);
          }}
        />
      ) : null}

      {lastDeleted ? (
        <UndoToast
          message={`「${lastDeleted.title}」を削除しました`}
          onUndo={undoDelete}
        />
      ) : null}
    </main>
  );
}
