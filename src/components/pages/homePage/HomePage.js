import React, { Component, useEffect } from "react";
import {
  extractIdAndCategories,
  isTabletScreen,
} from "../../../utilities/browser";
import { fetchNews, showModal } from "../../../actions";

import CarouselMegatron from "../../carousel/carouselMegatron";
import CarouselMegatronMobile from "../../carousel/CarouselMegatronMobile";
import Container from "react-bootstrap/cjs/Container";
import { FormattedMessage } from "react-intl";
import Hero from "../../hero/Hero";
import InfoColumn from "../../infoColumn/InfoColumn";
import { Link } from "react-router-dom";
import NewsAndEventsList from "../../newsAndEventsList/NewsAndEventsList";
import Row from "react-bootstrap/cjs/Row";
import WorkInfoLine from "../../infoLine/WorkInfoLine";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import bgCarousel2 from "../../../assets/images/bg-diskos.jpg";
import bgCarousel3 from "../../../assets/images/bg-nakit.jpg";
import bgCarousell from "../../../assets/images/bg-shlem.jpg";
import { connect } from "react-redux";
import heroImage from "../../../assets/images/baseHero.jpg";
import imageItem_1 from "../../../assets/images/img-shlem.jpg";
import imageItem_2 from "../../../assets/images/img-diskos.jpg";
import imageItem_3 from "../../../assets/images/img-nakit.jpg";
import { isEqual } from "lodash";

let listMegatronCarousel = [
  {
    id: 1,
    title: "Шлем",
    type: "Бронз",
    description:
      "Изработен от две части - епикранион и горна завита напред приставка. Двата набузника са окачени подвижно към епикраниона и отпред са закопчавани с ремък. Украсени са с пластична, ниско-релефна украса, представляваща стилизирана къдрава брада и мустаци.",
    width: "макс. височина - 39 см.",
    height: "макс. широчина - 23/18 см.",
    dating: "VI - III век пр.Хр.",
    settlement: "с. Беден",
    number: "A837",
    bgImage: bgCarousell,
    image: imageItem_1,
  },
  {
    id: 2,
    title: "Дискос",
    type: "Мед, сребърно покритие",
    description:
      "Богослужебен съд с узчукана релефна украса. Ръчна изработка. Изобразени са дванадесетте апостола, а в центъра - Исус Христос Вседържаител. Чипровска златарска школа.",
    width: "диаметър - 16 см.",
    height: "",
    dating: "края на XVII - началото на XVIII век",
    settlement: "",
    number: "B417",
    bgImage: bgCarousel2,
    image: imageItem_2,
  },
  {
    id: 3,
    title: "Накит мъжки",
    type: "Сребърна сплав (занаятчийско производство)",
    description:
      "Верижка за джобен часовник. Пет пластини с неправлина форма, свързани чрез верижки. Едната група пластини са украсени с релефно изработен във филигранна и гранулирана техника растителен и геометричен мотив, края на верижките има висулки. Върху другата група е положена украса от двете страни.",
    width: "дължина на верижката - 77 см.",
    height: "тегло - 406,64 гр.",
    dating: "XIX век",
    settlement: "Смолянско",
    number: "E5890",
    bgImage: bgCarousel3,
    image: imageItem_3,
  },
];

class HomePage extends Component {
  state = {
    bgHero: null,
    bgAboutUs: null,
    listOfNewsAndEvents: [],
    listMegatronCarousel: null,
    isTabletScreenV: isTabletScreen(),
    categories: [],
    infoColumn: {
      title: "about-us",
      text: "home-page.about-us.text",
      showMoreLink: "/about-us",
      bgAboutUs: aboutUsImage,
      columns: 2,
    },
  };

  handleResize() {
    this.setState({
      isTabletScreenV: isTabletScreen(),
    });
  }

  fetchData = (id, page, perPage, listFrom, props, propsCategories) => {
    const { slugId, categories } = extractIdAndCategories(
      id,
      listFrom,
      props,
      propsCategories
    );
    this.props.fetchNews(slugId, page, perPage).then(() => {
      this.setState({
        listOfNewsAndEvents: this.props.news,
        categories: categories,
      });
    });
  };

  componentDidMount() {
    // react can't update when there are changes in storage,
    // however, the storage contains "categories" from the first load,
    // so we have to check the storage when component is mounting
    if (
      sessionStorage.getItem("categories") &&
      !isEqual(
        JSON.parse(sessionStorage.getItem("categories")),
        this.state.categories
      )
    ) {
      this.fetchData(
        "news-and-events",
        1,
        3,
        "storage",
        this.props,
        this.state.categories
      );
    }

    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  componentDidUpdate() {
    if (
      !sessionStorage.getItem("categories") &&
      this.props &&
      this.props.categories &&
      !isEqual(this.props.categories, this.state.categories)
    ) {
      this.fetchData(
        "news-and-events",
        1,
        3,
        "props",
        this.props,
        this.props.categories
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      this.handleResize();
    });
  }

  handleShowModal(data, url, e) {
    e.preventDefault();
    this.props.showModal(data, url);
  }

  render() {
    return (
      <div className="home-page__wrap">
        <Hero
          Image={heroImage}
          title={"Средните Родопи"}
          subtitle={"от праисторическите времена до съвременността"}
          subtitleSm={"Рaзгледайте нашите фондове"}
        />
        <WorkInfoLine />

        <div className="nae-container nae-container_content-dark">
          <Container>
            <div>
              <div className="nae__title-line">
                <h1 className="h1">Новини и Събития</h1>
                {!this.state.isTabletScreenV ? (
                  <div className="nae__title-line__link">
                    <Link
                      className="link cta_outline cta_outline__dark hvr-underline-from-right"
                      to="/news-and-events"
                      itemProp="url"
                      target=""
                      rel="noopener nofollow noreferrer"
                    >
                      <FormattedMessage id="see-all" />
                    </Link>
                  </div>
                ) : null}
              </div>
              <Row>
                <NewsAndEventsList
                  listOfNewsAndEvents={this.state.listOfNewsAndEvents}
                />
              </Row>
              {this.state.isTabletScreenV ? (
                <div className="nae__title-line__link">
                  <Link
                    className="link cta_outline cta_outline__dark hvr-underline-from-right"
                    to="/news-and-events"
                    itemProp="url"
                    target=""
                    rel="noopener nofollow noreferrer"
                  >
                    <FormattedMessage id="see-all" />
                  </Link>
                </div>
              ) : null}
            </div>
          </Container>
        </div>

        {!isTabletScreen() ? (
          <CarouselMegatron
            listMegatronCarousel={listMegatronCarousel}
            isTableScreen={this.state.isTabletScreenV}
          />
        ) : (
          <CarouselMegatronMobile listMegatronCarousel={listMegatronCarousel} />
        )}

        <div className="home-page__info-column">
          <InfoColumn
            title={this.state.infoColumn.title}
            text={this.state.infoColumn.text}
            backgroundImage={this.state.infoColumn.bgAboutUs}
            showMoreLink={this.state.infoColumn.showMoreLink}
            columns={this.state.infoColumn.columns}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: Object.values(state.news),
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, {
  fetchNews,
  showModal,
})(HomePage);
