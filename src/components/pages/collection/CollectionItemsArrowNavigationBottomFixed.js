import React, { useEffect, useState } from "react";

import ArrowLeft from "../../../assets/icons/ArrowLeft";
import { connect } from "react-redux";
import navigationCollectionItems from "../../../utilities/navigationCollectionItems";
import { slugSanitize } from "../../../utilities/browser";

function CollectionItemsArrowNavigationBottomFixed({
  match,
  collection,
}) {
  const collectionName = match.params.type;
  const [navItems, setNavItems] = useState({
    currentIndex: {},
    prevIndex: {},
    nextItem: {},
  });

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
    const collectionLength = collection?.length || 0;
    const itemIndex = collection
      ? collection.map((item) => item?.title?.rendered).indexOf(title)
      : -1;

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
                color="#fff"
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
                {itemIndex + 1}/{collectionLength}
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
  };
};

export default connect(mapStateToProps)(CollectionItemsArrowNavigationBottomFixed);
