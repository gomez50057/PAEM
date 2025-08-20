import React, { useState } from 'react';
import styles from './BlogNoticias.module.css';
import FeaturedPosts from './FeaturedPosts';
import Link from "next/link";
import { normalizeName, renderDescription } from "../../utils/blogData";

const BlogNoticias = ({ posts, featuredPosts }) => {
  const MAX_LENGTH = 50;

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [fadeEffect, setFadeEffect] = useState(false);

  const handleCategoryChange = (event) => {
    setFadeEffect(true);
    setTimeout(() => {
      setSelectedCategory(event.target.value);
      setFadeEffect(false);
    }, 300);
  };

  const filteredPosts = selectedCategory === 'Todas'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section className={styles.blogNoticias}>
      <div className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <h2><span>Noticias</span> de las <span>Zonas</span> <span className="span-doarado">Metropolitanas</span></h2>

          <select
            className={styles.orderSelect}
            onChange={handleCategoryChange}
            value={selectedCategory}
            aria-label="Filtrar por categoría"
          >
            <option value="Todas">Todas</option>
            <option value="ZMVM">ZMVM</option>
            <option value="ZMP">ZMPachuca</option>
            <option value="ZMTula">ZMTula</option>
            <option value="ZMTulancingo">ZMTulancingo</option>
          </select>
        </div>

        <div className={`${styles.newsGrid} ${fadeEffect ? styles.fadeOut : styles.fadeIn}`}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={index} className={styles.newsItem}>
                <img src={post.image} alt={post.name} className={styles.newsImage} />
                <div className={styles.newsContent}>
                  <p className={styles.newsMeta}>{post.category} · {post.date}</p>
                  <h3 className={styles.newsTitle}>{post.name}</h3>
                  <div className={styles.newsDescription}>
                    {post.description.length > MAX_LENGTH
                      ? renderDescription(`${post.description.slice(0, MAX_LENGTH)}...`)
                      : renderDescription(post.description)}
                  </div>
                </div>
                <Link href={`/noticias/${normalizeName(post.name)}`} className="readMoreBtn">Leer más</Link>
              </div>
            ))
          ) : (
            <p>No se encontraron publicaciones para esta categoría.</p>
          )}
        </div>
      </div>

      <FeaturedPosts featuredPosts={featuredPosts} />
    </section>
  );
};

export default BlogNoticias;
