import { useState, useEffect } from "react";
import Image from "next/image";

interface CommentSectionProps {
  blogId: string | string[] | undefined;
  currentUser?: { name: string; avatar: string; email: string } | null;
  postOwnerEmail?: string; // Post owner's email to allow comment deletion
}

const CommentSection = ({ blogId, currentUser, postOwnerEmail }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    setComments(storedComments[blogId as string] || []);
  }, [blogId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    const blogComments = storedComments[blogId as string] || [];

    const newCommentData = {
      id: Date.now(),
      text: newComment,
      author: currentUser?.name || "User",
      avatar: currentUser?.avatar || "",
      email: currentUser?.email || "",
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...blogComments, newCommentData];
    storedComments[blogId as string] = updatedComments;
    localStorage.setItem("comments", JSON.stringify(storedComments));
    setComments(updatedComments);
    setNewComment("");
  };

  const handleDeleteComment = (id: number) => {
    const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    const blogComments = storedComments[blogId as string] || [];

    const updatedComments = blogComments.filter((comment: Comment) => comment.id !== id);
    storedComments[blogId as string] = updatedComments;
    localStorage.setItem("comments", JSON.stringify(storedComments));
    setComments(updatedComments);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-100 p-4 rounded-lg shadow flex items-start space-x-4"
          >
            {comment.avatar && (
              <Image
                src={comment.avatar || "/default-avatar.png"}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div className="flex-grow">
              <p className="font-medium">{comment.author}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
            {(currentUser?.email === comment.email || currentUser?.email === postOwnerEmail) && (
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
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
