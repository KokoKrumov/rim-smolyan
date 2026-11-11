import React, { Component } from "react";
import { selectNews } from "../../../store/selectors";
import { fetchArticle, fetchNews } from "../../../actions";

import Article from "../../Article/Article";
import NotFound from "../NotFound";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { extractIdAndCategories } from "../../../utilities/browser";
import { withIntl } from "../../../utilities/withIntl";
import { withRouter } from "../../../utilities/withRouter";

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

    const { slugId } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );
    if (slugId == null) return;

    this.props
      .fetchNews(slugId, Math.ceil(Math.random() * 11), 3)
      .then((action) => {
        if (fetchNews.fulfilled.match(action)) {
          this.setState({
            listOfNewsAndEvents: action.payload,
          });
        } else {
          console.error("Failed to load related news", action.error);
        }
      })
      .catch((error) => {
        console.error("Failed to load related news", error);
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
    news: selectNews(state),
  };
};

export default withRouter(withIntl(
  connect(mapStateToProps, { fetchArticle, fetchNews })(NewsDetailPage)
));
