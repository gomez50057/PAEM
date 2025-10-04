import styles from "@/styles/ActuPozmvm/AntecedentesSection.module.css";

export default function AntecedentesSection() {
  return (
    <section className={styles.section}>
        <h2 className={styles.titule}>Antecedentes</h2>
        <ul className={styles.list}>
          <li>
            El Programa de Ordenación de la Zona Metropolitana del Valle de México vigente, fue
            publicado en 1998.
          </li>
          <li>
            Actualmente, la ZMVM enfre  nta nuevas dinámicas territoriales, sociales, económicas y
            ambientales, por lo que es necesario actualizar este instrumento que responda de manera
            adecuada a estos desafíos.
          </li>
        </ul>
    </section>
  );
}
