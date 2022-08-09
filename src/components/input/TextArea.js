import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const TextAreaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "10px 60px 10px 10px" : "10px")};
    border: 2px solid transparent;
    border-radius: 6px;
    background-color: ${(props) => props.theme.grayLight};
    font-weight: 500;
    transition: all 0.3s linear;
  }
  textarea:focus {
    border-color: ${(props) => props.theme.primary};
    background-color: #fff;
  }
  .icon-input {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
    cursor: pointer;
  }
`;

const TextArea = ({
  name = "",
  type = "text",
  children,
  hasIcon = false,
  control,
  className = "",
  ...props
}) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <TextAreaStyles hasIcon={children ? true : false}>
      <textarea
        id={name}
        type={type}
        className={className}
        {...field}
        {...props}
      />
      {children}
    </TextAreaStyles>
  );
};

export default TextArea;
