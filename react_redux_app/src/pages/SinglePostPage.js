import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../features/posts/postsSlice";
import PostsAuthor from "../components/PostsAuthor";
import TimeAgo from "../components/TimeAgo";
import ReactionButtons from "../components/ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
      <section>
        <h2>Post Not Found!</h2>
      </section>
    );
  }
  return (
    <article className="singlePost">
      <h3>{post.title}</h3>
      <p>{post.body ? post.body : "No content available."}</p>

      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}> Edit Post </Link>
        <PostsAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
