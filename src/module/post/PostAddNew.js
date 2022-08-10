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
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup.string().required("Mời nhập vào tiêu đề bài viết"),
  category: yup
    .object()
    .shape({ name: yup.string().required("Mời bạn chọn danh mục") }),
  content: yup.string().required("Mời nhập vào nội dung bài viết"),
});

Quill.register("modules/imageUploader", ImageUploader);

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      status: 1,
      hot: false,
      image: "",
      category: {},
      user: {},
    },
  });
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);

  const { userInfo } = useAuth();
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const { image, progress, handleDelete, changeImage, handleResetUpload } =
    useFirebaseImage(setValue, getValues);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo?.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.email]);

  const addPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...cloneValues,
      image,
      createdAt: serverTimestamp(),
      content,
      categoryId: cloneValues.category.id,
    });
    reset({
      title: "",
      slug: "",
      status: 1,
      hot: false,
      image: "",
      category: {},
      user: {},
    });
    setSelectCategory({});
    setContent("");
    handleResetUpload();
    toast.success("Thêm bài viết thành công!");
    navigate("/");
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

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
    ],
  };

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
        <div className="mx-8">
          <Field>
            <Label>Nội dung</Label>
            <div>
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto max-w-[400px] mt-10">
          Thêm bài viết
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
