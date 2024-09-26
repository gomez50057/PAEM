import FullPost from '../../../components/blog/FullPost'; // Ajusta la ruta si es necesario
import { blogPosts } from '../../../utils/blogData'; // Ajusta la ruta si es necesario

const PostPage = ({ params }) => {
  const { name } = params; // Obtén el parámetro dinámico "name" desde los params

  // Transforma el "name" de la URL para coincidir con el formato en blogPosts
  const post = blogPosts.find(
    post => post.name.toLowerCase().replace(/\s+/g, '-') === name
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
