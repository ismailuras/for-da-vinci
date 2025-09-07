import React, { useState } from "react";
import { Button } from "@/components/Button";
import UsersList from "./UsersList";
import Modal from "@/components/CustomModal";
import CreateUser from "./CreateUser";

const Users: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>();

  const handleClose = () => setModalOpen(false);

  return (
    <div className="px-6 xl:px-0">
      <div className="w-full flex justify-end ">
        <Button label="Add New User" onClick={() => setModalOpen(true)} />
      </div>

      <div className="my-6">
        <UsersList />
      </div>

      {isModalOpen && (
        <Modal
          title="New User"
          open={isModalOpen}
          children={<CreateUser onClose={handleClose} />}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Users;
