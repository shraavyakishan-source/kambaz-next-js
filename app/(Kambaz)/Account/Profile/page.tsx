"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [profile, setProfile] = useState<any>({});

  const fetchProfile = () => {
    if (!currentUser) {
      redirect("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-signin-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        value={profile.username || ""}
        placeholder="username"
        className="mb-2 w-50"
        readOnly
      />

      <FormControl
        id="wd-password"
        value={profile.password || ""}
        placeholder="password"
        type="password"
        className="mb-2 w-50"
        readOnly
      />

      <FormControl
        id="wd-firstname"
        value={profile.firstName || ""}
        placeholder="firstname"
        className="mb-2 w-50"
        readOnly
      />

      <FormControl
        id="wd-lastname"
        value={profile.lastName || ""}
        placeholder="lastname"
        className="mb-2 w-50"
        readOnly
      />

      <FormControl
        id="wd-dob"
        type="date"
        value={profile.dob ? profile.dob.slice(0, 10) : ""}
        className="mb-2 w-50"
        readOnly
      />

      <FormControl
        id="wd-email"
        value={profile.email || ""}
        type="email"
        className="mb-2 w-50"
        readOnly
      />

      <FormControl value={profile.role || ""} className="mb-2 w-50" readOnly />

      <button onClick={signout} className="btn btn-danger w-50 mt-3">
        Sign out
      </button>
    </div>
  );
}
