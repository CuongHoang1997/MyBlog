import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import styled from "styled-components";

const BannerStyle = styled.div`
  .carousel {
    width: 100%;
  }

  ul.slides {
    display: block;
    position: relative;
    height: 650px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    list-style: none;
  }

  .slides * {
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  ul.slides input {
    display: none;
  }

  .slide-container {
    display: block;
  }

  .slide-image {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0;
    transition: all 0.7s ease-in-out;
  }

  .slide-image img {
    width: auto;
    min-width: 100%;
    height: 100%;
  }

  .carousel-controls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    font-size: 100px;
    line-height: 600px;
    color: #fff;
  }

  .carousel-controls label {
    display: none;
    position: absolute;
    padding: 0 20px;
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;
  }

  .slide-image:hover + .carousel-controls label {
    opacity: 0.5;
  }

  .carousel-controls label:hover {
    opacity: 1;
  }

  .carousel-controls .prev-slide {
    width: 49%;
    text-align: left;
    left: 0;
  }

  .carousel-controls .next-slide {
    width: 49%;
    text-align: right;
    right: 0;
  }

  .carousel-dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    z-index: 999;
    text-align: center;
  }

  .carousel-dots .carousel-dot {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.5;
    margin: 10px;
  }

  input:checked + .slide-container .slide-image {
    opacity: 1;
    transform: scale(1);
    transition: opacity 1s ease-in-out;
  }

  input:checked + .slide-container .carousel-controls label {
    display: block;
  }

  input#img-1:checked ~ .carousel-dots label#img-dot-1,
  input#img-2:checked ~ .carousel-dots label#img-dot-2,
  input#img-3:checked ~ .carousel-dots label#img-dot-3 {
    opacity: 1;
  }

  input:checked + .slide-container .nav label {
    display: block;
  }
`;

const Banner = () => {
  return (
    <BannerStyle>
      <div>
        <div className="carousel">
          <ul className="slides">
            <input type="radio" name="radio-buttons" id="img-1" checked />
            <li className="slide-container">
              <div className="slide-image">
                <img
                  className="object-center"
                  alt=""
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHRlY2hub2xvZ3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                />
              </div>
              <div className="carousel-controls">
                <label htmlFor="img-3" className="prev-slide">
                  <span>&lsaquo;</span>
                </label>
                <label htmlFor="img-2" className="next-slide">
                  <span>&rsaquo;</span>
                </label>
              </div>
            </li>
            <input type="radio" name="radio-buttons" id="img-2" />
            <li className="slide-container">
              <div className="slide-image">
                <img
                  className="object-center"
                  alt=""
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=820&q=80"
                />
              </div>
              <div className="carousel-controls">
                <label htmlFor="img-1" className="prev-slide">
                  <span>&lsaquo;</span>
                </label>
                <label htmlFor="img-3" className="next-slide">
                  <span>&rsaquo;</span>
                </label>
              </div>
            </li>

            <div className="carousel-dots">
              <label
                htmlFor="img-1"
                className="carousel-dot"
                id="img-dot-1"
              ></label>
              <label
                htmlFor="img-2"
                className="carousel-dot"
                id="img-dot-2"
              ></label>
            </div>
          </ul>
        </div>
      </div>
      <div className="text w-[800px] text-white absolute top-[550px] ml-10 text-[40px] flex flex-col items-center gap-y-5">
        <button className="bg-white w-[100px] text-sm pb-1 pt-2 text-black font-bold">
          LIFESTYLE
        </button>
        <p className="banner-decs uppercase font-extrabold">
          Life and technology
        </p>
        <p className="text-[24px]">More of this less knowledge...</p>
      </div>
    </BannerStyle>
  );
};

export default Banner;
