import React, { Component } from "react";
import { extractIdAndCategories, slugSanitize } from "../../utilities/browser";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/cjs/Spinner";
import arrowLeftLong from "../../assets/images/arrow-left-long.svg";
import arrowRightLong from "../../assets/images/arrow-right-long.svg";
import { connect } from "react-redux";
import { fetchCollectionsMain } from "../../actions";
import { injectIntl } from "react-intl";
import { isEqual } from "lodash";
import navigationCollectionItems from "../../utilities/navigationCollectionItems";
import sortById from "../../utilities/sortById";

class NavigateThroughCollections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
      collectionType: props.collectionType,
      isLoading: false,
      currentIndex: undefined,
      nextIndex: undefined,
      prevIndex: undefined,
    };
  }

  location = this.props.location;

  calculateNavigation = () => {
    if (this.state.collection.length !== 0) {
      const currentItemSlug = slugSanitize(window.location.pathname);
      const { currentIndex, prevIndex, nextItem } = navigationCollectionItems(
        this.state.collection,
        currentItemSlug
      );
      
      // If current item not found (currentIndex === -1), navigationCollectionItems 
      // may return undefined values, so we handle this gracefully
      if (currentIndex === -1 && this.state.collection.length > 0) {
        // If current item not found, show first and last items as navigation
        this.setState({
          currentIndex: -1,
          prevIndex: this.state.collection[this.state.collection.length - 1],
          nextIndex: this.state.collection[0],
        });
      } else {
        this.setState({
          currentIndex: currentIndex,
          prevIndex: prevIndex,
          nextIndex: nextItem,
        });
      }
    }
  };

  fetchData = (id, listFrom, props, propsCategories) => {
    const { slugId, slugItemName, pureSlug } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );
    if (typeof slugId !== "undefined") {
      this.setState({
        isLoading: true,
      });
      this.props
        .fetchCollectionsMain(slugId)
        .then(() => {
          const sortedCollection = sortById(this.props.collectionsMain);
          this.setState({
            collection: sortedCollection,
          });

          sessionStorage.setItem(
            pureSlug,
            JSON.stringify(this.props.collectionsMain)
          );

          // Calculate navigation after collection is set
          this.calculateNavigation();
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
        })
        .catch(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  loadCollectionsData = () => {
    const { collectionType } = this.state;
    const pureSlug = slugSanitize(collectionType);

    // Check sessionStorage for cached collectionsMain (this is the source of truth)
    // Redux state.collections.main can be overwritten by other components
    const cachedCollections = sessionStorage.getItem(pureSlug);
    if (cachedCollections) {
      try {
        const parsedCollections = JSON.parse(cachedCollections);
        const sortedCollection = sortById(parsedCollections);
        if (!isEqual(sortedCollection, this.state.collection)) {
          this.setState({
            collection: sortedCollection,
          });
          this.calculateNavigation();
        }
        return;
      } catch (e) {
        // Invalid cache, continue to fetch
      }
    }

    // Get categories from props or sessionStorage
    let categories = this.props.categories;
    if (!categories || categories.length === 0) {
      const categoriesFromStorage = sessionStorage.getItem("categories");
      if (categoriesFromStorage) {
        try {
          categories = Object.values(JSON.parse(categoriesFromStorage));
        } catch (e) {
          // Invalid cache, return early
          return;
        }
      } else {
        // No categories available yet, wait for componentDidUpdate
        return;
      }
    }

    // Fetch from API if categories are available
    if (categories && categories.length > 0) {
      this.fetchData(collectionType, "props", this.props, categories);
    }
  };

  componentDidMount() {
    this.loadCollectionsData();
  }

  componentDidUpdate(prevProps, prevState) {
    // Handle collectionType prop changes
    if (prevProps.collectionType !== this.props.collectionType) {
      this.setState({
        collectionType: this.props.collectionType,
        collection: [],
        currentIndex: undefined,
        nextIndex: undefined,
        prevIndex: undefined,
      });
      this.loadCollectionsData();
    } else if (prevState.collectionType !== this.state.collectionType) {
      this.setState({
        collection: [],
        currentIndex: undefined,
        nextIndex: undefined,
        prevIndex: undefined,
      });
      this.loadCollectionsData();
    }

    // Handle categories changes (from Redux)
    if (
      this.props &&
      this.props.categories &&
      !isEqual(this.props.categories, this.state.categories)
    ) {
      this.setState({
        categories: this.props.categories,
      });
      // Only fetch if we don't have collection data yet
      if (this.state.collection.length === 0) {
        this.loadCollectionsData();
      }
    }

    // Calculate navigation when collection changes
    if (
      this.state.currentIndex === undefined &&
      this.state.collection.length !== 0 &&
      this.state.collection.length !== prevState.collection.length
    ) {
      this.calculateNavigation();
    }

    // Update navigation if pathname changed but collection is loaded
    if (
      prevProps.location?.pathname !== this.props.location?.pathname &&
      this.state.collection.length > 0
    ) {
      this.calculateNavigation();
    }
  }

  render() {
    const { prevIndex, nextIndex, collection, isLoading } = this.state;

    // Only show spinner if actively loading AND no collection data available
    if (isLoading && collection.length === 0) {
      return (
        <div className="spinner-wrap">
          <Spinner className="spinner" animation="border" role="status" />
        </div>
      );
    }

    // If collection is empty after loading, don't show navigation
    if (!isLoading && collection.length === 0) {
      return null;
    }

    // Show navigation if we have collection data, even if prevIndex/nextIndex are being calculated
    // Fallback to showing navigation with undefined values if calculation hasn't happened yet
    return (
      <div className="nav-through-collections">
        <Container fluid>
          <Row>
            <Col md={6}>
              {prevIndex ? (
                <a
                  href={`/${this.state.collectionType}/intro/${prevIndex.slug}`}
                >
                  <Row className="nav-through-collections__first-half">
                    <Col md={5} />
                    <Col md={7}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <img className="img" src={arrowLeftLong} alt="" />
                        </div>
                        <div>
                          <p className="nav-through-collections__direction">
                            Назад
                          </p>
                          <p className="nav-through-collections__direction__item">
                            {prevIndex.name}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </a>
              ) : (
                <div className="nav-through-collections__first-half">
                  <Col md={5} />
                  <Col md={7} />
                </div>
              )}
            </Col>
            <Col md={6}>
              {nextIndex ? (
                <a
                  href={`/${this.state.collectionType}/intro/${nextIndex.slug}`}
                >
                  <Row className="nav-through-collections__second-half">
                    <Col md={7}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="nav-through-collections__direction">
                            Напред
                          </p>
                          <p className="nav-through-collections__direction__item">
                            {nextIndex.name}
                          </p>
                        </div>
                        <div>
                          <img className="img" src={arrowRightLong} alt="" />
                        </div>
                      </div>
                    </Col>
                    <Col md={5} />
                  </Row>
                </a>
              ) : (
                <div className="nav-through-collections__second-half">
                  <Col md={7} />
                  <Col md={5} />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collectionsMain: state.collections.main,
    categories: Object.values(state.categories),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsMain: (parent) => dispatch(fetchCollectionsMain(parent)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(NavigateThroughCollections)
);
