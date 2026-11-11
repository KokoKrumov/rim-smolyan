import React, { Component } from "react";
import { selectCategories } from "../../../store/selectors";
import { fetchArticle, fetchNews } from "../../../actions";

import Article from "../../Article/Article";
import NotFound from "../NotFound";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { extractIdAndCategories } from "../../../utilities/browser";
import { withIntl } from "../../../utilities/withIntl";
import { withRouter } from "../../../utilities/withRouter";

class NewsDetailPage extends Component {
  relatedNewsCategoryId = null;
  relatedNewsRequest = null;

  state = {
    articleId: null,
    article: null,
    articleType: null,
    listOfNewsAndEvents: null,
    isPageExist: null,
    isLoading: true,
  };

  fetchArticleData = () => {
    this.props
      .fetchArticle(this.props.match.params.slug)
      .then((action) => {
        if (fetchArticle.fulfilled.match(action) && action.payload?.[0]) {
          const article = action.payload[0];
          this.setState({
            articleId: Number(article.id),
            article,
            articleSection: "news-and-events",
            isLoading: false,
          });
        } else {
          if (fetchArticle.rejected.match(action)) {
            console.error("Failed to load article", action.payload || action.error);
          }
          this.setState({
            isPageExist: false,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to load article", error);
        this.setState({
          isPageExist: false,
          isLoading: false,
        });
      });
  };

  fetchRelatedNews = (categories) => {
    const { slugId } = extractIdAndCategories(
      "news-and-events",
      "props",
      this.props,
      categories
    );
    if (slugId == null) {
      this.relatedNewsCategoryId = null;
      this.relatedNewsRequest = null;
      if (categories.length > 0) console.error("Category not found: news-and-events");
      return;
    }
    if (slugId === this.relatedNewsCategoryId) return;

    this.relatedNewsCategoryId = slugId;
    const request = this.props.fetchNews(slugId, Math.ceil(Math.random() * 11), 3);
    this.relatedNewsRequest = request;
    request
      .then((action) => {
        if (this.relatedNewsRequest !== request) return;
        if (fetchNews.fulfilled.match(action)) {
          this.setState({
            listOfNewsAndEvents: action.payload,
          });
        } else {
          this.relatedNewsCategoryId = null;
          console.error("Failed to load related news", action.payload || action.error);
        }
        this.relatedNewsRequest = null;
      })
      .catch((error) => {
        if (this.relatedNewsRequest !== request) return;
        this.relatedNewsCategoryId = null;
        this.relatedNewsRequest = null;
        console.error("Failed to load related news", error);
      });
  };

  componentDidMount() {
    this.fetchArticleData();

    if (this.props.categories.length > 0) {
      this.fetchRelatedNews(this.props.categories);
      return;
    }

    const cachedCategories = sessionStorage.getItem("categories");
    if (cachedCategories === null) return;

    let categories;
    try {
      categories = JSON.parse(cachedCategories);
    } catch (error) {
      console.error("Error parsing categories:", error);
      return;
    }
    if (
      !Array.isArray(categories) ||
      categories.some((category) => !category || typeof category !== "object" || Array.isArray(category))
    ) {
      console.error("Invalid cached categories:", "expected an array of category objects");
      return;
    }
    this.fetchRelatedNews(categories);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.categories !== this.props.categories &&
      this.props.categories.length > 0
    ) {
      this.fetchRelatedNews(this.props.categories);
    }
  }

  componentWillUnmount() {
    this.relatedNewsCategoryId = null;
    this.relatedNewsRequest = null;
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
    if (
      !this.state.isLoading &&
      (this.state.article || this.state.isPageExist === false)
    ) {
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
    categories: selectCategories(state),
  };
};

export default withRouter(withIntl(
  connect(mapStateToProps, { fetchArticle, fetchNews })(NewsDetailPage)
));
