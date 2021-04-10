import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchExhibitions} from "../../../actions";
import Article from "../../Article/Article";
import {injectIntl} from 'react-intl';
import NotFound from "../NotFound";

class ExhibitionsDetailPage extends Component {

    state = {
        articleId: null,
        article: null,
        articleType: null,
        isPageExist: null,
        isLoading: true
    }

    fetchDate = () => {
        if (this.props.exhibitions && this.state.articleId !== Number(this.props.match.params.articleId)) {
            this.props.fetchExhibitions()
                .then(() => {
                    if (this.props.exhibitions[Number(this.props.match.params.articleId)]) {
                        this.setState({
                            articleId: Number(this.props.match.params.articleId),
                            article: this.props.exhibitions[Number(this.props.match.params.articleId)],
                            articleSection: 'exhibitions',
                            articleType: this.props.exhibitions[Number(this.props.match.params.articleId)].type,
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
        const {intl} = this.props;

        return `${intl.formatMessage({id: 'temporary-exhibitions-title'})} - ${this.state.article ? this.state.article.title : null}`
    }

    provideContentByType = () => {
        if (this.state.isPageExist === null) {
            const data = {
                breadcrumbs: this.setBreadcrumbs(),
                detailContainer: 'exhibition-container',
                article: this.state.article,
                articleSection: this.state.articleSection
            };
            return <Article data={data}/>
        } else if (this.state.isPageExist === false) {
            return <NotFound/>
        }
    }

    render() {
        if (!this.state.isLoading && this.props.exhibitions) {
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
        exhibitions: Object.values(state.exhibitions)
    };
}

export default injectIntl(connect(mapStateToProps, {fetchExhibitions})(ExhibitionsDetailPage));
