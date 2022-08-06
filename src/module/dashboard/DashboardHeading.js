import React from "react";

const DashboardHeading = ({ title = "", desc = "" }) => {
  return (
    <div className="mb-10">
      <h1 className="dashboard-heading">{title}</h1>
      <p className="dashboard-short-desc ml-5">{desc}</p>
    </div>
  );
};

export default DashboardHeading;
