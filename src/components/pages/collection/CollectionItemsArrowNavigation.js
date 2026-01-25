import React, { useEffect, useState } from "react";

import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import navigationCollectionItems from "../../../utilities/navigationCollectionItems";
import { slugSanitize } from "../../../utilities/browser";

function CollectionItemsArrowNavigation({
  match,
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
  const noImage =
    "https://api-staging.museumsmolyan.eu/wp-content/uploads/2024/10/no-image.png";

  // Load collection data from sessionStorage or Redux (fetched by parent)
  useEffect(() => {
    // First try sessionStorage
    const cachedData = sessionStorage.getItem(collectionName);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (parsed.length && !isEqual(parsed, itemsFromCollection)) {
          setItemsFromCollection(parsed);
        }
      } catch (e) {
        // Invalid cache, fall through to Redux
      }
    }
    
    // Then check Redux store (data fetched by parent component)
    if (collection && collection.length && !isEqual(itemsFromCollection, collection)) {
      setItemsFromCollection(collection);
    }
  }, [collectionName, collection, itemsFromCollection]);

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
    const generateNewUrl = path.replace(/:type|:item/gi, function (matched) {
      return replacedMatches[matched];
    });
    return setLinkToTheItem(generateNewUrl);
  };

  function ItemPreview({ className, item, side }) {
    const imageUrl =
      typeof item?._embedded["wp:featuredmedia"] !== "undefined"
        ? item?._embedded["wp:featuredmedia"][0]?.source_url
        : noImage;
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
          className={`item-preview item-preview_top item-preview__${side} ${className}`}
        >
          <div className="item-preview_inner">
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
          side={showItem.side}
          item={showItem.item}
          className={"show"}
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

export default connect(mapStateToProps)(CollectionItemsArrowNavigation);
