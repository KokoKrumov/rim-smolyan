import React, { Component } from "react";
import { selectNews, selectCategories } from "../../../store/selectors";
import { fetchNews, resetFetchNews } from "../../../actions";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import HeroInner from "../../hero/HeroInner";
import Nav from "react-bootstrap/Nav";
import PostSummaryList from "../../newsAndEventsList/PostSummaryList";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import { connect } from "react-redux";
import { extractIdAndCategories } from "../../../utilities/browser";
import heroImage from "../../../assets/images/baseHero.jpg";
import { isEqual } from "lodash";
import { withRouter } from "../../../utilities/withRouter";

class NewsPage extends Component {
  newsRequest = null;

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
    isLoading: false,
  };

  fetchArticles(href) {
    this.props.navigate(href);
  }

  fetchData = (slug, page, per_page, listFrom, props, propsCategories) => {
    const { slugId, categories } = extractIdAndCategories(
      slug,
      listFrom,
      props,
      propsCategories
    );
    this.setState({ categories });
    if (slugId == null) {
      this.newsRequest = null;
      if (categories.length > 0) {
        console.error(`Category not found: ${slug}`);
        this.setState({ isLoading: false, newsError: true });
      }
      return false;
    }

    this.setState({ isLoading: true });
    const request = this.props.fetchNews(slugId, page, per_page);
    this.newsRequest = request;
    request
      .then((action) => {
        if (this.newsRequest !== request) return;
        if (fetchNews.fulfilled.match(action)) {
          this.setState((state) => ({
            currentNews: action.payload,
            news: page === 1 ? action.payload : [...state.news, ...action.payload],
          }));
        } else if (page > 1) {
          this.setState((state) => ({ page: Math.min(state.page, page - 1) }));
        }
        this.newsRequest = null;
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        if (this.newsRequest !== request) return;
        this.newsRequest = null;
        this.setState((state) => ({
          isLoading: false,
          page: page > 1 ? Math.min(state.page, page - 1) : state.page,
        }));
        console.error("Failed to load news", error);
      });
    return true;
  };

  //FETCH DATA WHEN SCROLL TO THE BOTTOM
  handleObserver(entities, observer) {
    const { location } = this.props;
    const y = entities[0].boundingClientRect.y;
    if (
      this.state.prevY > y &&
      !this.state.isLoading &&
      !this.newsRequest
    ) {
      const curPage = this.state.page + 1;
      const requestStarted = this.fetchData(
        location.pathname,
        curPage,
        10,
        "props",
        this.props,
        this.props.categories
      );
      if (requestStarted) this.setState({ page: curPage });
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
    if (this.props.categories.length > 0) {
      this.fetchData(location.pathname, this.state.page, 10, "props", this.props, this.props.categories);
    } else if (
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
      threshold: 0.9,
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.newsRequest = null;
      this.setState({ page: 1, news: [], newsError: false, isLoading: false }, () => {
        this.fetchData(this.props.location.pathname, 1, 10, "props", this.props, this.props.categories);
      });
      return;
    }
    if (
      prevProps.categories !== this.props.categories &&
      this.props.categories.length > 0 &&
      !isEqual(this.props.categories, this.state.categories)
    ) {
      const { location } = this.props;
      const { pathname } = location;
      this.newsRequest = null;
      this.setState({ page: 1 }, () => {
        this.fetchData(
          pathname,
          1,
          10,
          "props",
          this.props,
          this.props.categories
        );
      });
    }

    if (this.props.newsError && this.props.newsError !== this.state.newsError) {
      this.setState({
        newsError: this.props.newsError,
      });
    }
  }

  componentWillUnmount() {
    this.newsRequest = null;
    this.observer.disconnect();
    document.body.style.overflow = "scroll";
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
                        eventKey={link.eventKey}
                        onClick={() => {
                          location.pathname !== link.href &&
                            this.fetchArticles(link.href);
                        }}
                        className={link.className}
                      >
                        {link.label}
                      </Nav.Link>
                    );
                  })}
                </Nav>
              </Col>
              <Col lg={9}>
                <div style={{ minHeight: "1000px" }}>
                  <PostSummaryList
                    listOfNewsAndEvents={this.state.news}
                  />
                  {!this.state.newsError && (
                    <div className="spinner-wrap">
                      <Spinner
                        className="spinner"
                        animation="border"
                        role="status"
                      />
                    </div>
                  )}
                </div>
                <div ref={(loadingRef) => (this.loadingRef = loadingRef)} />
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
    news: selectNews(state),
    newsError: state.newsError.newsError,
    categories: selectCategories(state),
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchNews,
  resetFetchNews,
})(NewsPage));
