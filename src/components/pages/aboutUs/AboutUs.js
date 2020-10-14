import React, {Component} from 'react';
import heroImage from "../../../assets/images/baseHero.png";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import imageEvent_1 from "../../../assets/images/imageEvent.png";
import imageEvent_2 from "../../../assets/images/imageEvent2.png";
import imageEvent_3 from "../../../assets/images/imageEvent3.png";
import Nav from "react-bootstrap/cjs/Nav";
import NewsAndEventsListHorizontal from "../../newsAndEventsList/NewsAndEventsListHorizontal";
import {connect} from 'react-redux'
import {fetchNews} from "../../../actions";

class AboutUs extends Component {

    state = {

    }


    render() {
        return (
            <div className='about-us-page__wrap'>
                <HeroInner
                    title={'Новини и Събития'}
                    subtitle={''}
                />

                <div className='tab_list-container tab_list-container_content-dark'>
                    <Container className='tab_list-container__layout'>
                        <Row>
                            <Col lg={2}>
                                <Nav defaultActiveKey="/home" className="flex-column">
                                    <Nav.Link className='tab_list-link' eventKey="link-3">Събития</Nav.Link>
                                    <Nav.Link className='tab_list-link' eventKey="link-1">Новини</Nav.Link>
                                    <Nav.Link className='tab_list-link' eventKey="link-2">Всички</Nav.Link>
                                </Nav>
                            </Col>
                            <Col lg={9}>
                                <Row>
                                    <NewsAndEventsListHorizontal listOfNewsAndEvents={this.state.news}/>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
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
)(AboutUs);
