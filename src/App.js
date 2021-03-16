import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/pagination';
import axios from 'axios';
import './App.css';

function App() {
  // set the post here
  const [posts, setPosts] = useState([]);
  // set the loading here 
  const [loading, setLoading] = useState(false);
  // set the current page for the pagination
  const [currentPage, setCurrentPage] = useState(1);
  // set the number of posts you want per page
  const [postsPerPage] = useState(12);

  // set the useEffect function with axios
  // to get the pagination data
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }
    // initiate the function
    fetchPosts();
  },[]);

  // Get the index of the last post
  const indexOfLastPost  = currentPage * postsPerPage;
  // Get the index of the first post
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Get the current post
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to toggle the pagination functionality
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Paginated Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
