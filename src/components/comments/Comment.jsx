import React from "react";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import CommentForm from "./CommentForm";
import images from "../../constants/images";
const Comment = ({
  comment,
  affectedComment,
  setAffectedComment,
  parentId,
  addReplyComment,
  loggedinUserId,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggedin = Boolean(loggedinUserId);
  const commentBelongsToUser = loggedinUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg"
      id={`comment-${comment?._id}`}
    >
      <img
        src={
          comment?.user?.avatar
            ? comment.user.avatar
            : images.userImage
        }
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className=" flex flex-col grow">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="mt-[10px] text-dark-light">{comment.desc}</p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        <div className="flex flex-wrap items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggedin && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>{
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}

          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addReplyComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addReplyComment={addReplyComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                loggedinUserId={loggedinUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
