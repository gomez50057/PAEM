"use client";
import FeaturedPosts from "./FeaturedPosts";
import styles from "./FullPost.module.css";
import Navbar from "../shared/Navbar";

const FullPost = ({ post, featuredPosts }) => {
  if (!post) {
    return <p>La publicación no existe.</p>;
  }

  // Función para procesar texto con negritas, cursivas y combinaciones
  const renderTextWithStyles = (text) => {
    const combinedRegex = /(\*\*_(.*?)_\*\*)|(\*\*(.*?)\*\*)|(\*(.*?)\*)/g;

    const elements = [];
    let lastIndex = 0;

    text.replace(combinedRegex, (match, boldItalicContent, bold, italic, offset) => {
      // Agregar el texto previo a la coincidencia
      if (offset > lastIndex) {
        elements.push(text.substring(lastIndex, offset));
      }

      // Negrita y cursiva
      if (boldItalicContent) {
        elements.push(
          <strong key={offset}>
            <em>{boldItalicContent}</em>
          </strong>
        );
      }
      // Negrita
      else if (bold) {
        elements.push(<strong key={offset}>{bold}</strong>);
      }
      // Cursiva
      else if (italic) {
        elements.push(<em key={offset}>{italic}</em>);
      }
      lastIndex = offset + match.length;
    }
    );

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
        // Aplica una clase específica para viñetas alineadas a la derecha
        return (
          <li key={index} className={styles.rightAlignedList}>
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
            <ul style={{ listStyleType: "disc", padding: "0" }}>
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
