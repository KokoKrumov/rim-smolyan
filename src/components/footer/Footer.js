import Container from "react-bootstrap/Container";
import { FormattedMessage } from "react-intl";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import Socials from "../socials/socials";
import { connect } from "react-redux";
import fbLogo from "../../assets/images/facebook1.svg";
import instagramLogo from "../../assets/images/instagram.svg";
import rimLogo from "../../assets/images/rim-logo.svg";
import { showModal } from "../../actions";
import twitterLogo from "../../assets/images/twitter.svg";

function Footer({ showModal }) {
  function handleShowModal(data, url, e) {
    e.preventDefault();
    showModal(data, url);
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <Container>
          <Navbar variant="dark">
            <div className="footer__navbar-brand__wrap">
              <Navbar.Brand href="/">
                <div className="brand__wrap">
                  <div className="brand-logo__wrap">
                    <Image src={rimLogo} fluid />
                  </div>
                  <p className="brand-text">
                    <FormattedMessage id="headline" />
                  </p>
                </div>
              </Navbar.Brand>
              <Socials />
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              className="footer__main-nav"
              id="responsive-navbar-nav"
            >
              <Nav className="">
                <Nav.Link
                  // onClick={(e) => {
                  // handleShowModal('modal-redirect','Z_fondove.html', e)
                  // }}
                  href="/collections"
                  className="nav__main-link"
                >
                  <FormattedMessage id="menu.collections" />
                </Nav.Link>
                <Nav.Link href="/exhibitions" className="nav__main-link">
                  <FormattedMessage id="menu.exhibitions" />
                </Nav.Link>
                <Nav.Link href="/news-and-events" className="nav__main-link">
                  <FormattedMessage id="menu.news" />
                </Nav.Link>
                <Nav.Link href="/about-us" className="nav__main-link">
                  <FormattedMessage id="menu.about-us" />
                </Nav.Link>
                <Nav.Link href="/contact-us" className="nav__main-link">
                  <FormattedMessage id="menu.contact-us" />
                </Nav.Link>
              </Nav>
              <Nav className="">
                <Nav.Link href="/support-us" className="nav__secondary-link">
                  <FormattedMessage id="menu.support" />
                </Nav.Link>
                <Nav.Link
                  href="/administrative"
                  className="nav__secondary-link"
                >
                  <FormattedMessage id="menu.administrative" />
                </Nav.Link>
                <Nav.Link
                  href="/privacy-policy"
                  className="nav__secondary-link"
                >
                  <FormattedMessage id="menu.privacy-policy" />
                </Nav.Link>
                <Nav.Link href="/terms" className="nav__secondary-link">
                  <FormattedMessage id="menu.terms" />
                </Nav.Link>
              </Nav>
              <Nav className="">
                <Nav.Link
                  href="/house-museum-laszlo-nagy"
                  className="nav__main-link"
                >
                  <FormattedMessage id="menu.house-museum" />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
      <div className="footer__bottom">
        <Container>
          <div className="footer__bottom__inner">
            <p className="nav__secondary-link">
              <FormattedMessage id="copyright" />
            </p>
            <p className="nav__secondary-link">
              <FormattedMessage id="design" />:
              Destopia
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default connect(null, {
  showModal,
})(Footer);
