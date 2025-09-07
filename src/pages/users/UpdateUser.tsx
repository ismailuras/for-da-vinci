import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Modal from "@/components/CustomModal";
import { Button } from "@/components/Button";
import { showToast } from "@/utils/showToast";
import { updateUser } from "@/services/users";
import type { CreateUserValues } from "./types";
import { resolver } from "./resolver";

interface UserProps {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface UpdateUserProps {
  onUpdated: any;
  user: UserProps;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ onUpdated, user }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserValues>({ resolver: resolver });

  useEffect(() => {
    if (!isModalOpen) return;

    setValue("name", user.name);
    setValue("email", user.email);
    setValue("username", user.username);
  }, [isModalOpen, setValue]);

  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const onSubmit: SubmitHandler<CreateUserValues> = async (data) => {
    setLoading(true);
    try {
      const result = await updateUser(user.id, data);
      showToast("User updated successfully.", "success");
      onUpdated(result);
      handleClose();
    } catch (err) {
      showToast("Failed to update user.", "error");
    } finally {
      setLoading(false);
    }
  };

  const UpdateForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {errors.name && (
          <p className="py-2 text-sm text-red-500 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          {...register("username")}
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div className="flex justify-end">
        <Button
          label={loading ? "Updating..." : "Update"}
          isDisabled={loading}
        />
      </div>
    </form>
  );

  return (
    <>
      <button className="cursor-pointer" onClick={handleModalOpen}>
        <img src="/static/images/edit.svg" alt="Update Icon" />
      </button>
      {isModalOpen && (
        <Modal
          title="Update User"
          open={isModalOpen}
          onClose={handleClose}
          children={<UpdateForm />}
        />
      )}
    </>
  );
};

export default UpdateUser;
