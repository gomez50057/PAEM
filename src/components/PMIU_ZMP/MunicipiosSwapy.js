"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/PMIU_ZMP/MunicipiosSwapy.module.css";

export default function MunicipiosSwapy({ items = [] }) {
  const fieldRef = useRef(null);
  const imgBasePath = "/img/PMIU_ZMP/municipios/";

  // Presets base (porcentaje del contenedor)
  const desktopPreset = [
    { top: 14, left: 22 },
    { top: 10, left: 60 },
    { top: 36, left: 12 },
    { top: 42, left: 52 },
    { top: 70, left: 28 },
    { top: 68, left: 70 },
    { top: 24, left: 82 },
  ];
  const tabletPreset = [
    { top: 12, left: 18 },
    { top: 18, left: 60 },
    { top: 40, left: 12 },
    { top: 46, left: 48 },
    { top: 70, left: 30 },
    { top: 68, left: 74 },
    { top: 26, left: 84 },
  ];
  const mobilePreset = [
    { top: 12, left: 22 },
    { top: 24, left: 70 },
    { top: 40, left: 10 },
    { top: 54, left: 54 },
    { top: 72, left: 28 },
    { top: 76, left: 80 },
    { top: 28, left: 86 },
  ];

  const pickPreset = () => {
    if (typeof window === "undefined") return desktopPreset;
    if (window.innerWidth <= 560) return mobilePreset;
    if (window.innerWidth <= 900) return tabletPreset;
    return desktopPreset;
  };

  const jitterize = (base) => {
    const jitter = () => (Math.random() - 0.5) * 6; // +/-3%
    return base.map(p => ({
      top: Math.max(6, Math.min(92, p.top + jitter())),
      left: Math.max(6, Math.min(92, p.left + jitter())),
    }));
  };

  const [positions, setPositions] = useState(desktopPreset);

  // --- Resolución de colisiones ---
  function resolveCollisions(posPercent, fieldEl, count) {
    if (!fieldEl) return posPercent.slice(0, count);

    const rect = fieldEl.getBoundingClientRect();
    const style = getComputedStyle(fieldEl);
    const sizePx = parseFloat(style.getPropertyValue("--size")) || 84;
    const gapPx = 10;

    let pts = posPercent.slice(0, count).map(p => ({
      x: (p.left / 100) * rect.width,
      y: (p.top / 100) * rect.height,
    }));

    const minDist = sizePx + gapPx;
    const minDist2 = minDist * minDist;
    const maxIter = 120;

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    const pad = sizePx / 2 + 2;

    for (let iter = 0; iter < maxIter; iter++) {
      let moved = false;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[j].x - pts[i].x;
          const dy = pts[j].y - pts[i].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < minDist2) {
            const d = Math.sqrt(d2) || 0.001;
            const nx = dx / d, ny = dy / d;
            const overlap = (minDist - d) / 2;
            pts[i].x = clamp(pts[i].x - nx * overlap, pad, rect.width - pad);
            pts[i].y = clamp(pts[i].y - ny * overlap, pad, rect.height - pad);
            pts[j].x = clamp(pts[j].x + nx * overlap, pad, rect.width - pad);
            pts[j].y = clamp(pts[j].y + ny * overlap, pad, rect.height - pad);
            moved = true;
          }
        }
      }
      if (!moved) break;
    }

    return pts.map(p => ({
      left: (p.x / rect.width) * 100,
      top: (p.y / rect.height) * 100,
    }));
  }

  const recompute = () => {
    const base = pickPreset();
    const jitter = jitterize(base);
    const resolved = resolveCollisions(jitter, fieldRef.current, items.length);
    setPositions(resolved);
  };

  useEffect(() => {
    recompute();
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleClick = (anchor) => {
    if (typeof window !== "undefined") {
      window.location.hash = anchor.startsWith("#") ? anchor.slice(1) : anchor;
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.field} ref={fieldRef}>
        {items.map((m, idx) => {
          const pos = positions[idx] ?? { top: 50, left: 50 };
          return (
            <div
              key={m.id}
              className={styles.slot}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
            >
              <button
                type="button"
                className={styles.item}
                data-title={m.name}
                onClick={() => handleClick(m.anchor)}
              >
                <img
                  src={`${imgBasePath}${m.img}`}
                  alt={m.name}
                  className={styles.avatar}
                  loading="lazy"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
