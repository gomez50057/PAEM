import './About.css';

const About = () => {
  return (
    <section id='about' className="about-container">
      <div className="about_giro">
        <div class="gallery">
          <img src="https://picsum.photos/id/104/400/400" alt="a dream catcher" />
          <img src="https://picsum.photos/id/1082/400/400" alt="a dream catcher" />
          <img src="https://picsum.photos/id/158/400/400" alt="a dream catcher" />
          <img src="https://picsum.photos/id/234/400/400" alt="a dream catcher" />
        </div>
      </div>

      <div className="about_txt">
        <h3>¿Qué es la Comisión de la Zona Metropolitana de Tula?</h3>

        <p>Son órganos auxiliares de la Comisión de Ordenamiento Metropolitano de la Zona Metropolitana de Pachuca, cuya labor consiste en formular acuerdos acerca de los planes, programas, proyectos y demás iniciativas, que deberán ser evaluados conjuntamente entre los tres órdenes de gobierno, con la finalidad de desahogar, proponer, recomendar, analizar, investigar, opinar, evaluar e informar los Asuntos Metropolitanos de las Zonas Metropolitanas de Pachuca, Tula y Tulancingo, con el propósito de integrar la Agenda Metropolitana</p>

        <h3>Objetivo</h3>
        <p>Integrar un grupo colegiado entre los tres órdenes de gobierno, que analice las problemáticas conjuntas y los impactos metropolitanos, para concretar una Agenda Metropolitana que permita atender los desafíos de cada zona metropolitana.</p>
      </div>


    </section>
  );
};

export default About;
