import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  .post {
    &-image {
      width: 100%;
      height: 100%;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  .box-zoom-out {
    border: 1px solid #ccc;
    height: 350px;
    margin: 10px;
    overflow: hidden;
    position: relative;
    transform: translateX(10px);
    transform: translateY(10px);
  }
  .box-zoom-out img {
    transition: all 1s;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  .box-zoom-out:hover img {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
`;
const PostFeatureItem = ({ data }) => {
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  const { user, category } = data;

  return (
    <PostFeatureItemStyles>
      <NavLink to={data.slug}>
        <div className="box-zoom-out rounded-[16px] mb-5 ">
          <PostImage
            className="img h-full"
            url={data.image}
            alt="image"
          ></PostImage>
          <div className="post-overlay"></div>
          <div className="post-content">
            <div className="post-top">
              {category && (
                <PostCategory to={`/category/${data.category?.name}`}>
                  {category.name}
                </PostCategory>
              )}
              <PostInfo
                author={user?.fullname}
                to={`/user/${data.user?.username}`}
                date={formatDate}
              ></PostInfo>
            </div>
            <PostTitle to={data.slug}>{data.title}</PostTitle>
          </div>
        </div>
      </NavLink>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
