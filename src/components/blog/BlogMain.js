"use client";
import BlogHeader from "./BlogHeader"; // El componente respetado
import UltimasNoticias from "./UltimasNoticias"; // Sección de últimas noticias
import { blogPosts, categories } from "../../utils/blogData"; // Datos simulados

const BlogMain = () => {
  return (
    <div>
      {/* Respetamos el BlogHeader como parte destacada */}
      <BlogHeader />

      {/* Sección de Últimas Noticias */}
      <UltimasNoticias posts={blogPosts.slice(0, 4)} />

    </div>
  );
};

export default BlogMain;
