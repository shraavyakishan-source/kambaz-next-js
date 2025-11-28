"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/PeopleTable";
import { findUsersForCourse } from "../../client";

export default function CoursePeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const list = await findUsersForCourse(cid as string);
      setUsers(list);
    } catch (err) {
      console.error("Error loading enrolled users:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [cid]);

  return (
    <div className="p-3">
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={loadUsers} />
    </div>
  );
}
