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
    <div className="bg-gray-100">
      <div className="relative container mx-auto  md:flex justify-between items-center py-3">
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
        className={`md:hidden overflow-hidden transition-all duration-500 bg-blue-200 px-4 ${
          isOpen ? "max-h-60 py-3" : "max-h-0 py-0"
        }`}
      >
        <ul className="space-y-2">{MappedNav}</ul>
      </div>
    </div>

    // <div className="bg-transparent p-2 flex sticky top-0 justify-around">
    //   {/* <img className="header-img" src={image} alt="logo" width={100} /> */}
    //   <nav className="max-sm:hidden">
    //     <ul className="flex space-x-6">
    //       <li className="header-nav-item">
    //         <a href="" className="header-nav-link">
    //           Home
    //         </a>
    //       </li>
    //       <li className="header-nav-item">
    //         <a href="" className="header-nav-link">
    //           About
    //         </a>
    //       </li>
    //       <li className="header-nav-item">
    //         <a href="" className="header-nav-link">
    //           Publications
    //         </a>
    //       </li>
    //       <li className="header-nav-item">
    //         <a href="" className="header-nav-link">
    //           Contacts
    //         </a>
    //       </li>
    //     </ul>
    //   </nav>
    //   <button class="sm:hidden">☰</button>
    // </div>
  );
}

export default Header;
