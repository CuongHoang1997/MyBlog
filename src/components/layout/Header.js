import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
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
    padding: 10px 20px;
    margin-left: auto;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .search-input {
    padding-right: 25px;
  }
  .search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
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
  console.log(userInfo);
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
          <div className="header-search">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
            />
            <span className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          {userInfo ? (
            <div className="header-auth">
              Hi,
              <strong className="text-primary">{userInfo?.displayName}</strong>
            </div>
          ) : (
            <Button className="btn-header" to="/sign-in">
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
