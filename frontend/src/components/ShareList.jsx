import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ShareList() {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    api
      .get("/share", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setShares(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Available Skill Shares
      </h2>
      {shares.map((s) => (
        <div key={s._id} className="p-4 border rounded mb-3 bg-white shadow">
          <p>
            <strong>Offer:</strong> {s.skillOffered}
          </p>
          <p>
            <strong>Need:</strong> {s.skillNeeded}
          </p>
          <p className="text-sm text-gray-600">{s.description}</p>
        </div>
      ))}
    </div>
  );
}
