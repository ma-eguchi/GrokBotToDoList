import { useState, type FormEvent } from "react";
import type { TodoDraft } from "../types";

type TodoFormProps = {
  onAdd: (draft: TodoDraft) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError("タイトルを入力してください");
      return;
    }

    onAdd({ title, notes, dueDate });
    setTitle("");
    setNotes("");
    setDueDate("");
    setError("");
  }

  return (
    <form className="panel todo-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="todo-title">
          タイトル <span className="required">必須</span>
        </label>
        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="例: 牛乳を買う"
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="todo-notes">メモ（任意）</label>
        <textarea
          id="todo-notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="補足があれば入力"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="todo-due-date">期限（任意）</label>
          <input
            id="todo-due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
        <button className="primary-button" type="submit">
          追加する
        </button>
      </div>

      {error ? (
        <p className="error-text" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
