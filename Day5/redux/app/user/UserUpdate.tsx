import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { updateUser } from "../fearures/user";

export const UserUpdate: React.FC<{ userId: string }> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === userId)
  );

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ id: userId, name, email }));
  };

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
