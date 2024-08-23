import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./range-slidebar.module.scss";
import { Text } from "@/src/shared/ui/primitives/text/text";
import { formatDate } from "@/src/shared/lib/utils/format-date";

type Props = {
  minValue: number;
  setMinValue: (value: number) => void;
  maxValue: number;
  setMaxValue: (value: number) => void;
  min: number;
  max: number;
};

export const RangeSlidebar = ({
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  min,
  max,
}: Props) => {
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, type: "min" | "max") => {
      e.preventDefault();
      setDragging(type);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDragging(null);
  }, []);

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (dragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const clientX =
          e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const offsetX = clientX - rect.left;
        const newValue = Math.min(
          Math.max((offsetX / rect.width) * (max - min) + min, min),
          max
        );

        if (dragging === "min") {
          setMinValue(Math.min(newValue, maxValue - 1));
        } else if (dragging === "max") {
          setMaxValue(Math.max(newValue, minValue + 1));
        }
      }
    },
    [dragging, maxValue, minValue, min, max, setMaxValue, setMinValue]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
    const handleTouchEnd = () => handleDragEnd();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={styles["range-picker"]}>
      <div className={styles["slider"]} ref={sliderRef}>
        <div
          className={styles["slider-track"]}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <div
          className={styles["slider-thumb"]}
          style={{ left: `${minPercent}%` }}
          onMouseDown={(e) => handleDragStart(e, "min")}
          onTouchStart={(e) => handleDragStart(e, "min")}
        >
          <Text size={12} weight={400} className={styles["start-text"]}>
            {formatDate(minValue).slice(11, 17)}
          </Text>
        </div>

        <div
          className={styles["slider-thumb"]}
          style={{ left: `${maxPercent}%` }}
          onMouseDown={(e) => handleDragStart(e, "max")}
          onTouchStart={(e) => handleDragStart(e, "max")}
        >
          <Text size={12} weight={400} className={styles["end-text"]}>
            {formatDate(maxValue).slice(11, 17)}
          </Text>
        </div>
      </div>
    </div>
  );
};
