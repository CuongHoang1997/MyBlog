import DefaultLayout from "components/layout/DefaultLayout";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
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
import PostTitle from "module/post/PostTitle";

const PostDetailsPageStyles = styled.div`
  .post {
    &-feature {
      width: 80%;
      border-radius: 20px;
    }

    &-content {
      width: 70%;
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
      width: 300px;
      height: 300px;
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
      font-size: 30px;
    }
    &-desc {
      font-size: 24px;
      line-height: 2;
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
  console.log(postInfo);

  if (!slug) return null;
  return (
    <PostDetailsPageStyles>
      <DefaultLayout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo.image}
              className="post-feature mx-auto"
            ></PostImage>
          </div>

          <div className="post-content flex flex-col items-center">
            <h1 className="text-black text-[60px] mb-10">{postInfo.title}</h1>
            <div className="entry-content opacity-90 text-[50px]">
              {parse(postInfo.content || "")}
            </div>
            <div className="author flex justify-center items-center">
              <div className="author-image">
                <img src={postInfo?.user?.avatar} alt="" />
              </div>
              <div className="author-content">
                <h3 className="author-name">{postInfo?.user?.fullname}</h3>
                <p className="author-desc text-2xl">
                  {postInfo?.user?.description}
                </p>
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
