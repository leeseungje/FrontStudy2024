"use client";

import { UserCreate } from "./UserCreate";
import { UserList } from "./UserList";

export default function UserPage() {
  return (
    <>
      <h1>User Management</h1>
      <UserCreate />
      <UserList />
    </>
  );
}
