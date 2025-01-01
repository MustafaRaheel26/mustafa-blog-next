import { useState } from 'react';
import { useRouter } from 'next/router';

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
  blogs: Blog[]; // Define a proper type for blogs.
}

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignup = () => {
    if (!name || !email || !password || !avatar) {
      setError('Please fill in all fields.');
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user) => user.email === email)) {
      setError('Email already registered. Please log in.');
      return;
    }

    const newUser: User = { name, email, password, avatar, blogs: [] };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    alert('Signup successful! Please log in.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Avatar URL"
          className="w-full p-2 border rounded mb-2"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
