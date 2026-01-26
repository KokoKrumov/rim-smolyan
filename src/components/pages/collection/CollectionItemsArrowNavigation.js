import React, { useEffect, useState } from "react";

import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { connect } from "react-redux";
import navigationCollectionItems from "../../../utilities/navigationCollectionItems";
import { slugSanitize } from "../../../utilities/browser";

function CollectionItemsArrowNavigation({
  match,
  collection,
}) {
  const collectionName = match.params.type;
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

  // Update navigation items when collection data arrives from Redux
  useEffect(() => {
    if (collection && collection.length > 0) {
      const { currentIndex, prevIndex, nextItem } = navigationCollectionItems(
        collection,
        slugSanitize(window.location.pathname)
      );
      setNavItems({ currentIndex, prevIndex, nextItem });
    }
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
    const collectionLength = collection?.length || 0;
    const itemIndex = collection
      ? collection.map((item) => item?.title?.rendered).indexOf(title)
      : -1;

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
              {itemIndex + 1}/{collectionLength}
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
  };
};

export default connect(mapStateToProps)(CollectionItemsArrowNavigation);
