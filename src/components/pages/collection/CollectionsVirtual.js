import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import photoArchiveBg from "../../../assets/images/photo-archive.png";
import libraryBg from "../../../assets/images/library-bg.png";
import scientificArchiveBg from "../../../assets/images/scientific-archive-bg.png";
import {connect} from "react-redux";
import CardCollections from "../../cards/cardCollections";
import InfoColumn from "../../infoColumn/InfoColumn";
import CollectionsList from "./CollectionsList";
import {fetchCollectionsVirtual} from "../../../actions";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collectionsVirtual: []
        };
    }

    componentDidMount() {
        this.props.fetchCollectionsVirtual()
            .then(() => {
                this.setState({
                    collectionsVirtual: this.props.collectionsVirtual
                })
            })
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='collections-page__wrap'>
                <HeroInner
                    labelTitle={'collections-virtual'}
                    subtitleLg={'collections-main-subtitle'}
                    title={'collections'}
                    arrowBottom={true}
                />
                <main className='collections-page'>

                    <section>
                        <Container className='position-relative'>
                            <Row>
                                <Col xs={12}>
                                    <CollectionsList
                                        collections={this.state.collectionsVirtual}
                                        collectionsType={'virtual'}
                                        cols={4}
                                        smallCards
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collectionsVirtual: state.collections.virtual
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsVirtual: () => dispatch(fetchCollectionsVirtual())
})


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Collections));
