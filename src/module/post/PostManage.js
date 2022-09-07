import { ActionDelete, ActionEdit, ActionView } from "components/action";
import LabelStatus from "components/label/LabelStatus";
import { Pagination } from "components/pagination";
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
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postStatus } from "utils/constants";

const PostManage = () => {
  const [posts, setPosts] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "posts");
    const newRef = inputSearch
      ? query(
          colRef,
          where("title", ">=", inputSearch),
          where("title", "<=", inputSearch + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setPosts(result);
      console.log(result);
    });
  }, [inputSearch]);

  const handleDeletePost = async (docId) => {
    const colRef = doc(db, "posts", docId);

    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Bài viết của bạn sẽ bị xóa khỏi dữ liệu và không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, tôi chắc chắn!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Đã xóa!", "Xóa bài viết thành công.", "success");
      }
    });
  };
  const handleSearch = debounce((e) => {
    setInputSearch(e.target.value);
  }, 500);

  return (
    <div>
      <div className="flex justify-between">
        <DashboardHeading
          title="Bài viết"
          desc="Quản lý Bài viết"
        ></DashboardHeading>
        <div className="mr-20 w-[300px] text-[20px]">
          <NavLink to="/manage/add-post">
            <button className="btn-add mb-5 mx-auto w-full bg-green-500 p-3 text-white rounded-lg">
              Thêm bài viết
            </button>
          </NavLink>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-solid border-gray-300"
            placeholder="Tìm kiếm bài viết..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Thông tin</th>
            <th>Trạng thái</th>
            <th>Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((item) => (
              <tr key={item.id}>
                <td>{item.id.slice(0, 5) + "..."}</td>
                <td title={item.title}>{item.title.slice(0, 25) + "..."}</td>
                <td>{item.category.name}</td>
                <td>
                  <div className="flex items-center gap-x-5">
                    <div className="w-[130px]">
                      <img
                        src={item?.image}
                        alt=""
                        className="w-[150px] h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="">{item?.user.fullname}</h3>
                      <time className="text-gray-500">
                        {new Date(
                          item.createdAt.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>

                <td>
                  {Number(item.status) === postStatus.APPROVED && (
                    <LabelStatus type="success">Chấp thuận</LabelStatus>
                  )}
                  {Number(item.status) === postStatus.PENDING && (
                    <LabelStatus type="warning">Đang chờ</LabelStatus>
                  )}
                  {Number(item.status) === postStatus.REJECTED && (
                    <LabelStatus type="danger">Từ chối</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex justify-between gap-x-3 items-center">
                    <ActionView
                      onClick={() => {
                        navigate(`/${item.slug}`);
                      }}
                    ></ActionView>
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-post?id=${item.id}`);
                      }}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletePost(item.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostManage;
