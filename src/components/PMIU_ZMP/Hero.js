import styles from "@/styles/PMIU_ZMP/Hero.module.css";
import MunicipiosSwapy from "@/components/PMIU_ZMP/MunicipiosSwapy";

export default function Hero() {
  const imgBasePath = "/img/PMIU_ZMP/";

  return (
    <section className={styles.hero} aria-label="bloque hero">
      {/* Columna izquierda */}
      <div className={styles.colLeft}>
        <figure className={styles.leftTopCard}>
          <img
            src={`${imgBasePath}logo.png`}
            alt="Imagen destacada izquierda"
            className={styles.cover}
            loading="eager"
            fetchPriority="high"   // <-- camelCase correcto
          />
          <figcaption className={styles.srOnly}>
            Imagen destacada izquierda
          </figcaption>
        </figure>

        <div className={styles.leftBottomCard}>
          <h3>¿Qué es la <span className="span-doarado">Imagen Urbana?</span></h3>
          <p>
            "La imagen urbana se define como la percepción colectiva que los individuos
            construyen del entorno urbano a partir de la experiencia visual, espacial y
            simbólica del mismo."{" "}
            <span className={styles.cardLabel}>
              Kevin Lynch (1960), The Image of the City.
            </span>
          </p>
        </div>
      </div>

      {/* Columna centro */}
      <div className={styles.colCenter}>
        <div className={styles.centerWrap}>
          <img
            src={`${imgBasePath}central.png`}
            alt="Collage central"
            className={styles.centerImg}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>


      {/* Columna derecha */}
      <div className={styles.colRight}>
        <div className={styles.rightTopCard}>
          <h3>¿Por qué un <span className="span-doarado">Plan Maestro</span>  de <span className="span-doarado">Imagen Urbana?</span></h3>
          <p>
            Surge como respuesta a los desafíos derivados del crecimiento urbano acelerado,
            la pérdida de identidad visual y la necesidad de conservar el patrimonio
            arquitectónico, natural y cultural.
          </p>
          <p>
            Su objetivo es armonizar el entorno natural y construido mediante una
            intervención integral, con la participación ciudadana y el cumplimiento
            normativo.
          </p>
        </div>

        <div className={styles.rightBottomCard}>
          <MunicipiosSwapy />
        </div>
      </div>
    </section>
  );
}
