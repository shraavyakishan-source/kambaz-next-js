import React from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signup() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue="Shraavya"
        className="mb-2 w-50"
      />
      <br />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2 w-50"
      />
      <br />
      <Link
        id="wd-signin-btn"
        href="/Dashboard"
        className="btn btn-primary w-50 mb-2"
      >
        Sign in
      </Link>
      <br />
      <Link id="wd-signin-link" href="Signin">
        Sign in
      </Link>
    </div>
  );
}
