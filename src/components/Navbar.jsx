import { useState } from "react";
import { HambergerMenu, CloseCircle } from "iconsax-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div className="flex fixed bg-transparent backdrop  lg:hidden">
        <div>
          <h2 className="text-xl z-50  left-8 top-8 font-medium  ">
            BOOK-A-DOC
          </h2>
        </div>
        <div onClick={handleClick} className="  right-8 top-8 z-50  ">
          {toggle ? (
            <HambergerMenu color="#000" />
          ) : (
            <CloseCircle color="#000" />
          )}
        </div>
      </div>
      <nav
        className={`${
          toggle ? "hidden lg:flex" : "flex"
        } fixed h-[100vh] bg-transparent backdrop-blur-lg  z-30 w-full  items-center justify-center flex-col lg:px-8 lg:flex-row lg:justify-between lg:items-center lg:h-16 lg:border-b-[1px]  lg:border-b-white-300  `}
      >
        <h2 className=" hidden text-xl absolute left-8 top-8 font-medium  lg:static lg:block lg:text-2xl ">
          BOOK-A-DOC
        </h2>
        <ul className=" bg-transparent flex  flex-col  items-center  lg:justify-center  lg:flex-row lg:h-16 lg:w-64">
          <li className=" text-2xl font-medium py-8  lg:mx-16  lg:py-0 lg:font-normal lg:text-sm">
            <a href="/#header"> Home</a>
          </li>
          <li className=" text-2xl font-medium py-8  lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            <a href="/#services"> Services</a>
          </li>
          <li className=" text-2xl font-medium py-8 lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            <a href="/#about"> About</a>
          </li>
          <li className="text-2xl font-medium py-8 lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            <a href="/#contact"> Contact</a>
          </li>
        </ul>
        <div className=" flex flex-col  lg:flex-row ">
          <Link to="/login">
            <button className="bg-hint px-4 py-2 border-2 border-hint rounded-3xl text-primary ">
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-transparent px-4 py-2 border-2 border-hint my-4 rounded-3xl lg:my-0 lg:mx-2">
              Sign up
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
