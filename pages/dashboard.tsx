import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Post {
  id: string;
  email: string;
  title: string;
  content: string;
  // Add other fields for your posts if needed
}

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<{ email: string | null }>({ email: null });
  const router = useRouter();

  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    if (storedUser?.email) {
      setCurrentUser(storedUser); // Set the current user
      // Filter posts that belong to the current user
      setPosts(storedPosts.filter((post: Post) => post.email === storedUser.email));
    } else {
      router.push("/login"); // Redirect to login if no user is found
    }
  }, [router]);

  // Handle deleting a blog post
  const handleDeleteBlog = (postId: string) => {
    if (!currentUser?.email) {
      alert("You must be logged in to delete a blog!");
      return;
    }

    // Load posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    // Remove the post to be deleted
    const updatedPosts = storedPosts.filter((post: Post) => post.id !== postId);

    // Update localStorage and state
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // Update the posts state to reflect the deleted post
    setPosts(updatedPosts.filter((post: Post) => post.email === currentUser.email));

    alert("Blog deleted successfully!");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {posts.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => handleDeleteBlog(post.id)}>
                Delete Blog
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
