import React from 'react';
import styles from './BlogNoticias.module.css';
import FeaturedPosts from './FeaturedPosts'; // Importamos el nuevo componente

const BlogNoticias = ({ posts, featuredPosts }) => {
  return (
    <section className={styles.blogNoticias}>
      {/* Sección de Noticias */}
      <div className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <h2> <span>Noticias</span> de las <span>Zonas</span> <span className="span-doarado">Metropolitanas</span> </h2>
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
      <FeaturedPosts featuredPosts={featuredPosts} />
    </section>
  );
};

export default BlogNoticias;
