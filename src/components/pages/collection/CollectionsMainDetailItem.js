import React from "react";
import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { fetchItemFromCollection } from "../../../actions";
import Spinner from "react-bootstrap/Spinner";
import HeroInner from "../../hero/HeroInner";

import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import SocialsShare from "../../socials/socialsShare";
import { Link } from "react-router-dom";

function CollectionsMainDetailItem({
  fetchItemFromCollection,
  match,
  itemFomCollection,
  intl,
}) {
  console.log("match: ", match);
  const itemName = match.params.item;
  const [item, setItem] = useState({});
  useEffect(() => {
    fetchItemFromCollection(itemName);
  }, [fetchItemFromCollection, itemName]);

  useEffect(() => {
    setItem(itemFomCollection);
  }, [itemFomCollection]);

  function renderContent() {
    return (
      <div className="collections-item collections-page__wrap">
        {/* BACK NAVIGATION AND SOCIAL SHARES */}
        <Container className="position-relative">
          <div className="hero-inner__wrap__sm collections-item-header-nav">
            <div className="back-link">
              <Link
                className="link cta_outline cta_outline__dark"
                to={`/${item._embedded["wp:term"][0][1].slug}/intro/${item._embedded["wp:term"][0][0].slug}`}
                itemProp="url"
                target=""
                dangerouslySetInnerHTML={{
                  __html:
                    "<spam class='mr-3'>" +
                    '<svg width="65" height="8" viewBox="0 0 65 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM65 3.5L1 3.5V4.5L65 4.5V3.5Z" />\n' +
                    "</svg>" +
                    "</spam>" +
                    intl.formatMessage({ id: "back" }),
                }}
              ></Link>
            </div>
            <SocialsShare
              articleTitle={item.title.rendered}
              page="share-page"
            />
          </div>
        </Container>
        {/* ITEM SPECIFIC AND ARROWS */}
        <main className="collections-page">
          <section>
            <Container className="position-relative">
              <Row>
                <Col xs={12}></Col>
              </Row>
            </Container>
          </section>

          <div>
            <div>{item.title.rendered}</div>
          </div>
          {/* ITEM TITLE AND DESCRIPTION */}
          <div></div>
        </main>
      </div>
    );
  }

  function renderLoading() {
    return (
      <div className="spinner-wrap">
        <Spinner className="spinner" animation="border" role="status" />
      </div>
    );
  }

  return Object.keys(item).length ? renderContent() : renderLoading();
}
const mapStateToProps = (state) => {
  return {
    itemFomCollection: state.itemFomCollection,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItemFromCollection: (item) => dispatch(fetchItemFromCollection(item)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CollectionsMainDetailItem)
);
