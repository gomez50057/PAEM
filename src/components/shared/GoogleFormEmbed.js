import styles from './GoogleFormEmbed.module.css';

const GoogleFormEmbed = () => {
  return (
    <div className={styles.iframeContainer}>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSehI664YEXO00Iq_RCcFavmttiDTAaREbNcgk1ClOZzilnrGQ/viewform?embedded=true"
        width="640"
        height="839"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Google Form"
      >
        Cargando…
      </iframe>
    </div>
  );
};

export default GoogleFormEmbed;
