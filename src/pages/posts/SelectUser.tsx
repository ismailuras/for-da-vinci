import type { User } from "@/types/fetchUsersTypes";
import React from "react";

interface SelectUserProps {
  handleSelectedUserId: (id: number | string) => void;
  selectedUserId: number | string;
  users: User[];
}

const SelectUser: React.FC<SelectUserProps> = ({
  handleSelectedUserId,
  selectedUserId,
  users,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedId = selectedValue === "" ? "" : parseInt(selectedValue);
    handleSelectedUserId(selectedId);
  };

  if (!users || users.length === 0) {
    return (
      <select
        disabled
        className="bg-gray-100 border border-gray-300 text-gray-400 text-sm rounded-lg block p-1.5"
      >
        <option>No users found</option>
      </select>
    );
  }

  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
      onChange={handleSelectChange}
      value={selectedUserId}
    >
      <option value="">All Posts</option>
      {users.map((item: User) => (
        <option key={item.id} value={item.id} className="p-2 font-medium">
          {item.name} #{item.id}
        </option>
      ))}
    </select>
  );
};

export default SelectUser;
