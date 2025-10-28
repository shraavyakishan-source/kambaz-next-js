"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <Nav
      variant="pills"
      className="flex-column fs-5 rounded-0"
      id="wd-account-navigation"
    >
      <NavItem>
        <NavLink
          href="/Account/Signin"
          as={Link}
          className={`nav-link ${pathname.endsWith("Signin") ? "active" : ""}`}
        >
          Signin
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Account/Signup"
          as={Link}
          className={`nav-link ${pathname.endsWith("Signup") ? "active" : ""}`}
        >
          Signup
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="/Account/Profile"
          as={Link}
          className={`nav-link ${pathname.endsWith("Profile") ? "active" : ""}`}
        >
          Profile
        </NavLink>
      </NavItem>
    </Nav>
  );
}
