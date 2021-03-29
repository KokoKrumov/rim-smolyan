import React, {Component} from 'react';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import {connect} from 'react-redux'
import {fetchExhibitions, fetchNews} from "../../../actions";
import exhibitionPermanentHero from "../../../assets/images/exhibition-permanent-hero.png"
import {injectIntl} from "react-intl";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NewsAndEventsListHorizontal from "../../newsAndEventsList/NewsAndEventsListHorizontal";
import AccordionBlockExhibitionsArchive from "../../collapse/AccordionBlockExhibitionsArchive";
import exhibitionsArchiveBG from '../../../translations/exhibitionsArchiveBG.json';
import exhibitionsArchiveEN from '../../../translations/exhibitionsArchiveEN.json';

class ExhibitionsPage extends Component {

    state = {
        img: exhibitionPermanentHero,
        exhibitions: null,
        exhibitionsArchive: this.props.intl.locale === 'en' ? exhibitionsArchiveEN : exhibitionsArchiveBG
    }

    fetchData = () => {
        if (this.props?.exhibitions && this.props.exhibitions !== this.state.exhibitions) {
            this.props.fetchExhibitions()
                .then(() => {
                    this.setState({exhibitions: this.props.exhibitions})
                })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        const {intl} = this.props;

        return (
            <div className='exhibitions-page__wrap'>
                <HeroInner
                    title={'permanent-exhibitions-title'}
                    subtitleLg={'permanent-exhibitions-subtitle'}
                    arrowBottom={true}
                />

                <div className='exhibitions exhibitions__wrap'>
                    <section className="exhibitions__permanent">
                        <Container className='exhibitions__container'>

                            <div className="exhibitions__hero-wrap">
                                <div>
                                    <Image src={exhibitionPermanentHero} fluid/>
                                </div>
                                <Row>
                                    <Col lg={12}>
                                        <p className='paragraph-2 col-count-2'
                                           dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'permanent-exhibitions-text'})}}
                                        >
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <div className="exhibitions__permanent exhibitions__dark">
                            <Container>
                                <h3 className="h3-light"
                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'permanent-exhibitions-text-come'})}}
                                />
                            </Container>
                        </div>
                    </section>
                    <section className="exhibitions__temporary">
                        <Container>
                            {/*no Row (negative margin) because "NewsAndEventsListHorizontal" has container inside*/}
                            <Col>
                                <h1 className='h1'
                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'temporary-exhibitions-title'})}}
                                />
                                <h5 className='exhibitions__temporary__subtitle'
                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'temporary-exhibitions-subtitle'})}}
                                />
                            </Col>
                            <div>
                                <NewsAndEventsListHorizontal
                                    listOfNewsAndEvents={this.state.exhibitions}
                                />
                            </div>
                        </Container>
                    </section>
                    <section>
                        <div className='exhibitions__archive'>
                            <AccordionBlockExhibitionsArchive content={this.state.exhibitionsArchive}/>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        exhibitions: Object.values(state.exhibitions)
    };
}

export default injectIntl(connect(
    mapStateToProps,
    {
        fetchExhibitions
    }
)(ExhibitionsPage));
