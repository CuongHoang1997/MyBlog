import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Mời nhập vào tên danh mục"),
});

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);

  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const watchStatus = watch("status");
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const docData = await getDoc(colRef);
      reset(docData.data());
    }
    fetchData();
  }, [categoryId, reset]);
  if (!categoryId) return null;
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success("Cập nhật thành công");
    navigate("/manage/category");
  };

  return (
    <div>
      <DashboardHeading title="Chỉnh sửa danh mục"></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Tên danh mục</Label>
            <Input
              control={control}
              name="name"
              placeholder="Nhập tên danh mục"
            ></Input>
          </Field>
          <Field>
            <Label>Đường dẫn</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Nhập đường dẫn"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Trạng thái</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Chấp nhận
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Từ chối
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" className="mx-auto mt-10 max-w-[400px]">
          Cập nhật danh mục
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
