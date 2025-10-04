import styles from "./CardsGrid.module.css";

export default function CardsGrid({ title, items = [] }) {
  return (
    <section className={styles.section}>
        {title && <h2 className={styles.titule}>{title}</h2>}
        <div className={styles.cards} aria-label={title || "Lista"}>
          {items.map((it, idx) => (
            <article key={idx} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">{it.icon || "•"}</div>
              <div className={styles.text}>{it.text}</div>
            </article>
          ))}
      </div>
    </section>
  );
}