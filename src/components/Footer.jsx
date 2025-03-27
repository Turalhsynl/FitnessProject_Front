const Footer = () => {
  return (
    <footer  className="text-white py-12 px-8 relative"
    style={{
      background: `radial-gradient(circle at top left, rgba(75, 0, 130, 0.5), transparent 50%),
                   radial-gradient(circle at bottom right, rgba(0, 102, 255, 0.4), transparent 50%),
                   #0a0f1a`,
    }}>
      
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">
          1810 Kings Way King Street, 5th Avenue,New York
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold mb-3">Product</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Integrations</li>
              <li>Customers</li>
              <li>Pricing</li>
              <li>Available Languages</li>
              <li>Enterprise</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3">Company</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Our Mission</li>
              <li>Jobs</li>
              <li>Partners</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold mb-3">Resources</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Getting Started</li>
              <li>Help Center</li>
              <li>Support</li>
              <li>Developer</li>
              <li>Guides</li>
              <li>Events</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3">More</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>Press</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Blog</li>
              <li>Product Roadmap</li>
              <li>API Status <span className="text-green-500">●</span></li>
              <li>Trust & Security</li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3">
            Get the latest news about new features & product updates.
          </h3>
          <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-sm text-white outline-none flex-1 p-2"
            />
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:scale-105 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="relative mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; 2023 WRITE-A-LOT. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <i className="fab fa-instagram cursor-pointer hover:text-white transition"></i>
          <i className="fab fa-twitter cursor-pointer hover:text-white transition"></i>
          <i className="fab fa-tiktok cursor-pointer hover:text-white transition"></i>
          <i className="fab fa-linkedin cursor-pointer hover:text-white transition"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
