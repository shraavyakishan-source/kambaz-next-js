"use client";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "../Details";

export interface User {
  _id: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email?: string;
  dob?: string;
  role: "ADMIN" | "STUDENT" | "FACULTY";
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
}

interface PeopleTableProps {
  users?: User[];
  fetchUsers?: () => void; // made optional
}

export default function PeopleTable({
  users = [],
  fetchUsers,
}: PeopleTableProps) {
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const handleUserClick = (userId: string) => {
    console.log("User clicked, ID:", userId);
    setShowUserId(userId);
  };

  const handleClose = () => {
    console.log("Closing details panel");
    setShowUserId(null);
    if (fetchUsers) fetchUsers(); // call only if defined
  };

  console.log("PeopleTable render - showUserId:", showUserId);
  console.log("Users count:", users.length);

  return (
    <div id="wd-people-table" className="position-relative">
      {/* Details panel */}
      {showUserId && <PeopleDetails uid={showUserId} onClose={handleClose} />}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <button
                    className="btn btn-link text-decoration-none p-0 text-start"
                    onClick={() => handleUserClick(user._id)}
                    style={{
                      cursor: "pointer",
                      border: "none",
                      background: "none",
                    }}
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="align-middle">
                      {user.firstName} {user.lastName}
                    </span>
                  </button>
                </td>

                <td className="align-middle">{user.loginId || "-"}</td>
                <td className="align-middle">{user.section || "-"}</td>
                <td className="align-middle">{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
