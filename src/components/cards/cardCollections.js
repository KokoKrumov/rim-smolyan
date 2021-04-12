import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";
import history from "../../history";

class CardCollections extends Component {

    state = {
        item: this.props.item
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='card card-collections__wrap'>
                <div className='card-collections__img'>
                    <a href="#" className='card-collections__link'>
                        <img className='card-collections__image' src={this.state.item.image} alt=""/>
                        <h4 className='h4'
                            dangerouslySetInnerHTML={{__html: `${this.state.item.title}`}}
                        />
                        <p className='card-collections__text'>
                            (<span dangerouslySetInnerHTML={{__html: `${this.state.item.galleryLength}`}}/>
                            <span dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'pics'})}}/>)
                        </p>
                    </a>
                </div>
            </div>
        )
    }
}


export default injectIntl(connect(
null,
{
}
)(CardCollections));

