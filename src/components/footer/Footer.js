import React from 'react';
import rimLogo from '../../assets/images/rim-logo.svg'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import fbLogo from '../../assets/images/facebook1.svg'
import twitterLogo from  '../../assets/images/twitter.svg'
import instagramLogo from  '../../assets/images/instagram.svg'
import jltLogo from  '../../assets/images/JLTLogo.svg'

function Footer() {
    return (
        <footer className="footer">
            <div className='footer__top'>
                <Container>
                    <Navbar collapseOnSelect expand="xl" variant="dark">
                        <div className='d-flex flex-column'>
                            <Navbar.Brand href="#home">
                                <div className="brand__wrap">
                                    <div className='brand-logo__wrap'>
                                        <Image src={rimLogo} fluid/>
                                    </div>
                                    <p className='brand-text'>
                                        Регионален Исторически
                                        Музей “Стою Шишков” -
                                        Смолян
                                    </p>
                                </div>
                            </Navbar.Brand>
                            <div className='socials'>
                                <div className='socials-item'>
                                    <a href="https://www.facebook.com/museum.smolyan" target="_blank" rel="noopener noreferrer">
                                        <img className="" src={fbLogo} alt="" itemProp="image"/>
                                    </a>
                                </div>
                                <div className='socials-item'>
                                    <a href="https://twitter.com/museum_sm" target="_blank" rel="noopener noreferrer">
                                        <img className="" src={twitterLogo} alt="" itemProp="image"/>
                                    </a>
                                </div>
                                <div className='socials-item'>
                                    <a href="https://www.instagram.com/museumsmolyan/" target="_blank" rel="noopener noreferrer">
                                        <img className="" src={instagramLogo} alt="" itemProp="image"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse className="footer__main-nav" id="responsive-navbar-nav">
                            <Nav className="">
                                <Nav.Link href="#features" className='nav__main-link'>Фондове</Nav.Link>
                                <Nav.Link href="#pricing" className='nav__main-link'>Експозиции</Nav.Link>
                                <Nav.Link href="/news" className='nav__main-link'>новини</Nav.Link>
                                <Nav.Link href="#pricing" className='nav__main-link'>за нас</Nav.Link>
                                <Nav.Link href="#pricing" className='nav__main-link'>контакти</Nav.Link>
                            </Nav>
                            <Nav className="">
                                <Nav.Link href="#features" className='nav__secondary-link'>Подкрепете дейността ни</Nav.Link>
                                <Nav.Link href="#pricing" className='nav__secondary-link'>Административни</Nav.Link>
                                <Nav.Link href="#pricing" className='nav__secondary-link'>Условия за поверителност</Nav.Link>
                            </Nav>
                            <Nav className="">
                                <Nav.Link href="#features" className='nav__main-link'>Къща музей Ласло Наги</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
            <div className='footer__bottom'>
                <Container>
                    <div className='footer__bottom__inner'>
                        <p className='nav__secondary-link'>
                            © 2020 Регионален исторически музей - Смолян
                        </p>
                        <p className='nav__secondary-link'>
                            Дизайн <img className="" style={{marginLeft: '5px'}} src={jltLogo} alt="" itemProp="image"/>
                        </p>
                    </div>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
