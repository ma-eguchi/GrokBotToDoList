import { describe, expect, it } from "vitest";
import {
  countActive,
  createTodo,
  deleteTodo,
  filterTodos,
  restoreTodo,
  toggleTodo,
  updateTodoTitle,
} from "./todos";
import type { Todo } from "../types";

function sample(overrides: Partial<Todo> = {}): Todo {
  return {
    id: "todo-1",
    title: " Milestones ",
    notes: "",
    dueDate: "",
    completed: false,
    createdAt: 1,
    updatedAt: 1,
    ...overrides,
  };
}

describe("createTodo", () => {
  it("adds a todo with a required title and optional fields", () => {
    const todo = createTodo(
      {
        title: " 牛乳を買う ",
        notes: " 低脂肪 ",
        dueDate: "2026-09-01",
      },
      100,
    );

    expect(todo.title).toBe("牛乳を買う");
    expect(todo.notes).toBe("低脂肪");
    expect(todo.dueDate).toBe("2026-09-01");
    expect(todo.completed).toBe(false);
    expect(todo.createdAt).toBe(100);
    expect(todo.id).toBeTruthy();
  });

  it("rejects a blank title", () => {
    expect(() => createTodo({ title: "   " })).toThrow("タイトルは必須です");
  });
});

describe("toggleTodo / complete", () => {
  it("marks a todo complete and incomplete", () => {
    const todos = [sample({ id: "a" })];
    const completed = toggleTodo(todos, "a", 20);

    expect(completed[0]?.completed).toBe(true);
    expect(completed[0]?.updatedAt).toBe(20);

    const undone = toggleTodo(completed, "a", 30);
    expect(undone[0]?.completed).toBe(false);
  });
});

describe("updateTodoTitle", () => {
  it("updates a title after trimming", () => {
    const next = updateTodoTitle([sample({ id: "a", title: "旧" })], "a", " 新しい ");
    expect(next[0]?.title).toBe("新しい");
  });
});

describe("deleteTodo", () => {
  it("removes a todo and returns the deleted item", () => {
    const first = sample({ id: "a", title: "残す" });
    const second = sample({ id: "b", title: "消す" });
    const result = deleteTodo([first, second], "b");

    expect(result.todos).toEqual([first]);
    expect(result.removed).toEqual(second);
  });

  it("can restore a deleted todo", () => {
    const first = sample({ id: "a", createdAt: 1 });
    const second = sample({ id: "b", createdAt: 2 });
    const { todos, removed } = deleteTodo([first, second], "a");

    expect(restoreTodo(todos, removed!)).toEqual([first, second]);
  });
});

describe("filterTodos", () => {
  it("filters all / active / completed", () => {
    const todos = [
      sample({ id: "a", completed: false }),
      sample({ id: "b", completed: true }),
    ];

    expect(filterTodos(todos, "all")).toHaveLength(2);
    expect(filterTodos(todos, "active").map((todo) => todo.id)).toEqual(["a"]);
    expect(filterTodos(todos, "completed").map((todo) => todo.id)).toEqual(["b"]);
    expect(countActive(todos)).toBe(1);
  });
});
