type UndoToastProps = {
  message: string;
  onUndo: () => void;
};

export function UndoToast({ message, onUndo }: UndoToastProps) {
  return (
    <div className="toast" role="status">
      <span>{message}</span>
      <button type="button" onClick={onUndo}>
        元に戻す
      </button>
    </div>
  );
}
