"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function HeaderAnimation() {
  const containerRef = useRef(null);
  let second3Frame = 0; // Se calculará tras cargar el DOM de la animación

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false, // No repetir la primera vez
      autoplay: false,
      path: "/animations/data.json",
    });

    const handleDomLoaded = () => {
      const totalSeconds = animation.getDuration(true);
      const fps = animation.totalFrames / totalSeconds;
      second3Frame = Math.round(73 * fps);
      animation.play(); // Reproducir manualmente una sola vez
    };

    const handleComplete = () => {
      animation.removeEventListener("complete", handleComplete);
      animation.loop = true;
      animation.playSegments([second3Frame, animation.totalFrames], true);
    };

    animation.addEventListener("DOMLoaded", handleDomLoaded);
    animation.addEventListener("complete", handleComplete);

    return () => {
      animation.removeEventListener("DOMLoaded", handleDomLoaded);
      animation.removeEventListener("complete", handleComplete);
      animation.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
