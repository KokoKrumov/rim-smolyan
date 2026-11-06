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
import NavigationEffects from "./NavigationEffects";

class App extends Component {
  componentDidMount() {
    // if (!sessionStorage.getItem("categories")) {
      this.props.fetchCategories().then((categories) => {
        sessionStorage.setItem("categories", JSON.stringify(categories));
      });
    // }
  }

  render() {
    return (
      <BrowserRouter>
        <NavigationEffects />
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

export default withIntl(
  connect(null, {
    showModal,
    fetchCategories,
  })(App)
);
