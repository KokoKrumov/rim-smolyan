import React from 'react';
import {injectIntl} from 'react-intl';
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import history from "../../../history";
import {connect} from "react-redux";
import {closeModal, fetchCollections, fetchCollectionsMain} from "../../../actions";

function CollectionsMainDetailItem(props) {
    return (
        <div></div>
    );
}
const mapStateToProps = (state) => {
    return {
        item: state.item,
        collection: state.collections.byType
    };
}

const mapDispatchToProps = dispatch => (
    {
        fetchItem: (item) => dispatch(fetchCollections(item)),
        fetchCollections: (fetchType, collectionsType) => dispatch(fetchCollections(fetchType, collectionsType))
    }
)


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CollectionsMainDetailItem));
