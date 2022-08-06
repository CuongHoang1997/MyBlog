import { Label } from "../components/label";
import React, { useState } from "react";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { IconEye, IconHide } from "components/icon";
import { Field } from "components/field";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import { useEffect } from "react";
import slugify from "slugify";

const schema = yup.object({
  fullname: yup.string().required("Mời nhập vào tên của bạn"),
  birthday: yup.date().typeError("Mời nhập ngày tháng năm sinh của bạn"),
  email: yup
    .string()
    .email("Mời nhập đúng định dạng Email")
    .required("Mời nhập vào email của bạn"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
    .required("Mời nhập vào mật khẩu của bạn"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;

    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vo9qa25lRRGBs9juFzSsAEaPC5mz_AFoAQ&usqp=CAU",
    });

    // const colRef = collection(db, "users");
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   date: values.birthday,
    //   email: values.email,
    //   password: values.password,
    // });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      role: 2,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vo9qa25lRRGBs9juFzSsAEaPC5mz_AFoAQ&usqp=CAU",
    });
    toast.success("Đăng ký thành công");
    setTimeout(() => {
      navigate("/sign-in");
    }, 1000);
  };
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);
  const [togglePass, setTogglePass] = useState(false);
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Tên của bạn</Label>
          <Input
            name="fullname"
            type="text"
            placeholder="Nhập tên của bạn..."
            control={control}
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="text"
            placeholder="Nhập email của bạn..."
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            name="password"
            type={togglePass ? "text" : "password"}
            placeholder="Nhập mật khẩu của bạn..."
            control={control}
          >
            {togglePass ? (
              <IconEye
                className="icon-input"
                onClick={() => {
                  setTogglePass(false);
                }}
              ></IconEye>
            ) : (
              <IconHide
                className="icon-input"
                onClick={() => {
                  setTogglePass(true);
                }}
              ></IconHide>
            )}
          </Input>
        </Field>
        <div className="have-account mb-5">
          Bạn đã có tài khoản? <NavLink to="/sign-in">Đăng nhập</NavLink>
        </div>
        <Button type="submit" isLoading={isSubmitting}>
          Đăng ký
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
