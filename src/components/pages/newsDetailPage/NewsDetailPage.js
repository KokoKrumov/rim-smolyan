import React, { Component } from "react";
import { fetchArticle, fetchNews } from "../../../actions";

import Article from "../../Article/Article";
import NotFound from "../NotFound";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { extractIdAndCategories } from "../../../utilities/browser";
import { injectIntl } from "react-intl";

class NewsDetailPage extends Component {
  state = {
    articleId: null,
    article: null,
    articleType: null,
    listOfNewsAndEvents: null,
    isPageExist: null,
    isLoading: true,
  };

  fetchData = (id, listFrom, props, propsCategories) => {
    this.props
      .fetchArticle(this.props.match.params.slug)
      .then(() => {
        if (this.props?.article) {
          const article = this.props.article[0];
          this.setState({
            articleId: Number(article.id),
            article: article,
            articleSection: "news-and-events",
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
        const { slugId } = extractIdAndCategories(
          id,
          listFrom,
          props,
          propsCategories
        );
        this.props
          .fetchNews(slugId, Math.ceil(Math.random() * 11), 3)
          .then(() => {
            this.setState({
              listOfNewsAndEvents: this.props.news,
            });
          });
      });
  };

  componentDidMount() {
    this.fetchData(
      "news-and-events",
      "storage",
      this.props,
      this.state.categories
    );
  }

  setBreadcrumbs = () => {
    return `${this.state.article ? this.state.article.title.rendered : null}`;
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
      return (
        <div className="spinner-wrap">
          <Spinner className="spinner" animation="border" role="status" />
        </div>
      );
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
