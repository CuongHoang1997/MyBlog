import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { postStatus } from "utils/constants";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  title: yup.string().required("Mời nhập vào tiêu đề bài viết"),
  category: yup
    .object()
    .shape({ name: yup.string().required("Mời bạn chọn danh mục") }),
  content: yup.string().required("Mời nhập vào nội dung bài viết"),
});

const PostUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [params] = useSearchParams();
  const postId = params.get("id");
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [content, setContent] = useState("");

  const { image, setImage, progress, handleDelete, changeImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteImage);

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);

  useEffect(() => {
    if (!postId) return;
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const docData = await getDoc(colRef);
      setSelectCategory(docData.data().category.name || "");
      setContent(docData.data().content || "");
      reset(docData && docData.data());
    }
    fetchData();
  }, [postId, reset]);

  useEffect(() => {
    async function fetchCategory() {
      const colRef = collection(db, "categories");
      const querySnapshot = await getDocs(colRef);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(result);
    }
    fetchCategory();
  }, []);

  async function deleteImage() {
    const colRef = doc(db, "post", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  const handleUpdatePost = async (values) => {
    if (!isValid) return;
    try {
      const docRef = doc(db, "posts", postId);

      await updateDoc(docRef, {
        ...values,
        image,
        content,
      });
      console.log(values);
      toast.success("Cập nhật bài viết thành công");
      navigate("/manage/posts");
    } catch (error) {
      console.log(error);
    }
  };

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

  if (!postId) return null;
  return (
    <div>
      <h1 className="dashboard-heading">Thêm bài viết</h1>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
                placeholder={selectCategory.name || selectCategory}
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
          Cập nhật bài viết
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
