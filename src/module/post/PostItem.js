import React from "react";
import slugify from "slugify";
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
      height: 300px;
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
      font-size: 30px;
    }
  }
`;

const PostItem = ({ data }) => {
  if (!data) return null;
  return (
    <PostItemStyles>
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
        author={data?.user?.fullname}
        date={new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
          "vi-VI"
        )}
        type="black"
        to={`/user/${data.user?.username}`}
      ></PostInfo>
    </PostItemStyles>
  );
};

export default PostItem;
