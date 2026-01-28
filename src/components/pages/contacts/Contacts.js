import React, { Component } from "react";
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import { connect } from "react-redux";
import { fetchNews } from "../../../actions";
import Socials from "../../socials/socials";
import Form from "react-bootstrap/Form";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { FormattedMessage } from "react-intl";

class Contacts extends Component {
  state = {};

  render() {
    return (
      <div className="contacts-page__wrap">
        <HeroInner title={"contacts"} subtitle={""} />

        <div className="contacts contacts__wrap">
          <Container className="">
            <Row className="contacts__row">
              <Col lg={3}>
                <address className="">
                  <ul className="address__list">
                    <li className="address__list-item">
                      <h4 className="h4 contacts__address-label">Адрес:</h4>
                      <p className="contacts__address-text">
                        гр. Смолян 4700 <br />
                        ул.”Дичо Петров” №5
                      </p>
                    </li>
                    <li className="address__list-item">
                      <h4 className="h4 contacts__address-label">
                        Информация:
                      </h4>
                      <ul className="contacts__address-text">
                        <li>
                          <a
                            className="link"
                            href="tel:+35930162727"
                            itemProp="url"
                            target=""
                            rel="noopener nofollow noreferrer"
                          >
                            0301/6 27 27
                          </a>
                        </li>
                        <li>
                          <a
                            className="link"
                            href="tel:+359879111915"
                            itemProp="url"
                            target=""
                            rel="noopener nofollow noreferrer"
                          >
                            0879 111 915
                          </a>
                        </li>
                        <li>
                          <a
                            className="link"
                            href="tel:+359879111913"
                            itemProp="url"
                            target=""
                            rel="noopener nofollow noreferrer"
                          >
                            0879 111 913
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="address__list-item">
                      <h4 className="h4 contacts__address-label">
                        Пишете ни на:
                      </h4>
                      <ul className="contacts__address-text">
                        <li>
                          <a
                            className="link"
                            href="mailto:rim.smolyan@gmail.com"
                            itemProp="url"
                            target=""
                            rel="noopener nofollow noreferrer"
                          >
                            rim.smolyan@gmail.com
                          </a>
                        </li>
                        <li>
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip
                                className="tooltip__dark"
                                id={`tooltip-top`}
                              >
                                <FormattedMessage id="accounting" />
                              </Tooltip>
                            }
                          >
                            <span>
                              <a
                                className="link"
                                href="mailto:museum-sm@mail.bg"
                                itemProp="url"
                                target=""
                                rel="noopener nofollow noreferrer"
                              >
                                museum-sm@mail.bg
                              </a>
                            </span>
                          </OverlayTrigger>
                        </li>
                      </ul>
                    </li>
                    <li className="address__list-item">
                      <Socials />
                    </li>
                  </ul>
                </address>
              </Col>
              <Col lg={3}>
                <ul className="address__list">
                  <li className="address__list-item">
                    <h4 className="h4 contacts__address-label">
                      Работно време:
                    </h4>
                    <p className="contacts__address-text">Вторник - Неделя</p>
                  </li>
                  <li className="address__list-item time-period__wrap">
                    <h6 className="time-period__title">Май - Септември</h6>
                    <p className="time-period__text">09:00 - 18:00</p>
                    <hr />
                    <h6 className="time-period__title">Октомври - Април</h6>
                    <p className="time-period__text">
                      09:00 - 12:00 / 13:00 - 17:00
                    </p>
                  </li>
                  <li className="address__list-item">
                    <p className="paragraph-3">
                      Понеделник е санитарен ден (приемат се посетители).
                      За работното време на официалните празници на Република България
                      информация се публикува в секция "Актуално" и в социалните мрежи на музея.
                    </p>
                  </li>
                </ul>
              </Col>
              <Col lg={4}>
                <div>
                  <h4 className="h4 contacts__address-label">Обратна връзка</h4>
                  <p className="paragraph-3">
                    Споделете вашите впечатления, препоръки или направете
                    запитване чрез някой от методите за контакти.
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="contacts__row">
              <Col lg={12}>
                <div className="contacts__map__wrap">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1476.8!2d24.7144959!3d41.5760979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ac5a06dc1240f7%3A0x35e14604588eb47d!2sRegional%20History%20Museum%20Stoyu%20Shishkov!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Regional History Museum Stoyu Shishkov Location"
                  ></iframe>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: Object.values(state.news),
  };
};

export default connect(mapStateToProps, {
  fetchNews,
})(Contacts);
