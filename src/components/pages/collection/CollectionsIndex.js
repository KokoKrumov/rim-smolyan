import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { isEqual } from "lodash";
import Spinner from "react-bootstrap/cjs/Spinner";

import { extractIdAndCategories } from "../../../utilities/browser";
import {
  fetchCollectionsMain,
  fetchCollectionsVirtual,
} from "../../../actions";

class CollectionsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionsMain: [],
      collectionsVirtual: [],
      isLoading: true,
      categories: [],
      mainFetched: false,
      virtualFetched: false,
    };
  }

  fetchMainCollections = (categories) => {
    const { slugId } = extractIdAndCategories(
      "/main-collections",
      "props",
      this.props,
      categories
    );

    if (slugId) {
      this.props.fetchCollectionsMain(slugId).then(() => {
        this.setState({
          collectionsMain: this.props.collectionsMain,
          mainFetched: true,
        });
        this.checkLoadingComplete();
      });
    }
  };

  fetchVirtualCollections = (categories) => {
    const { slugId } = extractIdAndCategories(
      "/virtual-collections",
      "props",
      this.props,
      categories
    );

    if (slugId) {
      this.props.fetchCollectionsVirtual(slugId).then(() => {
        this.setState({
          collectionsVirtual: this.props.collectionsVirtual,
          virtualFetched: true,
        });
        this.checkLoadingComplete();
      });
    }
  };

  checkLoadingComplete = () => {
    if (this.state.mainFetched && this.state.virtualFetched) {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate() {
    if (
      this.props &&
      this.props.categories &&
      this.props.categories.length > 0 &&
      !isEqual(this.props.categories, this.state.categories)
    ) {
      this.setState({
        categories: this.props.categories,
        isLoading: true,
        mainFetched: false,
        virtualFetched: false,
      });

      this.fetchMainCollections(this.props.categories);
      this.fetchVirtualCollections(this.props.categories);
    }
  }

  render() {
    const { intl } = this.props;
    const mainCount = this.state.collectionsMain.length;
    const virtualCount = this.state.collectionsVirtual.length;

    if (this.state.isLoading) {
      return (
        <div className="collections-index collections-index--loading">
          <div className="spinner-wrap">
            <Spinner className="spinner" animation="border" role="status" />
          </div>
        </div>
      );
    }

    return (
      <div className="collections-index">
        {/* Left - Main Collections */}
        <Link
          to="/main-collections"
          className="collections-index__section collections-index__section--main"
        >
          <div className="collections-index__bg-base collections-index__bg-base--light" />
          <div
            className="collections-index__bg"
            style={{
              backgroundImage: `url(/images/collections-main/introImage.jpg)`,
            }}
          />
          <div className="collections-index__content">
            <span className="collections-index__count">
              {mainCount}{" "}
              {intl.formatMessage({ id: "funds-count-label" })}
            </span>
            <h1 className="collections-index__title">
              {intl.formatMessage({ id: "main-collections" })}
            </h1>
            <span className="collections-index__link">
              {intl.formatMessage({ id: "explore" })}
            </span>
          </div>
        </Link>

        {/* Right - Virtual Collections */}
        <Link
          to="/virtual-collections"
          className="collections-index__section collections-index__section--virtual"
        >
          <div className="collections-index__bg-base" />
          <div
            className="collections-index__bg-image"
            style={{
              backgroundImage: `url(/images/collections-virtual/introImage.jpg)`,
            }}
          />
          <div className="collections-index__bg-gradient" />
          <div className="collections-index__content">
            <span className="collections-index__count">
              {virtualCount}{" "}
              {intl.formatMessage({ id: "funds-count-label" })}
            </span>
            <h1 className="collections-index__title">
              {intl.formatMessage({ id: "virtual-collections" })}
            </h1>
            <span className="collections-index__link">
              {intl.formatMessage({ id: "explore" })}
            </span>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collectionsMain: state.collections.main,
    collectionsVirtual: state.collections.virtual,
    categories: Object.values(state.categories),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsMain: (parent) => dispatch(fetchCollectionsMain(parent)),
  fetchCollectionsVirtual: (parent) => dispatch(fetchCollectionsVirtual(parent)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CollectionsIndex)
);
