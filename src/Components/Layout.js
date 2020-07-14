import React from "react";
import "./Layout.css";

import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
