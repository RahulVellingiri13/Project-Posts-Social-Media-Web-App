import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoj = {
  thumbsUp: "👍🏻",
  wow: "🤩",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕️",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  //'Object' and '.entries' are methods here, so that we can display the emojis as buttons
  const reactionButtons = Object.entries(reactionEmoj).map(([name, emoj]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reaction: name }));
        }}
      >
        {emoj} {post.reactions[name]}
      </button>
    );
  });

  return <>
  {reactionButtons}
  </>;
};

export default ReactionButtons;
