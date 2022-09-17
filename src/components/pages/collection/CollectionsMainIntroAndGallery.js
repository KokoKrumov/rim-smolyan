import React, { Component } from "react";
import { injectIntl } from "react-intl";
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import { connect } from "react-redux";
import { fetchCollections } from "../../../actions";
import CardCollections from "../../cards/cardCollections";
import NotFound from "../NotFound";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import HeroCollections from "../../hero/HeroCollections";
import SocialsShare from "../../socials/socialsShare";
import NavigateThroughCollections from "../../nav/NavigateThroughCollections";
import {
  extarctIdAndCategories,
  slugSanatize,
} from "../../../utilities/browser";
import { isEqual } from "lodash";
import Spinner from "react-bootstrap/cjs/Spinner";

class CollectionsMainIntroAndGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionsType: null,
      fetchType: null,
      collectionExist: null,
      //"COLLECTIONmAIN" are all MAIN COLLECTIONS LIST
      collectionsMain: null,
      // "COLLECTION" IS THE INFORMATION ABOUT current COLLECTION
      collection: null,
      collectionNavigation: null,
      // "COLLECTIONfrommain" IS THE INFORMATION from main collection json ABOUT current COLLECTION
      collectionFromMain: null,
      collectionNextItem: null,
      collectionPrevItem: null,
      isInnerGallery: this.props.match.path.includes("intro"),
    };
  }

  location = this.props.location;
  bgArchImage = "../../images/collections-main/archeology/archeology-bg.png";

  fetchData = (id, listFrom, props, propsCategories) => {
    const { slugId, pureSlug } = extarctIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );

    this.setState({
      collectionsType: pureSlug,
      title: pureSlug,
    });

    if (!sessionStorage.getItem(pureSlug)) {
      this.props
        .fetchCollections(slugId)
        .then(() => {
          if (this.props.collection.length) {
            this.setState({
              collection: this.props.collection,
              collectionExist: true,
            });
            sessionStorage.setItem(
              pureSlug,
              JSON.stringify(this.props.collection)
            );
          } else {
            this.setState({
              collectionExist: false,
            });
          }
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
        });
    } else {
      this.setState({
        collection: JSON.parse(sessionStorage.getItem(pureSlug)),
        collectionExist: true,
        isLoading: false,
        title: pureSlug,
        // collectionNavigation:
      });
    }
  };

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
        this.location.pathname,
        "props",
        this.props,
        this.props.categories
      );
    }
  }

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
        this.location.pathname,
        "storage",
        this.props,
        this.state.categories
      );
    }
  }

  pageContent = () => {
    const { intl } = this.props;
    return (
      <>
        {this.state.collection ? (
          <HeroCollections
            bgImage={this.bgArchImage}
            title={this.state.title}
            label={true}
          />
        ) : null}
        <div className="collections-page pt-0 pb-0">
          {this.state.collection ? (
            <HeroInner
              breadcrumbs={{
                parent: "main-collections",
                parentLink: "main-collections",
                child: this.state.title,
              }}
              subtitleLg={
                this.state.collection &&
                `collection.${this.state.title}.subtitle`
              }
              arrowBottom={true}
            />
          ) : null}
          <main className="prices-page__main collections-page__intro-and-gallery">
            <section>
              <Container>
                <Tab.Container defaultActiveKey="introduction">
                  <Row className="justify-content-between">
                    <Col sm={2}>
                      <Nav className="flex-column">
                        <Nav
                          defaultActiveKey="/introduction"
                          className="nae__filter__wrap flex-row justify-content-around justify-content-lg-start flex-lg-column"
                        >
                          <Nav.Link
                            className="tab_list-link"
                            eventKey="introduction"
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({
                                id: "introduction",
                              }),
                            }}
                          />
                          <Nav.Link
                            className="tab_list-link"
                            eventKey="gallery"
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({ id: "gallery" }),
                            }}
                          />
                        </Nav>
                      </Nav>
                      <div className="socials__wrap">
                        <p className="socials-label">Споделете страницата</p>
                        <SocialsShare page={"share-page"} />
                      </div>
                    </Col>
                    <Col sm={10}>
                      <Tab.Content>
                        <Tab.Pane eventKey="introduction">
                          <Container>
                            <Row className="justify-content-center">
                              <Col sm={12} md={9}>
                                <h2
                                  className="h2"
                                  dangerouslySetInnerHTML={{
                                    __html: intl.formatMessage({
                                      id: "collection-introduction",
                                    }),
                                  }}
                                />
                                {this.state.collection ? (
                                  <div
                                    className="paragraph-2 paragraphs-with-mb-25"
                                    dangerouslySetInnerHTML={{
                                      __html: intl.formatMessage({
                                        id: "collection.description",
                                      }),
                                    }}
                                  />
                                ) : (
                                  <p>Loading ...</p>
                                )}
                              </Col>
                            </Row>
                          </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="gallery">
                          <Container>
                            <Row className="justify-content-end">
                              <Col md={11}>
                                <h2
                                  className="h2"
                                  dangerouslySetInnerHTML={{
                                    __html: intl.formatMessage({
                                      id: "gallery",
                                    }),
                                  }}
                                />
                                <p
                                  className="paragraph-2 mb-5"
                                  dangerouslySetInnerHTML={{
                                    __html: intl.formatMessage({
                                      id: "gallery-intro",
                                    }),
                                  }}
                                />
                                <div className="card-columns card-columns-3">
                                  {this.state.collection ? (
                                    this.state.collection.map((item) => {
                                      return (
                                        <CardCollections
                                          key={item.title.rendered}
                                          item={item}
                                          collectionsType={
                                            this.state.collectionsType
                                          }
                                          isInnerGallery
                                        />
                                      );
                                    })
                                  ) : (
                                    <p>Loading Collections...</p>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </Container>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Container>
            </section>
            <section>
              <Container className="position-relative">
                <Row>
                  <Col xs={12}>
                    <div className="card-columns"></div>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <NavigateThroughCollections
            collectionType={"main-collections"}
            currentIndex={"this.location.pathname"}
          />
        </div>
      </>
    );
  };

  renderContent = () => {
    if (this.state.collectionExist === null) {
      return (
        <div className="spinner-wrap">
          <Spinner className="spinner" animation="border" role="status" />
        </div>
      );
    } else {
      if (this.state.collectionExist) {
        return this.pageContent();
      } else {
        return <NotFound />;
      }
    }
  };

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = (state) => {
  return {
    collection: state.collections.byType,
    collectionsError: state.collections.error,
    categories: Object.values(state.categories),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: (parent) => dispatch(fetchCollections(parent)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CollectionsMainIntroAndGallery)
);
