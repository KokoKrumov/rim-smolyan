import React, { Component } from "react";
import Container from "react-bootstrap/cjs/Container";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { checkIfValueExistInIntl } from "../../utilities/browser";

export default injectIntl(function HeroInner(props) {
  const { intl } = props;
  return (
    <div className={`hero-inner__wrap${props.backLink ? "__sm" : ""}`}>
      <Container>
        {props.breadcrumbs ? (
          <Container>
            <div className="breadcrumb__wrap">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a
                    className="link"
                    href={`/${props.breadcrumbs.parentLink}`}
                    itemProp="url"
                    target=""
                    rel="noopener nofollow noreferrer"
                    dangerouslySetInnerHTML={{
                      __html: intl.formatMessage({
                        id: props.breadcrumbs.parent,
                      }),
                    }}
                  />
                </li>
                <li
                  className="breadcrumb-item active"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({
                      id: props.breadcrumbs.child,
                    }),
                  }}
                />
              </ol>
            </div>
          </Container>
        ) : null}
        {props.labelTitle ? (
          <div>
            <p
              className="h-sup"
              dangerouslySetInnerHTML={checkIfValueExistInIntl(
                props.labelTitle,
                props
              )}
            />
          </div>
        ) : null}
        {props.backLink ? (
          <div className="back-link">
            <Link
              className="link cta_outline cta_outline__dark"
              to="/about-us"
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
        ) : null}

        <div>
          {props.title ? (
            <h1
              className="h1"
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: props.title }),
              }}
            />
          ) : null}

          {props.subtitle ? (
            <p
              className="subtitle"
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: props.subtitle }),
              }}
            ></p>
          ) : null}
          {props.subtitleLg ? (
            <p
              className="paragraph-1"
              dangerouslySetInnerHTML={checkIfValueExistInIntl(
                props.subtitleLg,
                props
              )}
            />
          ) : null}
        </div>
        {props.arrowBottom && (
          <div className="back-link arrow-bottom__wrap">
            <div
              className="link cta_outline cta_outline__dark cursor-pointer arrow-bottom"
              onClick={props.scrollOnClick}
              dangerouslySetInnerHTML={{
                __html:
                  "<spam>" +
                  '<svg width="65" height="8" viewBox="0 0 65 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                  '<path d="M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM65 3.5L1 3.5V4.5L65 4.5V3.5Z" />\n' +
                  "</svg>" +
                  "</spam>",
              }}
            ></div>
          </div>
        )}
      </Container>
    </div>
  );
});
