import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/abc/product">Product</Link>
        </li>
        <li>
          <Link href="/abc">ABC</Link>
        </li>
        <li>
          <Link href="/post-list">PostList</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
