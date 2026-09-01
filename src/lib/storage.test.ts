import { describe, expect, it } from "vitest";
import { loadTodos, saveTodos, STORAGE_KEY } from "./storage";
import type { Todo } from "../types";

const todo: Todo = {
  id: "persist-1",
  title: "保存されるタスク",
  notes: "メモ",
  dueDate: "2026-09-01",
  completed: false,
  createdAt: 1,
  updatedAt: 1,
};

describe("storage persist", () => {
  it("saves todos and reloads them after a refresh", () => {
    saveTodos([todo]);

    expect(localStorage.getItem(STORAGE_KEY)).toContain("保存されるタスク");
    expect(loadTodos()).toEqual([todo]);
  });

  it("returns an empty list when storage is empty or invalid", () => {
    expect(loadTodos()).toEqual([]);

    localStorage.setItem(STORAGE_KEY, "{not-json");
    expect(loadTodos()).toEqual([]);

    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ title: "broken" }]));
    expect(loadTodos()).toEqual([]);
  });
});
