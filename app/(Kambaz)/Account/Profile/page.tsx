"use client";
import { useEffect, useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import * as client from "../client";
import { useRouter } from "next/navigation";
import type { User } from "../../types/Account";

// Define editable subset for form
interface UserProfileEditable {
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  password?: string;
}

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [profile, setProfile] = useState<UserProfileEditable>({});

  // Load current user into editable form
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dob: currentUser.dob,
      email: currentUser.email,
      password: currentUser.password,
    });
  }, [currentUser, router]);

  const updateProfile = async () => {
    if (!currentUser) return;

    // Merge editable fields with full user object
    const userForUpdate: User = {
      ...currentUser, // include all required backend fields
      ...profile, // overwrite with edited values
    };

    try {
      const updatedProfile = await client.updateUser(userForUpdate);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
      router.push("/Dashboard");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    }
  };

  const signout = () => {
    client.signout().catch(console.error);
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  return (
    <div id="wd-profile-screen" className="p-4">
      <h1>Profile</h1>

      <FormControl
        id="wd-username"
        value={currentUser?.username || ""}
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
        onChange={(e) =>
          setProfile((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <FormControl
        id="wd-firstname"
        value={profile.firstName || ""}
        placeholder="First Name"
        className="mb-2 w-50"
        onChange={(e) =>
          setProfile((prev) => ({ ...prev, firstName: e.target.value }))
        }
      />

      <FormControl
        id="wd-lastname"
        value={profile.lastName || ""}
        placeholder="Last Name"
        className="mb-2 w-50"
        onChange={(e) =>
          setProfile((prev) => ({ ...prev, lastName: e.target.value }))
        }
      />

      <FormControl
        id="wd-dob"
        type="date"
        value={profile.dob ? profile.dob.slice(0, 10) : ""}
        className="mb-2 w-50"
        onChange={(e) =>
          setProfile((prev) => ({ ...prev, dob: e.target.value }))
        }
      />

      <FormControl
        id="wd-email"
        type="email"
        placeholder="E-mail"
        value={profile.email || ""}
        className="mb-2 w-50"
        onChange={(e) =>
          setProfile((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <FormControl
        value={currentUser?.role || ""}
        className="mb-2 w-50"
        readOnly
      />

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
