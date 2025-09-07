import React, { useState } from "react";
import { Button } from "@/components/Button";
import PostsList from "./PostsList";
import Modal from "@/components/CustomModal";
import CreatePost from "./CreatePost";

const Posts: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>();

  const handleClose = () => setModalOpen(false);

  return (
    <div className="px-6 xl:px-0">
      <div className="w-full flex justify-end ">
        <Button label="Add New Post" onClick={() => setModalOpen(true)} />
      </div>

      <div className="my-6">
        <PostsList />
      </div>

      {isModalOpen && (
        <Modal
          title="New Post"
          open={isModalOpen}
          children={<CreatePost onClose={handleClose} />}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Posts;
