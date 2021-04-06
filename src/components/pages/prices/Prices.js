import React, {Component} from 'react';
import {connect} from "react-redux";
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import InfoColumn from "../../infoColumn/InfoColumn";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import imgTraveling from "../../../assets/images/traveling.png"
import {closeModal, fetchRoutes, fetchServices} from "../../../actions";
import CardInfoLine from "../../infoLine/CardInfoLine";

class Prices extends Component {

    state = {
        routes: null,
        services: null,
    }

    fetchRoutes = () => {
        if (this.props && this.props.routes && this.props.routes !== this.state.routes) {
            this.props.fetchRoutes()
                .then(() => {
                    this.setState({routes: this.props.routes})
                })

        }
    }

    fetchServices = () => {
        if (this.props && this.props.services && this.props.services !== this.state.services) {
            this.props.fetchServices()
                .then(() => {
                    this.setState({services: this.props.services})
                })

        }
    }


    componentDidMount() {
        this.fetchRoutes()
        this.fetchServices()
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='services-page'>
                <HeroInner
                    title={'prices'}
                />
                <main className='services-page__main'>

                    <section>
                        <Container className='position-relative'>
                            <Row>

                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    routes: Object.values(state.routes),
    services: Object.values(state.services)
})


export default injectIntl(connect(
    mapStateToProps,
    {
        fetchRoutes,
        fetchServices
    }
)(Prices));
