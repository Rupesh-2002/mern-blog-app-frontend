import React, { useEffect, useState } from "react";
import ArticleCard from "../../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { getAllPosts } from "../../../services/posts";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";

const Articles = ({ searchKeyword }) => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  const [isErrorFetchingMorePosts, setIsErrorFetchingMorePosts] =
    useState(false);
  const [isErrorFetchingPosts, setIsErrorFetchingPosts] = useState(false);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getPosts() {
      try {
        setIsLoadingPosts(true);
        const { posts, currPage, totalPages } = await getAllPosts({
          searchKeyword,
        });
        setArticles(posts);
        setCurrentPage(currPage);
        setTotalPages(totalPages);
      } catch (error) {
        setIsErrorFetchingPosts(true);
      } finally {
        setIsLoadingPosts(false);
      }
    }
    getPosts();
  }, [searchKeyword]);

  const loadMorePostsHandler = async () => {
    try {
      setIsLoadingMorePosts(true);
      const data = await getAllPosts({ searchKeyword, page: currentPage + 1 });
      const { currPage, posts, totalPages } = data;
      setCurrentPage(currPage);
      setTotalPages(totalPages);
      setArticles([...articles, ...posts]);
    } catch (error) {
      setIsErrorFetchingMorePosts(true);
    } finally {
      setIsLoadingMorePosts(false);
    }
  };
  return (
    <section className=" py-2 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 pb-4">
        {isLoadingPosts ? (
          new Array(3).fill(0).map((_, index) => {
            return <ArticleCardSkeleton key={index} />;
          })
        ) : isErrorFetchingPosts ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : (
          articles.map((article) => {
            return <ArticleCard key={article._id} post={article} />;
          })
        )}
      </div>
      {isLoadingMorePosts ? (
        <button
        className="mx-auto flex items-center justify-center text-primary border-2 border-primary px-6 py-3 rounded-lg w-[170px] h-[50px]"
      >
        <ImSpinner2 className="animate-spin"/>
      </button>
      ) : isErrorFetchingMorePosts ? (
        <ErrorMessage message="Couldn't fetch the posts data" />
      ) : (
        currentPage < totalPages && (
          <button
            onClick={loadMorePostsHandler}
            className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg"
          >
            <span>More articles</span>
            <FaArrowRight className="w-3 h-3" />
          </button>
        )
      )}
    </section>
  );
};

export default Articles;
