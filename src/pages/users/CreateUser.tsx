import React, { useState } from "react";
import { Button } from "@/components/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createUser } from "@/services/users";
import { showToast } from "@/utils/showToast";
import type { CreateUserValues } from "./types";
import { resolver } from "./resolver";
import type { CreateUserResponse } from "@/types/fetchUsersTypes";

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

interface CreateUserProps {
  onClose: () => void;
  onUserCreated: (user: User) => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onClose, onUserCreated }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserValues>({ resolver });

  const onSubmit: SubmitHandler<CreateUserValues> = async (data) => {
    setLoading(true);
    try {
      const response: CreateUserResponse = await createUser(data);
      const newUser: User = {
        id: response.id,
        name: response.name,
        username: data.username,
        email: response.email,
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      };
      onUserCreated(newUser);
      onClose();
      showToast("User has been successfully created.", "success");
    } catch (error) {
      console.log(error);
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
          placeholder="John Doe"
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
          placeholder="name@example.com"
        />
        {errors.email && (
          <p className="py-2 text-sm text-red-500 font-medium">
            {errors.email.message}
          </p>
        )}
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
        {errors.username && (
          <p className="py-2 text-sm text-red-500 font-medium">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          label={loading ? "Creating..." : "Create"}
          isDisabled={loading}
        />
      </div>
    </form>
  );
};

export default CreateUser;
