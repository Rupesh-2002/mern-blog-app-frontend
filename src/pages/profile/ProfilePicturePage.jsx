import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import stables from "../../constants/stables";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import { updateProfilePicture } from "../../services/users";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../store/reducers/userReducer";


const ProfilePicturePage = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const avatar = userState?.userInfo?.avatar;
  const navigate = useNavigate()
  const handleFileChange = async (e) => {
    try {
      const token = userState.userInfo.token
      const file = e.target.files[0];
      const data = await updateProfilePicture({ token, file });
      localStorage.setItem('account', JSON.stringify(data))
      dispatch(setUserInfo(data))
      navigate('/')
      toast.success("Updated Profile Picture");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <MainLayout>
      <div className="w-full flex items-center my-20 justify-center">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer bg-transparent flex flex-col items-center gap-4"
        >
          <div className="rounded-full w-40 h-40  outline outline-offset-2 outline-1 outline-primary overflow-hidden">
            {avatar ? (
              <>
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </>
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-40 h-40 text-primary" />
              </div>
            )}
          </div>
          <div
            type="button"
            className="border border-blue-500 rounded-lg px-4 py-2 text-blue-500"
          >
            Update Profile Picture
          </div>
        </label>
        <input
          type="file"
          className="sr-only"
          id="profilePicture"
          onChange={handleFileChange}
        />
      </div>
    </MainLayout>
  );
};

export default ProfilePicturePage;
