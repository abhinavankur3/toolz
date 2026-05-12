export function ToolHeader({ title, desc, actions }) {
  return (
    <div className="page-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
      <div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      {actions && <div className="row gap-2">{actions}</div>}
    </div>
  );
}
