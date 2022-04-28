import React from "react";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/Row";
import SocialsShare from "../socials/socialsShare";
import ArticleDate from "../Article/ArticleDate";
import NewsDateAndYear from "../pages/newsDetailPage/NewsDateAndYear";

function ArticleDetail({ article }) {
  const articleType = article._embedded["wp:term"][0][1].slug;
  console.log("articleType: ", articleType);
  const articleImg = article._embedded["wp:featuredmedia"]
    ? article._embedded["wp:featuredmedia"][0].media_details.sizes.full ||
      article._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large
    : "";

  const articleText = article.content.rendered;

  function renderDate(article) {
    if (articleType === "news") {
      return (
        <div>
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
      );
    } else if (articleType === "exhibitions") {
      return (
        <div>
          {article.event_place ? (
            <div className="h-sup">{article.event_place}</div>
          ) : null}
        </div>
      );
    } else {
      return (
        <div>
          {article.event_place ? (
            <div className="h-sup">{article.event_place}</div>
          ) : null}
        </div>
      );
    }
  }

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
          {/* MAIN CONTENT */}
          <Col lg={7} xl={8}>
            {renderDate(article)}
            <div className="nae-item__date_post"></div>
            <figure className="nae-item__img__wrap image__article-detail">
              {(article.event_date && articleType === "events") ||
              articleType === "exhibitions" ? (
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
              className="paragraph-2 wpc-paragraphs-margin wpc-paragraph__main-content"
              dangerouslySetInnerHTML={{ __html: `${articleText}` }}
            ></div>
          </Col>
          {/* MAIN CONTENT */}
          {/* SOCIA ICONS */}
          <Col lg={4} xl={2}>
            <div className="socials__wrap socials__top-indent">
              <p className="socials-label">Споделете страницата</p>
              <SocialsShare
                articleTitle={article.title.rendered}
                page={"news-and-events"}
              />
            </div>
          </Col>
          {/* !SOCIA ICONS */}
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
