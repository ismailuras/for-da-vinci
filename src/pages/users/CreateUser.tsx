import React, { useState } from "react";
import { Button } from "@/components/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createUser } from "@/services/users";
import { showToast } from "@/utils/showToast";
import type { CreateUserValues } from "./types";
import { createUserResolver } from "./resolvers";

interface CreateUserProps {
  onClose: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserValues>({ resolver: createUserResolver });

  const onSubmit: SubmitHandler<CreateUserValues> = async (data) => {
    setLoading(true);
    try {
      await createUser(data);
      onClose();
      showToast("User has been successfully created.", "success");
    } catch (error) {
      showToast("An error occured. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          placeholder="name@flowbite.com"
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
          placeholder="name@flowbite.com"
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
          placeholder="justusername"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="flex justify-end">
        <Button label={loading ? "Creating..." : "Create"} />
      </div>
    </form>
  );
};

export default CreateUser;
