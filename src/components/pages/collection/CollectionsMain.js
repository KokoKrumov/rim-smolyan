import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import history from "../../../history";
import photoArchiveBg from "../../../assets/images/photo-archive.png";
import libraryBg from "../../../assets/images/library-bg.png";
import scientificArchiveBg from "../../../assets/images/scientific-archive-bg.png";
import {connect} from "react-redux";
import {fetchCollectionsMain} from "../../../actions";
import CardCollections from "../../cards/cardCollections";
import InfoColumn from "../../infoColumn/InfoColumn";
import heroSupportUsBg from "../../../assets/images/heroSupportUsBg.jpg";
import CollectionsList from "./CollectionsList";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collectionsMain: []
        };
    }

    componentDidMount() {
        this.props.fetchCollectionsMain()
            .then(() => {
                this.setState({
                    collectionsMain: this.props.collectionsMain
                })
            })
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='collections-page__wrap'>
                <HeroInner
                    labelTitle={this.state.collectionsMain.title}
                    subtitleLg={this.state.collectionsMain.subtitle}
                    title={'collections'}
                    arrowBottom={true}
                />
                <main className='collections-page'>

                    <section>
                        <Container className='position-relative'>
                            <Row>
                                <Col xs={12}>
                                    <CollectionsList
                                        collections={this.state.collectionsMain.gallery}
                                        collectionsType={'main'}
                                        cols={3}
                                    />

                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section>
                        <InfoColumn
                            title={'photo-archive'}
                            text={'photo-archive-text'}
                            backgroundImage={photoArchiveBg}
                            columns={2}
                        />
                    </section>
                    <section className='archive'>
                        <div className=''>
                            <div
                                className='hero-bg'
                                style={{
                                    backgroundImage: `url(${scientificArchiveBg})`
                                }}
                            >
                                <Container className='archive__container'>
                                    <Row>
                                        <Col xs={12} md={11}>
                                            <h1 className='h1'
                                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "scientific-archive"})}}
                                            />
                                            <p className='paragraph-2'
                                               dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "scientific-archive-text"})}}
                                            />

                                            <ul className='archive__list col-count-2'>
                                                <li className='archive__list-item'>
                                                    Документални материали от изследователски програми - „Родопи”,
                                                    „Родопски крепости”, „Родопски мостове”, теренни проучвания и
                                                    народописни материали за селища от територията на Средните Родопи;

                                                </li>
                                                <li className='archive__list-item'>
                                                    Документи, свързани с научно-техническата обработка на фондовете -
                                                    книги за регистрация, полеви дневници, научни паспорти, актове за
                                                    приемане-предаване, протоколи от инвентаризации, консервация и
                                                    реставрация на културни ценности;

                                                </li>
                                                <li className='archive__list-item'>
                                                    Материали, свързани с експозиционни дейности - тематико-структурни и
                                                    тематико-експозиционни планове; консултации; рисунки, схеми,
                                                    чертежи; плакати, покани и други рекламни материали от музейни
                                                    изложби.
                                                </li>
                                                <li className='archive__list-item'>
                                                    Материали, свързани с недвижими културни ценности в Средните Родопи,
                                                    обособени в „Технически архив”.
                                                </li>
                                            </ul>
                                            <p className='paragraph-2'
                                               dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "scientific-archive-text-help"})}}
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                        </div>
                    </section>
                    <section>
                        <InfoColumn
                            title={'library'}
                            text={'library-text'}
                            backgroundImage={libraryBg}
                            columns={2}
                        />
                    </section>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collectionsMain: state.collections.main
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsMain: () => dispatch(fetchCollectionsMain())
})


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Collections));
