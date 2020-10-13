import React, {Component} from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import fbLogo from "../../../assets/images/facebook1-dark.svg";
import twitterLogo from "../../../assets/images/twitter-dark.svg";
import instagramLogo from "../../../assets/images/instagram-dark.svg";
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
                                <a className="link" href="/news" itemprop="url" target=""
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
                                <Row>
                                    <Col lg={8}>
                                        <ArticleDetail article={this.state.article}/>
                                    </Col>
                                    <Col lg={2}>
                                        <div className="socials__wrap socials__top-indent">
                                            <p className='socials-label'>Споделете страницата</p>
                                            <div className='socials'>
                                                <div className='socials-item'>
                                                    <a href="https://www.facebook.com/museum.smolyan" target="_blank"
                                                       rel="noopener noreferrer">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                      d="M15.1172 0H0.882759C0.395224 0 0 0.395224 0 0.882759V15.1172C0 15.6048 0.395224 16 0.882759 16H8.55172V9.81241H6.46897V7.39034H8.55172V5.60828C8.55172 3.54207 9.81517 2.41655 11.6579 2.41655C12.2789 2.4152 12.8995 2.44651 13.5172 2.51034V4.67034H12.2483C11.2441 4.67034 11.0483 5.14483 11.0483 5.84552V7.38759H13.4483L13.1366 9.80966H11.0345V16H15.1172C15.6048 16 16 15.6048 16 15.1172V0.882759C16 0.395224 15.6048 0 15.1172 0Z"/>
                                                            </g>
                                                        </svg>
                                                    </a>
                                                </div>
                                                <div className='socials-item'>
                                                    <a href="https://twitter.com/museum_sm" target="_blank"
                                                       rel="noopener noreferrer">
                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <g>
                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                      d="M2.5 16H14.5C15.604 16 16.5 15.104 16.5 14V2C16.5 0.896 15.604 0 14.5 0H2.5C1.396 0 0.5 0.896 0.5 2V14C0.5 15.104 1.396 16 2.5 16ZM12.48 6.228C12.48 8.936 10.416 12.064 6.644 12.064C5.488 12.064 4.408 11.724 3.504 11.148C3.664 11.168 3.828 11.176 3.992 11.176C4.952 11.176 5.836 10.848 6.54 10.296C5.644 10.28 4.884 9.688 4.624 8.872C4.748 8.896 4.876 8.908 5.008 8.908C5.196 8.908 5.376 8.884 5.548 8.836C4.612 8.648 3.904 7.816 3.904 6.824V6.796C4.18 6.948 4.496 7.04 4.832 7.052C4.284 6.684 3.92 6.056 3.92 5.344C3.92 4.968 4.02 4.616 4.196 4.312C5.208 5.552 6.72 6.372 8.424 6.456C8.392 6.304 8.372 6.148 8.372 5.988C8.372 4.856 9.292 3.936 10.424 3.936C11.012 3.936 11.544 4.184 11.92 4.584C12.388 4.492 12.828 4.324 13.224 4.088C13.068 4.568 12.744 4.972 12.32 5.224C12.736 5.172 13.132 5.064 13.5 4.9C13.224 5.312 12.876 5.676 12.476 5.964C12.48 6.05198 12.48 6.13996 12.48 6.22794V6.228Z"/>
                                                            </g>
                                                        </svg>
                                                    </a>
                                                </div>
                                                <div className='socials-item'>
                                                    <a href="https://www.instagram.com/museumsmolyan/" target="_blank"
                                                       rel="noopener noreferrer">
                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M2.5 16H14.5C15.604 16 16.5 15.104 16.5 14V2C16.5 0.896 15.604 0 14.5 0H2.5C1.396 0 0.5 0.896 0.5 2V14C0.5 15.104 1.396 16 2.5 16ZM8.50001 2C6.8705 2 6.66617 2.00691 6.02621 2.03611C5.38758 2.06523 4.95142 2.16667 4.56977 2.315C4.17522 2.46831 3.84061 2.67347 3.50703 3.00703C3.17347 3.34061 2.96831 3.67522 2.815 4.06977C2.66667 4.45142 2.56523 4.88758 2.53611 5.52621C2.50691 6.16617 2.5 6.3705 2.5 8.00001C2.5 9.6295 2.50691 9.83383 2.53611 10.4738C2.56523 11.1124 2.66667 11.5486 2.815 11.9302C2.96831 12.3248 3.17347 12.6594 3.50703 12.993C3.84061 13.3265 4.17522 13.5317 4.56977 13.685C4.95142 13.8333 5.38758 13.9348 6.02621 13.9639C6.66617 13.9931 6.8705 14 8.50001 14C10.1295 14 10.3338 13.9931 10.9738 13.9639C11.6124 13.9348 12.0486 13.8333 12.4302 13.685C12.8248 13.5317 13.1594 13.3265 13.493 12.993C13.8265 12.6594 14.0317 12.3248 14.185 11.9302C14.3333 11.5486 14.4348 11.1124 14.4639 10.4738C14.4931 9.83383 14.5 9.6295 14.5 8.00001C14.5 6.3705 14.4931 6.16617 14.4639 5.52621C14.4348 4.88758 14.3333 4.45142 14.185 4.06977C14.0317 3.67522 13.8265 3.34061 13.493 3.00703C13.1594 2.67347 12.8248 2.46831 12.4302 2.315C12.0486 2.16667 11.6124 2.06523 10.9738 2.03611C10.3338 2.00691 10.1295 2 8.50001 2ZM10.9245 3.11604C11.5095 3.14272 11.8272 3.24046 12.0386 3.32263C12.3187 3.43147 12.5186 3.56149 12.7285 3.77146C12.9385 3.98141 13.0685 4.18128 13.1774 4.46135C13.2595 4.67277 13.3573 4.99047 13.3839 5.57546C13.4128 6.20814 13.4189 6.39791 13.4189 7.99999C13.4189 9.60204 13.4128 9.79181 13.3839 10.4245C13.3573 11.0095 13.2595 11.3272 13.1774 11.5386C13.0685 11.8187 12.9385 12.0185 12.7285 12.2285C12.5186 12.4385 12.3187 12.5685 12.0386 12.6773C11.8272 12.7595 11.5095 12.8572 10.9245 12.8839C10.2919 12.9128 10.1022 12.9189 8.50002 12.9189C6.89783 12.9189 6.7081 12.9128 6.0755 12.8839C5.4905 12.8572 5.17281 12.7595 4.96138 12.6773C4.68132 12.5685 4.48145 12.4385 4.2715 12.2285C4.06155 12.0185 3.93151 11.8187 3.82267 11.5386C3.7405 11.3272 3.64275 11.0095 3.61608 10.4245C3.58721 9.79181 3.58109 9.60204 3.58109 7.99999C3.58109 6.39791 3.58721 6.20814 3.61608 5.57546C3.64275 4.99047 3.7405 4.67277 3.82267 4.46135C3.93151 4.18128 4.06153 3.98141 4.2715 3.77146C4.48145 3.56149 4.68132 3.43147 4.96138 3.32263C5.17281 3.24046 5.4905 3.14272 6.0755 3.11604C6.70817 3.08718 6.89795 3.08105 8.50002 3.08105C10.1021 3.08105 10.2919 3.08718 10.9245 3.11604ZM5.41892 7.99994C5.41892 6.29828 6.79836 4.91885 8.50001 4.91885C10.2016 4.91885 11.5811 6.29828 11.5811 7.99994C11.5811 9.70157 10.2016 11.081 8.50001 11.081C6.79836 11.081 5.41892 9.70157 5.41892 7.99994ZM8.50002 9.9999C7.39544 9.9999 6.50001 9.10448 6.50001 7.99991C6.50001 6.89533 7.39544 5.9999 8.50002 5.9999C9.60459 5.9999 10.5 6.89533 10.5 7.99991C10.5 9.10448 9.60459 9.9999 8.50002 9.9999ZM12.4228 4.79716C12.4228 5.19481 12.1005 5.51715 11.7028 5.51715C11.3052 5.51715 10.9828 5.19481 10.9828 4.79716C10.9828 4.39951 11.3052 4.07715 11.7028 4.07715C12.1005 4.07715 12.4228 4.39951 12.4228 4.79716Z"/>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
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

export default connect(
    mapStateToProps,
    {
        fetchNews
    }
)(NewsDetailPage);
