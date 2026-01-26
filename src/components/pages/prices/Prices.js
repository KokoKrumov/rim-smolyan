import React, { Component } from "react";

import Col from "react-bootstrap/cjs/Col";
import Container from "react-bootstrap/cjs/Container";
import HeroInner from "../../hero/HeroInner";
import Row from "react-bootstrap/cjs/Row";
import { connect } from "react-redux";
import { fetchPrices } from "../../../actions";
import { injectIntl } from "react-intl";

class Prices extends Component {
  componentDidMount() {
    this.props.fetchPrices();
  }

  render() {
    const { prices } = this.props;
    const pricesData = prices?.[0];

    return (
      <div className="services-page">
        <HeroInner
          title={"prices"}
          rawTitle={pricesData?.title?.rendered}
        />
        <main className="prices-page__main">
          <section>
            <Container className="position-relative">
              <Row>
                <Col xs={12} sm={8}>
                  {/* <h5
                    className="prices-title"
                    dangerouslySetInnerHTML={{
                      __html: pricesData?.title?.rendered || "",
                    }}
                  /> */}
                  <div
                    id="prices-content"
                    dangerouslySetInnerHTML={{
                      __html: pricesData?.content?.rendered || "",
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prices: state.prices,
  };
};

export default injectIntl(connect(mapStateToProps, { fetchPrices })(Prices));
