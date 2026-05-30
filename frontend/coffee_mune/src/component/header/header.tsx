"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold text-stone-800">
            ☕ Coffee Menu
          </h1>
        </Link>

        <Link
          href="/admin"
          className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          Admin
        </Link>
      </div>
    </header>
  );
};

export default Header;