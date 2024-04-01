import React from "react";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import Spinner from "react-bootstrap/cjs/Spinner";
import { FormattedMessage } from "react-intl";
import ArticleDate from "../Article/ArticleDate";
import ExhibitionDate from "../Exhibition/ExhibitionDate";
import NewsDateAndYear from "../pages/newsDetailPage/NewsDateAndYear";

function NewsAndEventsListHorizontal({ listOfNewsAndEvents, isExhibition }) {
  // console.log("listOfNewsAndEvents: ", listOfNewsAndEvents);
  if (listOfNewsAndEvents) {
    return listOfNewsAndEvents.map((event) => {
      return (
        <div
          className="nae-item nae-item__horizontal container"
          key={event.slug}
        >
          <Row>
            <Col lg={5}>
              {/*IMAGE AND DATE*/}
              <a
                className="link link-img"
                href={`/${isExhibition ? "exhibitions" : "news-and-events"}/${
                  event.slug
                }`}
                itemProp="url"
                target=""
                rel="noopener nofollow noreferrer"
              >
                <div className="nae-item__img__wrap">
                  {event.event_date && !isExhibition ? (
                    <ArticleDate date={event.event_date} />
                  ) : null}
                  <div className="nae-item__img">
                    {event._embedded["wp:featuredmedia"] ? (
                      <img
                        className="img"
                        src={event._embedded["wp:featuredmedia"][0].source_url}
                        alt=""
                        itemProp="image"
                      />
                    ) : null}
                  </div>
                </div>
              </a>
              {/*!IMAGE AND DATE*/}
            </Col>

            <Col lg={7}>
              <div>
                {/*DATE*/}
                {!event.event_date && !isExhibition ? (
                  <div className="nae-item__article-date__wrap">
                    <div className="nae-item__article-date">
                      <NewsDateAndYear date={event.date_gmt} />
                    </div>
                  </div>
                ) : null}

                {isExhibition && event.event_date && event.event_place ? (
                  <div className="h-sup d-flex align-center mb-4">
                    <div className="mr-2">
                      <ExhibitionDate date={event.event_date} />
                    </div>{" "}
                    |<div className="ml-2">{event.event_place}</div>
                  </div>
                ) : null}
                {/*!DATE*/}

                {/*TITLE*/}
                <h3 className="h3">
                  <a
                    className="link a-title"
                    href={`/${
                      isExhibition ? "exhibitions" : "news-and-events"
                    }/${event.slug}`}
                    itemProp="url"
                    target=""
                    rel="noopener nofollow noreferrer"
                    dangerouslySetInnerHTML={{ __html: event.title.rendered }}
                  />
                </h3>
                {/*!TITLE*/}
                {event.excerpt.rendered && (
                  <div
                    className="paragraph-3"
                    dangerouslySetInnerHTML={{ __html: event.excerpt.rendered }}
                  />
                )}

                {/*LINK TO SEE MORE*/}
                <a
                  className="a cta_outline cta_outline__dark hvr-underline-from-left"
                  href={`/${isExhibition ? "exhibitions" : "news-and-events"}/${
                    event.slug
                  }`}
                  itemProp="url"
                  target=""
                  rel="noopener nofollow noreferrer"
                >
                  <FormattedMessage id="see-more" />
                </a>
                {/*!LINK TO SEE MORE*/}
              </div>
            </Col>
          </Row>
        </div>
      );
    });
  } else {
    return (
      <div className="spinner-wrap">
        <Spinner className="spinner" animation="border" role="status" />
      </div>
    );
  }
}

export default NewsAndEventsListHorizontal;
