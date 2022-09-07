import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 20px;
  align-items: center;
  .header-avatar {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-button {
    width: 200px;
  }
  .header {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
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
    font-size: 24px;
    font-weight: 600;
  }
`;

const DashboardHeader = () => {
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
  return (
    <DashboardHeaderStyles>
      <div className="container flex justify-between items-center">
        <div className="header">
          <img srcSet="/images/logo.png 4x" alt="" className="logo" />
          <ul className="menu ">
            {menuLinks.map((item) => (
              <li
                className="menu-item transform  transition duration-500 hover:scale-125 hover:text-blue-400"
                key={item.title}
              >
                <NavLink className="menu-link" to={item.url}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-x-5">
          <Button to="/manage/add-post" className="header-button" height="52px">
            Thêm bài viết
          </Button>
          <div className="header-avatar">
            <img src={user?.avatar} alt="" />
          </div>
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
