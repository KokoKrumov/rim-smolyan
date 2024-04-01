import React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { fetchCollections } from "../../../actions";

function CollectionsMainDetailItem(props) {
  return <div></div>;
}
const mapStateToProps = (state) => {
  return {
    item: state.item,
    collection: state.collections.byType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItem: (item) => dispatch(fetchCollections(item)),
  fetchCollections: (fetchType, collectionsType) =>
    dispatch(fetchCollections(fetchType, collectionsType)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CollectionsMainDetailItem)
);
