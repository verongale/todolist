import React , {useState}  from "react";
function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <div className="bg-amber-300 p-4 mb-8">
        <button
          className="p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-14 h-2 rounded-md bg-pink-500 mb-1"></div>
          <div className="w-14 h-2 rounded-md bg-pink-500 mb-1"></div>
          <div className="w-14 h-2 rounded-md bg-pink-500"></div>
        </button>
      </div>
    );
}
export default Nav;