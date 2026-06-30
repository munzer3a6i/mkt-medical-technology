import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      navigate("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E40] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#165DB2] text-white flex items-center justify-center rounded-lg mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="font-sans font-bold text-2xl text-[#001E40]">MKT Admin Portal</h1>
          <p className="font-sans text-sm text-[#43474F]">Sign in to manage website content</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold font-mono text-[#165DB2] uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-[#C3C6D1] rounded p-2.5 outline-none focus:border-[#165DB2] transition-colors font-sans text-sm"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold font-mono text-[#165DB2] uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#C3C6D1] rounded p-2.5 outline-none focus:border-[#165DB2] transition-colors font-sans text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#165DB2] text-white font-mono font-bold text-sm tracking-wider uppercase py-3 rounded hover:bg-[#001E40] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
