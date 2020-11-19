import React from 'react';
import rimLogo from '../../assets/images/rim-logo.svg'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import fbLogo from '../../assets/images/facebook1.svg'
import twitterLogo from '../../assets/images/twitter.svg'
import instagramLogo from '../../assets/images/instagram.svg'
import jltLogo from '../../assets/images/JLTLogo.svg'
import {showModal} from "../../actions";
import {connect} from "react-redux";
import {FormattedMessage} from 'react-intl'

function Footer({showModal}) {

    function handleShowModal(data, e) {
        e.preventDefault();
        showModal(data)
    }

    return (
        <footer className="footer">
            <div className='footer__top'>
                <Container>
                    <Navbar collapseOnSelect expand="xl" variant="dark">
                        <div className='d-flex flex-column'>
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
                            <div className='socials'>
                                <div className='socials-item'>
                                    <a href="https://www.facebook.com/museum.smolyan" target="_blank"
                                       rel="noopener noreferrer">
                                        <img className="" src={fbLogo} alt="" itemProp="image"/>
                                    </a>
                                </div>
                                <div className='socials-item'>
                                    <a href="https://twitter.com/museum_sm" target="_blank" rel="noopener noreferrer">
                                        <img className="" src={twitterLogo} alt="" itemProp="image"/>
                                    </a>
                                </div>
                                <div className='socials-item'>
                                    <a href="https://www.instagram.com/museumsmolyan/" target="_blank"
                                       rel="noopener noreferrer">
                                        <img className="" src={instagramLogo} alt="" itemProp="image"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse className="footer__main-nav" id="responsive-navbar-nav">
                            <Nav className="">
                                <Nav.Link
                                    onClick={(e) => {
                                        handleShowModal('modal-redirect', e)
                                    }}
                                    href="#"
                                    className='nav__main-link'>
                                    <FormattedMessage id="menu.collections"/>
                                </Nav.Link>
                                <Nav.Link
                                    onClick={(e) => {
                                        handleShowModal('modal-redirect', e)
                                    }}
                                    href="#"
                                    className='nav__main-link'>
                                    <FormattedMessage id="menu.exhibitions"/>
                                </Nav.Link>
                                <Nav.Link
                                    href="/news"
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
                            </Nav>
                            <Nav className="">
                                <Nav.Link
                                    onClick={(e) => {
                                        handleShowModal('modal-redirect', e)
                                    }}
                                    href="#"
                                    className='nav__secondary-link'>
                                    <FormattedMessage id="menu.support"/>
                                </Nav.Link>
                                <Nav.Link
                                    onClick={(e) => {
                                        handleShowModal('modal-redirect', e)
                                    }}
                                    href="#"
                                    className='nav__secondary-link'>
                                    <FormattedMessage id="menu.administrative"/>
                                </Nav.Link>
                                <Nav.Link
                                    onClick={(e) => {
                                        handleShowModal('modal-redirect', e)
                                    }}
                                    href="#"
                                    className='nav__secondary-link'>
                                    <FormattedMessage id="menu.privacy-policy"/>
                                </Nav.Link>
                            </Nav>
                            <Nav className="">
                                <Nav.Link
                                    onClick={(e) => {
                                        handleShowModal('modal-redirect', e)
                                    }}
                                    href="#"
                                    className='nav__main-link'>
                                    <FormattedMessage id="menu.house-museum"/>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
            <div className='footer__bottom'>
                <Container>
                    <div className='footer__bottom__inner'>
                        <p className='nav__secondary-link'>
                            <FormattedMessage id="copyright"/>
                        </p>
                        <p className='nav__secondary-link'>
                            <FormattedMessage id="design"/>
                            <img className="" style={{marginLeft: '5px'}} src={jltLogo} alt="" itemProp="image"/>
                        </p>
                    </div>
                </Container>
            </div>
        </footer>
    );
}


export default connect(
    null,
    {
        showModal
    }
)(Footer);

