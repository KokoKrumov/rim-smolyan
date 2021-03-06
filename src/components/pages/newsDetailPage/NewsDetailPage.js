import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchNews} from "../../../actions";
import Article from "../../Article/Article";
import {injectIntl} from 'react-intl';
import NotFound from "../NotFound";

class NewsDetailPage extends Component {

    state = {
        articleId: null,
        article: null,
        articleType: null,
        listOfNewsAndEvents: null,
        isPageExist: null,
        isLoading: true
    }

    fetchDate = () => {
        if (this.props.news && this.state.articleId !== Number(this.props.match.params.articleId)) {
            this.props.fetchNews()
                .then(() => {
                    if (this.props.news[Number(this.props.match.params.articleId)]) {
                        this.setState({
                            articleId: Number(this.props.match.params.articleId),
                            article: this.props.news[Number(this.props.match.params.articleId)],
                            articleSection: 'news',
                            articleType: this.props.news[Number(this.props.match.params.articleId)].type,
                            listOfNewsAndEvents: this.props.news,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            isPageExist: false,
                            isLoading: false
                        })
                    }

                })
        }
    }

    componentDidMount() {
        this.fetchDate()
    }

    setBreadcrumbs = () => {
        return `${this.state.article ? this.state.article.title : null}`
    }

    provideContentByType = () => {
        if (this.state.isPageExist === null) {
            const data = {
                breadcrumbs: this.setBreadcrumbs(),
                detailContainer: '',
                article: this.state.article,
                articleSection: this.state.articleSection,
                listOfNewsAndEvents: this.state.listOfNewsAndEvents
            };
            return <Article data={data}/>
        } else if (this.state.isPageExist === false) {
            return <NotFound/>
        }
    }

    render() {

        if (!this.state.isLoading && this.props.news) {
            return (
                this.provideContentByType()
            )
        } else {
            return (
                <h3 className='h3'>
                    Loading...
                </h3>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        news: Object.values(state.news)
    };
}

export default injectIntl(connect(mapStateToProps, {fetchNews})(NewsDetailPage));
