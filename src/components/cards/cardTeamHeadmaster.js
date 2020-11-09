import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";

class CardTeamHeadmaster extends Component {

    state = {
        user: this.props.user
    }

    handleShowModal = (e, data, user) => {
        e.preventDefault();
        this.props.showModal(data, user);
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='card__wrap'>
                <div className='card  card__white-bordered card__media-horizontal'>
                    <div className='card__main-info'>
                        <div className='card-avatar__wrap'>
                            <img className="img-fluid" src={this.state.user.avatar} alt="" itemProp="image"/>
                        </div>
                        <div  className='card-body__wrap'>
                            <h3 className='card-body__title h3' >
                                {this.state.user.name}
                            </h3>
                            <p className='card-body__label paragraph-3'>
                                {this.state.user.role}
                            </p>
                            <p className='link-wrap'>
                                <a className="link card-body__email" href={`mailto:${ this.state.email}`} itemProp="url" target="" rel="noopener nofollow noreferrer">
                                    {this.state.user.email}
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
                                    this.handleShowModal(e, 'modal-team', this.state.user)
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

