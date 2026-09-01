export function formatDueDate(dueDate: string): string {
  if (!dueDate) {
    return "";
  }

  const [year, month, day] = dueDate.split("-").map(Number);
  if (!year || !month || !day) {
    return dueDate;
  }

  return `${year}年${month}月${day}日`;
}

export function isOverdue(dueDate: string, completed: boolean, now = new Date()): boolean {
  if (!dueDate || completed) {
    return false;
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(`${dueDate}T00:00:00`);
  return due < today;
}
