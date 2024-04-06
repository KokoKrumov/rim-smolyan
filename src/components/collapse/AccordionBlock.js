import { FormattedMessage, injectIntl } from "react-intl";
import React, { Component } from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/cjs/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { showModal } from "../../actions";

class AccordionBlock extends Component {
  state = {
    content: this.props.content,
    openAccordionItem: null,
    openAccordionItemPured: this.props.openAccordionItemPured,
  };

  docDownload = (url) => {
    window.open(url);
  };

  sortReturnLastNumber = (a, b) => {
    if (a > b) {
      return 1;
    } else {
      return -1;
    }
  };

  renderContentFriends = (block) => {
    return (
      <div className="row">
        <div className="col">
          <ul>
            {
              // console.log(block)
              block.content.map((friend, index) => {
                return (
                  <li key={index}>
                    <a
                      className="links"
                      href={friend.url}
                      itemProp="url"
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                    >
                      {friend.title}
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  };

  renderContentLinks = (block) => {
    return (
      <div className="row">
        <div className="col">
          <div className="list__default col-count-3">
            <ul>
              {block.content.map((link, index) => {
                return (
                  <li key={index}>
                    <a
                      className="links"
                      href={link.url}
                      itemProp="url"
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                    >
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  renderContentStatute = (block) => {
    return (
      <div className="row">
        <div className="col">
          <div className="list__default col-count-2">
            <p
              className="text-block__wrap paragraph-3 d-inline"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderContentDonors = (block) => {
    return (
      <div className="row">
        <div className="col">
          <div className="list__default col-count-3">
            {block.content
              .map((year, index) => {
                return (
                  <React.Fragment key={index}>
                    <p className="list__default__title">{year.year}</p>
                    <ul>
                      {year.donors
                        .map((donor, index) => {
                          return (
                            <li key={index}>
                              {donor.number}. {donor.name}
                            </li>
                          );
                        })
                        .sort(this.sortReturnLastNumber)}
                    </ul>
                  </React.Fragment>
                );
              })
              .sort(this.sortReturnLastNumber)}
          </div>
        </div>
      </div>
    );
  };

  renderContentMedia = (block) => {
    return (
      <div className="row">
        <div className="col">
          <ul>
            {block.content.map((media, index) => {
              return (
                <li key={index}>
                  <a
                    className="links"
                    href={media.url}
                    target="_blank"
                    itemProp="url"
                    rel="noopener nofollow noreferrer"
                  >
                    <img
                      className="img-fluid"
                      src={media.logo}
                      alt={media.name}
                      itemProp="image"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  renderProjects = (block) => {
    return (
      <Row>
        <Col lg={7}>
          {block.content.map((project, index) => {
            return (
              <p className="text-block__wrap" key={index}>
                <a
                  className="links"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  href={`/administrative/${block.id}/${project.id}`}
                  dangerouslySetInnerHTML={{ __html: project.content }}
                ></a>
              </p>
            );
          })}
        </Col>
      </Row>
    );
  };

  renderPartnersProjects = (block) => {
    return (
      <Row>
        <Col lg={7}>
          {block.content.map((project, index) => {
            return (
              <div key={project.id}>
                <p
                  className="text-block__wrap"
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: project.content,
                  }}
                />
                <a
                  className="mt-4 link cta_outline cta_outline__dark hvr-underline-from-left"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  href={`/administrative/${block.id}/${project.id}`}
                >
                  <FormattedMessage id="see-more" />
                </a>
              </div>
            );
          })}
        </Col>
      </Row>
    );
  };

  renderReports = (block) => {
    return (
      <div className="row">
        <div className="col">
          <div className="paragraph-2 col-count-15">
            <ul>
              {block.content
                .map((document, index) => {
                  return (
                    <li key={index}>
                      <a
                        className="links"
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {document.year}
                      </a>
                    </li>
                  );
                })
                .sort(this.sortReturnLastNumber)}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  renderDocs = (block) => {
    return <div dangerouslySetInnerHTML={{ __html: block.content }}></div>;
  };

  renderContent = (block) => {
    switch (block.hash) {
      case "friends":
        return this.renderContentFriends(block);
      case "links":
        return this.renderContentLinks(block);
      case "statute":
        return this.renderContentStatute(block);
      case "donors":
        return this.renderContentDonors(block);
      case "media":
        return this.renderContentMedia(block);
      case "projects":
        return this.renderProjects(block);
      case "partnersProjects":
        return this.renderPartnersProjects(block);
      case "reports":
        return this.renderReports(block);
      case "docs":
        return this.renderDocs(block);
    }
  };

  render() {
    const { intl } = this.props;

    return (
      <Accordion activeKey={this.props.openAccordionItemPured}>
        {this.state.content.map((block) => {
          return (
            <React.Fragment key={block.title}>
              <Card
                id={block.id}
                className={`accordion__wrap ${
                  this.props.openAccordionItemPured === block.id
                    ? `accordion__wrap__active`
                    : ``
                }`}
              >
                {block.type === "collapsable" ? (
                  <React.Fragment>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={block.id}
                      onClick={() => {
                        this.props.handleInitialHash(block);
                      }}
                    >
                      <Container>
                        <Row className="justify-content-between align-items-center">
                          <Col xs={10} lg={8}>
                            <h3
                              className="h3"
                              dangerouslySetInnerHTML={{ __html: block.title }}
                            ></h3>
                          </Col>
                          <Col xs={2} lg={1}>
                            <div className="accordion__arrow">
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 5 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.8"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.639618 8.72206L-3.53289e-07 8.08244L3.72138 4.36106L-2.79584e-08 0.639679L0.639618 6.08446e-05L5 4.36044L0.639618 8.72206Z"
                                />
                              </svg>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={block.id}>
                      <Card.Body>
                        <Container>{this.renderContent(block)}</Container>
                      </Card.Body>
                    </Accordion.Collapse>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={block.id}
                      onClick={() => {
                        this.docDownload(block.url);
                      }}
                    >
                      <Container>
                        <Row className="justify-content-between">
                          <Col xs={10} lg={8}>
                            <h3
                              className="h3"
                              dangerouslySetInnerHTML={{ __html: block.title }}
                            ></h3>
                          </Col>
                          <Col xs={2} lg={1}>
                            <div className="accordion__arrow__download">
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.7"
                                  d="M16.0072 10.8789L10 16.8861L3.99277 10.8789L5.09766 9.77402L9.21875 13.8951V0H10.7812V13.8951L14.9023 9.77402L16.0072 10.8789ZM20 18.4375H0V20H20V18.4375Z"
                                />
                              </svg>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Accordion.Toggle>
                  </React.Fragment>
                )}
              </Card>
            </React.Fragment>
          );
        })}
      </Accordion>
    );
  }
}

export default injectIntl(
  connect(null, {
    showModal,
  })(AccordionBlock)
);
