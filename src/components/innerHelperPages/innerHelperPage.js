import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRimBuildingImages, fetchTeam, showModal} from "../../actions";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import history from "../../history";

class InnerHelperPage extends Component {

    state = {
        title: this.props.content.title,
        subTitle: this.props.content.sub_title,
        text: this.props.content.text,
        date: this.props.content.date,
        author: this.props.content.author,
        authorTitle: this.props.content.author_title,

    }

    componentDidMount() {
    }

    render() {
        const {intl} = this.props;
        return (
            <React.Fragment>
                <div className='inner-helper-page'>
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <div className='back-link'>
                                    <Button
                                        variant="link"
                                        className="link cta_outline cta_outline__dark"
                                        onClick={() => {
                                            history.goBack()
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                "<spam class='mr-3'>" +
                                                "<svg width=\"65\" height=\"8\" viewBox=\"0 0 65 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                                "<path d=\"M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM65 3.5L1 3.5V4.5L65 4.5V3.5Z\" />\n" +
                                                "</svg>" +
                                                "</spam>"
                                                + intl.formatMessage({id: 'back'})
                                        }}>
                                    </Button>
                                </div>

                                <div className='inner-helper-page__title'>
                                    <h4 className='h4'>{this.state.title}</h4>
                                </div>
                                <div className='inner-helper-page__subtitle'>
                                    <p className='subtitle'>{this.state.subTitle}</p>
                                </div>
                                <div className='inner-helper-page__text'>
                                    <p className='paragraph-3'
                                       dangerouslySetInnerHTML={{__html: this.state.text}}
                                    />
                                </div>
                                <div className='inner-helper-page__author_wrap'>
                                    <p className='h-sup'>{this.state.date}</p>
                                    <div className='inner-helper-page__author'>
                                        <h5 className='h5'>{this.state.author ? `${this.state.author},` : null} <br/>
                                            {this.state.authorTitle}
                                        </h5>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rimBuildingImages: Object.values(state.rimBuildingImages),
        team: state.team
    };
}

export default injectIntl(connect(
    mapStateToProps,
    {
        fetchTeam,
        showModal,
        fetchRimBuildingImages
    }
)(InnerHelperPage));


// export default injectIntl(HeroInner);
