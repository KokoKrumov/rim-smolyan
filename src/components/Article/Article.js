import React, { Component } from "react";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import { injectIntl } from "react-intl";
import NewsAndEventsList from "../newsAndEventsList/NewsAndEventsList";
import ArticleDetail from "./ArticleDetail";

class Article extends Component {
  render() {
    const { intl, data } = this.props;
    return (
      <div className="news-detail-page__wrap">
        {/*BREADCRUMBS*/}
        <Container>
          <div className="breadcrumb__wrap">
            {data.article?.type && (
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a
                    className="link"
                    href={`/${data.articleSection}`}
                    itemProp="url"
                    target=""
                    rel="noopener nofollow noreferrer"
                    dangerouslySetInnerHTML={{
                      __html: intl.formatMessage({
                        id: `menu.${data.articleSection}`,
                      }),
                    }}
                  />
                </li>
                <li
                  className="breadcrumb-item active"
                  dangerouslySetInnerHTML={{ __html: data.breadcrumbs }}
                />
              </ol>
            )}
          </div>
        </Container>
        {/* !BREADCRUMBS*/}
        {/*MAIN DETAIL CONTENT*/}
        {data.article ? (
          <div
            className={`tab_list-container tab_list-container_content-dark ${data.detailContainer}`}
          >
            <Container className="tab_list-container__layout">
              <ArticleDetail article={data.article} />
            </Container>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Loading ...</p>
        )}
        {/* !MAIN DETAIL CONTENT*/}
        {/*ADDITIONAL CONTENT*/}
        {data.article.type !== "exhibition" &&
          data.articleSection !== "exhibitions" && (
            <Container>
              <Row>
                <Col>
                  <div className="additional__content-title">
                    <h2 className="h2">Още от новини и събития</h2>
                  </div>
                </Col>
              </Row>
              <Row>
                <NewsAndEventsList
                  listOfNewsAndEvents={data.listOfNewsAndEvents}
                />
              </Row>
            </Container>
          )}

        {/* !ADDITIONAL CONTENT*/}
      </div>
    );
  }
}

export default injectIntl(Article);
