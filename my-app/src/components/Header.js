import React from "react";
import logoImg from "./images/logo.png";

export default function Header() {
  return (
    <header className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] h-screen">
      <nav className="bg-white flex justify-between items-center">
        <div>
          <img className="w-16" src={logoImg} alt="..."></img>
          <h1>
            <a className="hover:text-gray-500" href="#">
              Artisan Connect
            </a>
          </h1>
        </div>
        <ul className="flex items-center gap-[4vw]">
          <li>
            <a className="hover:text-gray-500" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="#">
              Projects
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="#">
              me
            </a>
          </li>
        </ul>
        <div className="gap-6">
          <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hovering:bg-[#87acec]">
            {" "}
            Sign in
          </button>
          <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
            {" "}
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
}
