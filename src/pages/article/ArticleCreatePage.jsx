import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {  useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout";
import toast from "react-hot-toast";
import Editor from "../../components/editor/Editor";
import { createPost } from "../../services/posts";
import ArticlePicture from "./ArticlePicture";

const ArticleCreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const [body, setBody] = useState(null);
  const userState = useSelector((state) => state.user);
  const [photoFile, setPhotoFile] = useState(null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      caption: '',
    },
    mode: "onChange",
  });

  const submitHandler = async (data) => {
    const {title, caption} = data
    try {
      setIsLoading(true);
      const token = userState.userInfo.token;
      const createdPost = await createPost({ title, caption, token, body, postPicture : photoFile});
      navigate(`/blog/${createdPost.slug}`)
      toast.success("Created article successfully");
    }
     catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <main className="container mx-auto px-5 py-10">
      <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-dark-hard mb-8">
            Create Article
          </h1>
          <ArticlePicture photo={photoFile} setPhoto={setPhotoFile}/>
          <Editor
            content={body}
            editable={true}
            onDataChange={(data) => setBody(data)}
          />
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 mt-6 w-full">
              <label
                htmlFor="title"
                className="text-[#5a7184] font-semibold block"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", {
                  minLength: {
                    value: 6,
                    message: "Title should be at least 6 characters",
                  },
                })}
                placeholder="Enter title"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.title ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.title?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="caption"
                className="text-[#5a7184] font-semibold block"
              >
                Caption
              </label>
              <input
                type="text"
                id="caption"
                {...register("caption", {
                  minLength: {
                    value: 6,
                    message: "Caption should be at least 6 characters",
                  },
                })}
                placeholder="Enter caption"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.caption ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.caption?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.caption?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Create Article
            </button>
          </form>
        </div>
      </main>
    </MainLayout>
  );
};

export default ArticleCreatePage;
