import React, { Component } from "react";
import {
  extractIdAndCategories,
  slugSanitize,
} from "../../../utilities/browser";

import Col from "react-bootstrap/cjs/Col";
import CollectionsList from "./CollectionsList";
import Container from "react-bootstrap/cjs/Container";
import HeroInner from "../../hero/HeroInner";
import InfoColumn from "../../infoColumn/InfoColumn";
import Row from "react-bootstrap/cjs/Row";
import Spinner from "react-bootstrap/cjs/Spinner";
import { connect } from "react-redux";
import { fetchCollectionsVirtual } from "../../../actions";
import { injectIntl } from "react-intl";
import { isEqual } from "lodash";
import libraryBg from "../../../assets/images/library-bg.png";
import photoArchiveBg from "../../../assets/images/photo-archive.png";
import scientificArchiveBg from "../../../assets/images/scientific-archive-bg.png";
import utilizeScroll from "../../../utilities/utilizeScroll";

class Collections extends Component {
  constructor(props) {
    super(props);
    this.elScroll = utilizeScroll();
    this.state = {
      collectionsVirtual: [],
      isLoading: false,
      categories: [],
    };
  }
  location = this.props.location;

  fetchData = (id, listFrom, props, propsCategories) => {
    const { slugId, pureSlug } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );
    // if (!sessionStorage.getItem(pureSlug)) {
      this.props
        .fetchCollectionsVirtual(slugId)
        .then(() => {
          this.setState({
            collectionsVirtual: this.props.collectionsVirtual,
          });

          sessionStorage.setItem(
            pureSlug,
            JSON.stringify(this.props.collectionsVirtual)
          );
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });
        });
    // } else {
    //   this.setState({
    //     collectionsVirtual: JSON.parse(sessionStorage.getItem(pureSlug)),
    //     isLoading: false,
    //   });
    // }
  };

  // componentDidMount() {
  //   if (
  //     this.props &&
  //     this.props.categories
  //     //   sessionStorage.getItem("categories") &&
  //     //   !isEqual(
  //     //     JSON.parse(sessionStorage.getItem("categories")),
  //     //     this.state.categories
  //     //   )
  //   ) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     console.log("%c this.props,", "color: orange", this.props);
  //     console.log("%c this.state", "color: orange", this.state);
  //     this.fetchData(
  //       this.location.pathname,
  //       "props",
  //       this.props,
  //       this.props.categories
  //     );
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }

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

  render() {
    const { intl } = this.props;
    return (
      <div className="collections-page__wrap">
        <HeroInner
          labelTitle={slugSanitize(this.location.pathname, "/")}
          subtitleLg={"collections-virtual-subtitle"}
          title={"collections"}
          arrowBottom={true}
          scrollOnClick={this.elScroll.executeScroll}
        />
        <main className="collections-page">
          <section>
            <Container className="position-relative">
              <Row>
                <Col xs={12}>
                  {this.state.isLoading ? (
                    <div className="spinner-wrap">
                      <Spinner
                        className="spinner"
                        animation="border"
                        role="status"
                      />
                    </div>
                  ) : (
                    <div ref={this.elScroll.elRef}>
                      <CollectionsList
                        collections={this.state.collectionsVirtual}
                        collectionsType={"virtual"}
                        cols={3}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </section>
          {slugSanitize(this.location.pathname, "/") ===
            "virtual-collections" && (
            <>
              <section>
                <InfoColumn
                  title={"photo-archive"}
                  text={"photo-archive-text"}
                  backgroundImage={photoArchiveBg}
                  columns={2}
                />
              </section>
              <section className="archive">
                <div className="">
                  <div
                    className="hero-bg"
                    style={{
                      backgroundImage: `url(${scientificArchiveBg})`,
                    }}
                  >
                    <Container className="archive__container">
                      <Row>
                        <Col xs={12} md={11}>
                          <h1
                            className="h1"
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({
                                id: "scientific-archive",
                              }),
                            }}
                          />
                          <p
                            className="paragraph-2"
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({
                                id: "scientific-archive-text",
                              }),
                            }}
                          />
                          <ul className="archive__list col-count-2">
                            <li className="archive__list-item">
                              Документални материали от изследователски програми
                              - „Родопи”, „Родопски крепости”, „Родопски
                              мостове”, теренни проучвания и народописни
                              материали за селища от територията на Средните
                              Родопи;
                            </li>
                            <li className="archive__list-item">
                              Документи, свързани с научно-техническата
                              обработка на фондовете - книги за регистрация,
                              полеви дневници, научни паспорти, актове за
                              приемане-предаване, протоколи от инвентаризации,
                              консервация и реставрация на културни ценности;
                            </li>
                            <li className="archive__list-item">
                              Материали, свързани с експозиционни дейности -
                              тематико-структурни и тематико-експозиционни
                              планове; консултации; рисунки, схеми, чертежи;
                              плакати, покани и други рекламни материали от
                              музейни изложби.
                            </li>
                            <li className="archive__list-item">
                              Материали, свързани с недвижими културни ценности
                              в Средните Родопи, обособени в „Технически архив”.
                            </li>
                          </ul>
                          <p
                            className="paragraph-2"
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({
                                id: "scientific-archive-text-help",
                              }),
                            }}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </section>
              <section>
                <InfoColumn
                  title={"library"}
                  text={"library-text"}
                  backgroundImage={libraryBg}
                  columns={2}
                />
              </section>
            </>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collectionsVirtual: state.collections.virtual,
    categories: Object.values(state.categories),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsVirtual: (parent) =>
    dispatch(fetchCollectionsVirtual(parent)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(Collections)
);
