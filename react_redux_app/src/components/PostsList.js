import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "../features/posts/postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const error = useSelector(getPostsError);
  const status = useSelector(getPostsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;
  if (status === "loading") {
    content = <p>Loading ...</p>;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
