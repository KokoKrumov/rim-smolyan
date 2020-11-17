import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {connect} from 'react-redux';
import {fetchNews, fetchRimBuildingImages, fetchTeam, showModal} from "../../../actions";
import HeroInner from "../../hero/HeroInner";
import InfoColumn from "../../infoColumn/InfoColumn";

class RegularPrograms extends Component {

    state = {
        infoColumn: [
            {
                id:1,
                isSmall: true,
                title: 'the-international-museum-day',
                text: 'the-international-museum-day-text',
                backgroundIMage:'',
                showRulesForActivity: false,
                columns: 2
            },
            {
                id:2,
                isSmall: true,
                title: 'the-european-heritage-days',
                text: 'the-european-heritage-days-text',
                backgroundIMage:'',
                showRulesForActivity: false,
                columns: 2
            }
        ]
    }

    componentDidMount() {

    }

    handleShowModal = (e, data) => {
        e.preventDefault();
        this.props.showModal(data);
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
                    <Container className='container position-relative'>
                        {
                            this.state.infoColumn.map((infoColumn) => {
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
