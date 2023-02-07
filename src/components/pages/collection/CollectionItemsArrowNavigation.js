import navigationCollectionItems from "../../../utilities/navigationCollectionItems";
import { slugSanitize } from "../../../utilities/browser";
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
    if (itemsFromStorage && !isEqual(itemsFromStorage, itemsFromCollection)) {
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
    const generateNewUrl = path.replace(/:type|:item/gi, function (matched) {
      return replacedMatches[matched];
    });
    return setLinkToTheItem(generateNewUrl);
  };

  function ItemPreview({ className, item, side }) {
    console.log("item: ", item);
    const imageUrl = item?._embedded["wp:featuredmedia"][0]?.source_url;
    const title = item?.title?.rendered;
    const itemsFromCollectionLength = itemsFromCollection.length;
    const itemFromCollectionIndex = itemsFromCollection
      .map((item) => item?.title?.rendered)
      .indexOf(title);

    // if (showPreview) {
    return (
      <div
        onMouseLeave={() => {
          setShowItem({});
        }}
        className={`item-preview item-preview__${side}  ${className}`}
      >
        <div className="item-preview__image">
          <img className="img-fluid" src={imageUrl} alt={item.title.rendered} />
        </div>
        <h5 className="h5">{title}</h5>
        <h5 className="h5">
          {itemFromCollectionIndex + 1}/{itemsFromCollectionLength}
        </h5>
      </div>
    );
    // } else {
    //   return null;
    // }
  }
  if (
    Object.keys(navItems.prevIndex).length !== 0 ||
    Object.keys(navItems.nextIndex).length !== 0
  ) {
    return (
      <div className="collection-items-arrow-navigation">
        <a
          href={linkToTheItem}
          className="left-arrow"
          onMouseEnter={() => {
            setShowItem({});
            generateHref(navItems.prevIndex);
          }}
        >
          <ArrowLeft
            width="21px"
            color={`${showPreview ? "#fff" : "#272323"}`}
          />
        </a>
        <a
          href={linkToTheItem}
          className="right-arrow"
          onMouseEnter={() => {
            setShowItem({ item: navItems.nextItem, side: "nextIndex" });
            generateHref(navItems.nextItem);
          }}
        >
          <ArrowRight
            width="21px"
            color={`${showPreview ? "#fff" : "#272323"}`}
          />
        </a>

        <ItemPreview
          item={navItems.prevIndex}
          side="prevIndex"
          className={showPreview ? "show" : ""}
        />

        <ItemPreview
          item={navItems.nextIndex}
          side="nextIndex"
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
