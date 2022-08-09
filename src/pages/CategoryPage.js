import DefaultLayout from "components/layout/DefaultLayout";
import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.name", "==", params.name)
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
      });
    }
    fetchData();
  }, [params.name]);

  if (!params.name || posts.length <= 0) return null;
  return (
    <div>
      <DefaultLayout>
        <div className="mt-10 container">
          <Heading>
            Danh mục <strong>{params?.name}</strong>
          </Heading>
          <div className="grid-layout grid-layout--primary">
            {posts.map((item) => (
              <PostItem key={item.id} data={item}></PostItem>
            ))}
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default CategoryPage;
