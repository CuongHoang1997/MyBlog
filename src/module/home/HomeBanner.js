import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import styled from "styled-components";

const BannerStyle = styled.div`
  .banner {
    display: flex;
    margin-top: 20px;
    padding: 40px;
    height: 520px;
    align-items: center;
    justify-content: space-around;
    background-image: linear-gradient(to right bottom, #316f9e, #5edba5);
  }
  .banner-content {
    width: 400px;
    color: white;
  }
  .banner-heading {
    font-size: 36px;
    font-weight: 600;
  }
  .banner-decs {
  }
  .button-banner {
    background-color: white;
    background-image: none;
    color: #316f9e;
    width: 200px;
    margin-top: 0;
    font-weight: 600;
  }
  .getstarted {
    display: flex;
    align-items: center;
    margin-top: 20px;
    column-gap: 10px;
  }
`;

const Banner = () => {
  const { userInfo } = useAuth();

  return (
    <BannerStyle>
      <div className="banner">
        <div className="banner-content">
          <div className="banner-heading">Social Blogging</div>
          <p className="banner-decs">
            Tôi yêu giáo dục và văn hóa. Tôi đã đi qua 14 quốc gia với hầu hết
            là ba lô và các chương trình ngắn hạn về giáo dục và xây dựng hòa
            bình. Một nửa trải nghiệm của tôi được xuất bản trong cuốn sách đầu
            tiên "Bên kia ranh giới" ("Bên kia ranh giới" - Việt ngữ) vào tháng
            1 năm 2017. Viết là một cách ý nghĩa để tôi lưu lại ký ức, nuôi
            dưỡng tiềm năng và truyền cảm hứng cho người khác. Khám phá thế giới
            rộng lớn này bằng con mắt của trẻ em.
          </p>
          <div className="getstarted">
            <Button className="button-banner">Khám phá thôi</Button>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                width="50"
                height="50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="banner-image">
          <img src="/images/banner.png" alt="" />
        </div>
      </div>
    </BannerStyle>
  );
};

export default Banner;
