import { useRouter } from "next/router";
import Image from "next/image";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); // Update context
    alert("Logged out successfully!");
    router.push("/login");
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          My Blog
        </h1>
        <div className="flex items-center space-x-6">
          {!currentUser ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Signup
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
                onClick={goToDashboard}
              >
                <Image
                  src={currentUser.avatar || "/default-avatar.png"}
                  alt={currentUser.name || "Default Avatar"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
