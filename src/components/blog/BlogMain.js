"use client";
import BlogHeader from "./BlogHeader"; // El componente respetado
import BlogNoticias from "./BlogNoticias"; // Nuevo componente que combina noticias y publicaciones destacadas
import UltimasNoticias from "./UltimasNoticias"; // Sección de últimas noticias (opcional para mantener)
import { blogPosts, featuredPosts } from "../../utils/blogData"; // Datos simulados

const BlogMain = () => {
  return (
    <div>
      {/* Respetamos el BlogHeader como parte destacada */}
      <BlogHeader />

      {/* Sección de Últimas Noticias */}
      <UltimasNoticias posts={blogPosts.slice(0, 4)} />

      {/* Nueva sección de Noticias con Publicación destacada */}
      <BlogNoticias posts={blogPosts} featuredPosts={featuredPosts} />

    </div>
  );
};

export default BlogMain;
