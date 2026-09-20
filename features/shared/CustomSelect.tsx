import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export function CustomSelect({ options, style, ...props }: Props) {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        padding: "11px 12px",
        borderRadius: 9,
        border: "1px solid var(--border)",
        background: "var(--panel-2)",
        color: "var(--text)",
        ...style,
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
