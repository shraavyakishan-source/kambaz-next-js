"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { SigninCredentials } from "../client"; // import the exact type used by client

export default function Signin() {
  // Initialize state with all required fields from SigninCredentials
  const [credentials, setCredentials] = useState<SigninCredentials>({
    username: "",
    password: "",
    email: "", // include if required by the type
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials); // calls backend

      if (!user) {
        alert("Invalid username or password");
        return;
      }

      // Save user in Redux store
      dispatch(setCurrentUser(user));

      // Navigate to Dashboard
      router.push("/Dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
      alert("Signin failed. Please check your username and password.");
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h1 className="mb-3">Sign in</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2 w-50"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2 w-50"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      {/* Optional: email input if backend requires it */}
      {/* 
      <FormControl
        id="wd-email"
        placeholder="email"
        type="email"
        className="mb-2 w-50"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      /> 
      */}

      <Button
        id="wd-signin-btn"
        className="btn btn-primary w-50 mb-2"
        onClick={signin}
      >
        Sign in
      </Button>

      <br />

      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
