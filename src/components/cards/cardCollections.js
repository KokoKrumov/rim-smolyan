import React, { useEffect, useState } from "react";

import { useIntl } from "../../utilities/withIntl";
import { Link } from "react-router-dom";

const noImage =
  "https://api-staging.museumsmolyan.eu/wp-content/uploads/2024/10/no-image.png";

function CardCollections(props) {
  const intl = useIntl();
  const { item, hostLocation } = props;
  const [itemObj, setItemObj] = useState({
    title: "",
    itemImg: noImage,
    itemImgAlt: "",
    imageHero: "",
  });

  useEffect(() => {
    try {
      if (item.hasOwnProperty("description")) {
        const parsed =
          item.description.length !== 0
            ? JSON.parse(item.description)
            : {};
        setItemObj({
          title: item.name,
          itemImg: parsed.image || noImage,
          itemImgAlt: item.slug,
          imageHero: parsed.image_hero || "",
        });
      } else {
        setItemObj({
          title: item.title.rendered,
          itemImg: item["_embedded"]["wp:featuredmedia"]
            ? item["_embedded"]["wp:featuredmedia"][0]["source_url"]
            : noImage,
          itemImgAlt: item["_embedded"]["wp:featuredmedia"]
            ? item["_embedded"]["wp:featuredmedia"][0]["title"]
            : "",
          imageHero: "",
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
          <Link
            to={generateHref()}
            state={!props.isInnerGallery && itemObj.imageHero ? { imageHero: itemObj.imageHero } : undefined}
            className="card-collections__link"
          >
            <img
              className="card-collections__image img-fluid"
              src={itemObj.itemImg}
              alt={itemObj.itemImgAlt}
              loading="lazy"
              decoding="async"
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
          </Link>
        </figure>
      </div>
    </div>
  );
}

export default CardCollections;
