import navigationCollectionItems from "../../../utilities/navigationCollectionItems";
import { slugSanatize } from "../../../utilities/browser";
import ArrowRight from "../../../assets/icons/ArrowRight";
import ArrowLeft from "../../../assets/icons/ArrowLeft";

import React, { useEffect, useState } from "react";
import { fetchCollections } from "../../../actions";

import { connect } from "react-redux";
import { isEqual } from "lodash";

function CollectionItemsArrowNavigation({
  match,
  fetchCollections,
  collection,
}) {
  const collectionName = match.params.type;
  const [itemsFromCollectoin, setItemsFromCollectoin] = useState([]);
  const [navItems, setNavItems] = useState({
    currentIndex: {},
    prevIndex: {},
    nextItem: {},
  });
  const [showItem, setShowItem] = useState({});

  useEffect(() => {
    const itemsFromStorage = JSON.parse(sessionStorage.getItem(collectionName));
    if (itemsFromStorage && !isEqual(itemsFromStorage, itemsFromCollectoin)) {
      setItemsFromCollectoin(itemsFromStorage);
    } else {
      const categoriesFromStorage = JSON.parse(
        sessionStorage.getItem("categories")
      );

      const parentCollectionId = categoriesFromStorage.find(
        (item) => item.slug === collectionName
      ).id;

      fetchCollections(parentCollectionId);
    }
  }, [collectionName, fetchCollections, itemsFromCollectoin]);

  useEffect(() => {
    if (collection.length && !isEqual(itemsFromCollectoin, collection)) {
      setItemsFromCollectoin(collection);
    }
  }, [collection, itemsFromCollectoin]);

  useEffect(() => {
    const { currentIndex, prevIndex, nextItem } = navigationCollectionItems(
      collection,
      slugSanatize(window.location.pathname)
    );

    setNavItems({ currentIndex, prevIndex, nextItem });
  }, [collection]);

  function ItemPreview({ side = "left" }) {
    const show = Object.keys(showItem).length;
    console.log(showItem);
    return (
      <div
        className={`item-preview item-preview__${side} ${!show && "d-none"}`}
      >
        {showItem?.title?.rendered}
      </div>
    );
  }

  return (
    <div className="collection-items-arrow-navigation">
      <div
        className="left-arrow"
        onMouseEnter={() => {
          setShowItem(navItems.prevIndex);
        }}
        onMouseLeave={() => {
          setShowItem({});
        }}
      >
        <ArrowLeft width="21px" color="#272323" />
      </div>
      <div
        className="right-arrow"
        onMouseEnter={() => {
          setShowItem(navItems.nextItem);
        }}
        onMouseLeave={() => {
          setShowItem({});
        }}
      >
        <ArrowRight width="21px" color="#272323" />
      </div>
      <ItemPreview item={showItem} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    collection: state.collections.byType,
    collectionsError: state.collections.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollections: (parent) => dispatch(fetchCollections(parent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionItemsArrowNavigation);
