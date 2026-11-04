import "../assets/styles/main.scss";

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { fetchCategories, showModal } from "../actions";

import AppRoutes from "./AppRoutes";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ModalComponent from "./modal/ModalComponent";
import { connect } from "react-redux";
import { withIntl } from "../utilities/withIntl";

class App extends Component {
  componentDidMount() {
    // if (!sessionStorage.getItem("categories")) {
      this.props.fetchCategories().then(() => {
        const categoriesValues = this.props.categories;
        sessionStorage.setItem("categories", JSON.stringify(categoriesValues));
      });
    // }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
          <ModalComponent />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: Object.values(state.categories),
  };
};

export default withIntl(
  connect(mapStateToProps, {
    showModal,
    fetchCategories,
  })(App)
);
