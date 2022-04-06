import React from "react";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/Row";
import SocialsShare from "../socials/socialsShare";
import ArticleDate from "../Article/ArticleDate";
import NewsDateAndYear from "../pages/newsDetailPage/NewsDateAndYear";

function ArticleDetail({ article }) {
  const articleType = article._embedded["wp:term"][0][1].slug;
  const imageExist = article._embedded["wp:featuredmedia"];
  const articleImg = imageExist
    ? article._embedded["wp:featuredmedia"][0].media_details.sizes
        .medium_large ||
      article._embedded["wp:featuredmedia"][0].media_details.sizes.full
    : "";

  const articleText = article.content.rendered;

  if (article) {
    return (
      <article>
        <Row>
          <Col lg={8}>
            <header>
              <h2
                className="h2"
                dangerouslySetInnerHTML={{
                  __html: article.title.rendered,
                }}
              />
              {article.event_date && articleType === "news" ? (
                <p className="h-sup">{article.event_date}</p>
              ) : null}
            </header>
          </Col>
        </Row>

        <Row>
          <Col lg={7} xl={8}>
            <div className="nae-item__date_post">
              {article.date_gmt ? (
                <NewsDateAndYear date={article.date_gmt} />
              ) : null}
              {article.event_place ? (
                <div className="h-sup">
                  <span className="d-inline-block px-2">|</span>
                  {article.event_place}
                </div>
              ) : null}
            </div>
            <figure className="nae-item__img__wrap image__article-detail">
              {article.event_date && articleType === "events" ? (
                <ArticleDate date={article.event_date} />
              ) : null}
              <img
                className="img-fluid"
                src={articleImg.source_url}
                alt=""
                itemProp="image"
              />
            </figure>
            <div
              className="paragraph-2 wpc-paragraphs-margin"
              dangerouslySetInnerHTML={{ __html: `${articleText}` }}
            ></div>
          </Col>
          <Col lg={4} xl={2}>
            <div className="socials__wrap socials__top-indent">
              <p className="socials-label">Споделете страницата</p>
              <SocialsShare
                articleID={article.id - 1}
                articleTitle={article.title}
                page={"news"}
              />
            </div>
          </Col>
        </Row>
      </article>
    );
  } else {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  }
}

export default ArticleDetail;
