import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import administrative from './Administrative.json'
import AccordionBlock from "../../collapse/AccordionBlock";

class Administrative extends Component {


    pureTheItem = (item) => {
        return item.replace('#', '')
    }

    state = {
        administrative: administrative,
        openAccordionItem: null,
        openAccordionItemPured:  null
    }

    updateActiveItem = () => {
        console.log(this.props);
        if (this.props?.location.hash && this.props?.location.hash !== this.state.openAccordionItem){
            this.setState({
                openAccordionItem: this.props.location.hash,
                openAccordionItemPured : Number(this.pureTheItem(this.props.location.hash))
            });
        }
    }

    componentDidMount() {
       this.updateActiveItem()
    }

    componentDidUpdate() {
       this.updateActiveItem()
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='administrative-page'>

                {
                    this.state.administrative.map(doc => {
                        return (
                            <div
                                key={doc.id}
                                className="administrative-block"
                            >
                                <HeroInner
                                    title={doc.type}
                                />
                                <AccordionBlock content={doc['sub_types']} openAccordionItemPured={this.state.openAccordionItemPured}/>

                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default injectIntl(connect(
    null,
    {
        // showModal
    }
)(Administrative));
