import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../context/UserContext";

interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

const Signup = () => {
  const router = useRouter();
  const { setCurrentUser } = useUser();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const handleSignup = () => {
    // Check if user already exists
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user: User) => user.email === email);

    if (userExists) {
      alert("Email is already registered! Please use a different email.");
      return;
    }

    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create a new user
    const newUser: User = {
      name,
      email,
      password,
      avatar: avatar || "/default-avatar.png",
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Set the new user as the current user
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setCurrentUser(newUser); // Update context

    alert("Signup successful!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
            Avatar URL (Optional)
          </label>
          <input
            type="url"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter a link to your avatar"
          />
        </div>
        <button
          onClick={handleSignup}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
