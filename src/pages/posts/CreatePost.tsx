import React, { useState } from "react";
import { Button } from "@/components/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createPost } from "@/services/posts";
import { showToast } from "@/utils/showToast";
import type { CreatePostValues } from "./types";
import { resolver } from "./resolver";

interface CreatePostProps {
  onClose: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostValues>({ resolver });

  const onSubmit: SubmitHandler<CreatePostValues> = async (data) => {
    setLoading(true);
    try {
      await createPost(data);
      onClose();
      showToast("Post has been successfully created.", "success");
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
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="py-2 text-sm text-red-500 font-medium">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="body"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Body
        </label>
        <textarea
          {...register("body")}
          id="body"
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter post content"
        />
        {errors.body && (
          <p className="py-2 text-sm text-red-500 font-medium">
            {errors.body.message}
          </p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="userId"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          User ID
        </label>
        <input
          {...register("userId", { valueAsNumber: true })}
          type="number"
          id="userId"
          placeholder="1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="flex justify-end">
        <Button label={loading ? "Creating..." : "Create"} />
      </div>
    </form>
  );
};

export default CreatePost;
