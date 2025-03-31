import { Link } from "react-router-dom";

const Navigation = () => (
  <nav className="hidden sm:flex sm:space-x-8 md:space-x-10 text-lg font-medium ml-auto">
    <Link to="/" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Home</Link>
    <Link to="/about" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">About Us</Link>
    <Link to="/classes" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Classes</Link>
    <Link to="/contact" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Contact Us</Link>
    <Link to="/shop" className="relative hover:text-purple-500 after:block after:h-1 after:bg-purple-500 after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Shop</Link>
  </nav>
);

export default Navigation;
