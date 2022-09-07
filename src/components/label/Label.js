import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
