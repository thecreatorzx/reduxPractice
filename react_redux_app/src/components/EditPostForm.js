import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  updatePost,
  deletePost,
} from "../features/posts/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../features/users/usersSlice";
import React from "react";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");
  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    );
  }

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("failed to update the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

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
          defaultValue={userId}
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
        <button onClick={onDeletePostClicked}>Submit</button>
      </form>
    </section>
  );
};

export default EditPostForm;
