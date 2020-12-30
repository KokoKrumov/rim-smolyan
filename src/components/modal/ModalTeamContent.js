import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {closeModal} from "../../actions";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import history from "../../history";


class ModalTeamContent extends Component {

    handleCloseModal = (e, data) => {
        e.preventDefault();
        this.props.closeModal(data);
        if (this.props.user.nickname) {
            //if the modal was opened from cardTeamMember
            // so we have a nickname in the end of the location href
            //when we close the modal, then remove the nickname from there
            const location = history.location.pathname;
            let resetLocation = location.replace(`/${this.props.user.nickname}`, '')
            history.push(resetLocation)
        }
    }

    render() {

        const {intl} = this.props;
        return (
            <React.Fragment>
                <Row className="modal-body__default modal-team">
                    <Col lg={2}>
                        <div>
                            <figure className='figure'>
                                <div className="img__wrap">
                                    <img className="img-fluid" src={this.props.user.avatar}
                                         itemProp="image" alt=''/>
                                </div>
                            </figure>
                        </div>
                    </Col>
                    <Col lg={10}>
                        <div className='title__wrap'>
                            <div>
                                <h3 className='h3'>
                                    {this.props.user.name}
                                </h3>
                                <p className='card__link-label'>
                                    {this.props.user.profession}
                                </p>
                                <p className='card-body__email'>
                                   <span
                                       className="link card-body__phone"
                                       dangerouslySetInnerHTML={{__html: this.props.user.phone}}
                                   >
                                    </span>
                                </p>
                                <p className='card-body__email'
                                   dangerouslySetInnerHTML={{__html: this.props.user.email}}
                                >
                                </p>
                            </div>

                            <div className='modal__close'>
                                <button
                                    className='link cta_outline cta_outline__dark hvr-underline-from-center m-0'
                                    variant="primary"
                                    onClick={(e) => {
                                        this.handleCloseModal(e, 'modal-team');
                                    }}
                                >
                                    <FormattedMessage id="text.close"/>
                                    <div className="icon-close">
                                        <svg width="10" height="11" viewBox="0 0 10 11" fill="inherit"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.91603 5.50007L9.80991 1.60608C10.0633 1.35279 10.0633 0.943255 9.80991 0.689966C9.55662 0.436678 9.14709 0.436678 8.8938 0.689966L4.9998 4.58396L1.10592 0.689966C0.852513 0.436678 0.4431 0.436678 0.189811 0.689966C-0.0635959 0.943255 -0.0635959 1.35279 0.189811 1.60608L4.08369 5.50007L0.189811 9.39407C-0.0635959 9.64736 -0.0635959 10.0569 0.189811 10.3102C0.31604 10.4365 0.482012 10.5 0.647866 10.5C0.813719 10.5 0.979573 10.4365 1.10592 10.3102L4.9998 6.41618L8.8938 10.3102C9.02015 10.4365 9.186 10.5 9.35185 10.5C9.51771 10.5 9.68356 10.4365 9.80991 10.3102C10.0633 10.0569 10.0633 9.64736 9.80991 9.39407L5.91603 5.50007Z"
                                                fill="inherit"/>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <Row>
                            <Col lg={12}>
                                <div className='modal_tabs-wrap'>
                                    <Tab.Container id="uncontrolled-tab-example" defaultActiveKey="biography">
                                        <Nav className="nav-tabs">
                                            <Nav.Item>
                                                <Nav.Link eventKey="biography" className='tab-item'>
                                                    <FormattedMessage id="biography"/>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="interests" className='tab-item'>
                                                    <FormattedMessage id="interests"/>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="publications" className='tab-item'>
                                                    <FormattedMessage id="publications"/>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="biography">
                                                <h3 className='h3'>
                                                    <FormattedMessage id="biography"/>
                                                </h3>
                                                <p className='paragraph-2 mt-3'>
                                                    {this.props.user.year}
                                                </p>
                                                {
                                                    this.props.user.education
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage id="education-and-professions"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.education}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }
                                                {
                                                    this.props.user.past_professions
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage id="professional-development"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.past_professions}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }

                                            </Tab.Pane>
                                            <Tab.Pane eventKey="interests">
                                                <h3 className='h3'>
                                                    <FormattedMessage id="interests"/>
                                                </h3>
                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.main
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage id="main-interests"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.main}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }
                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.research
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage id="research-projects"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.research}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }

                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.exhibitions
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage id="museum-exhibitions"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.exhibitions}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }

                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.participation
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage id="participation"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.participation}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }

                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.project_participation
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage id="project-participation"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.project_participation}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }
                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.professional_skills
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage
                                                                    id="professional-skills-and-competencies"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.professional_skills}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }
                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.organisations
                                                        ?
                                                        <React.Fragment>
                                                            <p className='sub-titles'>
                                                                <FormattedMessage
                                                                    id="membership-in-organizations"/>:
                                                            </p>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.organisations}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="publications">
                                                <h3 className='h3'>
                                                    <FormattedMessage id="publications"/>
                                                </h3>
                                                {
                                                    this.props.user.interests &&
                                                    this.props.user.interests.publications
                                                        ?
                                                        <React.Fragment>
                                                            <div className='modal-team__main-text mt-3'
                                                                 dangerouslySetInnerHTML={{__html: this.props.user.interests.publications}}>
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }

                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.modal.user
})

const mapDispatchToProps = dispatch => ({
    closeModal: data => dispatch(closeModal(data))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ModalTeamContent));
