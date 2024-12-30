import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import images from "../../constants/images";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsContainer from "../../components/comments/CommentsContainer";
import { deletePost, getSinglePost } from "../../services/posts";
import { useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import ArticleDetailSkeleton from "../../components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import Editor from "../../components/editor/Editor";
import { FiEdit } from "react-icons/fi";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const userState = useSelector((state) => state.user);
  const [deletedPost, setDeletedPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      try {
        setIsLoading(true);
        const post = await getSinglePost({ slug });
        setPost(post);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getPost();
  }, []);

  const deletePostHandler = async () => {
    try {
      setIsLoading(true);
      const token = userState.userInfo.token;
      await deletePost({ slug, token });
      setDeletedPost(true);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MainLayout>
      
      {deletedPost ? (
        <h1 className="text-green-500 h-[100px] flex items-center justify-center">Post Deleted Successfully</h1>
      ) : isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message={isError.message} />
      ) : (
        <main className="container mx-auto max-w-3xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <img
              className="rounded-xl w-full"
              src={
                post?.photo
                  ? post?.photo
                  : images.samplePostImage
              }
              alt={post?.title}
            />
            <div className="mt-4 flex gap-2">
              {post?.categories &&
                post?.categories.map((category) => (
                  <Link
                    to={`/blog?category=${category.name}`}
                    className="text-primary text-sm inline-block md:text-base"
                  >
                    {category.name}
                  </Link>
                ))}
            </div>
            <h1 className="text-xl font-medium mt-4 text-dark-hard md:text-[26px]">
              {post?.title}
            </h1>
            <div className="w-full my-4">
              {!isLoading && !isError && (
                <>
                  {userState?.userInfo?._id === post?.user?._id && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/blog/update/${post?.slug}`)}
                      >
                        <span className="h-9 flex items-center gap-1">
                          <FiEdit />
                          Edit
                        </span>
                      </button>
                      <button onClick={deletePostHandler}>
                        <span className="h-9 flex items-center gap-1">
                          <AiTwotoneDelete />
                          Delete Article
                        </span>
                      </button>
                    </div>
                  )}
                  <Editor content={post?.body} editable={false} />
                </>
              )}
            </div>
            <CommentsContainer
              comments={post?.comments}
              className="mt-10"
              loggedinUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>
        </main>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
