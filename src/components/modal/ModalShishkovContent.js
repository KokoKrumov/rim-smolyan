import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {closeModal} from "../../actions";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StShishkovBarelef from '../../assets/images/St_Shishkov_barelef.png';
import history from "../../history";


class ModalShishkovContent extends Component {

    handleCloseModal = (e, data) => {
        e.preventDefault();
        this.props.closeModal(data);
        // if (this.props.modal.user && this.props.modal.user.nickname) {
            //if the modal was opened from Stoyu Shishkov
            // so we have a his name in the end of the location href
            //when we close the modal, then remove the nickname from there
            const location = history.location.pathname;
            let resetLocation = location.replace(`/stoyu-shishkov`, '')
            history.push(resetLocation)
        // }
    }

    render() {

        const {intl} = this.props;
        return (
            <React.Fragment>
                <Row  className="modal-body__default modal__barelef__wrap">
                    <Col lg={3}>
                        <div>
                            <figure className='modal__barelef modal__barelef-figure'>
                                <div className="img__wrap">
                                    <img className="img-fluid" src={StShishkovBarelef} alt="StShishkovBarelef" itemProp="image"/>
                                </div>
                                <figcaption className='modal__barelef__text'>
                                    <p className="paragraph-sm"  dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'about-us.shishkov.modal.figcaption'}) }} >
                                    </p>
                                </figcaption>
                            </figure>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='title__wrap'>
                            <h3 className='h3'>
                                <FormattedMessage id="about-us.shishkov.modal.title"/>
                            </h3>
                            <div className='modal__close'>
                                <button
                                    className='link cta_outline cta_outline__dark hvr-underline-from-center m-0'
                                    variant="primary"
                                    onClick={(e) => {
                                        this.handleCloseModal(e, 'modal-shishkov');
                                    }}
                                >
                                    <FormattedMessage id="text.close"/>
                                    <div className="icon-close">
                                        <svg width="10" height="11" viewBox="0 0 10 11" fill="inherit" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.91603 5.50007L9.80991 1.60608C10.0633 1.35279 10.0633 0.943255 9.80991 0.689966C9.55662 0.436678 9.14709 0.436678 8.8938 0.689966L4.9998 4.58396L1.10592 0.689966C0.852513 0.436678 0.4431 0.436678 0.189811 0.689966C-0.0635959 0.943255 -0.0635959 1.35279 0.189811 1.60608L4.08369 5.50007L0.189811 9.39407C-0.0635959 9.64736 -0.0635959 10.0569 0.189811 10.3102C0.31604 10.4365 0.482012 10.5 0.647866 10.5C0.813719 10.5 0.979573 10.4365 1.10592 10.3102L4.9998 6.41618L8.8938 10.3102C9.02015 10.4365 9.186 10.5 9.35185 10.5C9.51771 10.5 9.68356 10.4365 9.80991 10.3102C10.0633 10.0569 10.0633 9.64736 9.80991 9.39407L5.91603 5.50007Z" fill="inherit"/>
                                        </svg>
                                    </div>
                                    {/*<img className="icon-close" src={} alt="" itemProp="image"/>*/}
                                </button>
                            </div>
                        </div>
                        <Row>
                            <Col lg={12}>
                                <p className='paragraph-2 col-count-2'
                                   dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'about-us.shishkov.modal.text' }) }}
                                >
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    closeModal: data => dispatch(closeModal(data))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ModalShishkovContent));
