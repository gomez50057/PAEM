import React from 'react';
import styles from './BlogNoticias.module.css';
import FeaturedPosts from './FeaturedPosts';
import Link from "next/link";

const BlogNoticias = ({ posts, featuredPosts }) => {
  const MAX_LENGTH = 50; // Máxima longitud antes de mostrar "..."

  return (
    <section className={styles.blogNoticias}>
      {/* Sección de Noticias */}
      <div className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <h2> <span>Noticias</span> de las <span>Zonas</span> <span className="span-doarado">Metropolitanas</span> </h2>
          <select className={styles.orderSelect}>
            <option>Todas</option>
            <option>ZMVM</option>
            <option>ZMPachuca</option>
            <option>ZMTula</option>
            <option>ZMTulancingo</option>
          </select>
        </div>
        <div className={styles.newsGrid}>
          {posts.map((post, index) => (
            <div key={index} className={styles.newsItem}>
              <img src={post.image} alt={post.name} className={styles.newsImage} />
              <div className={styles.newsContent}>
                <p className={styles.newsMeta}>{post.category} · {post.date}</p>
                <h3 className={styles.newsTitle}>{post.name}</h3>
                <p className={styles.newsDescription}>
                  {post.description.length > MAX_LENGTH
                    ? `${post.description.slice(0, MAX_LENGTH)}...`
                    : post.description}
                </p>
              </div>
              <Link href={`/noticias/${post.name.toLowerCase().replace(/\s+/g, "-")}`} className="readMoreBtn">
                Leer más
              </Link>
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
