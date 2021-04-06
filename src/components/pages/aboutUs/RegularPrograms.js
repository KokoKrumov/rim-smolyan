import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {connect} from 'react-redux';
import {fetchRimBuildingImages, fetchTeam, showModal} from "../../../actions";
import HeroInner from "../../hero/HeroInner";
import InfoColumn from "../../infoColumn/InfoColumn";
import infoColumns from "../../../programs/regularPrograms.json"

class RegularPrograms extends Component {

    state = {
        infoColumns: infoColumns
    }

    render() {
        return (
            <div className='regular-program-page'>
                <HeroInner
                    title={"regular-programs"}
                    subtitle={''}
                    backLink={true}
                />
                <main>
                    <Container className='position-relative'>
                        {
                            this.state.infoColumns.map((infoColumn) => {
                                return (
                                    <React.Fragment key={infoColumn.id}>
                                        <InfoColumn
                                            title={infoColumn.title}
                                            text={infoColumn.text}
                                            isSmall={infoColumn.isSmall}
                                            backgroundIMage={infoColumn.backgroundIMage}
                                            showRulesForActivity={infoColumn.showRulesForActivity}
                                            columns={infoColumn.columns}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }
                    </Container>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rimBuildingImages: Object.values(state.rimBuildingImages),
        team: state.team
    };
}

export default connect(
    mapStateToProps,
    {
        fetchTeam,
        showModal,
        fetchRimBuildingImages
    }
)(RegularPrograms);
