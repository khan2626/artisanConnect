import React from "react";
import logoImg from "./images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="bg-white flex justify-between items-center">
        <div>
          <img className="w-16" src={logoImg} alt="..."></img>
          <h1>
            <Link to="/" className="hover:text-gray-500">
              Artisan Connect
            </Link>
          </h1>
        </div>
        <ul className="flex items-center gap-[4vw]">
          <li>
            <Link to="/create-project" className="hover:text-gray-500">
              Create Projects
            </Link>
          </li>
          <li>
            <Link to="/list-projects" className="hover:text-gray-500">
              Projects
            </Link>
          </li>
          {/* <li>
            <a className="hover:text-gray-500" href="/me">
              me
            </a>
          </li> */}
        </ul>
        <div className="gap-6">
          <Link to="/login">
            <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hovering:bg-[#87acec]">
              {" "}
              Sign in
            </button>
          </Link>
          <Link to="register">
            <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
              {" "}
              Sign up
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
