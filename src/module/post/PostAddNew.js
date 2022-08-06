import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import { toast } from "react-toastify";
import ImageUpload from "components/image/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useAuth } from "contexts/auth-context";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      category: {},
      user: {},
    },
  });
  const { userInfo } = useAuth();
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const { image, progress, handleDelete, changeImage, handleResetUpload } =
    useFirebaseImage(setValue, getValues);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);

  const addPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...cloneValues,
      image,
      createdAt: serverTimestamp(),
    });
    reset({
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      category: {},
      user: {},
    });
    setSelectCategory({});
    handleResetUpload();
    toast.success("Create new post successfully!");
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(result);
    }
    getData();
  }, []);
  const handleSelectCategory = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  console.log(category);
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Thêm bài viết</h1>
      <form onSubmit={handleSubmit(addPost)}>
        <div className="grid grid-cols-2 ">
          <Field>
            <Label>Tiêu đề</Label>
            <Input
              control={control}
              placeholder="Nhập tiêu đề bài viết"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Đường dẫn</Label>
            <Input
              control={control}
              placeholder="Nhập đường dẫn"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 ">
          <Field>
            <Label>Thêm hình ảnh</Label>
            <ImageUpload
              handleDelete={handleDelete}
              className="h-[260px]"
              onChange={changeImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Trạng thái</Label>
            <div className="flex items-center gap-x-5 mb-10">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Đã duyệt
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Đang chờ
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Từ chối
              </Radio>
            </div>

            <Label>Danh mục</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectCategory.name || "Chọn danh mục"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {category.length > 0 &&
                  category.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleSelectCategory(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>

            <Label className="mt-10">Đánh dấu bài viết nổi bật</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            ></Toggle>
          </Field>
        </div>
        <div className="grid grid-cols-2 "></div>
        <Button type="submit" className="mx-auto max-w-[400px] mt-10">
          Thêm bài viết
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
