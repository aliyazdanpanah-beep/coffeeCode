"use client";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container justify-between mx-auto px-4 py-4">
        <Link href={"/"}>
          <h1 className="text-xl font-medium text-gray-800">☕ Coffee Menu</h1>
        </Link>
        <Link href={"/admin"}>
          <h1 className="text-xl font-medium text-gray-800">Admin </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
