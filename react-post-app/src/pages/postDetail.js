import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fetchPost = async ({ queryKey }) => {
  const [_, postId] = queryKey;
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return response.data;
};

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { data: post, isLoading, isError, error } = useQuery(['post', id], fetchPost);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      className="bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-primary-800">{post.title}</h2>
      <p className="text-primary-600 mb-4">{post.body}</p>
      <div className="flex justify-start mt-4">
        <button
          onClick={() => navigate(-1)}  
          className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
}

const SkeletonLoader = () => (
  <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
    <div className="h-6 bg-primary-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-primary-100 rounded w-full mb-2"></div>
    <div className="h-4 bg-primary-100 rounded w-full mb-2"></div>
    <div className="h-4 bg-primary-100 rounded w-3/4"></div>
  </div>
);

export default PostDetail;
