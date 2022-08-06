import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostTitleStyles = styled.div`
  font-weight: bold;
  line-height: 1.5;
  display: block;
  font-size: 22px;
  color: white;
  margin-bottom: 6px;
`;

const PostTitle = ({ children, className = "", to = "/" }) => {
  return (
    <PostTitleStyles className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
