import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {connect} from 'react-redux';
import {fetchNews, fetchRimBuildingImages, fetchTeam, showModal} from "../../../actions";
import HeroInner from "../../hero/HeroInner";

class RegularPrograms extends Component {

    state = {

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
