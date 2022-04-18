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
import Tabs from 'react-bootstrap/Tabs'
import Nav from "react-bootstrap/Nav";
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import HeroCollections from "../../hero/HeroCollections";
import SocialsShare from "../../socials/socialsShare";
import NavigateThroughCollections from "../../nav/NavigateThroughCollections";
import {setCollectionFromMain, setNextCollectionFromMain, setPrevCollectionFromMain} from "../../../utilities/browser";

class CollectionsMainIntroAndGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collectionsType: null,
            fetchType: null,
            collectionExist: null,
            //"COLLECTIONmAIN" are all MAIN COLLECTIONS LIST
            collectionsMain: null,
            // "COLLECTION" IS THE INFORMATION ABOUT current COLLECTION
            collection: null,
            // "COLLECTIONfrommain" IS THE INFORMATION from main collection json ABOUT current COLLECTION
            collectionFromMain: null,
            collectionNextItem: null,
            collectionPrevItem: null,
            isInnerGallery: this.props.match.path.includes('intro')
        };
    }


    collectionTypeExist = (collections, type) => {
        //COPY THE ARRAY OF OBJECTS
        //GETT ALL MAIN COLLECTIONS
        const collectionsObj = [...collections];
        this.setState({
            //CHECK IF THE VALUE OF A FIELD 'TYPE' EXISTS IN SOME OF THE OBJECTS OF AN ARRAY
            //(CHECK IF THE COLLECTION EXISTS)
            collectionExist: collectionsObj.some(el => el.collectionsType === type),
            // get the collection from main collection
            collectionFromMain: setCollectionFromMain(collectionsObj, type),
            collectionNextItem: setNextCollectionFromMain(collectionsObj, type),
            collectionPrevItem: setPrevCollectionFromMain(collectionsObj, type),

            collectionIndexFromMain: collectionsObj.some(el => el.collectionsType === type),
            collectionsType: type
        })
    }

    componentDidMount() {
        this.props.fetchCollectionsMain()
            .then(() => {
                this.collectionTypeExist(this.props.collectionsMain.gallery, this.props.match.params.type)
            })
            .then(() => {
                //IF COLLECTION EXIST
                if (this.state.collectionExist) {
                    // THEN FETCH ITS DATA
                    this.props.fetchCollections(this.state.collectionsType)
                        .then(() => {
                            this.setState(prevState => ({
                                collection: this.props.collection[0]
                            }))
                        })
                }

            })
    }

    pageContent = () => {
        const {intl} = this.props;
        return (
            <>
                {
                    this.state.collection
                        ?
                        <HeroCollections
                            bgImage={this.state.collection.bgImage}
                            title={this.state.collection.title}
                            label={true}
                        />
                        :
                        null
                }
                <div className='collections-page pt-0 pb-0'>

                    {
                        this.state.collection
                            ?
                            <HeroInner
                                breadcrumbs={{
                                    parent: 'collections-main',
                                    parentLink: 'main-collections',
                                    child: this.state.collection
                                }}
                                subtitleLg={this.state.collection ? this.state.collection.subtitle : 'collections-main-subtitle'}
                                title={this.state.collection ? '' : 'collections'}
                                arrowBottom={true}
                            />
                            :
                            null
                    }
                    <main className='prices-page__main collections-page__intro-and-gallery'>
                        <section>
                            <Container>
                                <Tab.Container defaultActiveKey="introduction">
                                    <Row className='justify-content-between'>
                                        <Col sm={2}>
                                            <Nav className="flex-column">
                                                <Nav defaultActiveKey="/introduction"
                                                     className="nae__filter__wrap flex-row justify-content-around justify-content-lg-start flex-lg-column">
                                                    <Nav.Link className='tab_list-link'
                                                              eventKey="introduction"
                                                              dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'introduction'})}}
                                                    />
                                                    <Nav.Link className='tab_list-link'
                                                              eventKey="gallery"
                                                              dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'gallery'})}}
                                                    />
                                                </Nav>
                                            </Nav>
                                            <div className="socials__wrap">
                                                <p className='socials-label'>Споделете страницата</p>
                                                <SocialsShare page={'share-page'}/>
                                            </div>
                                        </Col>
                                        <Col sm={10}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="introduction">
                                                    <Container>
                                                        <Row className='justify-content-center'>
                                                            <Col sm={12} md={9}>
                                                                <h2 className='h2'
                                                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'collection-introduction'})}}
                                                                />
                                                                {
                                                                    this.state.collection
                                                                        ?
                                                                        <div
                                                                            className='paragraph-2 paragraphs-with-mb-25'
                                                                            dangerouslySetInnerHTML={{__html: this.state.collection.description}}
                                                                        />
                                                                        :
                                                                        <p>
                                                                            Loading ...
                                                                        </p>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="gallery">
                                                    <Container>
                                                        <Row className='justify-content-end'>
                                                            <Col md={11}>
                                                                <h2 className='h2'
                                                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'gallery'})}}
                                                                />
                                                                <p className='paragraph-2 mb-5'
                                                                   dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'gallery-intro'})}}
                                                                />
                                                                <div className='card-columns card-columns-3'>

                                                                    {
                                                                        this.state.collection
                                                                            ?

                                                                            this.state.collection.gallery.map(item => {
                                                                                return <CardCollections
                                                                                    key={item.title}
                                                                                    item={item}
                                                                                    collectionsType={this.state.collectionsType}
                                                                                    isInnerGallery
                                                                                />
                                                                            })
                                                                            :
                                                                            <p>
                                                                                Loading Collections...
                                                                            </p>
                                                                    }

                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Container>
                        </section>
                        <section>
                            <Container className='position-relative'>
                                <Row>
                                    <Col xs={12}>
                                        <div className="card-columns">

                                        </div>

                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </main>
                    <NavigateThroughCollections
                        collectionType={'main-collections/intro'}
                        prevLink={this.state.collectionPrevItem}
                        nextLink={this.state.collectionNextItem}
                    />
                </div>
            </>
        )
    }

    renderContent = () => {
        if (

            this.state.collectionExist === null
        ) {
            return (

                <p>
                    Loading ....
                </p>
            )
        } else {
            if (this.state.collectionExist) {
                return this.pageContent()
            } else {
                return <NotFound/>
            }
        }
    }


    render() {
        return this.renderContent()
    }
}

const mapStateToProps = (state) => {
    return {
        collectionsMain: state.collections.main,
        collection: state.collections.byType
    };
}

const mapDispatchToProps = dispatch => (
    {
        fetchCollectionsMain: () => dispatch(fetchCollectionsMain()),
        fetchCollections: (collectionsType) => dispatch(fetchCollections(collectionsType))
    }
)


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CollectionsMainIntroAndGallery));
