import React from "react";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import { FormattedMessage } from "react-intl";
import ArticleDate from "../Article/ArticleDate";

function NewsAndEventsListHorizontal({ listOfNewsAndEvents, exhibitions }) {
  if (listOfNewsAndEvents) {
    return listOfNewsAndEvents.map((event, index) => {
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
                href={`/news/${event.slug}`}
                itemProp="url"
                target=""
                rel="noopener nofollow noreferrer"
              >
                <div className="nae-item__img__wrap">
                  {event.event_date ? (
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
                {event.daevent_dateteM ? (
                  <div className="nae-item__article-date__wrap">
                    {/* <p className='nae-item__article-date'>{event.dateD} {event.dateM}</p> */}
                    <p className="nae-item__article-date">{event.event_date}</p>
                  </div>
                ) : null}
                {/*!DATE*/}

                {/*TITLE*/}
                <h3 className="h3">
                  <a
                    className="link a-title"
                    href={`/news/${event.slug}`}
                    itemProp="url"
                    target=""
                    rel="noopener nofollow noreferrer"
                    dangerouslySetInnerHTML={{ __html: event.title.rendered }}
                  />
                </h3>
                {/*!TITLE*/}

                <p className="paragraph-3">{event.description}</p>
                {/*LINK TO SEE MORE*/}
                <a
                  className="a cta_outline cta_outline__dark hvr-underline-from-left"
                  href={`/news/${event.slug}`}
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
      <div>
        <p>Loading ...</p>
      </div>
    );
  }
}

export default NewsAndEventsListHorizontal;
