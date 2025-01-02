import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  email: string; // Assuming blogs have an associated user email
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
      router.push('/login');
    }
    setCurrentUser(user);

    const allBlogs: Blog[] = JSON.parse(localStorage.getItem('blogs') || '[]');
    if (user) {
      setUserBlogs(allBlogs.filter((blog) => blog.email === user.email));
    }
  }, [router]);

  const handleAddBlog = () => {
    router.push('/add-blog');
  };

  const handleDeleteBlog = (id: string) => {
    const updatedBlogs = userBlogs.filter((blog) => blog.id !== id);
    setUserBlogs(updatedBlogs);

    const allBlogs: Blog[] = JSON.parse(localStorage.getItem('blogs') || '[]');
    const updatedAllBlogs = allBlogs.filter((blog) => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(updatedAllBlogs));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto">
        {currentUser && (
          <div className="flex items-center space-x-4">
            <Image
              src={currentUser.avatar}
              alt="User Avatar"
              width={64}
              height={64}
              className="rounded-full border border-gray-300"
            />
            <div>
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleAddBlog}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add New Blog
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
          {userBlogs.length > 0 ? (
            userBlogs.map((blog) => (
              <div key={blog.id} className="bg-gray-100 p-4 rounded mb-4 shadow">
                {blog.image && (
                  <Image
                    src={blog.image}
                    alt="Blog Image"
                    width={640}
                    height={160}
                    className="rounded mb-4"
                  />
                )}
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p className="text-gray-700">{blog.content}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You have no blogs yet.</p>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
