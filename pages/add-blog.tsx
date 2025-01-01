import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image from next/image

// Define User interface
interface User {
  email: string;
  name: string;
  avatar: string;
}

const AddBlog = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
      router.push('/login');
    }
    setCurrentUser(user);
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = () => {
    if (!title || !content) {
      alert('Title and content are required!');
      return;
    }

    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      image,
      email: currentUser?.email,
      author: currentUser?.name,
      avatar: currentUser?.avatar,
      createdAt: new Date().toLocaleString(),
    };

    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    alert('Blog added successfully!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Add New Blog</h1>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the title of your blog"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Blog Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write the content of your blog here"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Upload Blog Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none"
            />
            {image && (
              <Image
                src={image}
                alt="Blog Preview"
                className="mt-4 w-full h-40 object-cover rounded"
                width={640}  // You can specify the width
                height={160} // You can specify the height
              />
            )}
          </div>
          <button
            onClick={handleAddBlog}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Blog
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
