"use client";

import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";

const Nav = () => {
  // const { data, status } = useSession();
  // console.log(data, "data");
  // console.log(status, "auth status");

  return (
    <header className="header">
      <div className="container">
        <nav className="header__navbar">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>

            <li>
              <Link href="/dashboard/admin/add-product">Add Product</Link>
            </li>

            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
