import React from 'react';
import styles from './BlogNoticias.module.css';

const BlogNoticias = ({ posts, featuredPosts }) => {
  return (
    <section className={styles.blogNoticias}>
      {/* Sección de Noticias */}
      <div className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <h2>Estilo de vida</h2>
          <select className={styles.orderSelect}>
            <option>Entradas recientes</option>
            <option>Más populares</option>
          </select>
        </div>
        <div className={styles.newsGrid}>
          {posts.map((post, index) => (
            <div key={index} className={styles.newsItem}>
              <img src={post.image} alt={post.name} className={styles.newsImage} />
              <div className={styles.newsContent}>
                <p className={styles.newsMeta}>Tema de Egens · {post.date}</p>
                <h3 className={styles.newsTitle}>{post.name}</h3>
                <p className={styles.newsDescription}>{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra Lateral - Publicaciones Destacadas */}
      <aside className={styles.featuredSection}>
        <h3 className={styles.featuredTitle}>Publicación destacada</h3>
        <ul className={styles.featuredList}>
          {featuredPosts.map((post, index) => (
            <li key={index} className={styles.featuredItem}>
              <p className={styles.featuredDate}>{post.date}</p>
              <a href="#" className={styles.featuredLink}>{post.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default BlogNoticias;
