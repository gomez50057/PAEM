"use client";
import FeaturedPosts from "./FeaturedPosts";
import styles from "./FullPost.module.css";
import Navbar from '../shared/Navbar';


const FullPost = ({ post, featuredPosts }) => {
  if (!post) {
    return <p>La publicación no existe.</p>; // Manejamos el caso en que no haya una publicación.
  }

  return (
    <>
      <Navbar />
      <div className={styles.postContainer}>
      {/* Columna de la Nota */}
      <div className={styles.postContent}>
        {/* Verificamos si la imagen existe antes de renderizarla */}
        {post.image && (
          <img
            src={post.image}
            alt={post.name}
            className={styles.postImage}
          />
        )}
        <div className={styles.meta}>
          <p>{post.authorEmail ? post.authorEmail : "Coordinación General de Planeación y Proyectos"} · {post.date}</p>
        </div>
        <h1 className={styles.title}>{post.name}</h1>
        <p className={styles.description}>{post.description}</p>
        {post.quote && <blockquote className={styles.quote}>"{post.quote}"</blockquote>}
      </div>

      {/* Columna de Publicaciones Destacadas */}
      <div className={styles.sidebar}>
        <FeaturedPosts featuredPosts={featuredPosts} />
      </div>
    </div>
    </>

  );
};

export default FullPost;
