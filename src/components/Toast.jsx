export default function Toast({
  message,
  type,
}) {
  return (
    <div
      className={`toast ${
        type === "error"
          ? "toast-error"
          : ""
      }`}
    >
      <span>
        {type === "error"
          ? "!"
          : "✓"}
      </span>

      {message}
    </div>
  );
}