import { useState, type KeyboardEvent } from "react";
import { formatDueDate, isOverdue } from "../lib/dates";
import type { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEditTitle: (id: string, title: string) => void;
  onRequestDelete: (todo: Todo) => void;
};

export function TodoItem({
  todo,
  onToggle,
  onEditTitle,
  onRequestDelete,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const [error, setError] = useState("");
  const overdue = isOverdue(todo.dueDate, todo.completed);

  function commitEdit() {
    if (!draft.trim()) {
      setError("タイトルを入力してください");
      return;
    }
    onEditTitle(todo.id, draft);
    setEditing(false);
    setError("");
  }

  function cancelEdit() {
    setDraft(todo.title);
    setEditing(false);
    setError("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitEdit();
    }
    if (event.key === "Escape") {
      cancelEdit();
    }
  }

  return (
    <article className={`todo-item${todo.completed ? " completed" : ""}`}>
      <button
        type="button"
        className="check-button"
        aria-pressed={todo.completed}
        aria-label={todo.completed ? "未完了に戻す" : "完了にする"}
        onClick={() => onToggle(todo.id)}
      >
        ✓
      </button>

      <div className="todo-main">
        {editing ? (
          <div className="edit-row">
            <input
              type="text"
              value={draft}
              aria-label="タイトルを編集"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {error ? (
              <p className="error-text" role="alert">
                {error}
              </p>
            ) : null}
            <div className="todo-actions">
              <button type="button" className="primary-button" onClick={commitEdit}>
                保存
              </button>
              <button type="button" className="ghost-button" onClick={cancelEdit}>
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="todo-title">{todo.title}</h2>
            {todo.notes ? <p className="todo-notes">{todo.notes}</p> : null}
            {todo.dueDate ? (
              <p className={`todo-meta${overdue ? " overdue" : ""}`}>
                期限: {formatDueDate(todo.dueDate)}
                {overdue ? "（期限切れ）" : ""}
              </p>
            ) : null}
          </>
        )}
      </div>

      {!editing ? (
        <div className="todo-actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setDraft(todo.title);
              setEditing(true);
            }}
          >
            編集
          </button>
          <button
            type="button"
            className="icon-button danger"
            onClick={() => onRequestDelete(todo)}
          >
            削除
          </button>
        </div>
      ) : null}
    </article>
  );
}
