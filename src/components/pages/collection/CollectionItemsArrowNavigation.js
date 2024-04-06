import React, { useEffect, useState } from "react";

import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { ObjectFlags } from "typescript";
import { connect } from "react-redux";
import { fetchCollections } from "../../../actions";
import { isEqual } from "lodash";
import navigationCollectionItems from "../../../utilities/navigationCollectionItems";
import { slugSanitize } from "../../../utilities/browser";

function CollectionItemsArrowNavigation({
  match,
  fetchCollections,
  collection,
}) {
  const collectionName = match.params.type;
  const [itemsFromCollection, setItemsFromCollection] = useState([]);
  const [navItems, setNavItems] = useState({
    currentIndex: {},
    prevIndex: {},
    nextItem: {},
  });
  const [showItem, setShowItem] = useState({});
  const [linkToTheItem, setLinkToTheItem] = useState("");
  const showPreview = Boolean(Object.keys(showItem).length);

  useEffect(() => {
    const itemsFromStorage = JSON.parse(sessionStorage.getItem(collectionName));
    if (
      itemsFromStorage.length !== 0 &&
      !isEqual(itemsFromStorage, itemsFromCollection)
    ) {
      setItemsFromCollection(itemsFromStorage);
    } else {
      const categoriesFromStorage = JSON.parse(
        sessionStorage.getItem("categories")
      );

      const parentCollectionId = categoriesFromStorage.find(
        (item) => item.slug === collectionName
      ).id;
      fetchCollections(parentCollectionId);
    }
  }, [collectionName, fetchCollections, itemsFromCollection]);

  useEffect(() => {
    if (collection.length && !isEqual(itemsFromCollection, collection)) {
      setItemsFromCollection(collection);
    }
  }, [collection, itemsFromCollection]);

  useEffect(() => {
    console.log("%c 111", "color: blue");
    const { currentIndex, prevIndex, nextItem } = navigationCollectionItems(
      collection,
      slugSanitize(window.location.pathname)
    );

    setNavItems({ currentIndex, prevIndex, nextItem });
  }, [collection]);

  const generateHref = (item) => {
    const replacedMatches = {
      ":type": collectionName,
      ":item": item.slug,
    };
    const path = match.path;
    const generateNewUrl = path.replace(/:type|:item/gi, function (matched) {
      return replacedMatches[matched];
    });
    return setLinkToTheItem(generateNewUrl);
  };

  function ItemPreview({ className, item, side }) {
    const imageUrl = item?._embedded["wp:featuredmedia"][0]?.source_url;
    const title = item?.title?.rendered;
    const itemsFromCollectionLength = itemsFromCollection.length;
    const itemFromCollectionIndex = itemsFromCollection
      .map((item) => item?.title?.rendered)
      .indexOf(title);

    if (showPreview) {
      return (
        <div
          onMouseLeave={() => {
            setShowItem({});
          }}
          className={`item-preview item-preview__${showItem.side} ${className}`}
        >
          <div className="item-preview__image">
            <img
              className="img-fluid"
              src={imageUrl}
              alt={item.title.rendered}
            />
          </div>
          <h5 className="h5">{title}</h5>
          <h5 className="h5">
            {itemFromCollectionIndex + 1}/{itemsFromCollectionLength}
          </h5>
        </div>
      );
    } else {
      return null;
    }
  }

  if (
    navItems.prevIndex &&
    navItems.nextItem &&
    Object.keys(navItems.prevIndex).length !== 0 &&
    Object.keys(navItems.nextItem).length !== 0
  ) {
    return (
      <div className="collection-items-arrow-navigation">
        <a
          href={linkToTheItem}
          className={`left-arrow ${
            showItem.side === "prevIndex" ? "show" : ""
          }`}
          onMouseEnter={() => {
            setShowItem({ item: navItems.prevIndex, side: "prevIndex" });
            generateHref(navItems.prevIndex);
          }}
        >
          <ArrowLeft
            width="21px"
            color={`${showItem.side === "prevIndex" ? "#fff" : "#272323"}`}
          />
        </a>
        <a
          href={linkToTheItem}
          className={`right-arrow ${
            showItem.side === "nextItem" ? "show" : ""
          }`}
          onMouseEnter={() => {
            setShowItem({ item: navItems.nextItem, side: "nextItem" });
            generateHref(navItems.nextItem);
          }}
        >
          <ArrowRight
            width="21px"
            color={`${showItem.side === "nextItem" ? "#fff" : "#272323"}`}
          />
        </a>

        <ItemPreview
          item={showItem.item}
          className={showPreview ? "show" : ""}
        />
      </div>
    );
  } else {
    return null;
  }
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
