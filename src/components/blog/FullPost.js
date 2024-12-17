"use client";
import FeaturedPosts from "./FeaturedPosts";
import styles from "./FullPost.module.css";
import Navbar from "../shared/Navbar";

const FullPost = ({ post, featuredPosts }) => {
  if (!post) {
    return <p>La publicación no existe.</p>;
  }

  // Función para procesar texto con negritas, cursivas y viñetas
  const renderTextWithStyles = (text) => {
    // Detecta y reemplaza **texto** para negritas y *texto* para cursivas
    const boldItalicRegex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

    const elements = [];
    let lastIndex = 0;

    text.replace(boldItalicRegex, (match, bold, italic, offset) => {
      // Agregar el texto previo
      if (offset > lastIndex) {
        elements.push(text.substring(lastIndex, offset));
      }

      // Negritas
      if (bold) {
        elements.push(<strong key={offset}>{bold}</strong>);
      }
      // Cursivas
      if (italic) {
        elements.push(<em key={offset}>{italic}</em>);
      }

      lastIndex = offset + match.length;
    });

    // Agregar el resto del texto después de la última coincidencia
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  // Función para renderizar texto con saltos de línea, viñetas y estilos
  const renderDescription = (description) => {
    return description.split("\n").map((line, index) => {
      if (line.startsWith("*")) {
        return (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            {renderTextWithStyles(line.substring(2))}
          </li>
        );
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else {
        return (
          <p key={index} style={{ margin: "0.5rem 0" }}>
            {renderTextWithStyles(line)}
          </p>
        );
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.postContainer}>
        {/* Columna de la Nota */}
        <div className={styles.postContent}>
          {post.image && (
            <img
              src={post.image}
              alt={post.name}
              className={styles.postImage}
            />
          )}
          <div className={styles.meta}>
            <p>
              {post.authorEmail
                ? post.authorEmail
                : "Coordinación General de Planeación y Proyectos"}{" "}
              · {post.date}
            </p>
          </div>
          <h1 className={styles.title}>{post.name}</h1>

          <div className={styles.description}>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
              {renderDescription(post.description)}
            </ul>
          </div>

          {post.quote && (
            <blockquote className={styles.quote}>"{post.quote}"</blockquote>
          )}
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
