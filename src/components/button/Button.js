import { LoadingSpinner } from "components/loading";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ButtonStyle = styled.button`
  cursor: pointer;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    #5edba5
  );
  height: ${(props) => props.height || "60px"};
  font-size: 24px;
  font-weight: 600;
  color: white;
  border-radius: 6px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    color: black;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyle type={type} onclick={onClick} {...props}>
          {child}
        </ButtonStyle>
      </NavLink>
    );
  }
  return (
    <ButtonStyle type={type} onclick={onClick} {...props}>
      {child}
    </ButtonStyle>
  );
};

export default Button;
