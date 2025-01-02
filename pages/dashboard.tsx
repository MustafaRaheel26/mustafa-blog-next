import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";

// Define the BlogPost interface
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  email: string;
}

const Dashboard = () => {
  const { currentUser } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login"); // Redirect to login if the user is not logged in
      return;
    }

    // Fetch the blogs created by the current user
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const userPosts = storedPosts.filter(
      (post: BlogPost) => post.email === currentUser.email
    );
    setPosts(userPosts);
  }, [currentUser, router]);

  const handleCreateBlog = () => {
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    if (!currentUser) {
      alert("You must be logged in to create a blog!");
      return;
    }

    // Fetch existing blogs from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      content,
      author: currentUser.name,
      email: currentUser.email,
    };

    // Add the new post to the existing posts
    const updatedPosts = [...storedPosts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // Update the dashboard posts
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setTitle("");
    setContent("");
    alert("Blog post created successfully!");
  };

  const handleDeleteBlog = (postId: string) => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = storedPosts.filter(
      (post: BlogPost) => post.id !== postId
    );

    // Update localStorage and state
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts.filter((post:BlogPost) => post.email === currentUser?.email));
    alert("Blog deleted successfully!");
  };

  if (!currentUser) return null; // Prevent rendering if the user is not logged in

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome, {currentUser?.name}!
        </h1>
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-4">Create a New Blog</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog content"
              rows={5}
            />
          </div>
          <button
            onClick={handleCreateBlog}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Blog
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Your Blogs</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">You haven&apos;t created any blogs yet.</p>
        ) : (
          posts.map((post: BlogPost) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
                <a
                  href={`/blog/${post.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </a>
              </div>
              <button
                onClick={() => handleDeleteBlog(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
