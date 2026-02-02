import CarouselImages from "../../carousel/carouselImages";
import Col from "react-bootstrap/cjs/Col";
import Container from "react-bootstrap/cjs/Container";
import HeroCollections from "../../hero/HeroCollections";
import HeroInner from "../../hero/HeroInner";
import InfoColumn from "../../infoColumn/InfoColumn";
import React, { useEffect } from "react";
import Row from "react-bootstrap/cjs/Row";
import { useDispatch, useSelector } from "react-redux";
import { fetchPricesLaszloNagy } from "../../../actions";
import SocialButton from "../../socials/socialsButton";
import { injectIntl } from "react-intl";
import laszloNagyPageBG from "../../../translations/laszloNagyPageBG.json";
import laszloNagyPageEN from "../../../translations/laszloNagyPageEN.json";

const LaszloNagyPage = (props) => {
  const { intl } = props;
  const dispatch = useDispatch();
  const pricesLaszloNagy = useSelector((state) => state.pricesLaszloNagy);
  const pricesData = pricesLaszloNagy?.[0];

  useEffect(() => {
    dispatch(fetchPricesLaszloNagy());
  }, [dispatch]);

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
                    <Col lg={6}>
                      <div id="prices-content">
                        <h4
                          className={"title"}
                          dangerouslySetInnerHTML={{
                            __html: pricesData?.title?.rendered || "",
                          }}
                        />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: pricesData?.content?.rendered || "",
                          }}
                        />
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
                        <li className="address__list-item">
                          <h4 className="h4 contacts__address-label">
                            Адрес:
                          </h4>
                          <p className="contacts__address-text">
                            гр. Смолян 4701 <br />
                            ул. „Чешитска“ №4
                          </p>
                        </li>
                        <li className="address__list-item">
                          <h4 className="h4 contacts__address-label">
                            Информация::
                          </h4>
                          <ul className="contacts__address-text">
                            <li>
                              <a
                                className="link"
                                href="tel:+359879111926"
                                itemProp="url"
                                rel="noopener nofollow noreferrer"
                              >
                                0879 111 926
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="address__list-item">
                          <h4 className="h4 contacts__address-label">
                            Пишете ни на:
                          </h4>
                          <p className="contacts__address-text">
                            <a
                              className="link"
                              href="mailto:rim.smolyan@gmail.com"
                              itemProp="url"
                              rel="noopener nofollow noreferrer"
                            >
                              rim.smolyan@gmail.com
                            </a>
                          </p>
                        </li>
                        <li className="address__list-item">
                          <div className='socials'>
                            <div className='socials-item'>
                                <SocialButton buttonType={'facebook-link'} link={'https://www.facebook.com/Laslo.Nagy.Smolyan'} />
                            </div>
                          </div>
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
