import "../assets/styles/main.scss";

import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
            <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/funds" element={<FundsPage />} />
              <Route path="/news-and-events/:slug" element={<NewsDetailPage />} />
              <Route path="/news-and-events" element={<NewsPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/events/:slug" element={<NewsDetailPage />} />
              <Route path="/events" element={<NewsPage />} />
              <Route path="/exhibitions/:articleSlug" element={<ExhibitionsDetailPage />} />
              <Route path="/exhibitions" element={<ExhibitionsPage />} />
              <Route path="/about-us/regular-programs" element={<AboutUs />} />
              <Route path="/about-us/:modalContent" element={<AboutUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/collections" element={<CollectionsIndex />} />
              <Route path="/main-collections" element={<CollectionsMain />} />
              <Route path="/main-collections/intro/:type" element={<CollectionsIntroAndGallery />} />
              <Route path="/main-collections/detail/:type/:item" element={<CollectionsDetailItem />} />
              <Route path="/virtual-collections" element={<CollectionsVirtual />} />
              <Route path="/virtual-collections/intro/:type" element={<CollectionsIntroAndGallery />} />
              <Route path="/virtual-collections/detail/:type/:item" element={<CollectionsDetailItem />} />
              <Route path="/house-museum-laszlo-nagy" element={<LaszloNagyPage />} />
              <Route path="/contact-us" element={<Contacts />} />
              <Route path="/support-us" element={<SupportUs />} />
              <Route path="/privacy-policy" element={<LegalInfo />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/administrative/:parentId/:id" element={<Administrative />} />
              <Route path="/administrative" element={<Administrative />} />
              <Route path="/services" element={<Services />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/museum-games/regulation" element={<Regulation />} />
              <Route path="/museum-games" element={<Games />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
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
