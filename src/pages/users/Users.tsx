import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import UsersList from "./UsersList";
import Modal from "@/components/CustomModal";
import CreateUser from "./CreateUser";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import NotFound from "@/components/NotFound";
import { fetchUsers } from "@/services/users";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const Users: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleUserCreated = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleUserDeleted = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!users.length) return <NotFound target="Users" />;

  return (
    <>
      <div className="w-full flex justify-end ">
        <Button label="Add New User" onClick={() => setModalOpen(true)} />
      </div>

      <div className="my-6">
        <UsersList
          users={users}
          onUserDeleted={handleUserDeleted}
          onUserUpdated={handleUserUpdated}
        />
      </div>

      {isModalOpen && (
        <Modal
          title="New User"
          open={isModalOpen}
          children={
            <CreateUser
              onClose={handleClose}
              onUserCreated={handleUserCreated}
            />
          }
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default Users;
