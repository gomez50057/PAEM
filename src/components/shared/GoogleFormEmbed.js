'use client';

import React, { useEffect, useState } from 'react';
import styles from './GoogleFormEmbed.module.css';

const GoogleFormEmbed = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Muestra el slider al montar el componente
    setIsVisible(true);
  }, []);

  const openForm = () => {
    const width = 800;
    const height = 600;
    const left = window.innerWidth ? (window.innerWidth - width) / 2 : 0;
    const top = window.innerHeight ? (window.innerHeight - height) / 2 : 0;
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSehI664YEXO00Iq_RCcFavmttiDTAaREbNcgk1ClOZzilnrGQ/viewform?usp=header',
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
  };

  return (
    <div className={`${styles.slider} ${isVisible ? styles.slideIn : ''}`}>
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src="/img/GoogleFormEmbed.mp4" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <button onClick={openForm}>Formulario de POZMVM</button>
      </div>
    </div>
  );
};

export default GoogleFormEmbed;
