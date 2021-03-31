import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from "react-redux";
import {fetchExhibitions, fetchNews} from "../../../actions";
import NewsAndEventsList from "../../newsAndEventsList/NewsAndEventsList";
import ArticleDetail from "../../ArticleDetail/ArticleDetail";
import {FormattedMessage, injectIntl} from 'react-intl';

class NewsDetailPage extends Component {

    state = {
        articleId: null,
        article: null,
        listOfNewsAndEvents: null
    }

    fetchDate = () => {
        if (this.props.match.params.news !== 'exhibition') {
            if (this.props.news && this.state.articleId !== Number(this.props.match.params.articleId)) {
                this.props.fetchNews()
                    .then(() => {
                        this.setState({
                            articleId: Number(this.props.match.params.articleId),
                            article: this.props.news[Number(this.props.match.params.articleId)],
                            listOfNewsAndEvents: this.props.news
                        })
                    })
            }
        } else {
            if (this.props.exhibitions && this.state.articleId !== Number(this.props.match.params.articleId)) {
                this.props.fetchExhibitions()
                    .then(() => {
                        this.setState({
                            articleId: Number(this.props.match.params.articleId),
                            article: this.props.exhibitions[Number(this.props.match.params.articleId)]
                        })
                    })
            }
        }

    }

    componentDidMount() {
        console.log(this.props.match);
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

    render() {
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
                                    <a className="link" href={`/${this.setHref(this.state.article.type)}`}
                                       itemProp="url" target=""
                                       rel="noopener nofollow noreferrer"
                                       dangerouslySetInnerHTML={{__html: intl.formatMessage({id: `menu.${this.setHref(this.state.article.type)}`})}}/>

                                </li>
                                <li className='breadcrumb-item active'
                                    dangerouslySetInnerHTML={{__html: `${intl.formatMessage({id: 'temporary-exhibitions-title'})} - ${this.state.article ? this.state.article.title : null}`}}
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
}


const mapStateToProps = (state) => {
    return {
        news: Object.values(state.news),
        exhibitions: Object.values(state.exhibitions)
    };
}

export default injectIntl(connect(mapStateToProps, {fetchNews, fetchExhibitions})(NewsDetailPage));
