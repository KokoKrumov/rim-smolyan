import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from "react-redux";
import {fetchExhibitions, fetchNews} from "../../../actions";
import NewsAndEventsList from "../../newsAndEventsList/NewsAndEventsList";
import ArticleDetail from "../../ArticleDetail/ArticleDetail";
import {FormattedMessage, injectIntl} from 'react-intl';
import NotFound from "../NotFound";

class NewsDetailPage extends Component {

    state = {
        articleId: null,
        article: null,
        articleType: null,
        listOfNewsAndEvents: null,
        isPageExist: null
    }

    fetchDate = () => {
        // check if activity is exhibition, event o article
        // check if we fetch news or exhibitions
        //check if activity json file has such article number or article type matches url type
        if (this.props.match.params.news !== 'exhibition') {
            if (this.props.news && this.state.articleId !== Number(this.props.match.params.articleId)) {
                this.props.fetchNews()
                    .then(() => {
                        if (this.props.news[Number(this.props.match.params.articleId)] && this.props.news[Number(this.props.match.params.articleId)].type === this.props.match.params.news) {
                            this.setState({
                                articleId: Number(this.props.match.params.articleId),
                                article: this.props.news[Number(this.props.match.params.articleId)],
                                articleType: this.props.news[Number(this.props.match.params.articleId)].type,
                                listOfNewsAndEvents: this.props.news
                            })
                        } else {
                            this.setState({
                                isPageExist: false
                            })
                        }

                    })
            }
        } else {
            if (this.props.exhibitions && this.state.articleId !== Number(this.props.match.params.articleId)) {
                this.props.fetchExhibitions()
                    .then(() => {
                        if (this.props.exhibitions[Number(this.props.match.params.articleId)] && this.props.exhibitions[Number(this.props.match.params.articleId)].type === this.props.match.params.news) {
                            this.setState({
                                articleId: Number(this.props.match.params.articleId),
                                article: this.props.exhibitions[Number(this.props.match.params.articleId)],
                                articleType: this.props.exhibitions[Number(this.props.match.params.articleId)].type,
                            })
                        } else {
                            this.setState({
                                isPageExist: false
                            })
                        }
                    })
            }
        }

    }

    componentDidMount() {
        this.fetchDate()
    }

    setHref = (type) => {
        switch (type) {
            case 'event':
            case 'article':
                return 'news'
            case 'exhibition':
                return 'exhibitions'
            default:
                return ''
        }
    }

    setBreadcrumbs = () => {
        const {intl} = this.props;

        if (this.state.articleType === 'exhibition') {
            return `${intl.formatMessage({id: 'temporary-exhibitions-title'})} - ${this.state.article ? this.state.article.title : null}`
        } else {
            return `${this.state.article ? this.state.article.title : null}`
        }
    }

    provideContentByType = () => {
        // check if router url param matches article type
        //also if activity doesn't exist, articleType is not set and this returns false
        if (this.state.isPageExist === null) {

            if (this.state.articleType === this.props.match.params.news) {
                return this.renderContent()
            } else {
                return (
                    <Container>
                        <h3 className='h3'>
                            Loading...
                        </h3>
                    </Container>
                )

            }
        } else if(this.state.isPageExist === false) {
            return <NotFound/>
        }


    }

    renderContent = () => {
        const {intl} = this.props;
        return (
            <div className='news-detail-page__wrap'>
                {/*BREADCRUMBS*/}
                <Container>
                    <div className='breadcrumb__wrap'>
                        {
                            this.state.article?.type
                            &&
                            <ol className='breadcrumb'>
                                <li className='breadcrumb-item'>
                                    <a className="link" href={`/${this.setHref(this.state.articleType)}`}
                                       itemProp="url" target=""
                                       rel="noopener nofollow noreferrer"
                                       dangerouslySetInnerHTML={{__html: intl.formatMessage({id: `menu.${this.setHref(this.state.articleType)}`})}}/>

                                </li>
                                <li className='breadcrumb-item active'
                                    dangerouslySetInnerHTML={{__html: this.setBreadcrumbs()}}
                                />
                            </ol>
                        }
                    </div>
                </Container>
                {/* !BREADCRUMBS*/}
                {/*MAIN DETAIL CONTENT*/}
                {
                    this.state.article
                        ?
                        <div
                            className={`tab_list-container tab_list-container_content-dark ${this.state.article.type === 'exhibition' ? 'exhibition-container' : ''}`}>
                            <Container className='tab_list-container__layout'>
                                <ArticleDetail article={this.state.article}/>
                            </Container>
                        </div>
                        :

                        <p style={{textAlign: 'center'}}>Loading ...</p>

                }
                {/* !MAIN DETAIL CONTENT*/}
                {/*ADDITIONAL CONTENT*/}
                {
                    this.props.match.params.news !== 'exhibition'
                    &&
                    <Container>
                        <Row>
                            <Col>
                                <div className='additional__content-title'>
                                    <h2 className='h2'>
                                        Още от новини и събития
                                    </h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <NewsAndEventsList listOfNewsAndEvents={this.state.listOfNewsAndEvents}/>
                        </Row>
                    </Container>
                }

                {/* !ADDITIONAL CONTENT*/}
            </div>
        )
    }


    render() {

        if (this.props.news || this.props.exhibitions) {
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
        news: Object.values(state.news),
        exhibitions: Object.values(state.exhibitions)
    };
}

export default injectIntl(connect(mapStateToProps, {fetchNews, fetchExhibitions})(NewsDetailPage));
