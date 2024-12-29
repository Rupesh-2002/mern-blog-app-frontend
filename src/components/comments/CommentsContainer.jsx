import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { createComment, updateComment, deleteComment} from "../../services/comments";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CommentsContainer = ({ loggedinUserId, comments, postSlug }) => {
  const [affectedComment, setAffectedComment] = useState(null);
  const [postComments, setPostComments] = useState(comments);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userState = useSelector((state) => state.user);
  const addCommentHandler = async (
    value,
    parent = null,
    replyOnUser = null
  ) => {
    try {
      setIsLoading(true);
      const token = userState.userInfo?.token;
      const savedComment = await createComment({
        desc: value,
        parent,
        replyOnUser,
        slug: postSlug,
        token: token,
      });
      setPostComments([savedComment, ...postComments]);
      toast.success("Your comment saved successfully");
    } catch (error) {
      toast.error(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  
  const addReplyCommentHandler = async (value, parent, replyOnUser) => {
    try {
      setIsLoading(true);
      const token = userState.userInfo?.token;
      const repliedComment = await createComment({
        desc: value,
        parent,
        replyOnUser,
        slug: postSlug,
        token: token,
      });
      const parentComment = findParentComment(postComments, repliedComment)
      parentComment.replies.push(repliedComment)
      setPostComments([...postComments])
      toast.success("Your comment added successfully");
    } catch (error) {
      toast.error(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const updateCommentHandler =async (value, commentId) => {
    try {
      setIsLoading(true);
      const token = userState.userInfo?.token;
      const savedComment = await updateComment({
        desc: value, token, commentId
      });
      setPostComments(prevComments =>{
        return prevComments.map(comment=>{
          if(comment._id === savedComment._id){
            comment.desc = savedComment.desc
          }
          return comment
        })
      })
      toast.success("Your comment updated successfully");
    } catch (error) {
      toast.error(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteCommentHandler = async(commentId) => {
    try {
      setIsLoading(true);
      const token = userState.userInfo?.token;
      const deletedComment = await deleteComment({
        token, commentId
      });
      const newComments = deletePostComment(postComments, deletedComment)
      setPostComments(newComments)
      toast.success("Your comment deleted successfully");
    } catch (error) {
      toast.error(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CommentForm
        btnLabel={"Save"}
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoading}
      />
      <div className="mt-8 space-y-2">
        {postComments?.map((comment, ind) => {
          return (
            <Comment
              key={ind}
              comment={comment}
              loggedinUserId={loggedinUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addReplyComment={addReplyCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              replies={comment.replies}
            />
          );
        })}
      </div>
    </div>
  );
};

function findParentComment(comments, childComment){
  let parentComment = null;

  for(let comment of comments){
    if(comment._id === childComment.parent){
      parentComment = comment
      break
    }
    if(comment.replies.length > 0){
      parentComment = findParentComment(comments.replies, childComment)
    }
  }
  return parentComment
}

function deletePostComment(comments, deletedComment){
  let newComments = []
  // debugger
  for(let comment of comments){
    if(comment._id !== deletedComment._id){
      newComments.push(comment)
      if(comment?.replies?.length>0){
        comment.replies = deletePostComment(comment.replies, deletedComment)
      }
    }
    // if(comment?.replies?.length > 0){
    //   newComments = newComments.concat(deletePostComment(comment.replies, deletedComment))
    // }
  }
  return newComments
}
export default CommentsContainer;
