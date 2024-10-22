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
    const generatedNewUrl = path.replace(/:type|:item/gi, function (matched) {
      return replacedMatches[matched];
    });
    return generatedNewUrl;
  };

  function ItemPreview({ className, item, side, type = "desktop" }) {
    const noImage =
      "https://api-staging.museumsmolyan.eu/wp-content/uploads/2024/10/no-image.png";
    const imageUrl =
      typeof item?._embedded["wp:featuredmedia"] !== "undefined"
        ? item?._embedded["wp:featuredmedia"][0]?.source_url
        : noImage;

    const title = item?.title?.rendered;
    const itemsFromCollectionLength = itemsFromCollection.length;
    const itemFromCollectionIndex = itemsFromCollection
      .map((item) => item?.title?.rendered)
      .indexOf(title);

    // if (showPreview) {
    return (
      <a
        className="collection-items-arrow-navigation_link-block"
        href={generateHref(item)}
      >
        <div
          className={`item-preview item-preview__show show ${side}`}
        >
          <div className="item-preview_inner">
            <div
              href={generateHref(item)}
              className={`left-arrow show `}
            >
              <ArrowLeft
                width="21px"
                color={`${
                  showItem.side === "prevIndex" || type === "mobile"
                    ? "#fff"
                    : "#272323"
                }`}
              />
            </div>
            <div className="item-preview_inner_content">
              <div className="item-preview__image">
                <img
                  className="img-fluid"
                  src={imageUrl}
                  alt={item.title.rendered}
                />
              </div>
              <h5 className="h5">{title}</h5>
              <p className="item-preview__counter">
                {itemFromCollectionIndex + 1}/{itemsFromCollectionLength}
              </p>
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (
    navItems.prevIndex &&
    navItems.nextItem &&
    Object.keys(navItems.prevIndex).length !== 0 &&
    Object.keys(navItems.nextItem).length !== 0
  ) {
    return (
      <div className="collection-items-arrow-navigation_bottom">
        <ItemPreview
          side={"prevIndex"}
          item={navItems.prevIndex}
          className={"show"}
          type="mobile"
          // className={showPreview ? "show" : ""}
        />
        <ItemPreview
          side={"nextItem"}
          item={navItems.nextItem}
          className={"show"}
          type="mobile"
          // className={showPreview ? "show" : ""}
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
