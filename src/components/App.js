import React, { Component } from "react";
import "../assets/styles/main.scss";
import history from "../history";
import { Router, Route, Switch } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HomePage from "./pages/homePage/HomePage";
import FundsPage from "./pages/fundsPage/FundsPage";
import NewsPage from "./pages/newsPage/NewsPage";
import AboutUs from "./pages/aboutUs/AboutUs";
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage";
import ExhibitionsDetailPage from "./pages/ExhibitionsDetailPage/ExhibitionsDetailPage";
import Contacts from "./pages/contacts/Contacts";
import ModalComponent from "./modal/ModalComponent";
import NotFound from "./pages/NotFound";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { showModal, fetchCategories } from "../actions";
import SupportUs from "./pages/supportUs/SupportUs";
import Administrative from "./pages/administrative/Administrative";
import Terms from "./pages/terms/Terms";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import ExhibitionsPage from "./pages/exhibitions/Exhibitions";
import Services from "./pages/services/Services";
import Prices from "./pages/prices/Prices";
import CollectionsVirtual from "./pages/collection/CollectionsVirtual";
import CollectionsMain from "./pages/collection/CollectionsMain";
import CollectionsMainIntroAndGallery from "./pages/collection/CollectionsMainIntroAndGallery";
import CollectionsMainDetailItem from "./pages/collection/CollectionsMainDetailItem";
import LaszloNagyPage from "./pages/laszloNagyPage/LaszloNagyPage";
import Games from "./pages/games/Games";
import Regulation from "./pages/games/Regulation";

class App extends Component {
  componentDidMount() {
    if (!sessionStorage.getItem("categories")) {
      this.props.fetchCategories().then(() => {
        const categoriesValues = this.props.categories;
        sessionStorage.setItem("categories", JSON.stringify(categoriesValues));
      });
    }
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
                component={CollectionsMainIntroAndGallery}
              />
              <Route
                path="/main-collections/detail/:type/:item"
                exact
                component={CollectionsMainDetailItem}
              />
              <Route
                path="/virtual-collections"
                exact
                component={CollectionsVirtual}
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
              <Route path="/regulation" exact component={Regulation} />
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
