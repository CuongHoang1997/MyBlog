import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostInfoStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;

  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const PostInfo = ({
  type = "white",
  className = "",
  to = "/",
  date = "",
  author = "",
}) => {
  return (
    <PostInfoStyles className={className}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={to}>
        <span className="post-author">{author}</span>
      </NavLink>
    </PostInfoStyles>
  );
};

export default PostInfo;
