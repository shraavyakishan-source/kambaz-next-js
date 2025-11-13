"use client";
import { useEffect, useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import * as client from "../client";
import { useRouter } from "next/navigation";

interface UserProfile {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
}

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [profile, setProfile] = useState<UserProfile>({});

  // Load current user once on mount
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile({ ...currentUser }); // clone to avoid reference issues
  }, []); // run only once on mount

  const updateProfile = async () => {
    if (!profile._id) return;
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
      router.push("/Dashboard"); // navigate after success
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    }
  };

  const signout = () => {
    client.signout().catch(console.error); // call backend but don’t block
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  return (
    <div id="wd-profile-screen" className="p-4">
      <h1>Profile</h1>

      <FormControl
        id="wd-username"
        value={profile.username || ""}
        placeholder="Username"
        className="mb-2 w-50"
        readOnly
      />

      <FormControl
        id="wd-password"
        value={profile.password || ""}
        placeholder="Password"
        type="password"
        className="mb-2 w-50"
        readOnly
      />

      <FormControl
        id="wd-firstname"
        value={profile.firstName || ""}
        placeholder="First Name"
        className="mb-2 w-50"
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />

      <FormControl
        id="wd-lastname"
        value={profile.lastName || ""}
        placeholder="Last Name"
        className="mb-2 w-50"
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />

      <FormControl
        id="wd-dob"
        type="date"
        value={profile.dob ? profile.dob.slice(0, 10) : ""}
        className="mb-2 w-50"
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />

      <FormControl
        id="wd-email"
        type="email"
        placeholder="E-mail"
        value={profile.email || ""}
        className="mb-2 w-50"
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      <FormControl value={profile.role || ""} className="mb-2 w-50" readOnly />

      <Button className="mb-2 w-50" onClick={updateProfile}>
        Update Profile
      </Button>
      <br />

      <Button variant="danger" className="w-50" onClick={signout}>
        Sign out
      </Button>
    </div>
  );
}
