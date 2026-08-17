import React, { useEffect, useState } from "react";

import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { connect } from "react-redux";
import navigationCollectionItems from "../../../utilities/navigationCollectionItems";
import { slugSanitize, replaceSlugInPath } from "../../../utilities/browser";
import { useParams, useLocation, Link } from "react-router-dom";

function CollectionItemsArrowNavigation({
  collection,
}) {
  const { type: collectionName } = useParams();
  const location = useLocation();
  const [navItems, setNavItems] = useState({
    currentIndex: {},
    prevIndex: {},
    nextItem: {},
  });
  const [hoveredSide, setHoveredSide] = useState(null);
  const noImage =
    "https://api-staging.museumsmolyan.eu/wp-content/uploads/2024/10/no-image.png";

  // Update navigation items when collection data arrives from Redux
  useEffect(() => {
    if (collection && collection.length > 0) {
      const { currentIndex, prevIndex, nextItem } = navigationCollectionItems(
        collection,
        slugSanitize(location.pathname)
      );
      setNavItems({ currentIndex, prevIndex, nextItem });
    }
  }, [collection, location.pathname]);

  const hoveredItem = hoveredSide ? navItems[hoveredSide] : null;
  const showPreview = Boolean(hoveredItem && Object.keys(hoveredItem).length);

  const generateHref = (item) =>
    replaceSlugInPath(location.pathname, item.slug);

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
            setHoveredSide(null);
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
        <Link
          to={generateHref(navItems.prevIndex)}
          className={`left-arrow ${hoveredSide === "prevIndex" ? "show" : ""}`}
          onMouseEnter={() => {
            setHoveredSide("prevIndex");
          }}
        >
          <ArrowLeft
            width="21px"
            color={`${hoveredSide === "prevIndex" ? "#fff" : "#272323"}`}
          />
        </Link>
        <Link
          to={generateHref(navItems.nextItem)}
          className={`right-arrow ${hoveredSide === "nextItem" ? "show" : ""}`}
          onMouseEnter={() => {
            setHoveredSide("nextItem");
          }}
        >
          <ArrowRight
            width="21px"
            color={`${hoveredSide === "nextItem" ? "#fff" : "#272323"}`}
          />
        </Link>

        <ItemPreview
          side={hoveredSide}
          item={hoveredItem}
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
