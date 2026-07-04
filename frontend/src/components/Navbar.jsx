import { Link } from "react-router-dom";
import Logo from "../assets/summer.png"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-green-700 flex items-center space-x-2"
        >
          <span className="flex items-center space-x-2">
            <span className="text-green-700 px-0 mx-0">Coco</span>
            <span className="text-amber-950 px-0 mx-0">Guard</span>
            <img 
              src={Logo} 
              alt="logo" 
              className="w-10 h-auto" // smaller & responsive
            />
          </span>
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-green-700"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-green-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}