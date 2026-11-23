import React from "react";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ArticleDate from "../Article/ArticleDate";
import { Link } from "react-router-dom";
import { featuredImageProps } from "../../utilities/featuredImageProps";

function NewsAndEventsCards({ listOfNewsAndEvents }) {
  if (listOfNewsAndEvents) {
    return listOfNewsAndEvents.map((article, index) => {
      return (
        <Col md={4} key={article.id} className="nae-item__vertical__wrap">
          <div className="nae-item nae-item__vertical">
            <Link to={`/news-and-events/${article.slug}`}>
              <div className="nae-item__img__wrap">
                {article.event_date ? (
                  <ArticleDate date={article.event_date} />
                ) : null}
                <div className="nae-item__img">
                  {article._embedded?.["wp:featuredmedia"]?.[0] && (
                    <img
                      className="img-fluid img"
                      {...featuredImageProps(article._embedded["wp:featuredmedia"][0], "(min-width: 1200px) 356px, (min-width: 992px) 296px, (min-width: 768px) 216px, (min-width: 576px) 476px, calc(100vw - 24px)")}
                      loading="lazy"
                      decoding="async"
                      alt=""
                      itemProp="image"
                    />
                  )}
                </div>
              </div>
              <h5
                className="h5"
                dangerouslySetInnerHTML={{
                  __html: article.title?.rendered || "",
                }}
              />
            </Link>
          </div>
        </Col>
      );
    });
  } else {
    return (
      <div className="spinner-wrap">
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading ...</span>
        </Spinner>
      </div>
    );
  }
}

export default NewsAndEventsCards;
