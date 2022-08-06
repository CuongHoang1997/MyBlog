import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyle = styled.div`
  min-height: 100vh;
  align-items: center;
  display: flex;
  position: relative;
  .logo-lg {
    min-width: 800px;
    position: absolute;
    right: 50%;
    transform: translateX(10%);
  }
  .signup {
    position: absolute;
    right: 50%;
    transform: translateX(85%);
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-style: 40px;
  }
  .error {
    color: red;
    font-size: 14px;
    height: 14px;
  }
  .have-account {
    margin-left: 20px;
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
      <img srcSet="/images/logo-lg.gif 3x" alt="" className="logo-lg" />
      <div className="signup">
        <NavLink to="/">
          <h1 className="heading">Social Blogging</h1>
        </NavLink>
        {children}
      </div>
    </AuthenticationPageStyle>
  );
};

export default AuthenticationPage;
