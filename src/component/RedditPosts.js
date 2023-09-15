// src/RedditPosts.js
import "./index.css"


import React, { useState, useEffect } from 'react';

function RedditPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(data => {
        // Extract the list of posts from the JSON data
     
        const redditPosts = data.data.children.map(post => ({
          title: post.data.title,
          selfTextHTML: post.data.selftext_html,
          url: post.data.url,
          score: post.data.score,
          id: post.data.id, // Unique identifier for React keys
        }));
        setPosts(redditPosts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="">
      <h1 className="text-center">Reddit Posts</h1>
      <ul>
        {posts.map(post => (
          <div>
          <div className="card p-2 m-3 alert alert-primary">
          <div className="card-body" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.selfTextHTML}</p>
            <p>URL: <a href={post.url} target="_blank" rel="noopener noreferrer">{post.url}</a></p>
            <p>Score: {post.score}</p>
          </div>
          </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default RedditPosts;
