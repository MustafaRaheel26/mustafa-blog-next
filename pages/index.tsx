import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
}

const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]") as BlogPost[];
    setPosts(storedPosts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {posts.map((post) => (
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
        ))}
      </div>
    </div>
  );
};

export default Home;
