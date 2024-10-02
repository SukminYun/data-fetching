import './App.css';

import React from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface PostListprops {
  posts: Post[];
  selectedID: number;
  setID: (id: number) => void;
}

const PostList: React.FC<PostListprops> = ({ posts, selectedID, setID }) => {
  return (
    <div className="postlist">
      <h1>포스트 목록</h1>

      {posts.map((post, index) => (
        <div
          key={post.id}
          className={post.id === selectedID ? 'Post SelectedPost' : 'Post'}
          onClick={() => {
            setID(post.id);
          }}
        >
          {index + 1}. {post.title}{' '}
        </div>
      ))}
    </div>
  );
};

export default PostList;
