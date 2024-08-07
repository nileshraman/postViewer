import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

const fetchPosts = async ({ queryKey }) => {
  const [_, page] = queryKey;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${page * 10}&_limit=10`
  );
  return response.data;
};

function PostList() {
  const [page, setPage] = React.useState(0);
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery(["posts", page], fetchPosts, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-primary-700">Posts</h2>
        <Link
          to="/create"
          className="text-primary-500 font-bold text-3xl"
          data-tooltip-id="createTooltip"
        >
          +
        </Link>

        <Tooltip id="createTooltip" place="top" effect="solid">
          Create New Post
        </Tooltip>
      </div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <Link
                to={`/post/${post.id}`}
                className="block hover:bg-primary-50 transition duration-300"
              >
                <h3 className="text-lg font-medium text-primary-800">
                  {post.title}
                </h3>
                <p className="mt-1 text-primary-600">
                  {post.body.slice(0, 100)}...
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setPage((old) => Math.max(0, old - 1))}
          disabled={page === 0}
          className="bg-primary-500 text-white px-4 py-2 rounded disabled:bg-primary-200 transition duration-300 hover:bg-primary-600"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={posts && posts.length < 10}
          className="bg-primary-500 text-white px-4 py-2 rounded disabled:bg-primary-200 transition duration-300 hover:bg-primary-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 animate-pulse"
      >
        <div className="h-4 bg-primary-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-primary-100 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default PostList;
