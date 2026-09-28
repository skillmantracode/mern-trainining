import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login, Logout } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const loginPayload = {
      username,
      password,
    };

    try {
      await login(loginPayload);

      toast.success("Login successfull");

      navigate("/admin");

      reset();
    } catch (error) {
      toast.error(error.message);
    }
  }
  function reset() {
    setUsername("");
    setPassword("");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 placeholder:text-slate-400"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 placeholder:text-slate-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </div>

        {/* For testing */}
      </div>
    </div>
  );
}

export default Login;
