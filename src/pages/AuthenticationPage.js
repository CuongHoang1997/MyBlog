import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyle = styled.div`
  align-items: center;
  display: flex;

  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 60px;
  }
  .error {
    color: red;
    font-size: 14px;
    height: 14px;
  }
  .have-account {
    margin-left: 20px;
    font-size: 20px;
    a {
      text-decoration: none;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyle>
      <div className="signin my-10 mx-auto border rounded-lg px-10 py-20 shadow-2xl">
        <NavLink to="/" className="flex items-center justify-center gap-x-3">
          <img
            srcSet="https://seeklogo.com/images/S/sb-logo-43138A1D73-seeklogo.com.png 1.5x"
            alt=""
            className="logo-lg "
          />
          <h1 className="heading">Social Blogging</h1>
        </NavLink>
        {children}
      </div>
    </AuthenticationPageStyle>
  );
};

export default AuthenticationPage;
