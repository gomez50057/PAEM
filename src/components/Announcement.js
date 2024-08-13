import './Announcement.css';

const Announcement = () => {
  return (
    <section className="announcement-section">
      <h2>Anuncio Importante</h2>
      <p>
        Inscríbete hoy y obtén acceso exclusivo a nuestros recursos y eventos.
      </p>
      <a href="/register" className="cta-button">Regístrate Ahora</a>
    </section>
  );
};

export default Announcement;
