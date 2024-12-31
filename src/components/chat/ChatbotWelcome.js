import React from 'react';
import styles from './ChatbotWelcome.module.css';

const ChatbotWelcome = ({ onStartChat }) => {
  return (
    <div className={styles.chatbotWelcome}>
      <div className={styles.header}>
        <button className={styles.backButton}>
          <span className={styles.arrowLeft}>&larr;</span>
        </button>
      </div>
      <div className={styles.content}>
        <img src="img/headertxt.png" alt="Metrópoli Hidalgo" className={styles.logotxt} />
        <img src="img/sidebarRecurso.png" alt="Chatbot Logo" className={styles.logo} />
        <h1 className={styles.title}>¡Hola!, Bienvenid@ al</h1>
        <h2 className={styles.subtitle}>Chatbot de <span>Metrópoli Hidalgo</span></h2>
        <p className={styles.description}>Un asistente Metropolitano</p>
      </div>
      <button className={styles.startButton} onClick={onStartChat}>
        Iniciar Chat
        <span className={styles.arrowRight}>&rarr;</span>
      </button>
    </div>
  );
};

export default ChatbotWelcome;
