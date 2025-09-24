"use client";

import styles from "@/styles/PMIU_ZMP/MunicipioCard.module.css";

export default function MunicipioCard({ id, name, img, anchor }) {
  return (
    <section id={id} className={styles.card}>
      <a href={anchor} className={styles.link}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(/img/PMIU_ZMP/municipios/${img})` }}
        >


        </div>
      </a>
    </section>
  );
}
