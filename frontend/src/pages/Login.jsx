import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTemporaryLogin = () => {
    login({
      id: 1,
      username: "Demo User",
      email: "demo@example.com",
    });

    navigate(location.state?.from || "/dashboard", {
      replace: true,
    });
  };

  return (
    <section className="mx-auto max-w-md px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900">
        Temporary Login Test
      </h1>

      <p className="mt-3 text-slate-600">
        This button only tests protected routing.
      </p>

      <button
        type="button"
        onClick={handleTemporaryLogin}
        className="mt-8 rounded-lg bg-emerald-700 px-6 py-3 font-medium text-white hover:bg-emerald-800"
      >
        Login as Demo User
      </button>
    </section>
  );
}