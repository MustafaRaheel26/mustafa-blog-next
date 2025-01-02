// components/CommentSection.tsx
import { useState, useEffect } from "react";
import Image from "next/image";

interface Comment {
  id: number;
  text: string;
  author: string;
  avatar: string;
  createdAt: string;
  email?: string;
}

interface CommentSectionProps {
  blogId: string | string[] | undefined;
  currentUser?: { name: string; avatar: string; email?: string } | null;
}

const CommentSection = ({ blogId, currentUser }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    setComments(storedComments[blogId as string] || []);
  }, [blogId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    const blogComments: Comment[] = storedComments[blogId as string] || [];

    const updatedComments = [
      ...blogComments,
      {
        id: Date.now(),
        text: newComment,
        author: currentUser?.name || "User",
        avatar: currentUser?.avatar || "",
        createdAt: new Date().toISOString(),
        email: currentUser?.email,
      },
    ];

    storedComments[blogId as string] = updatedComments;
    localStorage.setItem("comments", JSON.stringify(storedComments));
    setComments(updatedComments);
    setNewComment("");
  };

  const handleDeleteComment = (id: number, email: string | undefined) => {
    if (currentUser?.email === email) {
      const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
      const blogComments: Comment[] = storedComments[blogId as string] || [];
      const updatedComments = blogComments.filter((comment) => comment.id !== id);
      storedComments[blogId as string] = updatedComments;
      localStorage.setItem("comments", JSON.stringify(storedComments));
      setComments(updatedComments);
    } else {
      alert("You can only delete your own comments.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow flex items-start">
            {comment.avatar && (
              <Image
                src={comment.avatar || "/default-avatar.png"}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div className="ml-4">
              <p className="font-medium">{comment.author}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              {(currentUser?.email === comment.email) && (
                <button
                  className="text-red-500 mt-2"
                  onClick={() => handleDeleteComment(comment.id, comment.email)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full mt-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a comment..."
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentSection;
