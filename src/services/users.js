import axios from "axios";

export const signup = async ({ name, email, password }) => {
  try {
    const resp = await axios.post(
      "/api/users/register",
      {
        name,
        email,
        password,
      }
    );
    const {data} = resp
    return data;
  } catch (error) {
    if (error.response?.data && error.response.data.message){
      throw new Error(error.response.data.message)
    } 
    else{
      throw error
    }
  }
};

export const login = async ({ email, password }) => {
  try {
    const resp = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      }
    );
    const {data} = resp
    return data;
  } catch (error) {
    if (error.response?.data && error.response.data.message){
      throw new Error(error.response.data.message)
    } 
    else{
      throw error
    }
  }
};


export const updateProfilePicture =async({token, file})=>{
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = new FormData()
      formData.append('profilePicture',file) 
      const resp = await axios.put(`/api/users/updateProfilePicture`,
        formData,
        config
      );
      return resp.data
    }
    catch(error){
      if (error.response?.data && error.response.data.message){
        throw new Error(error.response.data.message)
      } 
      else{
        throw error
      }
    }
}
