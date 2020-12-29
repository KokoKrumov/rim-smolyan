import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {connect} from "react-redux";
import {showModal} from "../../actions";

class CardInfoLine extends Component {

    state = {
        title: this.props.title,
        link: this.props.link ? this.props.link : '/#',
        linkText: this.props.linkText ? this.props.linkText : 'see-here',
        isSmall: this.props.isSmall
    }

    handleShowModal(data, e) {
        if (this.state.link === '/#') {
            e.preventDefault();
            this.props.showModal(data)
        }

    }

    render() {

        const {intl} = this.props;
        return (
            <div className={`info-line info-line__card info-line__bordered__white info-line__titled ${this.state.isSmall ? 'is-small' : ''}`}>
                <div className='info-line__content-wrap'>
                    <div className='info-line__titled__item'>
                        {
                            this.state.isSmall
                                ?
                                <h5 className='h5'
                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.title})}}
                                >
                                </h5>
                                :
                                <h2 className='h2'
                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.title})}}
                                >
                                </h2>
                        }
                        <p className='info-line__titled__text info-line__text-bold'>
                            <a

                                className="link cta_outline cta_outline__red cta_outline__border-overflow"
                                href={this.state.link}
                                itemProp="url"
                                target=""
                                onClick={(e) => {
                                    this.handleShowModal('modal-redirect',e)
                                }}
                                rel="noopener nofollow noreferrer"
                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.linkText})}}
                            >
                            </a>
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
)(CardInfoLine));
