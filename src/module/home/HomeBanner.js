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
          <div className="banner-heading mb-5">Social Blogging</div>
          <p className="banner-decs">
            Đọc và chia sẻ trải nghiệm của chúng tôi hay chia sẻ những trải
            nghiệm của bạn thông qua việc trở thành tác giả. Vậy tại sao nên
            viết blog hay trở thành tác giả của một blog ? Dưới đây là một vài
            lý do bạn nên viết blog:
          </p>
          <ul className="font-bold">
            <li>1. Nâng cao kỹ năng viết</li>
            <li>2. Học hỏi những điều mới</li>
            <li>3. Sở hữu nội dung</li>
            <li>4. Truyền cảm hứng cho người khác</li>
          </ul>
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
