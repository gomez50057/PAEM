import './About.css';

const About = () => {
  return (
    <section id='about' className="about-container">
      <div className="about_giro">
        <div className="gallery">
          <img src="https://picsum.photos/id/104/400/400" alt="a dream catcher" />
          <img src="https://picsum.photos/id/1082/400/400" alt="a dream catcher" />
          <img src="https://picsum.photos/id/158/400/400" alt="a dream catcher" />
          <img src="https://picsum.photos/id/234/400/400" alt="a dream catcher" />
        </div>
      </div>
      <div className="about_txt">
        <h3>¿Qué Son Las Comisiones Metropolitanas del Valle de México?</h3>
        <p>Las Comisiones son órganos auxiliares del Consejo, cuya labor consiste en informar, desahogar, proponer, recomendar, analizar, investigar, opinar y evaluar los Asuntos Metropolitanos que corresponden a la problemática sectorial que atiende cada Comisión en particular.</p>
        <h3>Objetivo</h3>
        <p>Proporcionar un punto de acceso de información que permita consultar y administrar los acuerdos generados dentro de las comisiones metropolitanas del valle de México.</p>
      </div>
    </section>
  );
};

export default About;
