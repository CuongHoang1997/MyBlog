import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import PostItem from "./PostItem";

const PostRelative = ({ categoryId = "" }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
      console.log(results);
    });
  }, [categoryId]);

  if (!categoryId || posts <= 0) return null;
  return (
    <div>
      <div className="post-related">
        <Heading>Bài viết liên quan</Heading>
        <div className="grid grid-cols-4 gap-10">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostRelative;
