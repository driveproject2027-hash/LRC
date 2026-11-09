import React from "react";
import { Edit3 } from "lucide-react";
import { useDirectEdit } from "@/context/DirectEditContext";
import { cn } from "@/lib/utils";

export interface EditableTextProps {
  path: string;
  label?: string;
  value?: string | number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "strong" | "em";
  multiline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  fallback?: string;
  onClick?: (e: React.MouseEvent) => void;
  title?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  path,
  label,
  value,
  as = "span",
  multiline = false,
  className = "",
  style,
  children,
  fallback = "",
  onClick,
  title,
}) => {
  const { isDirectEdit, highlightOutlines, openInlineEditor } = useDirectEdit();

  const Tag = as as any;
  const displayValue =
    value !== undefined && value !== null
      ? String(value)
      : typeof children === "string" || typeof children === "number"
      ? String(children)
      : fallback;

  // When direct edit mode is inactive, render normal pure semantic element
  if (!isDirectEdit) {
    return (
      <Tag className={className} style={style} onClick={onClick} title={title}>
        {children !== undefined ? children : displayValue}
      </Tag>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if nested inside a link or button
    e.preventDefault();
    e.stopPropagation();

    const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    openInlineEditor({
      path,
      label: label || path,
      value: displayValue,
      multiline,
      rect: targetRect,
    });

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Tag
      className={cn(
        className,
        "relative group/editable transition-all duration-150",
        highlightOutlines &&
          "outline-dashed outline-1 hover:outline-2 outline-emerald-500/80 hover:outline-emerald-400 hover:bg-emerald-500/10 cursor-pointer rounded-[2px]"
      )}
      style={style}
      onClick={handleClick}
      title={`Click to edit directly: ${label || path}`}
      data-editable-path={path}
    >
      {children !== undefined ? children : displayValue}

      {/* Floating hover badge */}
      {highlightOutlines && (
        <span
          className="absolute -top-3.5 right-1 hidden group-hover/editable:inline-flex items-center gap-1 bg-[#163D21] text-emerald-200 border border-emerald-500/70 text-[10px] font-sans font-semibold px-1.5 py-0.5 rounded shadow-lg z-50 pointer-events-none whitespace-nowrap animate-in fade-in duration-150"
          aria-hidden="true"
        >
          <Edit3 className="w-2.5 h-2.5 text-emerald-300" />
          <span>{label || "Edit"}</span>
        </span>
      )}
    </Tag>
  );
};

export default EditableText;
