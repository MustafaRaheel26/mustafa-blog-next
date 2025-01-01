import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommentSection from '../../components/CommentSection';
import Image from 'next/image'; // Import Image component

// Define interfaces for Blog and User
interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  avatar: string;
  author: string;
  createdAt: string;
}

interface User {
  name: string;
  avatar: string;
}

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Get the current logged-in user
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(storedUser);

    if (id) {
      const storedBlogs: Blog[] = JSON.parse(localStorage.getItem('blogs') || '[]');
      const foundBlog = storedBlogs.find((blog) => blog.id === id);
      setBlog(foundBlog || null);
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl text-gray-700">Blog not found!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover"
              width={1000}  // You can specify width
              height={400}  // You can specify height
            />
          )}
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{blog.content}</p>
            <div className="flex items-center mb-4">
              <Image
                src={blog.avatar}
                alt={blog.author}
                className="w-10 h-10 rounded-full mr-3"
                width={40}  // Specify width for avatar
                height={40} // Specify height for avatar
              />
              <div>
                <p className="font-medium">{blog.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CommentSection blogId={id as string} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default BlogDetails;
