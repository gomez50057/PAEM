import React from 'react';
import styles from './FeaturedPosts.module.css';
import Link from "next/link";
import { normalizeName } from "@/utils/blogData";

const FeaturedPosts = ({ featuredPosts }) => {
  return (
    <aside className={styles.featuredSection} aria-labelledby="featured-title">
      <h3 id="featured-title" className={styles.featuredTitle}>Publicación destacada</h3>
      <ul className={styles.featuredList}>
        {featuredPosts.map((post, index) => (
          <li key={index} className={styles.featuredItem}>
            <img
              src={post.image}
              alt={post.name}
              className={styles.featuredImage}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.featuredContent}>
              <p className={styles.featuredDate}>{post.date}</p>
              <Link
                href={`/noticias/${normalizeName(post.name)}`}
                className={styles.featuredLink}
              >
                {post.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default FeaturedPosts;
