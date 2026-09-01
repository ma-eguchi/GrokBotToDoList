import { useCallback, useEffect, useMemo, useState } from "react";
import {
  countActive,
  createTodo,
  deleteTodo,
  filterTodos,
  restoreTodo,
  toggleTodo,
  updateTodoTitle,
} from "../lib/todos";
import { loadTodos, saveTodos } from "../lib/storage";
import type { Todo, TodoDraft, TodoFilter } from "../types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [lastDeleted, setLastDeleted] = useState<Todo | null>(null);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((draft: TodoDraft) => {
    const next = createTodo(draft);
    setTodos((current) => [next, ...current]);
    return next;
  }, []);

  const completeTodo = useCallback((id: string) => {
    setTodos((current) => toggleTodo(current, id));
  }, []);

  const editTitle = useCallback((id: string, title: string) => {
    setTodos((current) => updateTodoTitle(current, id, title));
  }, []);

  const removeTodo = useCallback((id: string) => {
    setTodos((current) => {
      const { todos: next, removed } = deleteTodo(current, id);
      setLastDeleted(removed ?? null);
      return next;
    });
  }, []);

  const undoDelete = useCallback(() => {
    setLastDeleted((removed) => {
      if (!removed) {
        return null;
      }
      setTodos((current) => restoreTodo(current, removed));
      return null;
    });
  }, []);

  const dismissUndo = useCallback(() => {
    setLastDeleted(null);
  }, []);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  return {
    todos,
    visibleTodos,
    filter,
    setFilter,
    activeCount: countActive(todos),
    lastDeleted,
    addTodo,
    completeTodo,
    editTitle,
    removeTodo,
    undoDelete,
    dismissUndo,
  };
}
