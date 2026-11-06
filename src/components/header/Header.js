import React, { useEffect, useState } from "react";
import rimLogo from "../../assets/images/rim-logo.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { showModal } from "../../actions";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useIntl } from "../../utilities/withIntl";
import { isTabletScreen } from "../../utilities/browser";
import { Link, useLocation } from "react-router-dom";

function Header({ showModal }) {
  const intl = useIntl();
  const location = useLocation();

  const [navIsOpen, setNavIsOpen] = useState(false);
  const [isTabletScreenV, setIsTabletScreen] = React.useState(isTabletScreen());
  const flag = localStorage.getItem("lang");

  useEffect(() => {
    function handleResize() {
      setIsTabletScreen(isTabletScreen());
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleHeaderNavigation = (expanded) => setNavIsOpen(expanded);

  function setLanguage(lang, e) {
    e.preventDefault();
    localStorage.setItem("lang", lang);
    window.location.reload();
  }

  function isCurrentUrl(url) {
    return location.pathname.includes(url);
  }

  function handleShowModal(data, url, e) {
    e.preventDefault();
    showModal(data, url);
  }
  return (
    <header className="header">
      <Navbar
        collapseOnSelect
        expand="xl"
        variant="dark"
        expanded={navIsOpen}
        onToggle={toggleHeaderNavigation}
      >
        <Container className="header__container">
          <Navbar.Brand as={Link} to="/" onClick={() => setNavIsOpen(false)}>
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
                      <InputGroup.Text id="basic-addon1">
                        <img
                          className=""
                          src={searchIcon}
                          alt=""
                          itemProp="image"
                        />
                      </InputGroup.Text>
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
                          <span>{flag === "en" ? "EN" : "BG"}</span>
                        </div>
                      }
                      className="nav__main-link dropdown-lang"
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item
                        className={flag === "bg" && "active"}
                        onClick={(e) => setLanguage("bg", e)}
                      >
                        <span>BG</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className={flag === "en" && "active"}
                        onClick={(e) => setLanguage("en", e)}
                      >
                        <span>EN</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                ) : (
                  <InputGroup className="header-navigation__inner__child">
                    <InputGroup.Text id="basic-addon1">
                      <img
                        className=""
                        src={searchIcon}
                        alt=""
                        itemProp="image"
                      />
                    </InputGroup.Text>
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
                  <Nav.Link
                    className={`nav__secondary-link ${
                      isCurrentUrl("support-us") && "active"
                    }`}
                    as={Link}
                    to="/support-us"
                    eventKey="/support-us"
                  >
                    <FormattedMessage id="menu.support" />
                  </Nav.Link>
                  <p className="nav__main-link d-none d-xl-block">|</p>
                  <Nav.Link
                    as={Link}
                    to="/administrative"
                    eventKey="/administrative"
                    className={`nav__secondary-link ${
                      isCurrentUrl("administrative") && "active"
                    }`}
                  >
                    <FormattedMessage id="menu.administrative" />
                  </Nav.Link>
                  {!isTabletScreenV ? (
                    <NavDropdown
                      title={
                        <div className="display-flag">
                          <span>{flag === "en" ? "EN" : "BG"}</span>
                        </div>
                      }
                      className="nav__main-link dropdown-lang"
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item
                        className={flag === "bg" && "active"}
                        onClick={(e) => setLanguage("bg", e)}
                      >
                        <span>BG</span>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className={flag === "en" && "active"}
                        onClick={(e) => setLanguage("en", e)}
                      >
                        <span>EN</span>
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
                      // onClick={(e) => {
                        // handleShowModal("modal-redirect", "Z_fondove.html", e);
                      // }}
                      as={Link}
                      to="/main-collections"
                      eventKey="/main-collections"
                    >
                      <FormattedMessage id="menu.main-collections" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="nav__secondary-link"
                      // onClick={(e) => {
                        // handleShowModal("modal-redirect", "Z_vir_fondove.html", e);
                      // }}
                      as={Link}
                      to="/virtual-collections"
                      eventKey="/virtual-collections"
                    >
                      <FormattedMessage id="menu.virtual-collections" />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    as={Link}
                    to="/exhibitions"
                    eventKey="exhibitions"
                    className={`nav__main-link ${
                      isCurrentUrl("exhibitions") && "active"
                    }`}
                  >
                    <FormattedMessage id="menu.exhibitions" />
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/news-and-events"
                    eventKey="news"
                    className={`nav__main-link ${
                      isCurrentUrl("news-and-events") ||
                      isCurrentUrl("news") ||
                      isCurrentUrl("events")
                        ? "active"
                        : ""
                    }`}
                  >
                    <FormattedMessage id="menu.news" />
                  </Nav.Link>
                  <NavDropdown
                    title={intl.formatMessage({ id: "menu.about-us" })}
                    className={`nav__main-link ${
                      isCurrentUrl("museum-games") ||
                      isCurrentUrl("about-us") ||
                      isCurrentUrl("services") ||
                      isCurrentUrl("prices")
                        ? "active"
                        : ""
                    }`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      className={`nav__secondary-link ${
                        isCurrentUrl("about-us") && "active"
                      }`}
                      as={Link}
                      to="/about-us"
                      eventKey="/about-us"
                    >
                      <FormattedMessage id="menu.about-museum" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className={`nav__secondary-link ${
                        isCurrentUrl("museum-games") && "active"
                      }`}
                      as={Link}
                      to="/museum-games"
                      eventKey="/museum-games"
                    >
                      <FormattedMessage id="games" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className={`nav__secondary-link ${
                        isCurrentUrl("services") && "active"
                      }`}
                      as={Link}
                      to="/services"
                      eventKey="/services"
                    >
                      <FormattedMessage id="services" />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className={`nav__secondary-link ${
                        isCurrentUrl("prices") && "active"
                      }`}
                      as={Link}
                      to="/prices"
                      eventKey="/prices"
                    >
                      <FormattedMessage id="prices" />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    as={Link}
                    to="/contact-us"
                    eventKey="/contact-us"
                    className={`nav__main-link ${
                      isCurrentUrl("contact-us") && "active"
                    }`}
                  >
                    <FormattedMessage id="menu.contact-us" />
                  </Nav.Link>
                  <p className="nav__main-link nav__main-link__separate-line">
                    <span className="d-none d-xl-block">|</span>
                  </p>
                  <Nav.Link
                    as={Link}
                    to="/house-museum-laszlo-nagy"
                    eventKey="/house-museum-laszlo-nagy"
                    className={`nav__main-link ${
                      isCurrentUrl("house-museum-laszlo-nagy") && "active"
                    }`}
                  >
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
