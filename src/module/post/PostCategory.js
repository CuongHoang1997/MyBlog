import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  background-color: #f3f3f3;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  &:hover {
    transition: all 0.5s;
    transform: translateX(10px);
  }
`;

const PostCategory = ({ children, className = "", to = "/" }) => {
  return (
    <PostCategoryStyles className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  );
};

export default PostCategory;
