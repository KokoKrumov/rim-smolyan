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

class CollectionsMainDetailItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            //"COLLECTIONmAIN" are all MAIN COLLECTIONS LIST
            collectionsMain: null,
            // "COLLECTION" IS THE INFORMATION ABOUT current COLLECTION
            collection: null
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
            collectionsType: type,
            fetchType: type.toUpperCase()
        })
    }

    componentDidMount() {
        //ВЗЕМИ TYPE  И ITEM ОТ URL-A
        // ОТИДИ ДО TYPE KOLEKCIQTA И ВИЖ ДАЛИ ITEM СЪЩЕСТВУВА
        // console.log(this.props.match.params.item);
        // console.log(this.props.match.params.type);
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
                        />
                        :
                        null
                }
                <div className='collections-page pt-0'>

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
                    <main className='prices-page__main'>
                        <section>
                            <Container>
                                <Tab.Container id="left-tabs-example" defaultActiveKey="introduction">
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
        item: state.item,
        collection: state.collections.byType
    };
}

const mapDispatchToProps = dispatch => (
    {
        fetchItem: (item) => dispatch(fetchCollections(item)),
        fetchCollections: (fetchType, collectionsType) => dispatch(fetchCollections(fetchType, collectionsType))
    }
)


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CollectionsMainDetailItem));
