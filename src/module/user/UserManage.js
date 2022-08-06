import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
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
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userStatus } from "utils/constants";

const UserManage = () => {
  const [user, setUser] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  const handleDeleteUser = async (docId) => {
    const colRef = doc(db, "users", docId);

    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Người dùng này sẽ bị xóa khỏi dữ liệu và không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, tôi chắc chắn!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Đã xóa!", "Xóa người dùng thành công.", "success");
      }
    });
  };
  useEffect(() => {
    const colRef = collection(db, "users");
    const newRef = inputSearch
      ? query(
          colRef,
          where("username", ">=", inputSearch),
          where("username", "<=", inputSearch + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setUser(result);
    });
  }, [inputSearch]);
  const handleSearch = debounce((e) => {
    setInputSearch(e.target.value);
  }, 500);
  return (
    <>
      <div className="flex justify-between">
        <DashboardHeading
          title="Người dùng"
          desc="Quản lý Người dùng"
        ></DashboardHeading>
        <div className="mr-20 w-[200px]">
          <NavLink to="/manage/add-user">
            <button className="btn-add mb-5 mx-auto w-full bg-green-500 p-3 text-white rounded-lg">
              Thêm người dùng mới
            </button>
          </NavLink>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-solid border-gray-300"
            placeholder="Tìm kiếm người dùng..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Tên người dùng</th>
            <th>Thông tin cá nhân</th>
            <th>Quyền truy cập</th>
            <th>Quản lí</th>
          </tr>
        </thead>
        <tbody>
          {user.length > 0 &&
            user.map((item) => (
              <tr key={item.id}>
                <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                <td>{item.email.slice(0, 10) + "..."}</td>
                <td>
                  <p className="">{item.fullname}</p>
                </td>
                <td>
                  <div className="flex items-center gap-x-5">
                    <img
                      src={item?.avatar}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                      <h3 className="">{item?.username}</h3>
                      <time className="text-gray-500">{item.birthday}</time>
                    </div>
                  </div>
                </td>
                <td>
                  {Number(item.role) === userStatus.ADMIN && (
                    <p>Quản trị viên</p>
                  )}
                  {Number(item.role) === userStatus.USER && <p>Người dùng</p>}
                </td>

                <td>
                  <div className="flex justify-between items-center">
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-user?id=${item.id}`);
                      }}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(item.id)}
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

export default UserManage;
