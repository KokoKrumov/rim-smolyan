import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchNews, fetchRimBuildingImages, fetchTeam, showModal} from "../../actions";

class InnerHelperPage extends Component {

    state = {
    }

    render() {
        const {intl} = this.props;
        return (
            <React.Fragment>
                <div>
                    <h1>The Title</h1>
                </div>
            </React.Fragment>
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
)(InnerHelperPage);
