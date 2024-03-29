import React from "react";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import { FormattedMessage } from "react-intl";

function NewsAndEventsListHorizontal({ listOfNewsAndEvents }) {
  if (listOfNewsAndEvents) {
    return listOfNewsAndEvents.map((event, index) => {
      return (
        <div className="nae-item nae-item__horizontal" key={event.id}>
          <Row>
            <Col lg={5}>
              <a
                className="link link-img"
                href={`/news/${index}`}
                itemProp="url"
                target=""
                rel="noopener nofollow noreferrer"
              >
                <div className="nae-item__img__wrap">
                  {event.dateD && event.type === "event" ? (
                    <div className="nae-item__date__wrap">
                      <p className="nae-item__date-day">{event.dateD}</p>
                      <p className="nae-item__date-month">{event.dateM}</p>
                    </div>
                  ) : null}
                  <div className="nae-item__img">
                    <img
                      className="img-fluid"
                      src={event.image}
                      alt=""
                      itemProp="image"
                    />
                  </div>
                </div>
              </a>
            </Col>

            <Col lg={7}>
              <div>
                <a
                  className="a-title"
                  href={`/news/${index}`}
                  itemProp="url"
                  target=""
                  rel="noopener nofollow noreferrer"
                >
                  <h3 className="h3">{event.title}</h3>
                </a>
                <p className="paragraph-3">{event.description}</p>
                <a
                  className="a cta_outline cta_outline__dark hvr-underline-from-left"
                  href={`/news/${index}`}
                  itemProp="url"
                  target=""
                  rel="noopener nofollow noreferrer"
                >
                  <FormattedMessage id="see-more" />
                </a>
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
