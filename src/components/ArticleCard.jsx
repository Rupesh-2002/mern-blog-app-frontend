import React from "react";
import images from "../constants/images";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import stables from "../constants/stables";
import { Link } from "react-router-dom";
const ArticleCard = ({ post }) => {
  return (
    <article className="rounded-xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <Link to={`/blog/${post.slug}`}>
      <img
        className="w-full object-cover object-center max-h-52"
        src={
          post.photo
            ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
            : images.samplePostImage
        }
        alt=""
      />
      </Link>
      <div className="p-5">
      <Link to={`/blog/${post.slug}`}>
        <h1 className="text-2xl font-bold text-dark-soft">{post.title}</h1>
        <p className="mt-2 ">{post.caption}</p>
      </Link>

        <div className="flex justify-between flex-nowrap items-center mt-4">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.userImage
              }
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${
                    post.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                  } w-fit bg-opacity-20 p-1.5 rounded-full`}
                >
                  {post.user.verified ? (
                    <BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
                  ) : (
                    <AiOutlineClose className="w-1.5 h-1.5 text-red-500" />
                  )}
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  {post.user.verified ? "Verified" : "Unverified"} writer
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
          {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
