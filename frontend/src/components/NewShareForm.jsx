import { useState } from "react";
import api from "../lib/api";

export default function NewShareForm({ onAdded }) {
  const [form, setForm] = useState({
    skillOffered: "",
    skillNeeded: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await api.post("/share", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ skillOffered: "", skillNeeded: "", description: "" });
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-4 rounded-xl shadow space-y-2"
    >
      <h3 className="text-xl font-semibold">Create a New Skill Share</h3>
      <input
        className="border p-2 w-full rounded"
        placeholder="Skill Offered"
        value={form.skillOffered}
        onChange={(e) => setForm({ ...form, skillOffered: e.target.value })}
      />
      <input
        className="border p-2 w-full rounded"
        placeholder="Skill Needed"
        value={form.skillNeeded}
        onChange={(e) => setForm({ ...form, skillNeeded: e.target.value })}
      />
      <textarea
        className="border p-2 w-full rounded"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Submit
      </button>
    </form>
  );
}
