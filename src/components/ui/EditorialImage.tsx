import React from "react";

export interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  disclosure?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2" | "1/1" | "21/9";
  variant?: "hero" | "featured" | "thumb" | "body";
  className?: string;
  mediaClassName?: string;
  captionClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  borderedCaption?: boolean;
  maxHeight?: string;
}

const ASPECT_RATIO_CLASSES: Record<NonNullable<EditorialImageProps["aspectRatio"]>, string> = {
  "16/9": "editorial-aspect-16-9",
  "4/3": "editorial-aspect-4-3",
  "3/2": "editorial-aspect-3-2",
  "1/1": "editorial-aspect-1-1",
  "21/9": "editorial-aspect-21-9",
};

/**
 * EditorialImage
 * ---------------------------------------------------------------------------
 * Standardised component for presenting documentary photographs and editorial
 * illustrations with proper aspect ratio, subtle border, sharp corners, and
 * accessible caption alignment.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  caption,
  disclosure,
  aspectRatio = "16/9",
  variant = "featured",
  className = "",
  mediaClassName = "",
  captionClassName = "",
  objectPosition = "center 40%",
  priority = false,
  borderedCaption = false,
  maxHeight,
}) => {
  const isHero = variant === "hero";
  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio];

  const mediaClass = isHero
    ? `editorial-hero-media ${aspectClass} ${mediaClassName}`
    : `editorial-featured-media ${aspectClass} ${mediaClassName}`;

  return (
    <figure className={`editorial-figure ${className}`}>
      <div
        className={mediaClass}
        style={{
          maxHeight: maxHeight || (isHero ? "32rem" : undefined),
        }}
      >
        <img
          src={src}
          alt={alt}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition }}
          className="w-full h-full object-cover block"
        />
      </div>

      {(caption || disclosure) && (
        <figcaption
          className={`editorial-caption ${borderedCaption ? "editorial-caption--bordered" : ""} ${captionClassName}`}
        >
          {caption && <span className="editorial-caption__text">{caption}</span>}
          {disclosure && (
            <span className="editorial-caption__badge">{disclosure}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default EditorialImage;
