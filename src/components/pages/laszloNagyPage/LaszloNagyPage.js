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
  const { intl } = props;
  let laszloNagyPageContent = {
    bgImage: "./images/laszloNagy/heroBg.png",
    aboutHouseBgImage: "./images/laszloNagy/aboutHouseBgImage.png",
    laszloNagyCarouselImg: [
      {
        id: 1,
        image: "../images/laszloNagy/permanent-exhibition-1.jpg",
      },
      {
        id: 2,
        image: "../images/laszloNagy/permanent-exhibition-2.jpg",
      },
      {
        id: 3,
        image: "../images/laszloNagy/permanent-exhibition-3.jpg",
      },
      {
        id: 4,
        image: "../images/laszloNagy/permanent-exhibition-4.jpg",
      },
      {
        id: 5,
        image: "../images/laszloNagy/permanent-exhibition-5.jpg",
      },
      {
        id: 6,
        image: "../images/laszloNagy/permanent-exhibition-6.jpg",
      },
      {
        id: 7,
        image: "../images/laszloNagy/permanent-exhibition-7.jpg",
      },
      {
        id: 8,
        image: "../images/laszloNagy/permanent-exhibition-8.jpg",
      },
      {
        id: 9,
        image: "../images/laszloNagy/permanent-exhibition-9.jpg",
      },
      {
        id: 10,
        image: "../images/laszloNagy/permanent-exhibition-10.jpg",
      },
      {
        id: 11,
        image: "../images/laszloNagy/permanent-exhibition-11.jpg",
      },
      {
        id: 12,
        image: "../images/laszloNagy/permanent-exhibition-12.jpg",
      },
      {
        id: 13,
        image: "../images/laszloNagy/permanent-exhibition-13.jpg",
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

        <section className="section-building section-carousel">
          <Container>
            <Row>
              <Col lg={5}>
                <div className="nae-container info-column nae-container_content-dark">
                  <div className="nae__title-line mb-0">
                    <h1
                      className="h1"
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({
                          id: laszloNagyContent.permanentExhibitionTitle,
                        }),
                      }}
                    ></h1>
                  </div>
                </div>
              </Col>
              <Col lg={6} />
            </Row>
            <Row className="justify-content-between">
              <Col lg={5}>
                <Row>
                  <InfoColumn
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
                            Ценоразпис за услуги в къща музей „Ласло Наги“
                          </b>
                        </p>
                        <ul type={"decimal"} className={"list"}>
                          <li>
                            1. Входни такси:
                            <ul className={"list"}>
                              <li>- възрастни – 4.00 лв.</li>
                              <li>- учащи и пенсионери – 3.00 лв.</li>
                              <li>- деца до 7 години – безплатно</li>
                              <li>- лица с трайни увреждания – безплатно</li>
                              <li>- възрастни над 10 човека – 3.00 лв.</li>
                              <li>- учащи и пенсионери над 10 човека – 2.00 лв.</li>
                              <li>- безплатно посещение на постоянната експозиция – всяка последна сряда на месеца</li>
                            </ul>
                          </li>
                          <li>
                            2. Беседи:
                            <ul className={"list"}>
                              <li>- на български език – 15.00 лв.</li>
                            </ul>
                          </li>
                          <li>
                            3. Ползване под наем:
                            <ul className={"list"}>
                              <li>- експозиционни зали (за мероприятия и презентации) - 50.00 лв./ден</li>
                              <li>- изложбен инвентар и технически пособия - 3.00 лв. за бр./ден</li>
                              <li>- гостуващи изложби повече от 1 ден - 100.00 лв.</li>
                            </ul>
                          </li>
                          <li>
                            4. Такса за участие в музейни уроци и ателиета:
                            <ul className={"list"}>
                              <li>- един участник - 3.00 лв.</li>
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
