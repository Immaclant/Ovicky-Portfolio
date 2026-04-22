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
        className="text-sm md:text-lg py-2 mx-2 hover:text-gray-800 mb-2 md:mb-0"
      >
        {link}
      </li>
    );
  });

  return (
    <div className="bg-gray-100 sticky top-0 z-20">
      <div className=" container mx-auto  md:flex justify-between items-center py-3 sticky top-0">
        <h1 className="text-2xl whitespace-nowrap cursor-pointer font-bold tracking-wide ">
          Dr Fehintola Victor
        </h1>

        <div>
          <ul className="hidden md:flex space-x-4">{MappedNav}</ul>
        </div>
        <button
          onClick={toggleOpen}
          className="md:hidden absolute top-5 right-4 text-2xl transition delay-300"
        >
          {isOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>
      </div>
      <div
        className={`md:hidden absolute left-0 top-full w-full overflow-hidden transition-all duration-500 bg-blue-200 px-4 ${
          isOpen ? "max-h-60 py-3" : "max-h-0 py-0"
        }`}
      >
        <ul className="space-y-2">{MappedNav}</ul>
      </div>
    </div>
  );
}

export default Header;
