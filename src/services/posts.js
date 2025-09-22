import axios from "axios";

const getAllPosts = async ({searchKeyword, page = null}) => {
  try {
    const resp = await axios.get(`/api/posts?searchKeyword=${searchKeyword}`);
    const data = {
      posts : resp.data,
      currPage : parseInt( resp.headers['x-currentpage']),
      totalPages :parseInt( resp.headers['x-totalpagecount'])
    } 
    return data
  } catch (error) {
    if (error.response.data && error.response.data.message)
      throw new Error(error.response.data.message);
    throw error
  }
};
const getSinglePost = async ({slug}) => {
  try {
    const resp = await axios.get(`/api/posts/${slug}`);
    return resp.data;
  } catch (error) {
    if (error.response.data && error.response.data.message)
      throw new Error(error.response.data.message);
    throw error
  }
};

const updatePost =async ({slug, token, body, title, caption, postPicture})=>{
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData()
    formData.append('document',JSON.stringify( {
      body, title, caption
    }))
    formData.append('postPicture', postPicture)
  
    const resp = await axios.put(`/api/posts/${slug}`,
      formData,
      config
    );
    return resp.data;
  } catch (error) {
    if (error?.response?.data && error.response.data.message)
      throw new Error(error.response.data.message);
    throw error
  }
}
const createPost =async ({token, body, title, caption, postPicture})=>{
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData()
    formData.append('document',JSON.stringify( {
      body, title, caption
    }))
    formData.append('postPicture', postPicture)
    const resp = await axios.post(`/api/posts/`,
      formData,
      config
    );
    return resp.data;
  } catch (error) {
    if (error?.response?.data && error.response.data.message)
      throw new Error(error.response.data.message);
    throw error
  }
}
const deletePost =async ({token, slug})=>{
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = await axios.delete(`/api/posts/${slug}`,
      config
    );
    return resp.data;
  } catch (error) {
    if (error?.response?.data && error.response.data.message)
      throw new Error(error.response.data.message);
    throw error
  }
}

export { getAllPosts, getSinglePost, updatePost, createPost, deletePost};
