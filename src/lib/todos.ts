import type { Todo, TodoDraft, TodoFilter } from "../types";

export function createTodo(draft: TodoDraft, now = Date.now()): Todo {
  const title = draft.title.trim();
  if (!title) {
    throw new Error("タイトルは必須です");
  }

  return {
    id: crypto.randomUUID(),
    title,
    notes: draft.notes?.trim() ?? "",
    dueDate: draft.dueDate?.trim() ?? "",
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function toggleTodo(todos: Todo[], id: string, now = Date.now()): Todo[] {
  return todos.map((todo) =>
    todo.id === id
      ? { ...todo, completed: !todo.completed, updatedAt: now }
      : todo,
  );
}

export function updateTodoTitle(
  todos: Todo[],
  id: string,
  title: string,
  now = Date.now(),
): Todo[] {
  const nextTitle = title.trim();
  if (!nextTitle) {
    throw new Error("タイトルは必須です");
  }

  return todos.map((todo) =>
    todo.id === id ? { ...todo, title: nextTitle, updatedAt: now } : todo,
  );
}

export function deleteTodo(
  todos: Todo[],
  id: string,
): { todos: Todo[]; removed: Todo | undefined } {
  const removed = todos.find((todo) => todo.id === id);
  return {
    todos: todos.filter((todo) => todo.id !== id),
    removed,
  };
}

export function restoreTodo(todos: Todo[], removed: Todo): Todo[] {
  if (todos.some((todo) => todo.id === removed.id)) {
    return todos;
  }

  return [...todos, removed].sort((a, b) => a.createdAt - b.createdAt);
}

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  }
  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

export function countActive(todos: Todo[]): number {
  return todos.filter((todo) => !todo.completed).length;
}
