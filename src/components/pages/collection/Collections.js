import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import history from "../../../history";
import NotFound from "../NotFound";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.match.params.type
        };
    }

    componentDidMount() {
        console.log(this.state.page);
    }

    isMainCollection = () => {
        return this.state.page === 'main-collections'
    }

    renderCollections = () => {

        const {intl} = this.props;
        return (
            <div className='collections-page'>
                <HeroInner
                    labelTitle={this.isMainCollection() ? 'collections-main' : 'collections-virtual'}
                    subtitleLg={this.isMainCollection() ? 'collections-main-subtitle' : 'collections-virtual-subtitle'}
                    title={'collections'}
                />
                <main className='prices-page__main'>

                    <section>
                        <Container className='position-relative'>
                            <Row>
                                <Col xs={12} sm={8}>
                                    <h5 className='prices-title'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'prices-entrance-tours'})}}
                                    />
                                    <div
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'prices-entrance-tours-text'})}}
                                    />

                                    <h5 className='prices-title'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'prices-services-charges'})}}
                                    />
                                    <div
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'prices-services-charges-text'})}}
                                    />

                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        )
    }

    renderPage = () => {
        switch (this.state.page) {
            case 'main-collections':
            case 'virtual-collections':
                return this.renderCollections()
            default:
                return <NotFound/>

        }
    }

    render() {
        return this.renderPage()
    }
}


export default injectIntl(Collections);
