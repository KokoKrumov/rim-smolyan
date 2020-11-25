import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import administrative from './Administrative.json'
import AccordionBlock from "../../collapse/AccordionBlock";
import history from "../../../history";

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
        if (this.props?.location.hash && this.props?.location.hash !== this.state.openAccordionItem){
            this.setState({
                openAccordionItem: this.props.location.hash,
                openAccordionItemPured : Number(this.pureTheItem(this.props.location.hash))
            });
        } else if(!this.props?.location.hash && this.state.openAccordionItem) {
            this.setState({
                openAccordionItem: null,
                openAccordionItemPured : null
            });
        }
    }

    handleInitialHash = (block) => {
        if (history.location.hash === `#${block.id}`) {
            history.push(`/administrative`)
        } else {
            history.push(`/administrative/#${block.id}`)
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
                                <AccordionBlock
                                    content={doc['sub_types']}
                                    openAccordionItemPured={this.state.openAccordionItemPured}
                                    handleInitialHash={this.handleInitialHash}
                                />

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
