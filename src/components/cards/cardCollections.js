import React, { useEffect, useState } from "react";

import { injectIntl } from "react-intl";

function CardCollections(props) {
  const { intl, item, hostLocation } = props;
  const [itemObj, setItemObj] = useState({
    title: "",
    itemImg: "",
    itemImgAlt: "",
  });

  useEffect(() => {
    try {
      if (item.hasOwnProperty("description")) {
        setItemObj({
          title: item.name,
          itemImg: JSON.parse(item.description).image,
          itemImgAlt: item.slug,
        });
      } else {
        setItemObj({
          title: item.title.rendered,
          itemImg: item["_embedded"]["wp:featuredmedia"]
            ? item["_embedded"]["wp:featuredmedia"][0]["source_url"]
            : "",
          itemImgAlt: item["_embedded"]["wp:featuredmedia"]
            ? item["_embedded"]["wp:featuredmedia"][0]["title"]
            : "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  function generateHref() {
    if (props.isInnerGallery) {
      return `/${hostLocation}/detail/${props.collectionsType}/${item.slug}`;
    } else {
      return `/${props.collectionsType}-collections/intro/${item.slug}`;
    }
  }

  return (
    <div className="card card-collections__wrap">
      <div className="card-collections__img">
        <figure>
          <a href={generateHref()} className="card-collections__link">
            <img
              className="card-collections__image img-fluid"
              src={itemObj.itemImg}
              alt={itemObj.itemImgAlt}
            />
            <figcaption className="card-collections__text">
              <h4
                className={props.smallCards ? "h5" : "h4"}
                dangerouslySetInnerHTML={{
                  __html: itemObj.title,
                }}
              />
              {item.galleryLength ? (
                <>
                  (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${item.galleryLength}`,
                    }}
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: intl.formatMessage({ id: "pics" }),
                    }}
                  />
                  )
                </>
              ) : null}
            </figcaption>
          </a>
        </figure>
      </div>
    </div>
  );
}

export default injectIntl(CardCollections);
