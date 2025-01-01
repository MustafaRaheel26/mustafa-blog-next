import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  image?: string;
  createdAt: string; // Use `Date` if parsing it to a date object is preferred
}

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const storedBlogs: Blog[] = JSON.parse(localStorage.getItem('blogs') || '[]');
    setBlogs(storedBlogs);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Welcome to My Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                {blog.image && (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={600}
                    height={192}
                    className="w-full object-cover"
                  />
                )}
                <div className="p-4 flex-1">
                  <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                  <div className="flex items-center mb-4">
                    <Image
                      src={blog.avatar}
                      alt={blog.author}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{blog.author}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No blogs to display yet. Be the first to add one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
