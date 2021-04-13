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
            <div className='collections-page'>
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
                    <section>
                        <InfoColumn
                            title={'photo-archive'}
                            text={'photo-archive-text'}
                            backgroundImage={photoArchiveBg}
                            columns={2}
                        />
                    </section>
                    <section>
                        <div className='hero__wrap'>
                            <div
                                className='hero hero-bg'
                                style={{
                                    backgroundImage: `url(${scientificArchiveBg})`
                                }}
                            >
                                <Container>
                                    <h1 className='h1'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "scientific-archive"})}}
                                    />
                                    <p className='paragraph-2'
                                       dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "scientific-archive-text"})}}
                                    />
                                    <p className='paragraph-2'
                                       dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "scientific-archive-text"})}}
                                    />
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
