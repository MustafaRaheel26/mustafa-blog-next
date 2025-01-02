// pages/blog/[id].tsx
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

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useUser();

  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const storedPosts: BlogPost[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const foundPost = storedPosts.find((post) => post.id === id);
    setPost(foundPost || null);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.content}</p>
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold">Author: {post.author}</h2>
        </div>
        <div className="mt-6">
          <CommentSection blogId={id as string} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
