import React from 'react';
import rimLogo from '../../assets/images/rim-logo.svg'
import searchIcon from '../../assets/images/search-icon.svg'
import BG from '../../assets/images/bg.svg'
import EN from '../../assets/images/en.svg'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {showModal} from "../../actions";
import {connect} from "react-redux";
import {FormattedMessage, useIntl} from 'react-intl'

function Header({showModal}) {
    const intl = useIntl();

    function setLanguage(lang, e) {
        e.preventDefault();
        localStorage.setItem('lang', lang);
        window.location.reload();
    }

    function handleShowModal(data, url, e) {
        e.preventDefault();
        showModal(data, url)
    }

    let flag = localStorage.getItem('lang')

    return (
        <header className="header">
            <Container>
                <Navbar collapseOnSelect expand="xl" variant="dark">
                    <Navbar.Brand href="/">
                        <div className="brand__wrap">
                            <div className='brand-logo__wrap'>
                                <Image src={rimLogo} fluid/>
                            </div>
                            <p className='brand-text'>
                                <FormattedMessage id="headline"/>
                            </p>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className='header-navigation__wrap'>
                            <div className='header-navigation__inner'>
                                <InputGroup className="header-navigation__inner__child">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">
                                            <img className="" src={searchIcon} alt="" itemProp="image"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder={intl.formatMessage({id: 'menu.search'})}
                                        aria-label={intl.formatMessage({id: 'menu.search'})}
                                        aria-describedby={intl.formatMessage({id: 'menu.search-in'})}
                                    />
                                </InputGroup>
                                <Nav className={`header-navigation__inner__child ${flag}`}>
                                    <Nav.Link
                                        href="#"
                                        onClick={(e) => {
                                            handleShowModal('modal-redirect', '', e)
                                        }}
                                        className='nav__secondary-link'>
                                        <FormattedMessage id="menu.support"/>
                                    </Nav.Link>
                                    <p className='nav__main-link'>|</p>
                                    <Nav.Link href="/administrative"
                                              className='nav__secondary-link'>
                                        <FormattedMessage id="menu.administrative"/>
                                    </Nav.Link>
                                    <NavDropdown
                                        title={
                                            <div className="display-flag">
                                                <img className="thumbnail-image"
                                                     src={flag === 'en' ? EN : BG}
                                                     alt="lang"
                                                />
                                            </div>
                                        }
                                        className='nav__main-link dropdown-lang'
                                        id="collasible-nav-dropdown">
                                        <NavDropdown.Item
                                            onClick={(e) => setLanguage('bg', e)}
                                        >
                                            <img className="thumbnail-image" src={BG} alt="" itemProp="image"/>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={(e) => setLanguage('en', e)}
                                        >
                                            <img className="thumbnail-image" src={EN} alt="" itemProp="image"/>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </div>
                            <div className='header-navigation__nav'>
                                <Nav className="" activeKey="/news">
                                    <NavDropdown title={intl.formatMessage({id: 'menu.collections'})}
                                                 className='nav__main-link'
                                                 id="collasible-nav-dropdown">
                                        <NavDropdown.Item
                                            className="nav__secondary-link"
                                            onClick={(e) => {
                                                handleShowModal('modal-redirect','Z_fondove.html', e)
                                            }}
                                            href="#">
                                            <FormattedMessage id="menu.main-collections"/>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className="nav__secondary-link"
                                            onClick={(e) => {
                                                handleShowModal('modal-redirect','Z_vir_fondove.html', e)
                                            }}
                                            href="#">
                                            <FormattedMessage id="menu.virtual-collections"/>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link
                                        href="#"
                                        onClick={(e) => {
                                            handleShowModal('modal-redirect', 'Z_ekspozicia.html', e)
                                        }}
                                        className='nav__main-link '>
                                        <FormattedMessage id="menu.exhibitions"/>
                                    </Nav.Link>
                                    <Nav.Link
                                        href="/news"
                                        eventKey="news"
                                        className='nav__main-link'>
                                        <FormattedMessage id="menu.news"/>
                                    </Nav.Link>
                                    <Nav.Link
                                        href="/about-us"
                                        className='nav__main-link'>
                                        <FormattedMessage id="menu.about-us"/>
                                    </Nav.Link>
                                    <Nav.Link
                                        href="/contact-us"
                                        className='nav__main-link'>
                                        <FormattedMessage id="menu.contact-us"/>
                                    </Nav.Link>
                                    <p className='nav__main-link'>|</p>
                                    <Nav.Link
                                        href="#"
                                        className='nav__main-link not-allowed'>
                                        <FormattedMessage id="menu.house-museum"/>
                                    </Nav.Link>
                                </Nav>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

export default connect(
    null,
    {
        showModal
    }
)(Header);
