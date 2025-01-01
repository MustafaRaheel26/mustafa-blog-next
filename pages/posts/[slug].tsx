import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommentSection from '../../components/CommentSection';
import Image from 'next/image'; // Import Image component

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

const SingleBlog = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);

    const storedBlogs: Blog[] = JSON.parse(localStorage.getItem('blogs') || '[]');
    const blogData = storedBlogs.find((b) => b.id === slug);
    setBlog(blogData || null);
  }, [slug]);

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    const storedBlogs: Blog[] = JSON.parse(localStorage.getItem('blogs') || '[]');
    const updatedBlogs = storedBlogs.filter((b) => b.id !== blog?.id);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    alert('Blog deleted successfully!');
    router.push('/');
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <div className="flex items-center mb-4">
          <Image
            src={blog.authorAvatar} // Use Image component here
            alt={blog.author}
            className="w-12 h-12 rounded-full mr-4"
            width={48}  // Specify width
            height={48} // Specify height
          />
          <div>
            <h2 className="text-lg font-bold">{blog.author}</h2>
            <p className="text-gray-500 text-sm">{blog.timestamp}</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 mb-6">{blog.content}</p>
        {currentUser?.name === blog.author && (
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        )}
        <CommentSection blogId={blog.id} />
      </div>
    </div>
  );
};

export default SingleBlog;
