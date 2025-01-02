import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  email: string; // Add this to match blog post data structure
}

const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== "undefined") {
      const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]") as BlogPost[];
      console.log("Posts from localStorage:", storedPosts); // Debugging log
      setPosts(storedPosts);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Latest Blogs</h1>
        {posts.length === 0 ? (
          <div className="text-center text-gray-600">
            No blogs found! Add some posts to see them here.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
              <a
                href={`/blog/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
