import React from "react";
import { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { fetchItemFromCollection } from "../../../actions";

function CollectionsMainDetailItem(props) {
  const itemName = props.match.params.item;
  useEffect(() => {
    props.fetchItemFromCollection(itemName);
  }, []);

  useEffect(() => {
    console.log("itemFomCollection", props.itemFomCollection);
  }, [props.itemFomCollection]);

  return (
    <div>
      <p>"CollectionsMainDetailItem"</p>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    itemFomCollection: state.itemFomCollection,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItemFromCollection: (item) => dispatch(fetchItemFromCollection(item)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CollectionsMainDetailItem)
);
