import React from "react";
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
      height: 600px;
      border-radius: 16px;
    }

    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 20px;
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
  .box-zoom-out {
    border: 1px solid #ccc;
    margin: 10px;
    position: relative;
    overflow: hidden;
  }
  .box-zoom-out img {
    transition: all 1s;
    transform: scale(1.2);
  }
  .box-zoom-out:hover img {
    transform: scale(1);
  }
`;

const PostNewestLarge = ({ data }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data) return null;
  return (
    <PostNewestLargeStyles>
      <div className="post-image box-zoom-out">
        <PostImage
          className="img"
          to={`/${data.slug}`}
          url={data.image}
        ></PostImage>
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
