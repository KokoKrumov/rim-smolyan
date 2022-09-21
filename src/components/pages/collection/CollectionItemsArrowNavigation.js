import React from "react";
import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";

function CollectionItemsArrowNavigation(props) {
  return (
    <div className="collection-items-arrow-navigation">
      <div className="left-arrow">
        <ArrowLeft width="21px" color="#272323" />
      </div>
      <div className="right-arrow">
        <ArrowRight width="21px" color="#272323" />
      </div>
    </div>
  );
}

export default CollectionItemsArrowNavigation;
