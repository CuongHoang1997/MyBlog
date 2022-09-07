import React from "react";
import styled from "styled-components";

const FieldStyle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  min-width: 650px;
  margin: 20px auto;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Field = ({ children, className = "" }) => {
  return <FieldStyle className={className}>{children}</FieldStyle>;
};

export default Field;
