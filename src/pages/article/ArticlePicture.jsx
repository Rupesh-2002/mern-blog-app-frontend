import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import stables from "../../constants/stables";
import { useSelector } from "react-redux";


const ArticlePicture = ({ photo, setPhoto, post=null }) => {
  const [imagePreview, setImagePreview] = useState(null)
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result); // Set the image preview URL
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    setPhoto(file);
  };


  return (
    <>
      <div className="w-full flex items-center gap-x-4 mb-6">
        <div className="relative w-32 h-32 outline outline-offset-2 outline-1 lutline-primary overflow-hidden">
          <label
            htmlFor="postPicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {
                imagePreview ? (
                    <img
                src={imagePreview}
                alt="profile"
                className="w-full h-full object-contain"
              />
                ) : (
                  post?.photo ? (
                    <img
                    src={stables.UPLOAD_FOLDER_BASE_URL + post.photo}
                    alt="profile"
                    className="w-full h-full object-contain"
                  />
                  ) : (

              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
                  )

                )
            }
            (
            )
            {/* } */}
          </label>
          <input
            type="file"
            className="sr-only"
            id="postPicture"
            onChange={handleFileChange}
          />
        </div>
        {
           photo && <h3 className="text-xl font-bold">{photo.name}</h3>
        }
      </div>
    </>
  );
};

export default ArticlePicture;