import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../features/posts/postsSlice";
import { selectAllUsers } from "../features/users/usersSlice";

import React from "react";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a post form</h2>
      <form>
        <label htmlFor="postTitle">Add Title</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Select Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">-- Select an Author --</option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Add Content: </label>
        <input
          type="textarea"
          id="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={onSavePostClicked} disabled={!canSave}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
