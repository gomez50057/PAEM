import styles from "@/styles/ActuPozmvm/SplitSection.module.css";

export default function SplitSection() {
  return (
    <section className={styles.section}>
      <div className={styles.split}>
        <div className={styles.text}>
          <h2 className={styles.titule}>¿Qué es?</h2>

          <p className={styles.lead}>
            La actualización del Programa de Ordenación de la Zona Metropolitana del Valle de México (POZMVM) es un proceso de revisión, rediseño y fortalecimiento del instrumento de planeación territorial, que busca pautas para ordenar el crecimiento urbano y el desarrollo de la metrópoli. Su objetivo establecer estrategias generales para el desarrollo territorial del Valle de México, se concibe como el instrumento intermedio entre lo dispuesto por el Programa Nacional de Desarrollo Urbano y los Programas de Desarrollo Urbano de las diferentes entidades que integran la ZMVM (EDOMEX, CDMX, Hidalgo), a fin de impulsar una verdadera gobernanza, enfrentando los principales retos urbanos de forma inclusiva, efectiva y colaborativa.
          </p>
          <p className={styles.lead}>
            Este proceso de actualización busca articular un ordenamiento metropolitano moderno, inclusivo y sostenible, en cumplimiento con la Ley General de Asentamientos Humanos, Ordenamiento Territorial y Desarrollo Urbano (LGAHOTDU).
          </p>
          <p className={styles.lead}>
            Su área de estudio, obedece a la reciente delimitación de la ZMVM, conformada por 84 municipios (59 en el Estado de México, 16 en la Ciudad de México, 8 en el Estado de Hidalgo y 1 en el Estado de Morelos).
          </p>
        </div>

        <aside className={styles.media}>
          <img
            src="/img/placeholders/map.jpg"
            alt="Mapa / infografía de la ZMVM"
          />
          <p className={styles.caption}>
            [Espacio para mapa/infografía de la ZMVM]
          </p>
        </aside>
      </div>
    </section>
  );
}
