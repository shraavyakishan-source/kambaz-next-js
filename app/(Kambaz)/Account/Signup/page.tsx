"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as client from "../client"; // this calls your backend API
import { User } from "../../types/Account"; // import the updated User type

export default function Signup() {
  // now User type allows optional fields
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user); // POSTs to backend
      dispatch(setCurrentUser(currentUser)); // save in Redux
      router.push("/Account/Profile"); // navigate to Profile page
    } catch (error) {
      console.error("Signup failed", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign up</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2 w-50"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <br />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2 w-50"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <br />

      <Button
        id="wd-signup-btn"
        className="btn btn-primary w-50 mb-2"
        onClick={signup}
      >
        Sign up
      </Button>

      <br />

      <Link id="wd-signin-link" href="/Signin">
        Sign in
      </Link>
    </div>
  );
}
