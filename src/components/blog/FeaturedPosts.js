import React from 'react';
import styles from './FeaturedPosts.module.css'; 

const FeaturedPosts = ({ featuredPosts }) => {
  return (
    <aside className={styles.featuredSection}>
      <h3 className={styles.featuredTitle}>Publicación destacada</h3>
      <ul className={styles.featuredList}>
        {featuredPosts.map((post, index) => (
          <li key={index} className={styles.featuredItem}>
            <img
              src={post.image}
              alt={post.name}
              className={styles.featuredImage}
            />
            <div className={styles.featuredContent}>
              <p className={styles.featuredDate}>{post.date}</p>
              <a href="#" className={styles.featuredLink}>{post.name}</a>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FeaturedPosts;