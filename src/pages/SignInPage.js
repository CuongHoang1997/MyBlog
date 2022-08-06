import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconEye, IconHide } from "components/icon";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";

const SignInPage = () => {
  const [togglePass, setTogglePass] = useState(false);
  const schema = yup.object({
    email: yup.string().required("Mời nhập vào email của bạn"),
    password: yup.string().required("Mời nhập vào mật khẩu của bạn"),
  });
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!userInfo.email) navigate("/sign-up");
  //     else navigate("/");
  //   }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, setValue },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);

    navigate("/");
  };
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
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
          <Label htmlFor="pasword">Mật khẩu</Label>
          <Input
            name="password"
            type={togglePass ? "text" : "password"}
            placeholder="Nhập Mật khẩu của bạn..."
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
          Bạn chưa có tài khoản? <NavLink to="/sign-up">Đăng ký</NavLink>
        </div>
        <Button type="submit">Đăng nhập</Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
