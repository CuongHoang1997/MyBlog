import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }

    &-info {
      color: black;
    }
    &-title {
      color: black;
      font-size: 16px;
    }
  }
`;

const PostItem = () => {
  return (
    <PostItemStyles>
      <div className="post-image">
        <PostImage
          url="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&
        ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
        ></PostImage>
      </div>
      <PostCategory>Kiến thức</PostCategory>
      <PostTitle className="post-title">
        Hướng dẫn setup phòng cực chill dành cho người mới
      </PostTitle>
      <PostInfo type="black"></PostInfo>
    </PostItemStyles>
  );
};

export default PostItem;
