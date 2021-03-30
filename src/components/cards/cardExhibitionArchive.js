import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import {connect} from "react-redux";

class CardExhibitionArchive extends Component {

    state = {
        title: this.props.title,
        text: this.props.text
    }


    render() {
        const {intl} = this.props;
        return (
            <div className='card-exhibition-archive'>
                <h3 className="h3">
                    {this.state.title}
                </h3>
                <p className="paragraph-3 mt-3">
                    {this.state.text}
                </p>
            </div>
        )
    }
}


export default injectIntl(connect(
    null
)(CardExhibitionArchive));

