import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  //rewriting the onSavePostClicked logic here above;

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  // const onSavePostClicked = () => {
  //   if (title && content) {
  //     dispatch(
  //       postAdded(
  //         // {id:nanoid(),
  //         // title,
  //         // content,}
  //         //rewriting the code, here for convenince of structure of data
  //         title,
  //         content,
  //         userId
  //       )
  //     );
  //     setTitle("");
  //     setContent("");
  //     setUserId("");
  //   }
  // };

  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <>
      <section>
        <h2> Add a new Post </h2>
        <form>
          <label htmlFor="postTitle"> Post Title:</label>
          <input
            id="postTite"
            name="postTitle"
            type="text"
            value={title}
            onChange={onTitleChanged}
          />

          <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {userOptions}
          </select>

          <label htmlFor="postContent"> Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            type="text"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
        </form>
      </section>
    </>
  );
};

export default AddPostForm;
