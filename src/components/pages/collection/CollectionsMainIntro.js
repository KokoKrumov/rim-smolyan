import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import history from "../../../history";
import {connect} from "react-redux";
import {closeModal, fetchCollections, fetchCollectionsMain} from "../../../actions";
import CardCollections from "../../cards/cardCollections";
import heroSupportUsBg from "../../../assets/images/heroSupportUsBg.jpg";
import NotFound from "../NotFound";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collectionsType: null,
            fetchType: null,
            collectionExist: null,
        };
    }

    collectionTypeExist = (collections, type) => {
        //COPY THE ARRAY OF OBJECTS
        const collectionsObj = [...collections];

        this.setState({
            //CHECK IF THE VALUE OF A FIELD 'TYPE' EXISTS IN SOME OF THE OBJECTS OF AN ARRAY
            collectionExist: collectionsObj.some(el => el.collectionsType === type),
            collectionsType: type,
            fetchType: type.toUpperCase()
        })
    }

    componentDidMount() {
        this.props.fetchCollectionsMain()
            .then(() => {
                this.collectionTypeExist(this.props.collectionsMain, this.props.match.params.type)
            })
            .then(()=>{
                this.props.fetchCollections(this.state.fetchType, this.state.collectionsType)
                    .then(()=>{
                        console.log(this.props.collections);
                    })
            })
    }

    pageContent = () => {
        const {intl} = this.props;
        return (
            <div className='collections-page'>
                <div className='hero__wrap'>
                    <div
                        className='hero hero-bg'
                        style={{
                            backgroundImage: `url(${heroSupportUsBg})`
                        }}
                    >
                        <Container>
                            <Row>
                                <Col lg={5}>
                                    <h3 className='h3 title'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "important-support"})}}
                                    >
                                    </h3>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row className='justify-content-between'>
                                <Col lg={5}>
                                    <p className='paragraph-3'
                                       dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "important-support-text"})}}
                                    >
                                    </p>
                                </Col>
                                <Col lg={5}>
                                    <p>
                                        <a
                                            className='links'
                                            href="/administrative/#13"
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "status-for-awarding"})}}
                                            >
                                            </span>
                                        </a>
                                        <a
                                            className='links'
                                            href="/administrative/#14"
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "donors-for-enrichment"})}}
                                            >
                                            </span>
                                        </a>

                                    </p>
                                </Col>
                            </Row>
                        </Container>

                    </div>

                </div>
                <HeroInner
                    labelTitle={'collections-main'}
                    subtitleLg={'collections-main-subtitle'}
                    title={'collections'}
                    arrowBottom={true}
                />
                <main className='prices-page__main'>

                    <section>
                        <Container className='position-relative'>
                            <Row>
                                <Col xs={12}>
                                    <div className="card-columns">
                                        {
                                            this.state.collectionsMain
                                                ?
                                                this.state.collectionsMain.map(item => {
                                                    return <CardCollections key={item.id} item={item}/>
                                                })
                                                :
                                                <p>
                                                    Loading...
                                                </p>
                                        }
                                    </div>

                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        )
    }

    renderContent = () => {
        if (this.state.collectionExist) {
            return this.pageContent()
        } else {
            return <NotFound/>
        }
    }

    render() {
        return this.renderContent()
    }
}

const mapStateToProps = (state) => {
    return {
        collectionsMain: state.collections.main,
        collections: state.collections.byType
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsMain: () => dispatch(fetchCollectionsMain()),
    fetchCollections: (fetchType, collectionsType) => dispatch(fetchCollections(fetchType, collectionsType))
})


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Collections));
