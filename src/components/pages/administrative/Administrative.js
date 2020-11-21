import React, {Component} from 'react';
import {connect} from "react-redux";
import {showModal} from "../../../actions";
import {FormattedMessage, injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import administrative from './Administrative.json'
import CollapseBlock from "../../collapse/AccordionBlock";
import Accordion from "react-bootstrap/Accordion";
import AccordionBlock from "../../collapse/AccordionBlock";

class Administrative extends Component {

    state = {
        administrative: administrative
    }

    handleShowModal(data, e) {
        e.preventDefault();
        this.props.showModal(data)
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
                                <AccordionBlock content={doc['sub_types']}/>

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
        showModal
    }
)(Administrative));
