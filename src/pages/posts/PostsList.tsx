import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import SelectUser from "./SelectUser";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

interface PostsListProps {
  posts: Post[];
  users: any;
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMoreRef: (node?: Element | null | undefined) => void;
  selectedUserId: number | string;
  onPostDeleted: (id: number) => void;
  onPostUpdated: (result: Post) => void;
  onSelectedUserId: (id: number | string) => void;
}

const PostsList: React.FC<PostsListProps> = ({
  posts,
  users,
  loading,
  initialLoading,
  error,
  hasMore,
  loadMoreRef,
  selectedUserId,
  onPostDeleted,
  onPostUpdated,
  onSelectedUserId,
}) => {
  if (initialLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!posts.length && !initialLoading) return <NotFound target="Posts" />;

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-end">
        <SelectUser
          users={users}
          handleSelectedUserId={onSelectedUserId}
          selectedUserId={selectedUserId}
        />
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {posts.map((post, index) => (
          <li
            key={`${post.id}-${index}`}
            className="flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="size-8 md:size-12 flex-none rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                #{post.id}
              </div>
              <div className="min-w-0 flex-auto">
                <div className="flex flex-col md:flex-row gap-1">
                  <p className="text-sm/6 text-black">Post #{post.id}</p>
                  <span className="hidden md:block">-</span>
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

            <div className="shrink-0 flex flex-row items-start gap-2">
              <DeletePost
                id={post.id}
                onDeleted={() => onPostDeleted(post.id)}
              />
              <UpdatePost onUpdated={onPostUpdated} post={post} users={users} />
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
