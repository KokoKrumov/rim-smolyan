import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {injectIntl} from 'react-intl';
import {connect} from "react-redux";
import {showModal} from "../../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class InfoColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title ? this.props.title : '',
            text:this.props.text ? this.props.text : '',
            backgroundImage: this.props.backgroundImage,
            showMoreLink: this.props.showMoreLink ? this.props.showMoreLink : false,
            showRulesForActivity: this.props.showRulesForActivity,
            columns: this.props.columns,
            rulesForActivity: "rules-for-activity",
            seeMore: "see-more",
            isSmall: this.props.isSmall ? this.props.isSmall : false
        }
    }
    

    handleShowModal(data, url, e) {
        e.preventDefault();
        this.props.showModal(data, url)
    }

    render() {
        const {intl} = this.props;
        return (
            <div
                className='nae-container info-column nae-container_content-dark hero-bg'
                style={this.state.backgroundImage ? {
                    backgroundImage: `url(${this.state.backgroundImage})`
                } : null}
            >
                <Container>
                    <div>
                        <div className='nae__title-line'>

                            {
                                this.state.isSmall
                                    ?
                                    <h2 className='h2'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.title})}}>
                                    </h2>
                                    :
                                    <h1 className='h1'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.title})}}>
                                    </h1>
                            }

                        </div>
                        <div>
                            <div className={`paragraph-2 col-count-${this.state.columns}`}
                               dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.text})}}>
                            </div>
                            <Row className='home-page__info-column'>
                                <Col>
                                    {
                                        this.state.showRulesForActivity
                                            ?
                                            <p style={{marginTop: '2rem'}}>
                                                <a className="link cta_outline cta_outline__dark link-underline m-0 d-inline-block"
                                                   href="https://static.museumsmolyan.eu/docs/ustrojstvo_dejnost_rim_smolyan.pdf"
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.rulesForActivity})}}
                                                >
                                                </a>
                                            </p>
                                            :
                                            null
                                    }

                                </Col>
                                <Col>
                                    {
                                        this.state.showMoreLink
                                            ?
                                            <p>
                                                <a
                                                    className="link cta_outline cta_outline__dark hvr-underline-from-left"
                                                    href={`${this.state.showMoreLink}`}
                                                    itemProp="url"
                                                    target=""
                                                    onClick={
                                                        this.state.showMoreLink
                                                            ?
                                                            null
                                                            :
                                                            (e) => {
                                                                this.handleShowModal('modal-redirect', '', e)
                                                            }
                                                    }
                                                    rel="noopener nofollow noreferrer"
                                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.seeMore})}}
                                                >
                                                </a>
                                            </p>
                                            :
                                            null
                                    }

                                </Col>
                            </Row>

                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}


export default injectIntl(connect(
    null,
    {
        showModal
    }
)(InfoColumn));

