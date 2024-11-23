import React, { Component } from "react";
import { fetchCollectionDescription, fetchCollections } from "../../../actions";

import CardCollections from "../../cards/cardCollections";
import Col from "react-bootstrap/cjs/Col";
import Container from "react-bootstrap/cjs/Container";
import HeroCollections from "../../hero/HeroCollections";
import HeroInner from "../../hero/HeroInner";
import Nav from "react-bootstrap/Nav";
import NavigateThroughCollections from "../../nav/NavigateThroughCollections";
import Row from "react-bootstrap/cjs/Row";
import SocialsShare from "../../socials/socialsShare";
import Spinner from "react-bootstrap/cjs/Spinner";
import Tab from "react-bootstrap/Tab";
import { connect } from "react-redux";
import { extractIdAndCategories } from "../../../utilities/browser";
import history from "../../../history";
import { injectIntl } from "react-intl";
import { isEqual } from "lodash";
import utilizeScroll from "../../../utilities/utilizeScroll";

class CollectionsIntroAndGallery extends Component {
  constructor(props) {
    super(props);
    this.elScroll = utilizeScroll();
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
      collectionDescription: "",
      collectionTitle: "",
    };
  }

  location = this.props.location;
  hostLocation = this.location.pathname.split("/")[1];
  bgArchImage = "../../images/collections-main/archeology/archeology-bg.png";

  fetchData = (id, listFrom, props, propsCategories) => {
    const { slugId, slugItemName, pureSlug } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );

    this.setState({
      collectionsType: pureSlug,
      title: slugItemName,
    });

    if (this.state.collectionDescription === "") {
      this.props.fetchCollectionDescription(pureSlug).then(() => {
        this.setState({
          collectionDescription:
            this.props.collectionDescription[0]?.content?.rendered,
          collectionTitle: this.props.collectionDescription[0]?.title?.rendered,
        });
      });
    }
    if (!sessionStorage.getItem(pureSlug)) {
      this.props
        .fetchCollections(slugId)
        .then(() => {
          if (this.props.collection.length) {
            this.setState({
              collection: this.props.collection,
              collectionExist: true,
              title: slugItemName,
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
        title: slugItemName,
      });
    }
  };

  componentDidUpdate() {
    if (
      // !sessionStorage.getItem("categories") &&
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

  // componentDidMount() {
  //   if (
  //     sessionStorage.getItem("categories") &&
  //     !isEqual(
  //       JSON.parse(sessionStorage.getItem("categories")),
  //       this.state.categories
  //     )
  //   ) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     this.fetchData(
  //       this.location.pathname,
  //       "storage",
  //       this.props,
  //       this.state.categories
  //     );

  //     // this.hostLocation = this.location.pathname.split("/")[0];
  //   }
  // }

  pageContentExist = (collectionExist) => {
    const { intl } = this.props;
    return (
      <>
        {collectionExist ? (
          <HeroCollections
            bgImage={this.bgArchImage}
            subtitleLg={
              this.state.collectionTitle !== ""
                ? this.state.collectionTitle
                : this.state.title
            }
            label={true}
          />
        ) : (
          <HeroCollections bgImage={this.bgArchImage} />
        )}
        <div className="collections-page pt-0 pb-0">
          {collectionExist ? (
            <HeroInner
              breadcrumbs={{
                parent: this.hostLocation,
                parentLink: this.hostLocation,
                child: this.state.title,
              }}
              subtitleLg={
                this.state.collectionTitle !== ""
                  ? this.state.collectionTitle
                  : this.state.title
              }
              arrowBottom={true}
              scrollOnClick={this.elScroll.executeScroll}
            />
          ) : (
            <HeroInner
              breadcrumbs={{
                parent: this.hostLocation,
                parentLink: this.hostLocation,
                child: this.state.title,
              }}
              subtitleLg={this.state.title}
              arrowBottom={true}
              scrollOnClick={this.elScroll.executeScroll}
            />
          )}
          <main className="prices-page__main collections-page__intro-and-gallery">
            <section ref={this.elScroll.elRef}>
              <Container>
                <Tab.Container
                  defaultActiveKey={
                    window.location.hash === "#gallery"
                      ? "gallery"
                      : "introduction"
                  }
                >
                  <Row className="justify-content-between">
                    <Col sm={2}>
                      <Nav className="flex-column">
                        <Nav
                          defaultActiveKey="/introduction"
                          className="nae__filter__wrap flex-row justify-content-around justify-content-lg-start flex-lg-column"
                        >
                          <Nav.Link
                            disabled={!collectionExist}
                            onSelect={() => {
                              history.push(
                                `${history.location.pathname}#introduction`
                              );
                            }}
                            className="tab_list-link"
                            eventKey="introduction"
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({
                                id: "introduction",
                              }),
                            }}
                          />
                          <Nav.Link
                            disabled={!collectionExist}
                            onSelect={() => {
                              history.push(
                                `${history.location.pathname}#gallery`
                              );
                            }}
                            className="tab_list-link"
                            eventKey="gallery"
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({ id: "gallery" }),
                            }}
                          />
                        </Nav>
                      </Nav>
                      <div className="socials__wrap pr-3 pl-3 p-md-0">
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
                                {collectionExist ? (
                                  <h2
                                    className="h2"
                                    dangerouslySetInnerHTML={{
                                      __html: intl.formatMessage({
                                        id: "collection-introduction",
                                      }),
                                    }}
                                  />
                                ) : (
                                  <h2
                                    className="h2"
                                    dangerouslySetInnerHTML={{
                                      __html: intl.formatMessage({
                                        id: "collection-not-exist",
                                      }),
                                    }}
                                  />
                                )}
                                {collectionExist ? (
                                  this.state.collectionDescription ? (
                                    <div
                                      className="paragraph-2 paragraphs-with-mb-25"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          this.state.collectionDescription,
                                      }}
                                    />
                                  ) : (
                                    <p>Loading ...</p>
                                  )
                                ) : null}
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
                                  {collectionExist ? (
                                    this.state.collection.map((item) => {
                                      return (
                                        <CardCollections
                                          key={item.title.rendered}
                                          item={item}
                                          hostLocation={this.hostLocation}
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
            collectionType={this.hostLocation}
            currentIndex={"this.location.pathname"}
          />
        </div>
      </>
    );
  };

  renderContent = () => {
    //null - loading
    //true - collection exist
    //false - collection not exist
    if (this.state.collectionExist === null) {
      return (
        <div className="spinner-wrap">
          <Spinner className="spinner" animation="border" role="status" />
        </div>
      );
    } else {
      return this.pageContentExist(this.state.collectionExist);
    }
  };

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = (state) => {
  return {
    collection: state.collections.byType,
    collectionDescription: state.collections.description,
    collectionsError: state.collections.error,
    categories: Object.values(state.categories),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: (parent) => dispatch(fetchCollections(parent)),
  fetchCollectionDescription: (collectionSlug) =>
    dispatch(fetchCollectionDescription(collectionSlug)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CollectionsIntroAndGallery)
);
