import React, {Component} from 'react';
import heroImage from "../../../assets/images/baseHero.png";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import fbLogo from "../../../assets/images/facebook1.svg";
import twitterLogo from "../../../assets/images/twitter.svg";
import instagramLogo from "../../../assets/images/instagram.svg";
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

                {
                    this.state.article
                        ?
                        <div className='tab_list-container tab_list-container_content-dark'>
                            <Container className='tab_list-container__layout'>
                                <Row>
                                    <Col lg={8}>
                                        <ArticleDetail article={this.state.article} />
                                    </Col>
                                    <Col lg={2}>
                                        <div className='socials'>
                                            <div className='socials-item'>
                                                <a href="https://www.facebook.com/museum.smolyan" target="_blank"
                                                   rel="noopener noreferrer">
                                                    <img className="" src={fbLogo} alt="" itemProp="image"/>
                                                </a>
                                            </div>
                                            <div className='socials-item'>
                                                <a href="https://twitter.com/museum_sm" target="_blank"
                                                   rel="noopener noreferrer">
                                                    <img className="" src={twitterLogo} alt="" itemProp="image"/>
                                                </a>
                                            </div>
                                            <div className='socials-item'>
                                                <a href="https://www.instagram.com/museumsmolyan/" target="_blank"
                                                   rel="noopener noreferrer">
                                                    <img className="" src={instagramLogo} alt="" itemProp="image"/>
                                                </a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        :

                        <p style={{textAlign: 'center'}}>Loading ...</p>

                }

                <Container>
                    <Row>
                        <NewsAndEventsList listOfNewsAndEvents={this.state.listOfNewsAndEvents}/>
                    </Row>
                </Container>
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
