import React, { Component } from "react";
import heroImage from "../../../assets/images/baseHero.jpg";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Nav from "react-bootstrap/cjs/Nav";
import NewsAndEventsListHorizontal from "../../newsAndEventsList/NewsAndEventsListHorizontal";
import { connect } from "react-redux";
import { fetchNews, resetFetchNews } from "../../../actions";
import { withRouter } from "react-router";
import { isEqual } from "lodash";
import { extarctIdAndCategories } from "../../../utilities/browser";
import history from "../../../history";

class NewsPage extends Component {
  navLinks = [
    {
      href: "/news-and-events",
      className: "tab_list-link",
      eventKey: "link-1",
      label: "Всички",
    },
    {
      href: "/news",
      className: "tab_list-link",
      eventKey: "link-2",
      label: "Новини",
    },
    {
      href: "/events",
      className: "tab_list-link",
      eventKey: "link-3",
      label: "Събития",
    },
  ];

  state = {
    bgHero: null,
    bgAboutUs: null,
    listOfNewsAndEvents: [],
    news: [],
    currentNews: [],
    categories: [],
    prevY: 0,
    page: 1,
    newsError: false,
  };

  fetchArticles(href) {
    history.push(href);
    this.setState(
      {
        page: 1,
        news: [],
        newsError: false,
      },
      () => {
        this.fetchData(
          href,
          this.state.page,
          10,
          "storage",
          this.props,
          this.props.categories
        );
      }
    );
  }

  fetchData = (slug, page, per_page, listFrom, props, propsCategories) => {
    const { slugId, categories } = extarctIdAndCategories(
      slug,
      listFrom,
      props,
      propsCategories
    );
    this.props.fetchNews(slugId, page, per_page).then(() => {
      this.setState({
        categories: categories,
      });
    });
  };

  //FETCH DATA WHEN SCROLL TO THE BOTTOM
  handleObserver(entities, observer) {
    const { location } = this.props;
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      this.fetchData(
        location.pathname,
        curPage,
        10,
        "storage",
        this.props,
        this.state.listOfNewsAndEvents
      );
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  componentDidMount() {
    this.props.resetFetchNews();
    this.setState({
      bgHero: heroImage,
      bgAboutUs: aboutUsImage,
    });
    // this.setState({listOfNewsAndEvents: this.props.news})

    const { location } = this.props;
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
        location.pathname,
        this.state.page,
        10,
        "storage",
        this.props,
        this.state.categories
      );
    }
    // OPTIONS FOR INFINITE SCROLL
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.90,
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  componentDidUpdate() {
    if (
      !sessionStorage.getItem("categories") &&
      this.props &&
      this.props.categories &&
      !isEqual(this.props.categories, this.state.categories)
    ) {
      const { location } = this.props;
      this.fetchData(
        location.pathname,
        1,
        10,
        "props",
        this.props,
        this.props.categories
      );
    }

    if (this.props.news && !isEqual(this.props.news, this.state.currentNews)) {
      this.setState({
        currentNews: this.props.news,
        news: [...this.state.news, ...this.props.news],
      });
    }

    if (this.props.newsError && this.props.newsError !== this.state.newsError) {
      this.setState({
        newsError: this.props.newsError,
      });
    }
  }

  render() {
    const { location } = this.props;
    return (
      <div className="home-page__wrap">
        <HeroInner title={"news-and-events"} subtitle={""} />

        <div className="tab_list-container tab_list-container_content-dark">
          <Container className="tab_list-container__layout">
            <Row>
              <Col lg={2}>
                <Nav
                  defaultActiveKey="/news-and-events"
                  className="nae__filter__wrap flex-row justify-content-around justify-content-lg-start flex-lg-column"
                >
                  {this.navLinks.map((link) => {
                    return (
                      <Nav.Link
                        active={location.pathname === link.href}
                        key={link.label}
                        onClick={() => {
                          this.fetchArticles(link.href);
                        }}
                        className={link.className}
                        eventKey={link.eventKey}
                      >
                        {link.label}
                      </Nav.Link>
                    );
                  })}
                </Nav>
              </Col>
              <Col lg={9}>
                <Row>
                  <div style={{ minHeight: "1000px" }}>
                    <NewsAndEventsListHorizontal
                      listOfNewsAndEvents={this.state.news}
                    />
                  </div>
                </Row>
                <Row>
                  <div ref={(loadingRef) => (this.loadingRef = loadingRef)}>
                    <span>{!this.state.newsError && "Loading..."}</span>
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: Object.values(state.news),
    newsError: state.newsError.newsError,
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, {
  fetchNews,
  resetFetchNews,
})(withRouter(NewsPage));
