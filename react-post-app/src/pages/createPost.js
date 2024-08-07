import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { motion } from 'framer-motion';

const createPost = async (postData) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);
  return response.data;
};

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setSuccessMessage('Post created successfully!');
      setTitle('');
      setBody('');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }
    if (body.length > 1000) {
      alert('Description must be 1000 characters or less');
      return;
    }
    mutation.mutate({ title, body, userId: 1 });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-semibold mb-4 text-primary-700">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        {successMessage && (
          <div className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3" role="alert">
            <p className="font-bold">Success</p>
            <p className="text-sm">{successMessage}</p>
          </div>
        )}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-primary-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-primary-700">
            Description
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            rows={5}
            className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          ></textarea>
          <p className="mt-1 text-sm text-primary-500">{body.length}/1000 characters</p>
        </div>
        {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600 disabled:bg-blue-200"
          >
            {mutation.isLoading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default CreatePost;
