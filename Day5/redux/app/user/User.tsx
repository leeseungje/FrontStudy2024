import { UserUpdate } from "./UserUpdate";

export const User = ({ userId }: { userId: string }) => {
  return (
    <>
      <UserUpdate userId={userId} />
    </>
  );
};
