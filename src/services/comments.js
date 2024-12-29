import axios from "axios";

const createComment = async ({ desc, parent, replyOnUser, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.post(
      "/api/comments",
      {
        desc,
        slug,
        parent,
        replyOnUser,
      },
      config
    );
    return resp.data;
  } catch (error) {
    if (error.response.data && error.response.data.message)
      throw new Error(error.response.data.message);
    throw error;
  }
};
const updateComment = async ({ desc, token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.put(
      `/api/comments/${commentId}`,
      {
        desc,
      },
      config
    );
    return resp.data;
  } catch (error) {
    if (error.response.data && error.response.data.message)
      throw new Error(error.response.data.message);
    throw error;
  }
};

const deleteComment = async ({ desc, token, commentId }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.delete(
        `/api/comments/${commentId}`,
        config
      );
      return resp.data;
    } catch (error) {
      if (error.response.data && error.response.data.message)
        throw new Error(error.response.data.message);
      throw error;
    }
  };

export { createComment, updateComment, deleteComment };
