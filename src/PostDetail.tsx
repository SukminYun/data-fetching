import './App.css';

import React from 'react';
import { useEffect, useState } from 'react';

type PostComment = {
  postID: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface PostCommentprops {
  selectedID: number;
}

const PostDetail: React.FC<PostCommentprops> = ({ selectedID }) => {
  const [comments, setComment] = useState<PostComment[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    let ignore = false;

    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedID}`)
      .then((response) => response.json() as Promise<Post>)
      .then((response) => {
        if (ignore) return;
        setPost(response);
      })
      .catch(() => {
        window.alert('데이터를 불러오는데 실패했습니다');
      });

    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedID}/comments`)
      .then((response) => response.json() as Promise<PostComment[]>)
      .then((response) => {
        if (ignore) return;
        setComment(response);
      })
      .catch(() => {
        window.alert('데이터를 불러오는데 실패했습니다');
      });

    return () => {
      ignore = true;
    };
  }, [selectedID]);

  if (post === null) return <div> Loading~ </div>;

  return (
    <div className="postdetail">
      <h1>내용</h1>
      <div className="CommentPost">{post.body}</div>
      <h1>댓글</h1>
      {comments.map((comment) => (
        <div key={comment.id} className="CommentPost">
          <div> 작성자: {comment.email}</div>
          <div> {comment.body}</div>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
