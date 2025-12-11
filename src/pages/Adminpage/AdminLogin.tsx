import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/AdminDashboard");
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.session) throw new Error("Login failed");

      setSuccess("Login successful! Redirecting...");
      if (remember) localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => navigate("/AdminDashboard"), 1000);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") action();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: "linear-gradient(135deg, #515E6B 0%, #3a4450 100%)" }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-10 text-center text-white" style={{ background: "#515E6B" }}>
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-sm opacity-90">Sign in to access your dashboard</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-5 text-sm">{error}</div>}
          {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-5 text-sm">{success}</div>}

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-gray-700 font-medium text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => document.getElementById("password").focus())}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 outline-none focus:ring-4"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-700 font-medium text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleLogin)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-300 outline-none focus:ring-4"
            />
          </div>

         

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 text-white rounded-lg text-base font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: "#515E6B" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}
