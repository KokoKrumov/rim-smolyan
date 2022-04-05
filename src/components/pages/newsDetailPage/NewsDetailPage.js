import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticle, fetchNews } from "../../../actions";
import Article from "../../Article/Article";
import { injectIntl } from "react-intl";
import NotFound from "../NotFound";
import { matchPath } from "react-router";

class NewsDetailPage extends Component {
  state = {
    articleId: null,
    article: null,
    articleType: null,
    listOfNewsAndEvents: null,
    isPageExist: null,
    isLoading: true,
  };

  fetchData = () => {
    const routeObj = matchPath(this.props.location.pathname, {
      path: "/news/:slug",
      exact: true,
      strict: false,
    });
    const slug = routeObj.params.slug;
    this.props
      .fetchArticle(slug)
      .then(() => {
        if (this.props?.article) {
          const article = this.props.article[0];
          this.setState({
            articleId: Number(article.id),
            article: article,
            articleSection: "news",
            isLoading: false,
          });
        } else {
          this.setState({
            isPageExist: false,
            isLoading: false,
          });
        }
      })
      .then(() => {
        this.props.fetchNews(2, Math.floor(Math.random() * 11), 3).then(() => {
          this.setState({
            listOfNewsAndEvents: this.props.news,
          });
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  setBreadcrumbs = () => {
    return `${this.state.article ? this.state.article.title : null}`;
  };

  provideContentByType = () => {
    if (this.state.isPageExist === null) {
      const data = {
        breadcrumbs: this.setBreadcrumbs(),
        detailContainer: "",
        article: this.state.article,
        articleSection: this.state.articleSection,
        listOfNewsAndEvents: this.state.listOfNewsAndEvents,
      };
      return <Article data={data} />;
    } else if (this.state.isPageExist === false) {
      return <NotFound />;
    }
  };

  render() {
    if (!this.state.isLoading && this.props.article) {
      return this.provideContentByType();
    } else {
      return <h3 className="h3">Loading...</h3>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.article,
    news: Object.values(state.news),
  };
};

export default injectIntl(
  connect(mapStateToProps, { fetchArticle, fetchNews })(NewsDetailPage)
);
