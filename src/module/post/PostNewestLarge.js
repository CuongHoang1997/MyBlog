import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 400px;
      border-radius: 16px;
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      color: black;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  console.log(data);
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data) return null;
  return (
    <PostNewestLargeStyles>
      <div className="post-image">
        <PostImage url={data.image}></PostImage>
      </div>
      <PostCategory to={`/category/${data.category?.name}`}>
        {data.category?.name}
      </PostCategory>
      <PostTitle to={`/${data.slug}`} className="post-title">
        {data.title}
      </PostTitle>
      <PostInfo
        author={data.user?.fullname}
        to={`/user/${data.user?.username}`}
        date={formatDate}
      ></PostInfo>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
