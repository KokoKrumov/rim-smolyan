import React from "react";
import Col from "react-bootstrap/cjs/Col";
import ArticleDate from "../Article/ArticleDate";

function NewsAndEventsList({ listOfNewsAndEvents }) {
  if (listOfNewsAndEvents) {
    return listOfNewsAndEvents.map((article, index) => {
      return (
        <Col md={4} key={article.id} className="nae-item__vertical__wrap">
          <div className="nae-item nae-item__vertical">
            <a href={`/news-and-events/${article.slug}`}>
              <div className="nae-item__img__wrap">
                {article.event_date ? (
                  <ArticleDate date={article.event_date} />
                ) : null}
                <div className="nae-item__img">
                  {article._embedded?.["wp:featuredmedia"] && (
                    <img
                      className="img-fluid img"
                      src={article._embedded["wp:featuredmedia"][0]?.source_url}
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
            </a>
          </div>
        </Col>
      );
    });
  } else {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  }
}

export default NewsAndEventsList;
