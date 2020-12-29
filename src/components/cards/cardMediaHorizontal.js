import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {connect} from "react-redux";

class CardMediaHorizontal extends Component {

    state = {
        icon: this.props.icon,
        text: this.props.text
    }


    render() {
        const {intl} = this.props;
        return (
            <div className='card__icon-text__wrap'>
                <div className='card card__white-bordered card__media-horizontal card__icon-text'>
                    <div className='card__icon-text__icon__wrap'>
                        {this.state.icon}
                    </div>
                    <div  className='card__icon-text__text__wrap'>
                        <p className='card__icon-text__text paragraph-3'
                           dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.text})}}
                        >
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}


export default injectIntl(connect(
    null
)(CardMediaHorizontal));

