import { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode = "login" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
      const res = await api.post(endpoint, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-xl shadow space-y-3"
    >
      <h2 className="text-2xl font-semibold text-center">
        {mode === "register" ? "Register" : "Login"}
      </h2>
      {mode === "register" && (
        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <input
        className="border p-2 w-full rounded"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="border p-2 w-full rounded"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 w-full rounded mt-3"
      >
        {mode === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
}
