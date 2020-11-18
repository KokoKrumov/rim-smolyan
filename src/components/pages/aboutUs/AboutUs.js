import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from 'react-redux';
import {fetchNews, fetchRimBuildingImages, fetchTeam, showModal} from "../../../actions";
import aboutUsBg from "../../../assets/images/about-us-page_bg.png";
import AboutInfoLine from "../../infoLine/aboutInfoLine";
import InfoColumn from "../../infoColumn/InfoColumn";
import aboutUsHistoryBg from "../../../assets/images/about_us_history-bg.jpg";
import CarouselImages from "../../carousel/carouselImages";
import CardMediaHorizontal from "../../cards/cardMediaHorizontal";
import CardInfoLine from "../../infoLine/CardInfoLine";
import CardTeamHeadmaster from "../../cards/cardTeamHeadmaster";
import {FormattedMessage} from "react-intl";
import CardTeamMember from "../../cards/cardTeamMember";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import RegularPrograms from "./RegularPrograms";

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
        },
        cardsAccessibility: {
            accessibility: {
                icon: <svg width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M9.46139 6.98149C9.71493 8.58731 9.96866 10.1931 10.2222 11.7988C11.9132 11.7988 13.6038 11.7988 15.2949 11.7988C16.3157 11.7988 16.9093 14.4191 15.7128 14.6676C14.8217 14.7241 11.7955 14.686 10.763 14.686C10.8022 14.901 10.8419 15.1163 10.8816 15.3313C12.9335 15.3313 14.9851 15.3313 17.037 15.3313C17.4022 15.3313 17.7146 15.5581 17.8404 15.8786C19.1428 18.5847 20.4453 21.2906 21.7476 23.997C22.1365 23.7502 22.5257 23.5036 22.9143 23.257C24.063 22.5659 25.7561 24.7597 24.3243 25.709C23.3093 26.464 21.2034 28.2785 20.1894 27.3501C18.6543 24.3502 17.194 21.4385 15.7281 18.4605C13.4708 18.4605 11.2131 18.4605 8.95585 18.4605C8.58251 18.4605 8.24633 18.1874 8.12633 17.8555C7.56177 14.0882 6.98888 10.4521 6.416 6.71169C5.39777 5.92533 4.80244 4.86956 4.80244 3.5645C4.80244 -1.02477 11.5137 -1.2367 11.8307 3.24341C11.9443 4.85001 11.1649 6.58221 9.46139 6.98149ZM6.25439 16.1248L5.76628 12.8673C-7.83665 22.4302 5.1332 38.9103 18.8133 28.1753L17.3879 25.3568C8.30671 34.3133 -2.51482 23.5177 6.25439 16.1248Z"
                              fill="#272323"/>
                    </g>
                </svg>,
                text: "about-us.building.accessibility.text"
            },
            braille: {
                icon: <svg width="19" height="32" viewBox="0 0 19 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <path
                            d="M5.29738 0C2.85744 0 0.873047 1.98482 0.873047 4.42434C0.873047 6.86386 2.85786 8.84825 5.29738 8.84825C7.7369 8.84825 9.7213 6.86344 9.7213 4.42434C9.72172 1.9844 7.7369 0 5.29738 0Z"
                            fill="#272323"/>
                        <path
                            d="M5.29738 22.7668C2.85744 22.7668 0.873047 24.7517 0.873047 27.1912C0.873047 29.6307 2.85786 31.6151 5.29738 31.6151C7.7369 31.6151 9.7213 29.6303 9.7213 27.1912C9.72172 24.7512 7.7369 22.7668 5.29738 22.7668Z"
                            fill="#272323"/>
                        <path
                            d="M16.5982 6.2785C17.6921 6.2785 18.5822 5.38842 18.5822 4.2941C18.5822 3.20021 17.6921 2.31055 16.5982 2.31055C15.5043 2.31055 14.6143 3.20021 14.6143 4.2941C14.6143 5.38842 15.5048 6.2785 16.5982 6.2785Z"
                            fill="#272323"/>
                        <path
                            d="M16.5982 13.6753C15.5043 13.6753 14.6143 14.565 14.6143 15.6588C14.6143 16.7532 15.5043 17.6432 16.5982 17.6432C17.6921 17.6432 18.5822 16.7532 18.5822 15.6588C18.5822 14.565 17.6921 13.6753 16.5982 13.6753Z"
                            fill="#272323"/>
                        <path
                            d="M7.28094 16.1029C7.28094 15.009 6.39086 14.1194 5.29696 14.1194C4.20307 14.1194 3.31299 15.009 3.31299 16.1029C3.31299 17.1973 4.20307 18.0873 5.29696 18.0873C6.39086 18.0873 7.28094 17.1973 7.28094 16.1029Z"
                            fill="#272323"/>
                        <path
                            d="M16.5982 24.7625C15.5043 24.7625 14.6143 25.6521 14.6143 26.746C14.6143 27.8403 15.5043 28.7304 16.5982 28.7304C17.6921 28.7304 18.5822 27.8403 18.5822 26.746C18.5822 25.6521 17.6921 24.7625 16.5982 24.7625Z"
                            fill="#272323"/>
                    </g>
                </svg>,
                text: "about-us.building.braille.text"
            }
        },
        team: null
    }

    isMemberExist = (memberName) => {
        return this.state.team.defaultTeam.some(member => member.nickname === memberName)
    }

    getMemberInformation = (memberName) => {
        return this.state.team.defaultTeam.find(member => member.nickname === memberName)
    }

    componentDidMount() {
        if (this.props
            && this.props.rimBuildingImages
            && this.state.listBuildingImagesCarousel !== this.props.rimBuildingImages
            && this.props.team
            && this.state.team !== this.props.team
        ) {
            // Fetch and set museum images for museum carousel
            this.props.fetchRimBuildingImages()
                .then(() => {
                    this.setState({listBuildingImagesCarousel: this.props.rimBuildingImages})
                })
            // Fetch and set team members
            this.props.fetchTeam()
                .then(() => {
                    this.setState({team: this.props.team})

                    //When team arrives, then check ifURL path includes a parameter
                    // and this parameter contain a nickname from the team
                    //if this is true, then show modal with the info for this member
                    if (this.props.match.params.modalContent && this.isMemberExist(this.props.match.params.modalContent)) {
                        this.handleShowModal('modal-team', this.getMemberInformation(this.props.match.params.modalContent))
                    }
                })
        }
    }

    handleShowModal = (data, user, e) => {
        if (e) {
            e.preventDefault();
        }

        this.props.showModal(data, user);
    }

    renderMainAboutUsPage = () => {
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
                                                                           this.handleShowModal('modal-nedelov', e)
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

                    <section className='section-building'>
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
                            <Row>
                                <Col>
                                    <CardMediaHorizontal
                                        icon={this.state.cardsAccessibility.accessibility.icon}
                                        text={this.state.cardsAccessibility.accessibility.text}
                                    />
                                </Col>
                                <Col>
                                    <CardMediaHorizontal
                                        icon={this.state.cardsAccessibility.braille.icon}
                                        text={this.state.cardsAccessibility.braille.text}
                                    />
                                </Col>
                            </Row>
                            <CardInfoLine title={"regular-programs"} link={'/about-us/regular-programs'}/>
                        </Container>
                    </section>
                    <section className='section-team'>
                        <div className='section-team__container-wrap'>
                            <Container>
                                <div className="section-team__title__wrap">
                                    <h1
                                        className='h1'
                                    >
                                        <FormattedMessage id="team"/>
                                    </h1>
                                </div>
                                <div className='section-team__headmaster-wrap'>
                                    {
                                        this.props.team.headmaster && this.props.team.headmaster.length !== 0
                                            ?
                                            this.props.team.headmaster.map(headmaster => {
                                                return (
                                                    <CardTeamHeadmaster
                                                        key={headmaster.id}
                                                        user={headmaster}
                                                    />
                                                )
                                            })
                                            :
                                            <h3 className='h3 loading'>
                                                ...
                                            </h3>
                                    }

                                </div>
                            </Container>
                        </div>
                        <div className='section-team__container-wrap'>
                            <Container>
                                <div className="section-team__title__wrap">
                                    <h2
                                        className='h2'
                                    >
                                        <FormattedMessage id="department"/>
                                        "<FormattedMessage id="archeology"/>"
                                    </h2>
                                </div>
                                <div className='section-team__headmaster-wrap'>
                                    <Row>
                                        {
                                            this.props.team.archeology && this.props.team.archeology.length !== 0
                                                ?
                                                this.props.team.archeology.map(user => {
                                                    return (
                                                        <Col md={6} lg={4} key={user.id} className="section-team__col">
                                                            <CardTeamMember
                                                                user={user}
                                                            />
                                                        </Col>
                                                    )
                                                })
                                                :
                                                <h3 className='h3 loading'>
                                                    ...
                                                </h3>
                                        }


                                    </Row>
                                </div>
                            </Container>
                        </div>
                        <div className='section-team__container-wrap'>
                            <Container>
                                <div className="section-team__title__wrap">
                                    <h2
                                        className='h2'
                                    >
                                        <FormattedMessage id="department"/>
                                        "<FormattedMessage id="funds-and-scientific-archives"/>"
                                    </h2>
                                </div>
                                <div className='section-team__headmaster-wrap'>
                                    <Row>
                                        {
                                            this.props.team.fundsAndScientificArchives && this.props.team.fundsAndScientificArchives.length !== 0
                                                ?
                                                this.props.team.fundsAndScientificArchives.map(user => {
                                                    return (
                                                        <Col md={6} lg={4} key={user.id} className="section-team__col">
                                                            <CardTeamMember
                                                                user={user}
                                                            />
                                                        </Col>
                                                    )
                                                })
                                                :
                                                <h3 className='h3 loading'>
                                                    ...
                                                </h3>
                                        }


                                    </Row>
                                </div>
                            </Container>
                        </div>


                        {
                            this.props.team.history && this.props.team.history.length !== 0
                                ?
                                <div className='section-team__container-wrap'>
                                    <Container>
                                        <div className="section-team__title__wrap">
                                            <h2
                                                className='h2'
                                            >
                                                <FormattedMessage id="department"/>
                                                "<FormattedMessage id="history"/>"
                                            </h2>
                                        </div>
                                        <div className='section-team__headmaster-wrap'>
                                            <Row>
                                                {this.props.team.history.map(user => {
                                                    return (
                                                        <Col md={6} lg={4} key={user.id} className="section-team__col">
                                                            <CardTeamMember
                                                                user={user}
                                                            />
                                                        </Col>
                                                    )
                                                })}


                                            </Row>
                                        </div>
                                    </Container>
                                </div>
                                :
                                null
                        }

                        {
                            this.props.team.ethnography && this.props.team.ethnography.length !== 0
                                ?
                                <div className='section-team__container-wrap'>
                                    <Container>
                                        <div className="section-team__title__wrap">
                                            <h2
                                                className='h2'
                                            >
                                                <FormattedMessage id="department"/>
                                                "<FormattedMessage id="ethnography"/>"
                                            </h2>
                                        </div>
                                        <div className='section-team__headmaster-wrap'>
                                            <Row>
                                                {
                                                    this.props.team.ethnography.map(user => {
                                                        return (
                                                            <Col md={6} lg={4} key={user.id}
                                                                 className="section-team__col">
                                                                <CardTeamMember
                                                                    user={user}
                                                                />
                                                            </Col>
                                                        )
                                                    })
                                                }


                                            </Row>
                                        </div>
                                    </Container>
                                </div>
                                :
                                null
                        }

                        <div className='section-team__container-wrap'>
                            <Container>
                                <div className="section-team__title__wrap">
                                    <h2
                                        className='h2'
                                    >
                                        <FormattedMessage id="department"/>
                                        "<FormattedMessage id="public-relations"/>"
                                    </h2>
                                </div>
                                <div className='section-team__headmaster-wrap'>
                                    <Row>
                                        {
                                            this.props.team.publicRelations && this.props.team.publicRelations.length !== 0
                                                ?
                                                this.props.team.publicRelations.map(user => {
                                                    return (
                                                        <Col md={6} lg={4} key={user.id} className="section-team__col">
                                                            <CardTeamMember
                                                                user={user}
                                                            />
                                                        </Col>
                                                    )
                                                })
                                                :
                                                <h3 className='h3 loading'>
                                                    ...
                                                </h3>
                                        }


                                    </Row>
                                </div>
                            </Container>
                        </div>
                        <div className='section-team__container-wrap'>
                            <Container>
                                <div className="section-team__title__wrap">
                                    <h2
                                        className='h2'
                                    >
                                        <FormattedMessage id="department"/>
                                        "<FormattedMessage id="administration-and-financial"/>"
                                    </h2>
                                </div>
                                <div className='section-team__headmaster-wrap'>
                                    <Row>
                                        {
                                            this.props.team.administration && this.props.team.administration.length !== 0
                                                ?
                                                this.props.team.administration.map(user => {
                                                    return (
                                                        <Col md={6} lg={4} key={user.id} className="section-team__col">
                                                            <CardTeamMember
                                                                user={user}
                                                            />
                                                        </Col>
                                                    )
                                                })
                                                :
                                                <h3 className='h3 loading'>
                                                    ...
                                                </h3>
                                        }


                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </section>
                </main>
            </div>
        )
    }

    renderRegularPrograms = () => {
        return (
            <RegularPrograms/>
        )
    }

    render() {
        return (
            <Switch>
                <Route path='/about-us' exact component={this.renderMainAboutUsPage}/>
                <Route path='/about-us/:modalContent' exact component={this.renderMainAboutUsPage}/>
                <Route path='/about-us/regular-programs' exact component={this.renderRegularPrograms}/>
            </Switch>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        rimBuildingImages: Object.values(state.rimBuildingImages),
        team: state.team
    };
}

export default connect(
    mapStateToProps,
    {
        fetchTeam,
        showModal,
        fetchRimBuildingImages
    }
)(AboutUs);
