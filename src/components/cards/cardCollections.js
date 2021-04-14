import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";
import history from "../../history";

class CardCollections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        }
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='card card-collections__wrap'>
                <div className='card-collections__img'>
                    <figure>
                        <a href={`/main-collections/intro/${this.state.item.collectionsType}`}
                           className='card-collections__link'>
                            <img className='card-collections__image img-fluid' src={this.state.item.image} alt=""/>
                            <figcaption className='card-collections__text'>
                                <h4 className='h4'
                                    dangerouslySetInnerHTML={{__html: `${this.state.item.title}`}}
                                />
                                    (<span dangerouslySetInnerHTML={{__html: `${this.state.item.galleryLength}`}}/>
                                    <span dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'pics'})}}/>)
                            </figcaption>
                        </a>
                    </figure>
                </div>
            </div>
        )
    }
}


export default injectIntl(connect(
    null,
    {}
)(CardCollections));

