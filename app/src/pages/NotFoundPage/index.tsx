import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f0f2f8]">
      <p className="text-8xl font-bold text-gray-200">404</p>
      <h1 className="text-xl font-semibold text-gray-700">Page not found</h1>
      <p className="text-sm text-gray-400">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate(ROUTES.PUBLIC)}
        className="mt-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Go home
      </button>
    </div>
  );
}
