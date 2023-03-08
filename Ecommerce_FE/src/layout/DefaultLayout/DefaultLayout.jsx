import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function DefaultLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="containers">
        <div className="content-web">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
