import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { Link, useNavigate } from "react-router-dom";
import images from "../constants/images";

const Header = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const avatar = userState?.userInfo?.avatar;
  const navVisibilityHandler = () => {
    setNavIsVisible((currState) => {
      return !currState;
    });
  };

  return (
    <section className="sticky top-0 z-10 bg-white">
      <header className="container flex justify-between items-center py-2 px-4 max-w-6xl  mx-auto">
        <Link to="/">
          <img className="w-16" src={images.logo} alt="logo" />
        </Link>
        <div className="flex gap-4 items-center justify-center">
          <nav
            className={`${
              navIsVisible ? "right-0" : "-right-full"
            } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col lg:w-auto justify-center lg:justify-end lg:flex-row fixed w-full top-0 bottom-0 lg:static gap-9 items-center`}
          >
            <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-5 font-semibold">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
             {/* <li>
                <Link to="/">Pricing</Link>
              </li>
              <li>
                <Link to="/">Faq</Link>
              </li> */}
            </ul>
            {userState.userInfo ? (
              <button
                type="button"
                onClick={() => { 
                  logout(dispatch)
                  navigate('/')    
                 }
                }
                className="border-red-500 px-4 rounded-full  py-1 border-2 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-300"
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="border-blue-500 px-4 rounded-full  py-1 border-2 text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-300"
              >
                Sign in
              </button>
            )}
          </nav>
          <button
            type="button"
            onClick={() => navigate("/blog/create")}
            className="border-blue-500 px-4 rounded-full  py-1 border-2 text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-300"
          >
            New Article
          </button>
          {userState?.userInfo && (
            <div className="w-9 h-9 overflow-hidden rounded-full">
              {
                <img
                  className="w-full h-full"
                  onClick={() => navigate("/profilePicture")}
                  src={
                    avatar
                      ? avatar
                      : images.userImage
                  }
                  alt=""
                />
              }
            </div>
          )}
          <div className="lg:hidden z-50">
            {navIsVisible ? (
              <AiOutlineClose
                className="w-6 h-6"
                onClick={navVisibilityHandler}
              />
            ) : (
              <AiOutlineMenu
                className="w-6 h-6"
                onClick={navVisibilityHandler}
              />
            )}
          </div>
        </div>
      </header>
    </section>
  );
};

export default Header;
