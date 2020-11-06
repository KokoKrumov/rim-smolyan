import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";

class CardTeamHeadmaster extends Component {

    state = {
        avatar: this.props.avatar,
        title: this.props.title,
        label: this.props.label,
        email: this.props.email,
    }

    handleShowModal = (e, data) => {
        e.preventDefault();
        this.props.showModal(data);
    }


    render() {
        const {intl} = this.props;
        return (
            <div className='card__wrap'>
                <div className='card  card__white-bordered card__media-horizontal'>
                    <div  className='card__main-info'>
                        <div className='card-avatar__wrap'>
                            <img className="img-fluid" src={this.state.avatar} alt="" itemProp="image"/>
                        </div>
                        <div  className='card-body__wrap'>
                            <h3 className='card-body__title h3'
                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.title})}}
                            >
                            </h3>
                            <p className='card-body__label paragraph-3'
                               dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.label})}}
                            >
                            </p>
                            <p className='link-wrap'>
                                <a className="link card-body__email" href={`mailto:${intl.formatMessage({id: this.state.email})}`} itemProp="url" target="" rel="noopener nofollow noreferrer">
                                    <FormattedMessage id={this.props.email}/>
                                </a>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className='info-line__titled__text info-line__text-bold'>
                            <Link

                                className="link cta_outline cta_outline__red cta_outline__border-overflow"
                                to="#"
                                itemProp="url"
                                target=""
                                onClick={(e) => {
                                    this.handleShowModal(e, 'modal-redirect')
                                }} rel="noopener nofollow noreferrer"
                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'see-here'})}}
                            >
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}


export default injectIntl(connect(
    null,
    {
        showModal
    }
)(CardTeamHeadmaster));

