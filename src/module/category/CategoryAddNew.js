import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const handleAddCategory = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, { lower: true });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, { ...newValues, createdAt: serverTimestamp() });
      toast.success("Thêm danh mục thành công!!!");
    } catch (error) {
      toast.error(error);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="Danh mục mới"
        desc="Thêm danh mục"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddCategory)}>
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
          Thêm danh mục
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
