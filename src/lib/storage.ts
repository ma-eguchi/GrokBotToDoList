import type { Todo } from "../types";

export const STORAGE_KEY = "grokbot-todos-v1";

function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const todo = value as Partial<Todo>;
  return (
    typeof todo.id === "string" &&
    typeof todo.title === "string" &&
    typeof todo.notes === "string" &&
    typeof todo.dueDate === "string" &&
    typeof todo.completed === "boolean" &&
    typeof todo.createdAt === "number" &&
    typeof todo.updatedAt === "number"
  );
}

export function loadTodos(storage: Pick<Storage, "getItem"> = localStorage): Todo[] {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isTodo);
  } catch {
    return [];
  }
}

export function saveTodos(
  todos: Todo[],
  storage: Pick<Storage, "setItem"> = localStorage,
): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
