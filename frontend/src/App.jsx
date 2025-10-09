import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import ShareList from "./components/ShareList";
import NewShareForm from "./components/NewShareForm";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
          <h1 className="font-semibold">SkillSwap</h1>
          <div className="space-x-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/register" element={<AuthForm mode="register" />} />
          <Route
            path="/dashboard"
            element={
              <>
                <NewShareForm onAdded={() => window.location.reload()} />
                <ShareList />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
