import "../assets/styles/main.scss";

import React, { Component, Suspense, lazy } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { fetchCategories, showModal } from "../actions";

const AboutUs = lazy(() => import("./pages/aboutUs/AboutUs"));
const Administrative = lazy(() => import("./pages/administrative/Administrative"));
const CollectionsDetailItem = lazy(() => import("./pages/collection/CollectionsDetailItem"));
const CollectionsIndex = lazy(() => import("./pages/collection/CollectionsIndex"));
const CollectionsIntroAndGallery = lazy(() => import("./pages/collection/CollectionsIntroAndGallery"));
const CollectionsMain = lazy(() => import("./pages/collection/CollectionsMain"));
const CollectionsVirtual = lazy(() => import("./pages/collection/CollectionsVirtual"));
const Contacts = lazy(() => import("./pages/contacts/Contacts"));
const ExhibitionsDetailPage = lazy(() => import("./pages/ExhibitionsDetailPage/ExhibitionsDetailPage"));
const ExhibitionsPage = lazy(() => import("./pages/exhibitions/Exhibitions"));
import Footer from "../components/footer/Footer";
const FundsPage = lazy(() => import("./pages/fundsPage/FundsPage"));
const Games = lazy(() => import("./pages/games/Games"));
import Header from "../components/header/Header";
const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const LaszloNagyPage = lazy(() => import("./pages/laszloNagyPage/LaszloNagyPage"));
import ModalComponent from "./modal/ModalComponent";
const NewsDetailPage = lazy(() => import("./pages/newsDetailPage/NewsDetailPage"));
const NewsPage = lazy(() => import("./pages/newsPage/NewsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Prices = lazy(() => import("./pages/prices/Prices"));
const LegalInfo = lazy(() => import("./pages/legal/LegalInfo"));
const Regulation = lazy(() => import("./pages/games/Regulation"));
const Services = lazy(() => import("./pages/services/Services"));
const SupportUs = lazy(() => import("./pages/supportUs/SupportUs"));
const Terms = lazy(() => import("./pages/terms/Terms"));
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
            <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
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
              <Route path="/collections" exact component={CollectionsIndex} />
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
              <Route path="/privacy-policy" exact component={LegalInfo} />
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
            </Suspense>
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
