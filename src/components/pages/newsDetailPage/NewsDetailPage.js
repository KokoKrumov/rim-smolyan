import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from "react-redux";
import {fetchNews} from "../../../actions";
import NewsAndEventsList from "../../newsAndEventsList/NewsAndEventsList";
import ArticleDetail from "../../ArticleDetail/ArticleDetail";

class NewsDetailPage extends Component {

    state = {
        articleId: null,
        article: null,
        listOfNewsAndEvents: null
    }

    fetchDate = () => {
        if (this.props.news && this.state.articleId !== Number(this.props.match.params.articleId)) {
            this.props.fetchNews()
                .then(() => {
                    this.setState({articleId: Number(this.props.match.params.articleId)})
                    this.setState({article: this.props.news[Number(this.props.match.params.articleId)]})
                    this.setState({listOfNewsAndEvents: this.props.news})
                })
        }
    }

    componentDidMount() {
        this.fetchDate()
    }

    render() {
        return (
            <div className='news-detail-page__wrap'>
                {/*BREADCRUMBS*/}
                <Container>
                    <div className='breadcrumb__wrap'>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <a className="link" href="/news" itemProp="url" target=""
                                   rel="noopener nofollow noreferrer">
                                    Новини
                                </a>
                            </li>
                            <li className='breadcrumb-item active'>
                                {this.state.article ? this.state.article.title : null}
                            </li>
                        </ol>
                    </div>
                </Container>
                {/* !BREADCRUMBS*/}
                {/*MAIN DETAIL CONTENT*/}
                {
                    this.state.article
                        ?
                        <div className='tab_list-container tab_list-container_content-dark'>
                            <Container className='tab_list-container__layout'>
                                <ArticleDetail article={this.state.article}/>
                            </Container>
                        </div>
                        :

                        <p style={{textAlign: 'center'}}>Loading ...</p>

                }
                {/* !MAIN DETAIL CONTENT*/}
                {/*ADDITIONAL CONTENT*/}
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
                {/* !ADDITIONAL CONTENT*/}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        news: Object.values(state.news)
    };
}

export default connect(mapStateToProps, {fetchNews})(NewsDetailPage);
