import { Link } from "react-router-dom";

const MobileMenu = ({ isMenuOpen, closeMenu }) => (
  <div className={`sm:hidden fixed top-0 left-0 w-full h-full bg-black text-white text-center transition-all duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
    <nav className="space-y-6 py-20">
      <Link to="/" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Home</Link>
      <Link to="/about" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>About Us</Link>
      <Link to="/classes" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Classes</Link>
      <Link to="/blog" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Blog</Link>
      <Link to="/contact" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Contact</Link>
      <Link to="/shop" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Shop</Link>
      <Link to="/cart" className="block py-4 text-2xl hover:bg-primary" onClick={closeMenu}>Cart</Link>
    </nav>
    <button onClick={closeMenu} className="absolute top-6 right-10 text-3xl text-white"> <i className="fas fa-times"></i></button>
  </div>
);

export default MobileMenu;
