import Popper from "@/components/Popper";
import React, { useState } from "react";
import { deleteUser } from "@/services/users";
import { showToast } from "@/utils/showToast";

interface DeleteUserProps {
  id: number;
  onDeleted?: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ id, onDeleted }) => {
  const [isPopperVisible, setPopperVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser(id);
      setPopperVisible(false);
      onDeleted?.();
      showToast("User has been successfully deleted.", "success");
    } catch (error) {
      console.error("An error occured:", error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteContent = () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm">Are you sure you want to delete this user?</p>
      <div className="flex gap-2 justify-end mt-2">
        <button
          onClick={() => setPopperVisible(false)}
          className="cursor-pointer px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="cursor-pointer px-3 py-1 text-sm rounded bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? "Deleting..." : "Yeap"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => setPopperVisible((prev) => !prev)}
      >
        <img src="/static/images/delete.svg" alt="Delete Icon" />
      </button>

      {isPopperVisible && (
        <Popper content={<DeleteContent />} placement="left">
          <span></span>
        </Popper>
      )}
    </>
  );
};

export default DeleteUser;
