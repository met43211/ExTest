import { formatDate } from "@/src/shared/lib/utils/format-date";
import React, { useRef, useEffect } from "react";

type Props = {
  time: number[];
  values: number[];
};

export const CanvasChart = ({ time, values }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && time[time.length - 1] - time[0] >= 1800000) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const paddingRight = 250;
        const paddingBottom = 100;

        const yMax = Math.max(...values);
        const yMin = Math.min(...values);
        const yRange = yMax - yMin;
        const yScale = (height - paddingBottom - 150) / yRange;

        const xScale = (width - paddingRight) / (time.length - 1);

        ctx.textAlign = "start";
        ctx.lineWidth = 5;
        ctx.font = `bold 60px Arial`;
        ctx.fillStyle = "rgba(97, 109, 141, 1)";
        ctx.strokeStyle = "rgba(34, 43, 68, 1)";

        for (let i = 0; i < time.length; i += Math.ceil(time.length / 5)) {
          const x = (i * (width - xScale)) / (time.length - 1);
          ctx.fillText(
            formatDate(time[i]).slice(11, 17),
            x,
            height - paddingBottom + 100
          );
        }

        for (let i = 0; i <= yMax; i += yMax / 5) {
          const y = height - paddingBottom - i * yScale;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width - paddingRight, y);
          ctx.stroke();
          ctx.fillText(
            Math.round(i).toLocaleString(),
            width - paddingRight + 50,
            y + 5
          );
        }

        const gradient = ctx.createLinearGradient(
          0,
          0,
          0,
          height - paddingBottom
        );
        gradient.addColorStop(0, "rgba(28, 100, 242, 0.6)");
        gradient.addColorStop(1, "rgba(28, 100, 242, 0.1)");

        ctx.beginPath();
        ctx.moveTo(0, height - paddingBottom);
        ctx.lineTo(0, height - paddingBottom - (values[0] - yMin) * yScale);

        for (let i = 1; i < time.length; i++) {
          const x = i * xScale;
          const y = height - paddingBottom - (values[i] - yMin) * yScale;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width - paddingRight, height - paddingBottom);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = "rgba(28, 100, 242, 1)";
        ctx.lineWidth = 15;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(0, height - paddingBottom - (values[0] - yMin) * yScale);

        for (let i = 1; i < time.length; i++) {
          const x = i * xScale;
          const y = height - paddingBottom - (values[i] - yMin) * yScale;
          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }
    }
  }, [time, values]);

  return <canvas ref={canvasRef} height={1200} width={2000} />;
};
