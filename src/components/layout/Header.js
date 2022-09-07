import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { auth, db } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  BsFacebook,
  BsInstagram,
  BsGoogle,
  BsTwitter,
  BsLinkedin,
  BsSkype,
} from "react-icons/bs";

const HeaderStyle = styled.div`
  height: 100%;
  overflow: hidden;
  text-align: center;
  .header {
    display: flex;
    align-items: center;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    column-gap: 30px;
    list-style: none;
  }
  .menu-link {
    font-size: 25px;
    font-weight: 600;
  }
  .header-search {
    margin-left: auto;
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .btn-header {
    min-width: 150px;
    margin-top: 0;
    font-size: 20px;
    height: 46px;
  }
  .icon {
    transition: all 1s;
    &:hover {
      transform: rotateY(180deg);
      transition: all 1s;
    }
  }
  .svg-wrapper {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    width: 500px;
    margin-top: 80px;
  }
  text {
    font-family: "Roboto Condensed";
    font-size: 40px;
    line-height: 32px;
    letter-spacing: 8px;
    color: #fff;
    top: -48px;
    position: relative;

    font-family: "Oleo Script Swash Caps", cursive;
  }
  .shape {
    stroke-dasharray: 180 400;
    stroke-dashoffset: -30;
    stroke-width: 10px;
    fill: transparent;
    stroke: #19f6e8;
    border-bottom: 5px solid black;
    transition: stroke-width 2s, stroke-dashoffset 1s, stroke-dasharray 2s;
  }

  .svg-wrapper:hover .shape {
    stroke-width: 6px;
    stroke-dashoffset: 0;
    stroke-dasharray: 1500;
  }
`;
const menuLinks = [
  {
    url: "/",
    title: "Trang chủ",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Liên hệ",
  },
];
const Header = () => {
  const { userInfo } = useAuth();
  const userId = userInfo?.uid;
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const docRef = doc(db, "users", userId);
      const docData = await getDoc(docRef);
      setUser(docData.data());
    }
    fetchData();
  }, [userId]);

  return (
    <HeaderStyle>
      <div className="">
        <div className="header h-20 align-middle px-10 shadow flex justify-between items-center my-auto">
          <div className=" flex gap-x-5 cursor-pointer text-2xl ">
            <BsFacebook className="text-blue-500 icon"></BsFacebook>
            <BsInstagram className="text-pink-500 icon"></BsInstagram>
            <BsTwitter className="text-blue-300 icon"></BsTwitter>
            <BsGoogle className="text-red-500 icon"></BsGoogle>
            <BsLinkedin className="text-blue-700 icon"></BsLinkedin>
            <BsSkype className="text-blue-400 icon"></BsSkype>
          </div>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li
                className="menu-item transform  transition duration-500 hover:scale-125 hover:text-blue-400"
                key={item.title}
              >
                <NavLink className="menu-link 125" to={item.url}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center gap-x-5 text-2xl">
            {userInfo ? (
              <div className="header-auth">
                Xin chào,{" "}
                <strong className="text-primary">
                  {userInfo?.displayName}
                </strong>
              </div>
            ) : (
              <Button className="btn-header " to="/sign-in">
                Đăng nhập
              </Button>
            )}
            {userInfo && user?.role == 1 && (
              <NavLink to="/dashboard">
                <Button className="min-w-[150px]">Quản lý</Button>
              </NavLink>
            )}
            {userInfo && user?.role == 2 && (
              <span className="btn-menu relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <div
                  className="menu-user absolute w-[300px] h-[250px] invisible bg-white -right-10 overflow-hidden top-[60px] 
                  flex flex-col justify-between p-5"
                >
                  <a
                    className="transform transition duration-500 hover:scale-110 hover:font-bold  p-3 "
                    href={`/manage/update-user?id=${userId}`}
                  >
                    Chỉnh sửa thông tin
                  </a>
                  <a
                    className="transform  transition duration-500 hover:scale-110 hover:font-bold p-3  "
                    href="/manage/add-post"
                  >
                    Thêm bài viết
                  </a>
                  <a
                    className="transform  transition duration-500 hover:scale-110 hover:font-bold p-3"
                    href="/"
                    onClick={() => signOut(auth)}
                  >
                    Đăng xuất
                  </a>
                </div>
                <div className="arrow absolute"></div>
              </span>
            )}
          </div>
        </div>
        <div className="svg-wrapper">
          <svg height="90" width="500" xmlns="http://www.w3.org/2000/svg">
            <rect className="shape" height="90" width="500" />
            <NavLink className="menu-link 125" to="/">
              <text className="hover:animate-pulse " x="55" y="55">
                Social blogging
              </text>
            </NavLink>
          </svg>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
