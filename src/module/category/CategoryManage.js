import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { categoryStatus } from "utils/constants";
import Swal from "sweetalert2";
import { debounce } from "lodash";

const CategoryManage = () => {
  const [category, setCategory] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const colRef = collection(db, "categories");
    const newRef = inputSearch
      ? query(
          colRef,
          where("name", ">=", inputSearch),
          where("name", "<=", inputSearch + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setCategory(result);
    });
  }, [inputSearch]);
  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, "categories", docId);

    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Danh mục của bạn sẽ bị xóa khỏi dữ liệu và không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, tôi chắc chắn!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Đã xóa!", "Xóa danh mục thành công.", "success");
      }
    });
  };
  const handleSearch = debounce((e) => {
    setInputSearch(e.target.value);
  }, 500);

  return (
    <>
      <div className="flex justify-between">
        <DashboardHeading
          title="Danh mục"
          desc="Quản lý danh mục"
        ></DashboardHeading>
        <div className="mr-20  w-[200px]">
          <NavLink to="/manage/add-category">
            <button className="btn-add mb-5 mx-auto w-full bg-green-500 p-3 text-white rounded-lg">
              Thêm danh mục mới
            </button>
          </NavLink>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-solid border-gray-300"
            placeholder="Tìm kiếm danh mục..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Đường dẫn</th>
            <th>Trạng thái</th>
            <th>Quản lí</th>
          </tr>
        </thead>
        <tbody>
          {category.length > 0 &&
            category.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <span className="italic opacity-70">{item.slug}</span>
                </td>
                <td>
                  {Number(item.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Chấp thuận</LabelStatus>
                  )}
                  {Number(item.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Từ chối</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex justify-between items-center">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-category?id=${item.id}`);
                      }}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(item.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryManage;
