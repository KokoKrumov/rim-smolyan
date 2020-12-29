import React, {Component} from 'react';
import {connect} from "react-redux";
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import administrativeBG from '../../../translations/AdministrativeBG.json'
import administrativeEN from '../../../translations/AdministrativeEN.json'
import administrativeProjectsBG from '../../../translations/AdministrativeProjetcsBG.json'
import administrativeProjectsEN from '../../../translations/AdministrativeProjetcsEN.json'
import AccordionBlock from "../../collapse/AccordionBlock";
import history from "../../../history";
import {Route, Switch} from "react-router-dom";
import InnerHelperPage from "../../innerHelperPages/innerHelperPage";
import NotFound from "../NotFound";

class Administrative extends Component {


    pureTheItem = (item) => {
        return item.replace('#', '')
    }

    state = {
        administrative: this.props.intl.locale === 'en' ? administrativeEN : administrativeBG,
        administrativeProjects: this.props.intl.locale === 'en' ? Object.values(administrativeProjectsEN) : Object.values(administrativeProjectsBG),
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

    // WHEN USER CLICKS ON COLLAPSABLE PANEL HEADER
    // THIS CHECKS IF THE PANEL IS ALREADY OPEN AND ITS
    // HASH IS IN THE URL
    // THE handleInitialHash METHOD REMOVES ITS HASH FROM THERE
    // IF NOT - THE METHOD ADD THE HASH IN THE URL
    handleInitialHash = (block) => {
        if (history.location.hash === `#${block.id}`) {
            history.push(`/administrative`)
        } else {
            history.push(`/administrative/#${block.id}`)
        }
    }

    // CHECK IF THIS PROJECT BARNCH AND ARTICLE INIT EXISTS
    isProjectExist = (projectId, articleId) => {
        let project = this.state.administrativeProjects.find(project => {
            //check if project exist
            if (project.parentId === projectId) {
                //check if article exist
                return project.projects.find(article => article.id === articleId)
            } else {
                return null;
            }
        })
        return (project)
    }
    getProjectContent = (projectId, articleId) => {
        let project = this.state.administrativeProjects.find(project => project.parentId === projectId)
        let article = project.projects.find(article => article.id === articleId)
        // return article
        return article
    }

    componentDidMount() {
        this.updateActiveItem()
        // console.log(this.props.intl);
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

        let isProjectExist = this.isProjectExist(Number(this.props.match.params.parentId), Number(this.props.match.params.id));

        if (isProjectExist) {
            return (
                <div className='administrative__detail-page'>
                    <InnerHelperPage
                        content={this.getProjectContent(Number(this.props.match.params.parentId), Number(this.props.match.params.id))}/>
                </div>
            )
        } else {
            //if there is no article with given id's
            //then return not fond page
            return (
                <NotFound/>
            )
        }


    }

    render() {
        const {intl} = this.props;
        return (
            <Switch>
                <Route path='/administrative' exact component={this.renderMainAdministrativeUsPage}/>
                <Route path='/administrative/:parentId/:id' exact component={this.renderDetailAdministrativePage}/>
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
