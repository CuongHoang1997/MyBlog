import Heading from "components/layout/Heading";
import DefaultLayout from "components/layout/DefaultLayout";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostItem from "module/post/PostItem";
import PostInfo from "module/post/PostInfo";
import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import slugify from "slugify";
import parse from "html-react-parser";
import PostRelative from "module/post/PostRelative";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const params = useParams();
  const slug = params.slug;
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = collection(db, "posts");
      const q = query(colRef, where("slug", "==", slug));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  if (!slug) return null;
  return (
    <PostDetailsPageStyles>
      <DefaultLayout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory>{postInfo?.category?.name}</PostCategory>

              <h1 className="post-heading">{postInfo.title}</h1>
              <PostInfo
                author={postInfo?.user?.fullname}
                to={slugify(postInfo?.user?.fullname || "", { lower: true })}
                date={new Date(
                  postInfo?.createdAt?.seconds * 1000
                ).toLocaleDateString("vi-VI")}
              ></PostInfo>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <div className="author flex justify-center items-center">
              <div className="author-image">
                <img src={postInfo?.user?.avatar} alt="" />
              </div>
              <div className="author-content">
                <h3 className="author-name">{postInfo?.user?.fullname}</h3>
                <p className="author-desc">{postInfo?.user?.description}</p>
              </div>
            </div>
          </div>
          <PostRelative categoryId={postInfo.categoryId}></PostRelative>
        </div>
      </DefaultLayout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
