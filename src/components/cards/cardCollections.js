import React from "react";

import { useIntl } from "../../utilities/withIntl";
import { Link } from "react-router-dom";
import { featuredImageProps } from "../../utilities/featuredImageProps";
import { collectionPreviewImageProps } from "../../utilities/collectionPreviewImageProps";

const noImage =
  "https://api-staging.museumsmolyan.eu/wp-content/uploads/2024/10/no-image.png";

function CardCollections(props) {
  const intl = useIntl();
  const { item, hostLocation } = props;
  let itemObj = {
    title: "",
    itemImg: noImage,
    itemImgAlt: "",
    imageHero: "",
    media: null,
  };

  try {
    if (item.hasOwnProperty("description")) {
      const parsed =
        item.description.length !== 0
          ? JSON.parse(item.description)
          : {};
      itemObj = {
        title: item.name,
        itemImg: parsed.image || noImage,
        itemImgAlt: item.slug,
        imageHero: parsed.image_hero || "",
        media: null,
      };
    } else {
      const media = item["_embedded"]["wp:featuredmedia"]?.[0];
      itemObj = {
        title: item.title.rendered,
        itemImg: media ? media.source_url : noImage,
        itemImgAlt: media ? media.title : "",
        imageHero: "",
        media,
      };
    }
  } catch (e) {
    console.error(e);
  }

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
              {...(itemObj.media
                ? featuredImageProps(itemObj.media, "(min-width: 1200px) 250px, (min-width: 992px) 330px, (min-width: 768px) 240px, (min-width: 576px) 480px, 100vw")
                : collectionPreviewImageProps(itemObj.itemImg))}
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
