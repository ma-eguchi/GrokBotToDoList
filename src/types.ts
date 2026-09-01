export type TodoFilter = "all" | "active" | "completed";

export type Todo = {
  id: string;
  title: string;
  notes: string;
  dueDate: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type TodoDraft = {
  title: string;
  notes?: string;
  dueDate?: string;
};
