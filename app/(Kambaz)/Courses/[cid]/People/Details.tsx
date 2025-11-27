"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FormControl } from "react-bootstrap";
import * as client from "../../../Account/client";

interface PeopleDetailsProps {
  uid: string | null;
  onClose: () => void;
}

export default function PeopleDetails({ uid, onClose }: PeopleDetailsProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  // Fetch user by ID
  const fetchUser = async () => {
    if (!uid) return;
    try {
      setLoading(true);
      setError(null);
      const u = await client.findUserById(uid);
      setUser(u);
      setName(`${u.firstName} ${u.lastName}`); // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching user:", err);
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  // Save edited name to server
  const saveUser = async () => {
    if (!user) return;
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    try {
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to save user");
    }
  };

  // Delete user
  const handleDeleteUser = async (uid: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await client.deleteUser(uid);
      onClose();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  if (!uid) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        style={{ zIndex: 9998, opacity: 0.5 }}
        onClick={onClose}
      />

      {/* Details Panel */}
      <div
        className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow"
        style={{
          zIndex: 9999,
          width: "400px",
          maxWidth: "90vw",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="btn position-absolute end-0 top-0 m-2 wd-close-details"
          style={{ zIndex: 10000 }}
          aria-label="Close"
        >
          <IoCloseSharp className="fs-1" />
        </button>

        {/* Loading state */}
        {loading && (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="alert alert-danger mt-5" role="alert">
            {error}
          </div>
        )}

        {/* User details */}
        {!loading && !error && user && (
          <>
            <div className="text-center mt-2">
              <FaUserCircle className="text-secondary fs-1" />
            </div>
            <hr />

            {/* Editable Name Section */}
            <div className="text-danger fs-4">
              {!editing && (
                <FaPencil
                  onClick={() => setEditing(true)}
                  className="float-end fs-5 mt-2 wd-edit"
                />
              )}
              {editing && (
                <FaCheck
                  onClick={saveUser}
                  className="float-end fs-5 mt-2 me-2 wd-save"
                />
              )}

              {/* Display name when not editing */}
              {!editing && (
                <div className="wd-name" onClick={() => setEditing(true)}>
                  {user.firstName} {user.lastName}
                </div>
              )}

              {/* Input field when editing */}
              {editing && (
                <FormControl
                  className="w-50 wd-edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveUser();
                  }}
                />
              )}
            </div>

            {/* Other user details */}
            <div className="mt-3">
              <b>Roles:</b> <span className="wd-roles">{user.role}</span>
              <br />
              <b>Login ID:</b>{" "}
              <span className="wd-login-id">{user.loginId || "N/A"}</span>
              <br />
              <b>Section:</b>{" "}
              <span className="wd-section">{user.section || "N/A"}</span>
              <br />
              <b>Total Activity:</b>{" "}
              <span className="wd-total-activity">
                {user.totalActivity || "0"}
              </span>
            </div>

            {/* Cancel button */}
            <button
              onClick={onClose}
              className="btn btn-secondary w-50 mt-4 wd-close-details"
              style={{ zIndex: 10000 }}
              aria-label="Close"
            >
              Cancel
            </button>
            {/* Delete user button */}
            <button
              onClick={() => handleDeleteUser(uid)}
              className="btn btn-danger w-50 mt-4"
            >
              Delete
            </button>
          </>
        )}

        {/* User not found */}
        {!loading && !error && !user && (
          <div className="alert alert-warning mt-5" role="alert">
            User not found
          </div>
        )}
      </div>
    </>
  );
}
