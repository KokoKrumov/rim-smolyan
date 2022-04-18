import React, { useEffect, useState } from "react";
import rimLogo from "../../assets/images/rim-logo.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import BG from "../../assets/images/bg.svg";
import EN from "../../assets/images/en.svg";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { showModal } from "../../actions";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import { isTabletScreen } from "../../utilities/browser";

function Header({ showModal }) {
  const intl = useIntl();

  const [navIsOpen, setNavIsOpen] = useState(false);
  const [isTabletScreenV, setIsTabletScreen] = React.useState(isTabletScreen());

  useEffect(() => {
    function handleResize() {
      setIsTabletScreen(isTabletScreen());
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const toggleHeaderNavigation = () => setNavIsOpen(!navIsOpen);

  function setLanguage(lang, e) {
    e.preventDefault();
    localStorage.setItem("lang", lang);
    window.location.reload();
  }

  function handleShowModal(data, url, e) {
    e.preventDefault();
    showModal(data, url);
  }

  let flag = localStorage.getItem("lang");

  return (
    <header className="header">
      <Navbar
        collapseOnSelect
        expand="xl"
        variant="dark"
        onToggle={toggleHeaderNavigation}
      >
        <Container className="header__container">
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
          <Navbar.Toggle>
            {/* Close mark */}
            <div id="close-icon">
              <span />
              <span />
              <span />
            </div>
            {/* close mark ends */}
            <div
              className={`hamburger hamburger--slider js-hamburger ${
                navIsOpen ? "is-active" : ""
              }`}
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <div
              className={`header-navigation__wrap ${
                isTabletScreenV ? "container" : ""
              }`}
            >
              <div className="header-navigation__inner">
                {isTabletScreenV ? (
                  <div className="header-navigation__inner__child__mobile">
                    <InputGroup className="header-navigation__inner__child">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                          <img
                            className=""
                            src={searchIcon}
                            alt=""
                            itemProp="image"
                          />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder={intl.formatMessage({ id: "menu.search" })}
                        aria-label={intl.formatMessage({ id: "menu.search" })}
                        aria-describedby={intl.formatMessage({
                          id: "menu.search-in",
                        })}
                      />
                    </InputGroup>
                    <NavDropdown
                      title={
                        <div className="display-flag">
                          <img
                            className="thumbnail-image"
                            src={flag === "en" ? EN : BG}
                            alt="lang"
                          />
                        </div>
                      }
                      className="nav__main-link dropdown-lang"
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item onClick={(e) => setLanguage("bg", e)}>
                        <img
                          className="thumbnail-image"
                          src={BG}
                          alt=""
                          itemProp="image"
                        />
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={(e) => setLanguage("en", e)}>
                        <img
                          className="thumbnail-image"
                          src={EN}
                          alt=""
                          itemProp="image"
                        />
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                ) : (
                  <InputGroup className="header-navigation__inner__child">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">
                        <img
                          className=""
                          src={searchIcon}
                          alt=""
                          itemProp="image"
                        />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder={intl.formatMessage({ id: "menu.search" })}
                      aria-label={intl.formatMessage({ id: "menu.search" })}
                      aria-describedby={intl.formatMessage({
                        id: "menu.search-in",
                      })}
                    />
                  </InputGroup>
                )}

                <Nav className={`header-navigation__inner__child ${flag}`}>
                  <Nav.Link href="/support-us" className="nav__secondary-link">
                    <FormattedMessage id="menu.support" />
                  </Nav.Link>
                  <p className="nav__main-link d-none d-xl-block">|</p>
                  <Nav.Link
                    href="/administrative"
                    className="nav__secondary-link"
                  >
                    <FormattedMessage id="menu.administrative" />
                  </Nav.Link>
                  {!isTabletScreenV ? (
                    <NavDropdown
                      title={
                        <div className="display-flag">
                          <img
                            className="thumbnail-image"
                            src={flag === "en" ? EN : BG}
                            alt="lang"
                          />
                        </div>
                      }
                      className="nav__main-link dropdown-lang"
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item onClick={(e) => setLanguage("bg", e)}>
                        <img
                          className="thumbnail-image"
                          src={BG}
                          alt=""
                          itemProp="image"
                        />
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={(e) => setLanguage("en", e)}>
                        <img
                          className="thumbnail-image"
                          src={EN}
                          alt=""
                          itemProp="image"
                        />
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : null}
                </Nav>
              </div>
              <div className="header-navigation__nav">
                <Nav className="" activeKey="/news">
                  <NavDropdown
                    title={intl.formatMessage({ id: "menu.collections" })}
                    className="nav__main-link"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      className="nav__secondary-link"
                      onClick={(e) => {
                        handleShowModal("modal-redirect", "Z_fondove.html", e);
                      }}
                      href="#"
                    >
                      <FormattedMessage id="menu.main-collections" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="nav__secondary-link"
                      onClick={(e) => {
                        handleShowModal(
                          "modal-redirect",
                          "Z_vir_fondove.html",
                          e
                        );
                      }}
                      href="#"
                    >
                      <FormattedMessage id="menu.virtual-collections" />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    href="/exhibitions"
                    onClick={(e) => {
                      handleShowModal("modal-redirect", "Z_ekspozicia.html", e);
                    }}
                    eventKey="exhibitions"
                    className="nav__main-link "
                  >
                    <FormattedMessage id="menu.exhibitions" />
                  </Nav.Link>
                  <Nav.Link
                    href="/news-and-events"
                    eventKey="news"
                    className="nav__main-link"
                  >
                    <FormattedMessage id="menu.news" />
                  </Nav.Link>
                  <NavDropdown
                    title={intl.formatMessage({ id: "menu.about-us" })}
                    className="nav__main-link"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      className="nav__secondary-link"
                      href="/about-us"
                    >
                      <FormattedMessage id="menu.about-museum" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="nav__secondary-link"
                      href="/museum-games"
                    >
                      <FormattedMessage id="games" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="nav__secondary-link"
                      href="/services"
                    >
                      <FormattedMessage id="services" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="nav__secondary-link"
                      href="/prices"
                    >
                      <FormattedMessage id="prices" />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/contact-us" className="nav__main-link">
                    <FormattedMessage id="menu.contact-us" />
                  </Nav.Link>
                  <p className="nav__main-link nav__main-link__separate-line">
                    <span className="d-none d-xl-block">|</span>
                  </p>
                  <Nav.Link href="/house-museum-laszlo-nagy" className="nav__main-link">
                    <FormattedMessage id="menu.house-museum" />
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default connect(null, {
  showModal,
})(Header);
