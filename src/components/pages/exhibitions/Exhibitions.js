import React, { Component } from "react";
import { fetchExhibitions, resetFetchExhibitions } from "../../../actions";

import AccordionBlockExhibitionsArchive from "../../collapse/AccordionBlockExhibitionsArchive";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/cjs/Container";
import HeroInner from "../../hero/HeroInner";
import Image from "react-bootstrap/Image";
import NewsAndEventsListHorizontal from "../../newsAndEventsList/NewsAndEventsListHorizontal";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import exhibitionPermanentHero from "../../../assets/images/exhibition-permanent-hero.png";
import exhibitionsArchiveBG from "../../../translations/exhibitionsArchiveBG.json";
import exhibitionsArchiveEN from "../../../translations/exhibitionsArchiveEN.json";
import { extractIdAndCategories } from "../../../utilities/browser";
import { injectIntl } from "react-intl";
import { isEqual } from "lodash";
import utilizeScroll from "../../../utilities/utilizeScroll";

class ExhibitionsPage extends Component {
  constructor(props) {
    super(props);
    this.elScroll = utilizeScroll();
  }

  state = {
    img: exhibitionPermanentHero,
    exhibitions: [],
    currentExhibitions: [],
    categories: [],
    exhibitionsArchive:
      this.props.intl.locale === "en"
        ? exhibitionsArchiveEN
        : exhibitionsArchiveBG,
  };

  fetchData = (id, page, perPage, listFrom, props, propsCategories) => {
    const { slugId, categories } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );

    this.props.fetchExhibitions(slugId, page, perPage).then(() => {
      this.setState({
        categories: categories,
      });
    });
  };

  componentDidMount() {
    this.props.resetFetchExhibitions();
    // this.elScroll.executeScroll();
    // react can't update when there are changes in storage,
    // however, the storage contains "categories" from the first load,
    // so we have to check the storage when component is mounting
    if (
      sessionStorage.getItem("categories") &&
      !isEqual(
        JSON.parse(sessionStorage.getItem("categories")),
        this.state.categories
      )
    ) {
      this.fetchData(
        "/temporary-exhibitions",
        1,
        100,
        "storage",
        this.props,
        this.state.categories
      );
    }
  }

  componentDidUpdate() {
    if (
      !sessionStorage.getItem("categories") &&
      this.props &&
      this.props.categories &&
      !isEqual(this.props.categories, this.state.categories)
    ) {
      this.fetchData(
        "/temporary-exhibitions",
        1,
        100,
        "props",
        this.props,
        this.props.categories
      );
    }

    if (
      this.props.exhibitions &&
      !isEqual(this.props.exhibitions, this.state.currentExhibitions)
    ) {
      this.setState({
        currentExhibitions: this.props.exhibitions,
        exhibitions: this.props.exhibitions,
      });
    }
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="exhibitions-page__wrap">
        <HeroInner
          title={"permanent-exhibitions-title"}
          subtitleLg={"permanent-exhibitions-subtitle"}
          arrowBottom={true}
          scrollOnClick={this.elScroll.executeScroll}
        />

        <div
          className="exhibitions exhibitions__wrap"
          ref={this.elScroll.elRef}
        >
          <section className="exhibitions__permanent">
            <Container className="exhibitions__container">
              <div className="exhibitions__hero-wrap">
                <div>
                  <Image src={exhibitionPermanentHero} fluid />
                </div>
                <Row>
                  <Col lg={12}>
                    <p
                      className="paragraph-2 col-count-2"
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({
                          id: "permanent-exhibitions-text",
                        }),
                      }}
                    ></p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="exhibitions__permanent exhibitions__dark">
              <Container>
                <h3
                  className="h3-light"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({
                      id: "permanent-exhibitions-text-come",
                    }),
                  }}
                />
              </Container>
            </div>
          </section>
          <section className="exhibitions__temporary">
            <Container>
              {/*no Row (negative margin) because "NewsAndEventsListHorizontal" has container inside*/}
              <Col>
                <h1
                  className="h1"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({
                      id: "temporary-exhibitions-title",
                    }),
                  }}
                />
                <h5
                  className="exhibitions__temporary__subtitle"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({
                      id: "temporary-exhibitions-subtitle",
                    }),
                  }}
                />
              </Col>
              <div>
                <NewsAndEventsListHorizontal
                  listOfNewsAndEvents={this.state.exhibitions.activeExhibitions}
                  isExhibition
                />
              </div>
            </Container>
          </section>
          <section>
            <div className="exhibitions__archive">
              <AccordionBlockExhibitionsArchive
                content={this.state.exhibitions.archiveExhibitions}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exhibitions: state.exhibitions,
    categories: Object.values(state.categories),
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    fetchExhibitions,
    resetFetchExhibitions,
  })(ExhibitionsPage)
);
