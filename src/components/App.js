import "../assets/styles/main.scss";

import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { fetchCategories, showModal } from "../actions";

import AboutUs from "./pages/aboutUs/AboutUs";
import Administrative from "./pages/administrative/Administrative";
import CollectionsDetailItem from "./pages/collection/CollectionsDetailItem";
import CollectionsIntroAndGallery from "./pages/collection/CollectionsIntroAndGallery";
import CollectionsMain from "./pages/collection/CollectionsMain";
import CollectionsVirtual from "./pages/collection/CollectionsVirtual";
import Contacts from "./pages/contacts/Contacts";
import ExhibitionsDetailPage from "./pages/ExhibitionsDetailPage/ExhibitionsDetailPage";
import ExhibitionsPage from "./pages/exhibitions/Exhibitions";
import Footer from "../components/footer/Footer";
import FundsPage from "./pages/fundsPage/FundsPage";
import Games from "./pages/games/Games";
import Header from "../components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import LaszloNagyPage from "./pages/laszloNagyPage/LaszloNagyPage";
import ModalComponent from "./modal/ModalComponent";
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage";
import NewsPage from "./pages/newsPage/NewsPage";
import NotFound from "./pages/NotFound";
import Prices from "./pages/prices/Prices";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import Regulation from "./pages/games/Regulation";
import Services from "./pages/services/Services";
import SupportUs from "./pages/supportUs/SupportUs";
import Terms from "./pages/terms/Terms";
import { connect } from "react-redux";
import history from "../history";
import { injectIntl } from "react-intl";

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
      <Router history={history}>
        <div className="wrapper">
          <Header />
          <main>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/funds" exact component={FundsPage} />
              <Route
                path="/news-and-events/:slug"
                exact
                component={NewsDetailPage}
              />
              <Route path="/news-and-events" exact component={NewsPage} />
              <Route path="/news/:slug" exact component={NewsDetailPage} />
              <Route path="/news" exact component={NewsPage} />
              <Route path="/events/:slug" exact component={NewsDetailPage} />
              <Route path="/events" exact component={NewsPage} />
              <Route
                path="/exhibitions/:articleSlug"
                exact
                component={ExhibitionsDetailPage}
              />
              <Route path="/exhibitions" exact component={ExhibitionsPage} />
              <Route path="/about-us/:modalContent" exact component={AboutUs} />
              <Route
                path="/main-collections"
                exact
                component={CollectionsMain}
              />
              <Route
                path="/main-collections/intro/:type"
                exact
                component={CollectionsIntroAndGallery}
              />
              <Route
                path="/main-collections/detail/:type/:item"
                exact
                component={CollectionsDetailItem}
              />
              <Route
                path="/virtual-collections"
                exact
                component={CollectionsVirtual}
              />
              <Route
                path="/virtual-collections/intro/:type"
                exact
                component={CollectionsIntroAndGallery}
              />
              <Route
                path="/virtual-collections/detail/:type/:item"
                exact
                component={CollectionsDetailItem}
              />
              <Route
                path="/house-museum-laszlo-nagy"
                exact
                component={LaszloNagyPage}
              />
              <Route path="/about-us" exact component={AboutUs} />
              <Route path="/contact-us" exact component={Contacts} />
              <Route path="/support-us" exact component={SupportUs} />
              <Route path="/privacy-policy" exact component={PrivacyPolicy} />
              <Route path="/terms" exact component={Terms} />
              <Route path="/administrative" exact component={Administrative} />
              <Route path="/services" exact component={Services} />
              <Route path="/prices" exact component={Prices} />
              <Route path="/museum-games" exact component={Games} />
              <Route path="/museum-games/regulation" exact component={Regulation} />
              <Route
                path="/administrative/:parentId/:id"
                exact
                component={Administrative}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <ModalComponent />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: Object.values(state.categories),
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    showModal,
    fetchCategories,
  })(App)
);
