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
      collectionExist: null,
      collection: null,
      isInnerGallery: this.props.match.path.includes("intro"),
      collectionDescription: "",
      collectionTitle: "",
      title: "",
      isLoading: true,
    };
  }

  location = this.props.location;
  hostLocation = this.location.pathname.split("/")[1];
  bgArchImage = "../../images/collections-main/archeology/archeology-bg.png";

  fetchData = async (id, listFrom, props, propsCategories) => {
    const { slugId, slugItemName, pureSlug } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories,
    );

    this.setState({
      collectionsType: pureSlug,
      title: slugItemName,
      isLoading: true,
    });

    let hasDescription = false;
    let hasItems = false;

    // Fetch description - use returned data directly
    try {
      const descriptionData =
        await this.props.fetchCollectionDescription(pureSlug);
      if (descriptionData && descriptionData[0]) {
        const description = descriptionData[0].content?.rendered || "";
        const title = descriptionData[0].title?.rendered || "";
        hasDescription = description !== "";
        this.setState({
          collectionDescription: description,
          collectionTitle: title,
        });
      }
    } catch (e) {
      console.error("Error fetching collection description:", e);
    }

    // Fetch collection items - use returned data directly
    try {
      const collectionData = await this.props.fetchCollections(slugId);
      hasItems = collectionData && collectionData.length > 0;
      this.setState({
        collection: collectionData,
        collectionExist: hasDescription || hasItems,
        isLoading: false,
      });
    } catch (e) {
      console.error("Error fetching collection:", e);
      this.setState({
        collectionExist: hasDescription,
        isLoading: false,
      });
    }
  };

  loadCollectionData = () => {
    // Get categories from props or sessionStorage (categories rarely change)
    let categories = this.props.categories;
    if (!categories || categories.length === 0) {
      const categoriesFromStorage = sessionStorage.getItem("categories");
      if (categoriesFromStorage) {
        try {
          categories = Object.values(JSON.parse(categoriesFromStorage));
        } catch (e) {
          return;
        }
      } else {
        return;
      }
    }

    if (categories && categories.length > 0) {
      this.fetchData(
        this.location.pathname,
        categories.length === this.props.categories?.length
          ? "props"
          : "storage",
        this.props,
        categories,
      );
    }
  };

  componentDidMount() {
    this.loadCollectionData();
  }

  componentDidUpdate(prevProps) {
    // Update location reference when pathname changes
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.location = this.props.location;
      this.hostLocation = this.location.pathname.split("/")[1];
    }

    // Handle pathname or route param changes (e.g., when navigating back)
    if (
      prevProps.location.pathname !== this.props.location.pathname ||
      prevProps.match.params.type !== this.props.match.params.type
    ) {
      // Reset state for new route
      this.setState({
        collectionExist: null,
        collection: null,
        collectionsType: null,
        collectionDescription: "",
        collectionTitle: "",
        title: "",
        isLoading: true,
      });
      this.loadCollectionData();
      return;
    }

    // Handle categories changes (from Redux) - only if we don't have data yet
    if (
      this.props.categories &&
      this.props.categories.length > 0 &&
      !isEqual(this.props.categories, prevProps.categories) &&
      this.state.collectionExist === null
    ) {
      this.loadCollectionData();
    }
  }

  pageContentExist = (collectionExist) => {
    const { intl } = this.props;
    return (
      <>
        {collectionExist ? (
          <HeroCollections
            bgImage={this.bgArchImage}
            title={
              this.state.collectionTitle !== ""
                ? this.state.collectionTitle
                : this.state.title
            }
            label={true}
          />
        ) : (
          <HeroCollections
            bgImage={this.bgArchImage}
            title={this.state.title || ""}
          />
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
                    <Col md={2}>
                      <Nav className="flex-column">
                        <Nav
                          defaultActiveKey="/introduction"
                          className="nae__filter__wrap flex-row justify-content-around justify-content-lg-start flex-lg-column"
                        >
                          <Nav.Link
                            disabled={!collectionExist}
                            onSelect={() => {
                              history.push(
                                `${history.location.pathname}#introduction`,
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
                                `${history.location.pathname}#gallery`,
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
                    <Col md={10}>
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
                                {collectionExist &&
                                  this.state.collectionDescription && (
                                    <div
                                      className="paragraph-2 paragraphs-with-mb-25"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          this.state.collectionDescription,
                                      }}
                                    />
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
                                {this.state.collection &&
                                this.state.collection.length > 0 ? (
                                  <div className="card-columns card-columns-3">
                                    {this.state.collection.map((item) => {
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
                                    })}
                                  </div>
                                ) : collectionExist ? (
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: intl.formatMessage({
                                        id: "gallery-empty",
                                      }),
                                    }}
                                  />
                                ) : (
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: intl.formatMessage({
                                        id: "collection-not-exist",
                                      }),
                                    }}
                                  />
                                )}
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
            currentIndex={this.location.pathname}
          />
        </div>
      </>
    );
  };

  renderContent = () => {
    // Show spinner while loading
    if (this.state.isLoading) {
      return (
        <div className="spinner-wrap">
          <Spinner className="spinner" animation="border" role="status" />
        </div>
      );
    }
    // After loading, show content based on whether collection exists
    return this.pageContentExist(this.state.collectionExist);
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
  connect(mapStateToProps, mapDispatchToProps)(CollectionsIntroAndGallery),
);
