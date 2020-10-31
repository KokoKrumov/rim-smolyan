import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from 'react-redux';
import {fetchNews, fetchRimBuildingImages, showModal} from "../../../actions";
import aboutUsBg from "../../../assets/images/about-us-page_bg.png";
import AboutInfoLine from "../../infoLine/aboutInfoLine";
import InfoColumn from "../../infoColumn/InfoColumn";
import aboutUsHistoryBg from "../../../assets/images/about_us_history-bg.jpg";
import CarouselImages from "../../carousel/carouselImages";

class AboutUs extends Component {

    state = {
        infoColumn: {
            listBuildingImagesCarousel: null,
            history: {
                title: "about-us.history.title",
                text: "about-us.history.text",
                showRulesForActivity: true,
                aboutUsHistoryBg: aboutUsHistoryBg,
                columns: 2
            },
            building: {
                title: "about-us.building.title",
                text: "about-us.building.text",
                columns: 1
            }
        }
    }

    componentDidMount() {
        if (this.props && this.props.rimBuildingImages && this.state.listBuildingImagesCarousel !== this.props.rimBuildingImages) {
            this.props.fetchRimBuildingImages()
                .then(() => {
                    this.setState({listBuildingImagesCarousel: this.props.rimBuildingImages})
                    console.log(this.props.rimBuildingImages)
                })
        }
    }

    handleShowModal = (e, data) => {
        e.preventDefault();
        this.props.showModal(data);
    }

    render() {
        return (
            <div className='about-us-page'>
                <div className='hero__wrap hero2cols'>
                    <div
                        className='hero hero-bg'
                        style={{
                            backgroundImage: `url(${aboutUsBg})`
                        }}
                    >
                        <Container>
                            <Row>
                                <Col>
                                    <h1 className='h1'>
                                        Мисия
                                    </h1>
                                </Col>
                            </Row>
                            <Row className='justify-content-between'>
                                <Col lg={4}>
                                    <p className='about-us-page__text__bold'>
                                        Създаден през 1935 г. от <span className='color-red cursor-pointer'
                                                                       onClick={(e) => {
                                                                           this.handleShowModal(e, 'modal-nedelov')
                                                                       }}>Стою Неделев ШИШКОВ</span> – родоповед,
                                        учител, издател,
                                        музеен деец и общественик с европейски измерения, Историческият музей в Смолян е
                                        най-големият музей, съхраняващ знаците на паметта на населението, обитавало
                                        централната част на Родопската област през различните исторически епохи.
                                    </p>

                                </Col>
                                <Col lg={6}>
                                    <p className='paragraph-2'>
                                        Регионален исторически музей “Стою Шишков” днес носи с достойнство името на своя
                                        основател и провежда политиката по издирване, изучаване, опазване и
                                        популяризиране
                                        на движимите паметници на историята, бита и културата на Среднородопския край.
                                    </p>
                                    <p className='paragraph-2'>
                                        Чрез своите уникални колекции, показващи цялото културно многообразие и
                                        хилядолетните традиции, чрез изследователските и популяризаторските си ресурси,
                                        изграждайки мрежа от успешни партньорства, музеят работи в полза на обществото –
                                        за неговото духовно обогатяване и вдъхновение чрез завръщане към корените и
                                        опознаване на различни култури.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <main>
                    <Container className='container position-relative'>
                               <Col>
                                   <div className='about-us__info-line__wrap'>
                                       <AboutInfoLine/>
                                   </div>
                               </Col>
                    </Container>
                    <InfoColumn
                        title={this.state.infoColumn.history.title}
                        text={this.state.infoColumn.history.text}
                        backgroundIMage={this.state.infoColumn.history.aboutUsHistoryBg}
                        showRulesForActivity={this.state.infoColumn.history.showRulesForActivity}
                        columns={this.state.infoColumn.history.columns}
                    />

                    <Container>
                        <Row className='justify-content-between'>
                            <Col lg={5}>
                                <Row>
                                    <InfoColumn
                                        title={this.state.infoColumn.building.title}
                                        text={this.state.infoColumn.building.text}
                                        columns={this.state.infoColumn.building.columns}
                                    />
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col>
                                        <div className="about-us-page__building-carousel nae-container">
                                            <CarouselImages
                                                listImages={this.state.listBuildingImagesCarousel}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rimBuildingImages: Object.values(state.rimBuildingImages)
    };
}

export default connect(
    mapStateToProps,
    {
        fetchNews,
        showModal,
        fetchRimBuildingImages
    }
)(AboutUs);
