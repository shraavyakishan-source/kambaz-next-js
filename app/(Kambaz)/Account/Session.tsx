"use client";
import { User } from "../types/Account";

import * as client from "./client";
import { useEffect, useState, ReactNode } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

interface SessionProps {
  children: ReactNode;
}

export default function Session({ children }: SessionProps) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await client.profile(); // call backend API
        if (currentUser) {
          dispatch(setCurrentUser(currentUser)); // store user in Redux
        }
      } catch (err: unknown) {
        // Narrow error type safely
        if (err instanceof Error) {
          console.error("Session fetch error:", err.message);
        } else {
          console.error("Session fetch error:", err);
        }
      } finally {
        setPending(false); // done loading
      }
    };

    fetchProfile(); // ✅ run once after initial render
  }, [dispatch]);

  // Show a loading state while fetching session
  if (pending) {
    return <div>Loading...</div>;
  }

  // Render children once session check is complete
  return <>{children}</>;
}
