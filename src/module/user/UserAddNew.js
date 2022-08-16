import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userStatus } from "utils/constants";

const UserAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      role: 1,
    },
  });
  const { image, progress, handleDelete, changeImage, handleResetUpload } =
    useFirebaseImage(setValue, getValues);
  const watchRole = watch("role");
  const handleAddUser = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await addDoc(collection(db, "users"), {
      avatar: image,
      fullname: values.fullname,
      username: slugify(values.username || values.fullname, {
        lower: true,
        replacement: "",
      }),
      email: values.email,
      password: values.password,
      date: values.birthday,
      role: Number(values.role),
    });
    toast.success("Thêm người dùng thành công");
    reset();
    console.log(values);
  };
  return (
    <div>
      <DashboardHeading
        title="Người dùng mới"
        desc="Thêm người dùng vào hệ thống"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="w-[260px] mx-auto mb-5">
          <ImageUpload
            className="!rounded-full"
            handleDelete={handleDelete}
            onChange={changeImage}
            progress={progress}
            image={image}
            handleResetUpload={handleResetUpload}
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
          <Field>
            <Label htmlFor="birthday">Ngày sinh</Label>
            <Input
              name="birthday"
              placeholder="dd/mm/yyyy"
              control={control}
            ></Input>
          </Field>
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
          Thêm người dùng mới
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
