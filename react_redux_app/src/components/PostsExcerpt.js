import React from "react";
import PostsAuthor from "./PostsAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title.substring(0, 30)}</h3>
      <p>
        {post.body ? post.body.substring(0, 70) : "No content available."}...
      </p>

      <p className="postCredit">
        <Link to={`post/${post.id}`}> View Post -- </Link>
        <PostsAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
