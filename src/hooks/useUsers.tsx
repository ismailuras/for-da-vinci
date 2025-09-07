import { useState, useEffect } from "react";
import { fetchUsers } from "@/services/users";

type User = {
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

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchUsers();
      setUsers(response);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const removeUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const refetch = () => {
    getUsers();
  };

  return {
    users,
    loading,
    error,
    addUser,
    removeUser,
    updateUser,
    refetch,
  };
};
