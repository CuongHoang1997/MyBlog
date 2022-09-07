import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  margin: 0 20px;

  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 40px;
      margin-bottom: 20px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
      margin-left: 20px;
    }
    &-main {
      display: grid;
      font-size: 24px;

      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      align-items: start;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main flex gap-x-[150px]">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
