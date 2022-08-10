import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { auth, db } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { doc, getDoc, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderStyle = styled.div`
  .header {
    display: flex;
    align-items: center;
    padding-top: 20px;
  }
  .logo {
    display: block;
    max-width: 70px;
  }
  .menu {
    display: flex;
    justify-content: space-between;
    column-gap: 30px;
    list-style: none;
    margin-left: 40px;
  }
  .menu-link {
    font-size: 18px;
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
    font-size: 16px;
    height: 46px;
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
      <div className="container">
        <div className="header">
          <img srcSet="/images/logo.png 4x" alt="" className="logo" />
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink className="menu-link" to={item.url}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="header-search"></div>
          <div className="flex justify-center items-center gap-x-5">
            {userInfo ? (
              <div className="header-auth">
                Xin chào,
                <strong className="text-primary">
                  {userInfo?.displayName}
                </strong>
              </div>
            ) : (
              <Button className="btn-header" to="/sign-in">
                Đăng nhập
              </Button>
            )}
            {userInfo && user?.role == 1 && (
              <NavLink to="/dashboard">
                <Button className="min-w-[100px]">Quản lý</Button>
              </NavLink>
            )}
            {userInfo && user?.role == 2 && (
              <span className="btn-menu relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 border border-gray-500 border-opacity-30 p-1 rounded-md shadow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <div
                  className="menu-user absolute w-[200px] h-[150px] bg-gray-100 right-0 shadow top-[50px] 
                  flex flex-col justify-between "
                >
                  <a
                    className=" hover:bg-blue-200 p-3"
                    href={`/manage/update-user?id=${userId}`}
                  >
                    Chỉnh sửa thông tin
                  </a>
                  <a className=" hover:bg-blue-200 p-3" href="/manage/add-post">
                    Thêm bài viết
                  </a>
                  <a
                    className=" hover:bg-blue-200 p-3"
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
      </div>
    </HeaderStyle>
  );
};

export default Header;
