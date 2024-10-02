import './reset.css';
import './App.css';

import { useEffect, useState } from 'react';

import PostDetail from './PostDetail';
import PostList from './PostList';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const App = () => {
  const [posts, setPost] = useState<Post[]>([]);
  const [selectedID, setID] = useState<number>(1);

  useEffect(() => {
    let ignore = false;

    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json() as Promise<Post[]>)
      .then((response) => {
        if (ignore) return;
        setPost(response);
      })
      .catch(() => {
        window.alert('데이터를 불러오는데 실패했습니다');
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (posts.length === 0)
    return (
      <div className="wrapper">
        <div> Loading~ </div>
      </div>
    );

  return (
    <div className="wrapper">
      <PostList posts={posts} selectedID={selectedID} setID={setID} />
      <PostDetail selectedID={selectedID} />
    </div>
  );
};
