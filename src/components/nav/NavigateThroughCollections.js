import React, { Component } from "react";
import { extractIdAndCategories, slugSanitize } from "../../utilities/browser";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/cjs/Spinner";
import arrowLeftLong from "../../assets/images/arrow-left-long.svg";
import arrowRightLong from "../../assets/images/arrow-right-long.svg";
import { checkIfValueExistInIntl } from "../../utilities/browser";
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

  fetchData = (id, listFrom, props, propsCategories) => {
    const { slugId, slugItemName, pureSlug } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );
    if (!sessionStorage.getItem(pureSlug)) {
      this.props
        .fetchCollectionsMain(slugId)
        .then(() => {
          this.setState({
            collection: sortById(this.props.collectionsMain),
          });

          sessionStorage.setItem(
            pureSlug,
            JSON.stringify(this.props.collectionsMain)
          );
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
        });
    } else {
      this.setState({
        collection: sortById(JSON.parse(sessionStorage.getItem(pureSlug))),
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    if (
      sessionStorage.getItem("categories") &&
      !isEqual(
        JSON.parse(sessionStorage.getItem("categories")),
        this.state.categories
      )
    ) {
      this.setState({
        isLoading: true,
      });
      this.fetchData(
        this.state.collectionType,
        "storage",
        this.props,
        this.state.categories
      );
    }

    if (
      this.state.currentIndex === undefined &&
      this.state.collection.length !== 0
    ) {
      const { currentIndex, prevIndex, nextItem } = navigationCollectionItems(
        this.state.collection,
        slugSanitize(window.location.pathname)
      );
      this.setState({
        currentIndex,
        prevIndex,
        nextItem,
      });
    }
  }

  componentDidUpdate() {
    if (
      !sessionStorage.getItem("categories") &&
      this.props &&
      this.props.categories &&
      !isEqual(this.props.categories, this.state.categories)
    ) {
      this.setState({
        categories: this.props.categories,
        isLoading: true,
      });
      this.fetchData(
        this.state.collectionType,
        "props",
        this.props,
        this.props.categories
      );
    }

    if (
      this.state.currentIndex === undefined &&
      this.state.collection.length !== 0
    ) {
      const { currentIndex, prevIndex, nextItem } = navigationCollectionItems(
        this.state.collection,
        slugSanitize(window.location.pathname)
      );
      this.setState({
        currentIndex: currentIndex,
        prevIndex: prevIndex,
        nextIndex: nextItem,
      });
    }
  }

  render() {
    const { intl } = this.props;
    if (
      this.state.prevIndex === undefined &&
      this.state.nextIndex === undefined
    ) {
      return (
        <div className="spinner-wrap">
          <Spinner className="spinner" animation="border" role="status" />
        </div>
      );
    } else {
      return (
        <div className="nav-through-collections">
          <Container fluid>
            <Row>
              <Col md={6}>
                <a
                  href={`/${this.state.collectionType}/intro/${this.state.prevIndex?.slug}`}
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
                            {this.state.prevIndex?.name}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </a>
              </Col>
              <Col md={6}>
                <a
                  href={`/${this.state.collectionType}/intro/${this.state.nextIndex.slug}`}
                >
                  <Row className="nav-through-collections__second-half">
                    <Col md={7}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="nav-through-collections__direction">
                            Напред
                          </p>
                          <p className="nav-through-collections__direction__item">
                            {this.state.nextIndex?.name}
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
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
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
