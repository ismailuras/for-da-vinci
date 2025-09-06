import React from "react";
import { Button } from "@/components/Button";
import UsersList from "./UsersList";

const Users: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-end ">
        <Button label="Add New User" />
      </div>
      <div className="my-6">
        <UsersList />
      </div>
    </>
  );
};

export default Users;
