import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { showModal } from "../../actions";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/cjs/Card";
import CardExhibitionArchive from "../cards/cardExhibitionArchive";

class AccordionBlock extends Component {
  state = {
    activeKay: 0,
    openAccordionItem: null,
  };

  setActiveKay = (activeKay) => {
    this.setState({ activeKay: this.state.activeKay === 0 ? null : 0 });
  };

  render() {
    const { intl, content } = this.props;
    return (
      <Accordion defaultActiveKey="0">
        <Card
          className={`accordion__wrap accordion__wrap__exhibitions ${
            this.state.activeKay === 0 ? `accordion__wrap__active` : ``
          }`}
        >
          <React.Fragment>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              onClick={() => this.setActiveKay(0)}
            >
              <Container>
                <div className="d-flex justify-content-start align-items-center pr-3 pl-3">
                  <h3
                    className="paragraph-3 btn-collapse"
                    dangerouslySetInnerHTML={{
                      __html: intl.formatMessage({ id: "archive" }),
                    }}
                  ></h3>
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
                </div>
              </Container>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Container>
                  <div className="pr-3 pl-3">
                    <p
                      className="paragraph-2 exhibitions__archive__subtitle"
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({ id: "archive-subtitle" }),
                      }}
                    />
                  </div>
                  <div className="pr-3 pl-3">
                    {content &&
                      content.map((item) => {
                        return (
                          <CardExhibitionArchive
                            key={item.id}
                            title={item.title.rendered}
                            text={item.excerpt.rendered}
                          />
                        );
                      })}
                  </div>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </React.Fragment>
        </Card>
      </Accordion>
    );
  }
}

export default injectIntl(
  connect(null, {
    showModal,
  })(AccordionBlock)
);
