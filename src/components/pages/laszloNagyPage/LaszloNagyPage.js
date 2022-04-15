import React from "react";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import HeroCollections from "../../hero/HeroCollections";
import { injectIntl } from "react-intl";
import laszloNagyPageBG from "../../../translations/laszloNagyPageBG.json";
import laszloNagyPageEN from "../../../translations/laszloNagyPageEN.json";

import InfoColumn from "../../infoColumn/InfoColumn";
import CarouselImages from "../../carousel/carouselImages";
import HeroInner from "../../hero/HeroInner";

const LaszloNagyPage = (props) => {
  let laszloNagyPageContent = {
    bgImage: "./images/laszloNagy/heroBg.png",
    aboutHouseBgImage: "./images/laszloNagy/aboutHouseBgImage.png",
    laszloNagyCarouselImg: [
      {
        id: 1,
        image: "../images/laszloNagy/laslo-nagi-1.jpg",
      },
      {
        id: 2,
        image: "../images/laszloNagy/laslo-nagi-2.jpg",
      },
      {
        id: 3,
        image: "../images/laszloNagy/laslo-nagi-3.jpg",
      },
      {
        id: 4,
        image: "../images/laszloNagy/laslo-nagi-4.jpg",
      },
      {
        id: 5,
        image: "../images/laszloNagy/laslo-nagi-5.jpg",
      },
      {
        id: 6,
        image: "../images/laszloNagy/laslo-nagi-6.jpg",
      },
      {
        id: 7,
        image: "../images/laszloNagy/laslo-nagi-7.jpg",
      },
      {
        id: 8,
        image: "../images/laszloNagy/laslo-nagi-8.jpg",
      },
      {
        id: 9,
        image: "../images/laszloNagy/laslo-nagi-9.jpg",
      },
      {
        id: 10,
        image: "../images/laszloNagy/laslo-nagi-10.jpg",
      },
      {
        id: 11,
        image: "../images/laszloNagy/laslo-nagi-11.jpg",
      },
      {
        id: 12,
        image: "../images/laszloNagy/laslo-nagi-12.jpg",
      },
      {
        id: 13,
        image: "../images/laszloNagy/laslo-nagi-13.jpg",
      },
    ],
  };

  const laszloNagyContent =
    props.intl.locale === "en" ? laszloNagyPageEN : laszloNagyPageBG;

  return (
    <div className="laszlo-nagy__page">
      <div className="">
        <HeroCollections
          bgImage={laszloNagyPageContent.bgImage}
          title={laszloNagyContent.title}
          label={false}
        />
      </div>
      <main>
        <InfoColumn
          title={laszloNagyContent.aboutHouse}
          text={laszloNagyContent.aboutHouseText}
          backgroundImage={laszloNagyPageContent.aboutHouseBgImage}
          columns={2}
        />

        <section className="section-building">
          <Container>
            <Row className="justify-content-between">
              <Col lg={5}>
                <Row>
                  <InfoColumn
                    title={laszloNagyContent.permanentExhibitionTitle}
                    text={laszloNagyContent.permanentExhibitionText}
                    columns={1}
                  />
                </Row>
              </Col>
              <Col lg={6}>
                <Row>
                  <Col className="pr-0 pl-0">
                    <div className="about-us-page__building-carousel nae-container">
                      <CarouselImages
                        listImages={laszloNagyPageContent.laszloNagyCarouselImg}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section-building">
          <HeroInner
            title={laszloNagyContent.priceAndWorkingHours}
            subtitle={""}
          />
          <div className="contacts contacts__wrap laszlo-nagy__page__contact-section">
            <Container className="">
              <Row className="">
                <Col lg={11}>
                  <Row className={"contacts__row"}>
                    <Col lg={5}>
                      <div>
                        <p className={"title"}>
                          <b>
                            Ценоразпис на входни билети и беседи в къща музей
                            „Ласло Наги“
                          </b>
                        </p>
                        <ul type={"decimal"} className={"list"}>
                          <li>
                            1. Входни такси:
                            <ul className={"list"}>
                              <li>- възрастни – 3.00 лв.</li>
                              <li>- учащи и пенсионери – 1.00 лв.</li>
                              <li>- деца до 7 години – безплатно</li>
                              <li>
                                - учащи и пенсионери над 10 човека – 1.00 лв.
                              </li>
                            </ul>
                          </li>
                          <li>
                            2. Беседи:
                            <ul className={"list"}>
                              <li>- на български език – 10.00 лв.</li>
                              <li>
                                - беседи на чужд език се изнасят само след
                                предварителна заявка. Цена - 20.00 лв.
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <ul className="address__list">
                        <li className="address__list-item">
                          <h4 className="h4 contacts__address-label">
                            Работно време:
                          </h4>
                          <p className="contacts__address-text">
                            Вторник - Събота
                          </p>
                        </li>
                        <li className="address__list-item time-period__wrap">
                          <h6 className="time-period__title">
                            Май - Септември
                          </h6>
                          <p className="time-period__text">
                            <b>10:00 - 18:00</b>
                          </p>
                          <hr />
                          <h6 className="time-period__title">
                            Октомври - Април
                          </h6>
                          <p className="time-period__text">
                            <b>10:00 - 17:00</b>
                          </p>
                        </li>
                        <li className="address__list-item">
                          <p className="paragraph-3">
                            Неделя и понеделник са почивни дни.
                          </p>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </main>
    </div>
  );
};

export default injectIntl(LaszloNagyPage);
