"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import users from "../../Database/users.json"; // 👈 Import JSON directly

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    // Find user with matching credentials
    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      alert("Invalid username or password");
      return;
    }

    // Store in Redux
    dispatch(setCurrentUser(user));

    // Navigate to Dashboard
    router.push("/Dashboard");
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
