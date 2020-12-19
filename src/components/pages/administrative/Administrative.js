import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import administrative from './Administrative.json'
import AccordionBlock from "../../collapse/AccordionBlock";
import history from "../../../history";
import {Route, Switch} from "react-router-dom";
import InnerHelperPage from "../../innerHelperPages/innerHelperPage";

class Administrative extends Component {


    pureTheItem = (item) => {
        return item.replace('#', '')
    }

    state = {
        administrative: administrative,
        openAccordionItem: null,
        openAccordionItemPured: null
    }

    updateActiveItem = () => {
        if (this.props?.location.hash && this.props?.location.hash !== this.state.openAccordionItem) {
            this.setState({
                openAccordionItem: this.props.location.hash,
                openAccordionItemPured: Number(this.pureTheItem(this.props.location.hash))
            });
        } else if (!this.props?.location.hash && this.state.openAccordionItem) {
            this.setState({
                openAccordionItem: null,
                openAccordionItemPured: null
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
        console.log(this.props);
    }

    componentDidUpdate() {
        this.updateActiveItem()
    }

    renderMainAdministrativeUsPage = () => {
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

    renderDetailAdministrativePage = () => {
        return (
            <div className='administrative__detail-page'>
                <InnerHelperPage />
            </div>
        )
    }

    render() {
        const {intl} = this.props;
        return (
            <Switch>
                <Route path='/administrative' exact component={this.renderMainAdministrativeUsPage}/>
                <Route path='/administrative/:detailInfo' exact component={this.renderDetailAdministrativePage}/>
            </Switch>

        )
    }
}

export default injectIntl(connect(
    null,
    {
        // showModal
    }
)(Administrative));
