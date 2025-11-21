"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table/PeopleTable";
import * as client from "../client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  // ---- Fetch users (no filters) ----
  const fetchUsers = async () => {
    const result = await client.findAllUsers();
    setUsers(result);
  };

  // ---- Filter by role ----
  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    setName(""); // reset name filter when role changes

    if (selectedRole) {
      const result = await client.findUsersByRole(selectedRole);
      setUsers(result);
    } else {
      fetchUsers();
    }
  };

  // ---- Filter by partial name ----
  const filterUsersByName = async (inputName: string) => {
    setName(inputName);
    setRole(""); // reset role filter when searching by name

    if (inputName) {
      const result = await client.findUsersByPartialName(inputName);
      setUsers(result);
    } else {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>

      {/* Name search */}
      <div className="d-flex gap-2 mb-3 align-items-center">
        <button
          onClick={createUser}
          className="float-end btn btn-danger wd-add-people"
        >
          <FaPlus className="me-2" />
          People
        </button>
        <FormControl
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name"
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
        />

        {/* Role filter */}
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
