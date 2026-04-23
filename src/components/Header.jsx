import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Links = ["Home", "About", "Publications", "Contacts"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  const MappedNav = Links.map((link, i) => {
    return (
      <li
        key={i}
        className="text-sm md:text-lg py-2 mx-2 hover:text-yellow-600 text-amber-400 mb-2 md:mb-0 font-bold cursor-pointer"
      >
        {link}
      </li>
    );
  });

  return (
    <div className=" sticky top-0 z-20 text-gray-900   shadow-black  bg-black/95 border border-black/30  shadow-lg">
      <div className=" container mx-auto  md:flex justify-between items-center py-3 sticky top-0">
        <h1 className="text-2xl whitespace-nowrap cursor-pointer font-bold tracking-wide bg-clip-text text-transparent bg-linear-to-r from-amber-400  to-yellow-600  px-2 md:0">
          Dr Fehintola Victor
        </h1>

        <div>
          <ul className="hidden md:flex space-x-4">{MappedNav}</ul>
        </div>
        <button
          // Fix Color to Yellow
          onClick={toggleOpen}
          className="md:hidden absolute top-5 right-4 text-2xl transition delay-300"
        >
          {isOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>
      </div>
      <div
        className={`md:hidden absolute left-0 top-full w-full overflow-hidden transition-all duration-500 bg-black text-blue-200 px-4 ${
          isOpen ? "max-h-60 py-3" : "max-h-0 py-0"
        }`}
      >
        <ul className="space-y-2">{MappedNav}</ul>
      </div>
    </div>
  );
}

export default Header;
