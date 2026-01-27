import CardCollections from "../../cards/cardCollections";
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { injectIntl } from "react-intl";

function CollectionsList(props) {
  return (
    <div className={`card-columns card-columns-${props.cols}`}>
      {Array.isArray(props.collections) ? (
        props.collections.map((item) => {
          return (
            <CardCollections
              key={item.id}
              item={item}
              collectionsType={props.collectionsType}
              smallCards={props.smallCards}
            />
          );
        })
      ) : (
        <div className="spinner-wrap">
          <Spinner className="spinner" animation="border" role="status" />
        </div>
      )}
    </div>
  );
}

export default injectIntl(CollectionsList);
