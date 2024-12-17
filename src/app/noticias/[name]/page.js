import FullPost from '../../../components/blog/FullPost';
import { blogPosts } from '../../../utils/blogData';

// Función para normalizar nombres (elimina acentos y caracteres especiales)
const normalizeName = (str) => {
  return str
    .normalize("NFD") // Descompone los caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
    .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales
    .replace(/\s+/g, "-") // Reemplaza espacios con guiones
    .toLowerCase(); // Convierte a minúsculas
};

const PostPage = ({ params }) => {
  const { name } = params; // Obtén el parámetro dinámico "name" desde los params

  // Normaliza el "name" de la URL y compara con el nombre en blogPosts
  const post = blogPosts.find(
    post => normalizeName(post.name) === name
  );

  // Si no se encuentra el post, podrías manejar el 404 aquí
  if (!post) {
    return <p>Post no encontrado</p>;
  }

  return (
    <div>
      <FullPost post={post} featuredPosts={blogPosts} />
    </div>
  );
};

export default PostPage;
