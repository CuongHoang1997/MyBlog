import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 w-full h-[180px] mt-20">
      <div className="flex justify-around pt-4 mb-8  ">
        <div className="flex flex-col items-center text-footer">
          <span className="text-footer-item">Social Blogging</span>
          <p className="">Khám phá bản thân</p>
        </div>
        <div>
          <span>Liên hệ:</span>
          <div className="opacity-80 cursor-pointer ">
            <ul>
              <li className="link">
                <a href="https://www.facebook.com/cuonghoang9997/">Facebook</a>
              </li>
              <li className="link">
                <a href="https://mail.google.com/mail/u/0/#inbox">Google</a>
              </li>
              <li className="link">
                <a href="https://www.instagram.com/cuonghoang09/">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span>Trợ giúp?</span>
          <div className="opacity-80 cursor-pointer">
            <ul>
              <li className="link">Câu hỏi</li>
              <li className="link">Tin tức</li>
            </ul>
          </div>
        </div>
        <div>
          <span>Thông tin</span>
          <div className="opacity-80 cursor-pointer">
            <ul>
              <li className="link">Điều khoản sử dụng</li>
              <li className="link">Chính sách bảo mật</li>
              <li className="link">Khiếu nại về bản quyền</li>
            </ul>
          </div>
        </div>
      </div>
      <span className="block text-center">
        © 2022 Copyright MyMovie.com All Rights reserved.
      </span>
    </div>
  );
};

export default Footer;
