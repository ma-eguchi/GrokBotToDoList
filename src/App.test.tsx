import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { STORAGE_KEY } from "./lib/storage";

async function addTodo(title: string, notes = "") {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/タイトル/), title);
  if (notes) {
    await user.type(screen.getByLabelText(/メモ/), notes);
  }
  await user.click(screen.getByRole("button", { name: "追加する" }));
  return user;
}

describe("App", () => {
  it("adds a todo to the list", async () => {
    render(<App />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    await addTodo("牛乳を買う", "低脂肪");

    expect(screen.getByRole("heading", { name: "牛乳を買う" })).toBeInTheDocument();
    expect(screen.getByText("低脂肪")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });

  it("marks a todo complete and incomplete", async () => {
    render(<App />);
    const user = await addTodo("メールを送る");

    const toggle = screen.getByRole("button", { name: "完了にする" });
    await user.click(toggle);

    expect(screen.getByRole("button", { name: "未完了に戻す" })).toBeInTheDocument();
    expect(screen.getByText(/未完了 0 件/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "未完了に戻す" }));
    expect(screen.getByRole("button", { name: "完了にする" })).toBeInTheDocument();
  });

  it("deletes a todo after confirmation and can undo", async () => {
    render(<App />);
    const user = await addTodo("不要なタスク");

    await user.click(screen.getByRole("button", { name: "削除" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "削除する" }));

    expect(screen.queryByRole("heading", { name: "不要なタスク" })).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "元に戻す" }));
    expect(screen.getByRole("heading", { name: "不要なタスク" })).toBeInTheDocument();
  });

  it("persists todos so a remount still shows them", async () => {
    const { unmount } = render(<App />);
    await addTodo("リロード後も残る");

    const stored = localStorage.getItem(STORAGE_KEY);
    expect(stored).toContain("リロード後も残る");

    unmount();
    render(<App />);

    expect(screen.getByRole("heading", { name: "リロード後も残る" })).toBeInTheDocument();
  });

  it("filters active and completed todos", async () => {
    render(<App />);
    const user = await addTodo("未完了タスク");
    await addTodo("完了させるタスク");

    const target = screen.getByRole("heading", { name: "完了させるタスク" }).closest("article");
    expect(target).toBeTruthy();
    await user.click(within(target!).getByRole("button", { name: "完了にする" }));
    await user.click(screen.getByRole("button", { name: "未完了" }));

    expect(screen.getByRole("heading", { name: "未完了タスク" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "完了させるタスク" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "完了済み" }));
    expect(screen.getByRole("heading", { name: "完了させるタスク" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "未完了タスク" })).not.toBeInTheDocument();
  });
});
