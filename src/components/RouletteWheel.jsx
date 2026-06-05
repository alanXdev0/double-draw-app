import React, { useRef, useEffect, useState } from "react";

// Helper to strip flag emojis and clean country strings for drawing on wheel slices
const cleanText = (val) => {
  if (!val) return "";
  return val
    .replace(
      /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
      "",
    )
    .trim();
};

export default function RouletteWheel({
  items = [],
  isSpinning = false,
  targetIndex = null,
  onSpinComplete = () => {},
  onActiveItemChange = () => {}, // Prop to notify parent of the current segment index under the pointer
  colorTheme = "cyan",
  playTick = () => {},
}) {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [pointerWiggle, setPointerWiggle] = useState(false);

  const rotationRef = useRef(0);
  const animationRef = useRef(null);
  const lastTickIndexRef = useRef(-1);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle spin trigger
  useEffect(() => {
    if (isSpinning && targetIndex !== null && items.length > 0) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const currentRot = rotationRef.current;
      const N = items.length;
      const sliceAngle = (2 * Math.PI) / N;

      // Target segment center
      const centerAngle = (targetIndex + 0.5) * sliceAngle;

      // Pointer is at the top (1.5 * Math.PI)
      const pointerAngle = 1.5 * Math.PI;

      let diff = (pointerAngle - centerAngle - currentRot) % (2 * Math.PI);
      if (diff < 0) {
        diff += 2 * Math.PI;
      }

      // Add 8 complete rotations for a longer spin
      const targetRot = currentRot + diff + 8 * 2 * Math.PI;

      const startTime = performance.now();
      const duration = 7500 + Math.random() * 1000; // Increased duration: 7.5s - 8.5s

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Quintic ease out for a very realistic physical slowing-down feel
        const ease = 1 - Math.pow(1 - progress, 5);
        const currentRotation = currentRot + (targetRot - currentRot) * ease;

        rotationRef.current = currentRotation;
        setRotation(currentRotation);

        // Tick sound and wiggle pointer logic
        let checkAngle = (pointerAngle - currentRotation) % (2 * Math.PI);
        if (checkAngle < 0) checkAngle += 2 * Math.PI;
        const currentTickIndex = Math.floor(checkAngle / sliceAngle) % N;

        if (currentTickIndex !== lastTickIndexRef.current) {
          lastTickIndexRef.current = currentTickIndex;
          playTick();
          onActiveItemChange(currentTickIndex); // Trigger active item change callback
          setPointerWiggle(true);
          setTimeout(() => setPointerWiggle(false), 60);
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Finished spinning
          onSpinComplete();
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isSpinning, targetIndex, items.length]);

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle pixel ratio for high DPI screens
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 15;

    // Clear
    ctx.clearRect(0, 0, width, height);

    const N = items.length;
    if (N === 0) {
      // Placeholder wheel
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.font = "16px Outfit";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Vacío", centerX, centerY);
      return;
    }

    const sliceAngle = (2 * Math.PI) / N;

    // Draw segment wedges
    for (let i = 0; i < N; i++) {
      const startAngle = i * sliceAngle + rotation;
      const endAngle = (i + 1) * sliceAngle + rotation;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Alternate color palettes (World Cup Light Theme)
      if (colorTheme === "cyan") {
        ctx.fillStyle = i % 2 === 0 ? "#e0f2fe" : "#ffffff"; // Light sky blue & white
      } else {
        ctx.fillStyle = i % 2 === 0 ? "#fef3c7" : "#ffffff"; // Light gold & white
      }
      ctx.fill();

      // Wedges border lines
      ctx.strokeStyle =
        colorTheme === "cyan"
          ? "rgba(0, 86, 179, 0.15)"
          : "rgba(217, 29, 78, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text values
      ctx.save();
      ctx.translate(centerX, centerY);

      const angle = startAngle + sliceAngle / 2;
      ctx.rotate(angle);

      // Make font sizes MASSIVE (Min 14px, Max 30px, optimized for 2-line rendering)
      let fontSize = Math.min(
        18,
        Math.max(14, Math.floor((2 * Math.PI * (radius * 0.38)) / N)),
      );

      ctx.font = `bold ${fontSize}px 'Helvetica', 'Arial', monospace`;
      ctx.fillStyle = "#0f172a"; // Dark Slate for readability on light wedges

      const text = cleanText(items[i]);
      let lines = [];

      if (text.includes(" ")) {
        const words = text.split(" ");
        if (words.length === 2) {
          lines = words;
        } else {
          const mid = Math.ceil(words.length / 2);
          lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
        }
      } else {
        // For very long single names/words, split with a hyphen
        if (text.length > 12) {
          const mid = Math.ceil(text.length / 2);
          lines = [text.substring(0, mid) + "-", text.substring(mid)];
        } else {
          lines = [text];
        }
      }

      // Use a safe maximum text width to prevent names from reaching the center pivot
      const maxTextWidth = radius * 0.72;

      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      if (lines.length === 1) {
        ctx.fillText(lines[0], radius - 15, 0, maxTextWidth);
      } else {
        ctx.fillText(lines[0], radius - 15, -fontSize * 0.55, maxTextWidth);
        ctx.fillText(lines[1], radius - 15, fontSize * 0.55, maxTextWidth);
      }
      ctx.restore();
    }

    // Outer ring glow line
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle =
      colorTheme === "cyan" ? "var(--cyan-primary)" : "var(--magenta-primary)";
    ctx.lineWidth = 4;
    ctx.shadowBlur = 12;
    ctx.shadowColor =
      colorTheme === "cyan" ? "var(--cyan-glow)" : "var(--magenta-glow)";
    ctx.stroke();

    // Clear shadow for next drawings
    ctx.shadowBlur = 0;

    // Draw inner metal cap
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.18, 0, 2 * Math.PI);
    ctx.fillStyle = "#f8fafc"; // Light gray instead of #0f172a
    ctx.fill();
    ctx.strokeStyle =
      colorTheme === "cyan" ? "var(--cyan-primary)" : "var(--magenta-primary)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center jewel pivot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle =
      colorTheme === "cyan" ? "var(--cyan-primary)" : "var(--magenta-primary)";
    ctx.fill();
  }, [items, rotation, colorTheme]);

  return (
    <div className="wheel-container-relative">
      <style>{`
        .wheel-container-relative {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .wheel-canvas {
          width: 100%;
          height: 100%;
        }

        .wheel-pointer-container {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 36px;
          z-index: 20;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .wheel-pointer {
          width: 28px;
          height: 28px;
          fill: #f8fafc;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6));
          transition: transform 0.05s ease;
          transform-origin: 50% 15%;
        }

        .wheel-pointer.cyan {
          fill: var(--cyan-primary);
          filter: drop-shadow(0 0 10px var(--cyan-glow));
        }

        .wheel-pointer.magenta {
          fill: var(--magenta-primary);
          filter: drop-shadow(0 0 10px var(--magenta-glow));
        }

        .wheel-pointer.wiggle {
          transform: rotate(-18deg);
        }
      `}</style>

      {/* Top pointer pin */}
      <div className="wheel-pointer-container">
        <svg
          className={`wheel-pointer ${colorTheme} ${pointerWiggle ? "wiggle" : ""}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2L4 18h16L12 2z" transform="rotate(180 12 12)" />
        </svg>
      </div>

      <canvas ref={canvasRef} className="wheel-canvas" />
    </div>
  );
}
