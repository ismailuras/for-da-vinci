import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { fetchUsers } from "@/services/users";
import { useEffect, useState } from "react";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

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

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleUserDeleted = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleUserUpdated = (result: User) => {
    const { id } = result;

    if (id) {
      const newList = [...users];
      const updatedUser: number = newList.findIndex(
        (item: any) => item.id === id
      );
      newList[updatedUser] = result;
      setUsers(newList);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!users.length) return <NotFound target="Users" />;

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {users.map((user, index) => (
        <li
          key={`${user.id}-${index}`}
          className="flex justify-between gap-x-6 py-5"
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=random`}
              alt={user.name}
              className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
            />
            <div className="min-w-0 flex-auto">
              <div className="flex gap-1">
                <p className="text-sm/6 text-black">#{user.id}</p>
                {"-"}
                <p className="text-sm/6 font-semibold text-black">
                  {user.name}
                </p>
              </div>
              <p className="mt-1 truncate text-xs/5 text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-row items-end gap-2">
            <DeleteUser
              id={user.id}
              onDeleted={() => handleUserDeleted(user.id)}
            />
            <UpdateUser onUpdated={handleUserUpdated} user={user} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
