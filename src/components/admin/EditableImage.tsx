import React from "react";
import { Camera, Image as ImageIcon } from "lucide-react";
import { useDirectEdit } from "@/context/DirectEditContext";
import { cn } from "@/lib/utils";

export interface EditableImageProps {
  path: string;
  label?: string;
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  path,
  label,
  src,
  alt = "",
  className = "",
  loading = "lazy",
  width,
  height,
  style,
  onClick,
}) => {
  const { isDirectEdit, highlightOutlines, openInlineEditor } = useDirectEdit();

  if (!isDirectEdit) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={style}
        onClick={onClick}
      />
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    openInlineEditor({
      path,
      label: label || "Photo / Image",
      value: src,
      type: "image",
      rect: targetRect,
    });

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={cn(
        "relative group/editable overflow-hidden cursor-pointer",
        highlightOutlines && "hover:ring-2 hover:ring-emerald-500/80 transition-all rounded-sm",
        className
      )}
      onClick={handleClick}
      title={`Click to change image: ${label || path}`}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200 group-hover/editable:scale-[1.02]"
        loading={loading}
        width={width}
        height={height}
      />

      {/* Hover action overlay */}
      {highlightOutlines && (
        <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover/editable:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 z-30 pointer-events-none">
          <div className="bg-[#163D21] text-white border border-emerald-500/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-xl">
            <Camera className="w-3.5 h-3.5 text-emerald-300" />
            <span>Change {label || "Photo"}</span>
          </div>
          <span className="text-[10px] text-emerald-200 mt-1">Click to select or paste URL</span>
        </div>
      )}
    </div>
  );
};

export default EditableImage;
