import { Table } from "components/table";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <h1 className="dashboard-heading">
        Trang quản lý dành cho quản trị viên
      </h1>
      <p className=" ml-5 mr-20 text-[24px]">
        Phân quyền sử dụng là phân quyền cho người sử dụng được chỉ định có thể
        truy cập vào các nguồn thông tin trên hệ thống, khi đó người được phân
        quyền mới có thể truy cập vào các hệ thống dữ liệu được đã được phân
        quyền. <br />
        Quyền truy cập công cụ và trang quản trị khác với quyền trong cửa hàng.
        Một số quyền truy cập cho phép người dùng thực hiện những thao tác không
        thể làm được trong trang quản trị Shopify của blog. Những quyền truy cập
        khác cho phép người dùng thực hiện thao tác mà thường chỉ quản trị viên
        mới có thể thực hiện, chẳng hạn như cấp cho người dùng quyền truy cập
        vào blog.
      </p>
    </div>
  );
};

export default DashboardPage;
