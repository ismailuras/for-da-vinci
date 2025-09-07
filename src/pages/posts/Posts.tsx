import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/Button";
import PostsList from "./PostsList";
import Modal from "@/components/CustomModal";
import CreatePost from "./CreatePost";
import { fetchPostByUserId, fetchPosts } from "@/services/posts";
import { useInView } from "react-intersection-observer";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const Posts: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [selectedUserId, setSelectedUserId] = useState<number | string>("");

  const POSTS_PER_PAGE = 10;

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  const fetchMorePosts = useCallback(
    async (pageNum: number, isInitial: boolean = false) => {
      if (loading) return;

      setLoading(true);
      try {
        let response;
        if (selectedUserId) {
          response = await fetchPostByUserId(
            selectedUserId,
            pageNum,
            POSTS_PER_PAGE
          );
        } else {
          response = await fetchPosts(pageNum, POSTS_PER_PAGE);
        }

        if (response.length === 0 || response.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }

        if (isInitial) {
          setPosts(response);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
        if (isInitial) {
          setInitialLoading(false);
        }
      }
    },
    [loading, selectedUserId]
  );

  useEffect(() => {
    fetchMorePosts(1, true);
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      setPage(1);
      setHasMore(true);
      setInitialLoading(true);
      fetchMorePosts(1, true);
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (inView && hasMore && !loading && !initialLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMorePosts(nextPage);
    }
  }, [inView, hasMore, loading, initialLoading, page, fetchMorePosts]);

  const handleClose = () => setModalOpen(false);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    handleClose();
  };

  const handlePostDeleted = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handlePostUpdated = (result: Post) => {
    const { id } = result;

    if (id) {
      const newList = [...posts];
      const updatedPost: number = newList.findIndex((item) => item.id === id);
      if (updatedPost !== -1) {
        newList[updatedPost] = result;
        setPosts(newList);
      }
    }
  };

  const handleSelectedUserId = (id: number | string) => {
    setSelectedUserId(id);
  };

  return (
    <div className="px-6 xl:px-0">
      <div className="w-full flex justify-end ">
        <Button label="Add New Post" onClick={() => setModalOpen(true)} />
      </div>

      <div className="my-6">
        <PostsList
          posts={posts}
          loading={loading}
          initialLoading={initialLoading}
          error={error}
          hasMore={hasMore}
          loadMoreRef={loadMoreRef}
          selectedUserId={selectedUserId}
          onPostDeleted={handlePostDeleted}
          onPostUpdated={handlePostUpdated}
          onSelectedUserId={handleSelectedUserId}
        />
      </div>

      {isModalOpen && (
        <Modal
          title="New Post"
          open={isModalOpen}
          children={
            <CreatePost
              onClose={handleClose}
              onPostCreated={handlePostCreated}
            />
          }
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Posts;
