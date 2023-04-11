import { useState } from "react";
import { HambergerMenu, CloseCircle } from "iconsax-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle((prev) => !prev);
  };
  return (
    <>
      <span
        onClick={handleClick}
        className=" absolute right-8 top-8 z-50  lg:hidden "
      >
        {toggle ? <HambergerMenu color="#000" /> : <CloseCircle color="#000" />}
      </span>
      <nav
        className={`${
          toggle ? "hidden" : "flex"
        } fixed h-[100vh] bg-transparent backdrop-blur-lg  z-30 w-full  items-center justify-center flex-col  lg:flex-row lg:justify-between lg:items-center lg:h-16   lg:border-b-[1px] lg:border-b-white-300  `}
      >
        <h2 className="text-xl absolute left-8 top-8 font-medium  lg:static lg:block lg:text-2xl ">
          BOOK-A-DOC
        </h2>
        <ul className=" bg-transparent flex  flex-col  items-center  lg:justify-center    lg:flex-row lg:h-16 lg:w-64">
          <li className=" text-2xl font-medium py-8  lg:mx-16 lg:border-b-2 lg:border-hint lg:py-0 lg:font-normal lg:text-sm">
            Home
          </li>
          <li className=" text-2xl font-medium py-8  lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            About
          </li>
          <li className=" text-2xl font-medium py-8 lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            Services
          </li>
          <li className="text-2xl font-medium py-8 lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            Contact
          </li>
        </ul>
        <div className=" flex flex-col  lg:flex-row lg:relative ">
          <Link to="/login">
            <button className="bg-hint px-4 py-2 rounded-3xl text-primary ">
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-transparent px-4 py-2 border-2 border-hint my-4 rounded-3xl lg:my-0 ">
              Sign up
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
} 
