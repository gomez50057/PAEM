import styles from "./UltimasNoticias.module.css";

const UltimasNoticias = ({ posts }) => {
  return (
    <section className={styles.ultimasNoticias}>
      <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
      <div className={styles.newsGrid}>
        {posts.map((post, index) => (
          <div key={index} className={styles.newsItem}>
            <img src={post.image} alt={post.name} className={styles.newsImage} />
            <h3 className={styles.newsTitle}>{post.name}</h3>
            <p className={styles.newsDate}>{post.date}</p>
            <p className={styles.newsDescription}>{post.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UltimasNoticias;
