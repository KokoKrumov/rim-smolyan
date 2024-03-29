import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import InfoColumn from "../../infoColumn/InfoColumn";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import imgTraveling from "../../../assets/images/traveling.png";
import { fetchRoutes, fetchServices } from "../../../actions";
import CardInfoLine from "../../infoLine/CardInfoLine";
import Spinner from "react-bootstrap/Spinner";

class Services extends Component {
  state = {
    routes: null,
    services: null,
  };

  fetchRoutes = () => {
    if (
      this.props &&
      this.props.routes &&
      this.props.routes !== this.state.routes
    ) {
      this.props.fetchRoutes().then(() => {
        this.setState({ routes: this.props.routes });
      });
    }
  };

  fetchServices = () => {
    if (
      this.props &&
      this.props.services &&
      this.props.services !== this.state.services
    ) {
      this.props.fetchServices().then(() => {
        this.setState({ services: this.props.services });
      });
    }
  };

  componentDidMount() {
    this.fetchRoutes();
    this.fetchServices();
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="services-page">
        <HeroInner title={"services"} />
        <main className="services-page__main">
          <section>
            <Container className="position-relative">
              <Row>
                <InfoColumn
                  title={"workshops"}
                  text={"workshops-text"}
                  isSmall={true}
                  columns={2}
                />
              </Row>
            </Container>
          </section>
          <section className="section section-routes">
            <Container>
              <Row className="justify-content-between">
                <Col lg={5}>
                  <Row>
                    <InfoColumn
                      title={"routes"}
                      text={"routes-text"}
                      columns={1}
                      isSmall={true}
                    />
                  </Row>
                  <div className="routes-list">
                    <h5
                      className="routes-list__title"
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({
                          id: "routes-list-title",
                        }),
                      }}
                    />
                    <ul>
                      {this.state.routes ? (
                        this.state.routes.map((item) => {
                          return (
                            <li className="routes-list__item" key={item.id}>
                              <h5 className="h5__sub routes-list__item-title">
                                {item.title}
                              </h5>
                              <p className="paragraph-2  routes-list__item-text">
                                {item.text}
                              </p>
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          {" "}
                          <div className="spinner-wrap">
                            <Spinner
                              className="spinner"
                              animation="border"
                              role="status"
                            />
                          </div>
                        </li>
                      )}
                    </ul>
                    <p className="paragraph-2 routes-call">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: intl.formatMessage({ id: "routes-call" }),
                        }}
                      />
                      <a href="tel:+35930162727"> 0301/ 6-27-27</a>
                    </p>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="pr-0 pl-0">
                    <div className="nae-container">
                      <img
                        className="img-fluid"
                        src={imgTraveling}
                        alt="Traveling"
                        itemProp="image"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section">
            <Container className="position-relative">
              <Row>
                <InfoColumn
                  title={"thematic-talks-title"}
                  text={"thematic-talks-text"}
                  isSmall={true}
                  columns={2}
                />
              </Row>
            </Container>
          </section>
          <section className="section section-services">
            <Container className="position-relative">
              <Row>
                <InfoColumn
                  title={"offered-services-title"}
                  text={"offered-services-text"}
                  isSmall={true}
                  columns={2}
                />
              </Row>
              <Row>
                <Col xs={12}>
                  <p
                    className={`paragraph-2`}
                    dangerouslySetInnerHTML={{
                      __html: intl.formatMessage({ id: "we-offer" }) + ":",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <ul className="list-services col-count-3">
                    {this.state.services ? (
                      this.state.services.map((item) => {
                        return (
                          <li className="list-services__item" key={item.id}>
                            {item.title};
                          </li>
                        );
                      })
                    ) : (
                      <p className={`paragraph-2`}>Loading...</p>
                    )}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="section-services__card-info__price-link">
                    <CardInfoLine
                      title={"services-price-card-title"}
                      link={"/prices"}
                      isSmall={true}
                      linkText={"here"}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  routes: Object.values(state.routes),
  services: Object.values(state.services),
});

export default injectIntl(
  connect(mapStateToProps, {
    fetchRoutes,
    fetchServices,
  })(Services)
);
