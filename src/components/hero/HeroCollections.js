import Container from "react-bootstrap/Container";
import React from "react";
import { checkIfValueExistInIntl } from "../../utilities/browser";
import { injectIntl } from "react-intl";

function HeroCollections(props) {
  const { intl } = props;
  return (
    <div className="hero-collection">
      <div
        className="hero hero-bg"
        style={{
          backgroundImage: `url(${props.bgImage})`,
        }}
      >
        <Container>
          {props.label && (
            <p
              className="title-label"
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: "collection" }),
              }}
            />
          )}

          <h1
            className="h1"
            dangerouslySetInnerHTML={checkIfValueExistInIntl(props.title, intl)}
          />
        </Container>
      </div>
    </div>
  );
}

export default injectIntl(HeroCollections);
