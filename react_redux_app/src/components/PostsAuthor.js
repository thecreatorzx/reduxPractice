import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";

import React from "react";

const PostsAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : "Unknown Author"}</span>;
};

export default PostsAuthor;
