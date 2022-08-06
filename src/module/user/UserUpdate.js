import ImageUpload from "components/image/ImageUpload";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import useFirebaseImage from "hooks/useFirebaseImage";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { FieldCheckboxes } from "components/field";
import { Radio } from "components/checkbox";
import { userStatus } from "utils/constants";
import { Button } from "components/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onchange",
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const { image, setImage, progress, handleDelete, changeImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    console.log(values);
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Cập nhật thông tin thành công");
      navigate("/manage/user");
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      console.log(docData.data());
      reset(docData && docData.data());
    }
    fetchData();
  }, [userId, reset]);

  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Quản lý người dùng"
        desc="Chỉnh sửa thông tin cá nhân"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[260px] mx-auto mb-5">
          <ImageUpload
            className="!rounded-full"
            handleDelete={handleDelete}
            onChange={changeImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Họ và tên</Label>
            <Input
              name="fullname"
              placeholder="Nhập họ và tên của bạn"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Tên người dùng</Label>
            <Input
              name="username"
              placeholder="Nhập tên người dùng"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Địa chỉ Email</Label>
            <Input
              name="email"
              placeholder="Nhập địa chỉ Email của bạn"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Mật khẩu</Label>
            <Input
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <div className="flex flex-col">
            {" "}
            <Field>
              <Label>Ngày tháng năm sinh</Label>
              <Input
                name="birthday"
                placeholder="dd/mm/yyyy"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Số điện thoại</Label>
              <Input
                name="phone"
                placeholder="Nhập số điện thoại của bạn..."
                control={control}
              ></Input>
            </Field>
          </div>
          <Field>
            <Label>Phân quyền</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userStatus.ADMIN}
                onClick={() => setValue("role", "admin")}
                value={userStatus.ADMIN}
              >
                Quản trị viên
              </Radio>

              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userStatus.USER}
                onClick={() => setValue("role", "user")}
                value={userStatus.USER}
              >
                Người dùng
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto mt-10 max-w-[400px]"
        >
          Cập nhật thông tin
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
