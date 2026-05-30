import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { withIntl } from "../../utilities/withIntl";
import { connect } from "react-redux";
import { showModal } from "../../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class InfoColumn extends Component {
  handleShowModal(data, url, e) {
    e.preventDefault();
    this.props.showModal(data, url);
  }

  render() {
    const {
      intl,
      title,
      rawTitle,
      text,
      rawText,
      backgroundImage,
      showMoreLink,
      showRulesForActivity,
      columns,
      isSmall,
    } = this.props;

    const resolvedTitle = title ? intl.formatMessage({ id: title, defaultMessage: title }) : rawTitle ?? null;
    const resolvedText = text ? intl.formatMessage({ id: text, defaultMessage: text }) : rawText ?? null;
    return (
      <div
        className="nae-container info-column nae-container_content-dark hero-bg"
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
              }
            : null
        }
      >
        <Container>
          <div>
            {resolvedTitle && (
              <div className="nae__title-line">
                {isSmall ? (
                  <h2
                    className="h2"
                    dangerouslySetInnerHTML={{
                      __html: resolvedTitle,
                    }}
                  ></h2>
                ) : (
                  <h1
                    className="h1"
                    dangerouslySetInnerHTML={{
                      __html: resolvedTitle,
                    }}
                  ></h1>
                )}
              </div>
            )}
            <div>
              {resolvedText && (
              <div
                className={`paragraph-2 col-count-${columns}`}
                dangerouslySetInnerHTML={{
                  __html: resolvedText,
                }}
              ></div>
              )}
              <Row className="home-page__info-column">
                <Col>
                  {showRulesForActivity ? (
                    <p style={{ marginTop: "2rem" }}>
                      <a
                        className="link cta_outline cta_outline__dark link-underline m-0 d-inline-block"
                        href="https://static.museumsmolyan.eu/docs/ustrojstvo_dejnost_rim_smolyan.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        dangerouslySetInnerHTML={{
                          __html: intl.formatMessage({ id: "rules-for-activity" }),
                        }}
                      ></a>
                    </p>
                  ) : null}
                </Col>
                <Col>
                  {showMoreLink ? (
                    <p>
                      <a
                        className="link cta_outline cta_outline__dark hvr-underline-from-left"
                        href={`${showMoreLink}`}
                        itemProp="url"
                        target=""
                        onClick={
                          showMoreLink
                            ? null
                            : (e) => {
                                this.handleShowModal("modal-redirect", "", e);
                              }
                        }
                        rel="noopener nofollow noreferrer"
                        dangerouslySetInnerHTML={{
                          __html: intl.formatMessage({ id: "see-more" }),
                        }}
                      ></a>
                    </p>
                  ) : null}
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withIntl(
  connect(null, {
    showModal,
  })(InfoColumn)
);
