import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { fetchPosts } from "@/services/posts";
import { useEffect, useState, useCallback } from "react";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useInView } from "react-intersection-observer";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [parent] = useAutoAnimate();

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
        const response = await fetchPosts(pageNum, POSTS_PER_PAGE);

        if (response.length === 0 || response.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }

        if (isInitial) {
          setPosts(response);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response]);
        }
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
        if (isInitial) {
          setInitialLoading(false);
        }
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchMorePosts(1, true);
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading && !initialLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMorePosts(nextPage);
    }
  }, [inView, hasMore, loading, initialLoading, page, fetchMorePosts]);

  const handlePostDeleted = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handlePostUpdated = (result: Post) => {
    const { id } = result;

    if (id) {
      const newList = [...posts];
      const updatedPost: number = newList.findIndex(
        (item: any) => item.id === id
      );
      if (updatedPost !== -1) {
        newList[updatedPost] = result;
        setPosts(newList);
      }
    }
  };

  if (initialLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!posts.length && !initialLoading) return <NotFound target="Posts" />;

  return (
    <div className="space-y-4">
      <ul role="list" className="divide-y divide-gray-200">
        {posts.map((post, index) => (
          <li
            key={`${post.id}-${index}`}
            className="flex justify-between gap-x-6 py-5"
            ref={parent}
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="size-12 flex-none rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                #{post.id}
              </div>
              <div className="min-w-0 flex-auto">
                <div className="flex gap-1">
                  <p className="text-sm/6 text-black">Post #{post.id}</p>
                  {"-"}
                  <p className="text-sm/6 font-semibold text-black">
                    {post.title}
                  </p>
                </div>
                <p className="mt-1 text-xs/5 text-gray-400">
                  {post.body.substring(0, 100)}...
                </p>
                <p className="mt-1 text-xs/5 text-gray-500">
                  User ID: {post.userId}
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-end sm:gap-2">
              <DeletePost
                id={post.id}
                onDeleted={() => handlePostDeleted(post.id)}
              />
              <UpdatePost onUpdated={handlePostUpdated} post={post} />
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {loading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">
                Loading more posts...
              </span>
            </div>
          )}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <p className="text-gray-500 font-medium">All posts loaded!</p>
          <p className="text-sm text-gray-400 mt-1">
            You've reached the end of the feed
          </p>
        </div>
      )}

      {posts.length === 0 && !loading && !initialLoading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-500">Start by creating your first post!</p>
        </div>
      )}
    </div>
  );
};

export default PostsList;
