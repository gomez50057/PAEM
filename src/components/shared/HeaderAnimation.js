"use client";

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const HeaderAnimation = () => {
  const container = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/data.json',  // Asegúrate de colocar el JSON en public/animations
    });

    return () => {
      animation.destroy();  // Limpia recursos al desmontar
    };
  }, []);

  return (
    <div
      ref={container}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default HeaderAnimation;
