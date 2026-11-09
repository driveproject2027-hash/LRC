import { useCountUp } from "@/hooks/use-count-up";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * A span that animates a number counting up from 0 when it scrolls into view.
 * Drop-in replacement for static number displays.
 */
export const AnimatedCounter = ({
  value,
  className,
  duration = 2000,
}: AnimatedCounterProps) => {
  const { ref, display } = useCountUp<HTMLSpanElement>(value, duration);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
};
