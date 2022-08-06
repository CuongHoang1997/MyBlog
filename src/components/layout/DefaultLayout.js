import React, { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      {children}
      <Footer></Footer>
    </Fragment>
  );
};

export default DefaultLayout;
