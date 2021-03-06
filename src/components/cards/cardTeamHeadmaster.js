import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";
import history from "../../history";
import {isMobileScreen} from "../../utilities/browser";

class CardTeamHeadmaster extends Component {

    state = {
        user: this.props.user,
        isMobileScreenV: isMobileScreen(),
    }

    handleResize() {
        this.setState({
            isMobileScreenV: isMobileScreen()
        })
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.handleResize()
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => {
            this.handleResize()
        })
    }

    handleShowModal = (data, url, user, e) => {
        e.preventDefault();
        this.props.showModal(data, url, user);
        //when you open a modal with some of the members in /about-us page
        //then push the nick name in the location href, so an user has ability to copy the path
        //(at this point of time cardTeamMember exist only in /about-us page)
        history.push(`/about-us/${this.state.user.nickname}`)
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='card__wrap'>
                <div className='card card__white-bordered card__media-horizontal'>
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
                               <span
                                   className="link card-body__phone"
                                   dangerouslySetInnerHTML={{__html: this.state.user.phone}}
                               >
                                </span>
                            </p>
                            <p className='link-wrap'>
                               <span
                                   className="link card-body__email"
                                   dangerouslySetInnerHTML={{__html: this.state.user.email}}
                               >
                                </span>
                            </p>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.isMobileScreenV
                            ?
                                <p className='info-line__titled__text info-line__text-bold'>
                                    <Link
                                        className="link cta_outline cta_outline__red hvr-underline-from-center"
                                        to={`/about-us/${this.state.user.nickname}`}
                                        itemProp="url"
                                        target=""
                                        onClick={(e) => {
                                            this.handleShowModal('modal-team', '', this.state.user, e)
                                        }} rel="noopener nofollow noreferrer"
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'see-more'})}}>
                                    </Link>
                                </p>
                                :
                                <p className='info-line__titled__text info-line__text-bold'>
                                    <Link

                                        className="link cta_outline cta_outline__red cta_outline__border-overflow"
                                        to={`/about-us/${this.state.user.nickname}`}
                                        itemProp="url"
                                        target=""
                                        onClick={(e) => {
                                            this.handleShowModal('modal-team', '', this.state.user, e)
                                        }} rel="noopener nofollow noreferrer"
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'see-here'})}}
                                    >
                                    </Link>
                                </p>
                        }


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

