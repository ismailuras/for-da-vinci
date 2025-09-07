import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Modal from "@/components/CustomModal";
import { Button } from "@/components/Button";
import { showToast } from "@/utils/showToast";
import { updatePost } from "@/services/posts";
import type { CreatePostValues } from "./types";
import { resolver } from "./resolver";

interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface UpdatePostProps {
  onUpdated: any;
  post: PostProps;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ onUpdated, post }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostValues>({ resolver: resolver });

  useEffect(() => {
    if (!isModalOpen) return;

    setValue("title", post.title);
    setValue("body", post.body);
    setValue("userId", post.userId);
  }, [isModalOpen, setValue]);

  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const onSubmit: SubmitHandler<CreatePostValues> = async (data) => {
    setLoading(true);
    try {
      const result = await updatePost(post.id, data);
      showToast("Post updated successfully.", "success");
      onUpdated(result);
      handleClose();
    } catch (err) {
      showToast("Failed to update post.", "error");
    } finally {
      setLoading(false);
    }
  };

  const UpdateForm = () => (
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div className="flex justify-end">
        <Button label={loading ? "Updating..." : "Update"} />
      </div>
    </form>
  );

  return (
    <>
      <button className="cursor-pointer" onClick={handleModalOpen}>
        <img src="/assets/edit.svg" alt="Update Icon" />
      </button>
      {isModalOpen && (
        <Modal
          title="Update Post"
          open={isModalOpen}
          onClose={handleClose}
          children={<UpdateForm />}
        />
      )}
    </>
  );
};

export default UpdatePost;
