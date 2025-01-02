import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CommentSection from "../../components/CommentSection";
import { useUser } from "../../context/UserContext";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
}

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = router.query; // Fetch dynamic route parameter
  const { currentUser } = useUser();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Ensure `id` is defined

    // Fetch posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]") as BlogPost[];

    // Find the post with the matching `id`
    const foundPost = storedPosts.find((post) => post.id === id);

    if (foundPost) {
      setPost(foundPost);
    } else {
      alert("Post not found! Redirecting to the homepage.");
      router.push("/"); // Redirect to the homepage if the post isn't found
    }

    setIsLoading(false); // Stop the loading state
  }, [id, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!post) {
    return <div>Post not found!</div>; // Show fallback if the post is not found
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-6">{post.content}</p>
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold">Author: {post.author}</h2>
        </div>
        <div className="mt-6">
          <CommentSection blogId={id as string} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
