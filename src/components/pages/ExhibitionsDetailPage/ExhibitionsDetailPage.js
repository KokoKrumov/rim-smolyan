import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchExhibitions, fetchExhibitionArticle } from "../../../actions";
import Article from "../../Article/Article";
import { injectIntl } from "react-intl";
import NotFound from "../NotFound";
import Spinner from "react-bootstrap/Spinner";
class ExhibitionsDetailPage extends Component {
  state = {
    articleId: null,
    article: null,
    articleType: null,
    isPageExist: null,
    isLoading: true,
    articleSection: "exhibitions",
  };

  fetchData = () => {
    this.props
      .fetchExhibitionArticle(this.props.match.params.articleSlug)
      .then(() => {
        if (this.props?.exhibitionArticle) {
          this.setState({
            article: this.props?.exhibitionArticle[0],
            articleSection: "exhibitions",
            isLoading: false,
          });
        }
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  setBreadcrumbs = () => {
    const { intl } = this.props;

    return `${intl.formatMessage({ id: "temporary-exhibitions-title" })} - ${
      this.state.article ? this.state.article.title.rendered : null
    }`;
  };

  provideContentByType = () => {
    if (this.state.isPageExist === null) {
      const data = {
        breadcrumbs: this.setBreadcrumbs(),
        detailContainer: "exhibition-container",
        article: this.state.article,
        articleSection: this.state.articleSection,
      };
      return <Article data={data} />;
    } else if (this.state.isPageExist === false) {
      return <NotFound />;
    }
  };

  render() {
    if (!this.state.isLoading && this.props.exhibitions) {
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
    exhibitionArticle: Object.values(state.exhibitionArticle),
    exhibitions: state.exhibitions,
  };
};

export default injectIntl(
  connect(mapStateToProps, { fetchExhibitionArticle, fetchExhibitions })(
    ExhibitionsDetailPage
  )
);
