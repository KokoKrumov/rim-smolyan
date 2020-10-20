import React from 'react';
import rimLogo from '../../assets/images/rim-logo.svg'
import searchIcon from '../../assets/images/search-icon.svg'
import BG from '../../assets/images/BG.svg'
import EN from '../../assets/images/EN.png'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import {FormattedMessage} from 'react-intl'

function Header({showModal}) {
    function setLanguage(lang, e) {
        e.preventDefault();
        localStorage.setItem('lang', lang);
        window.location.reload();
    }

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
                                Регионален Исторически
                                Музей “Стою Шишков” -
                                Смолян
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
                                        placeholder="Търсене"
                                        aria-label="Търсене"
                                        aria-describedby="search in  rim website"
                                    />
                                </InputGroup>
                                <Nav className="header-navigation__inner__child">
                                    <Nav.Link
                                        href="#"
                                        onClick={(e) => {
                                            showModal(e)
                                        }}
                                        className='nav__secondary-link'>
                                        Подкрепете дейността ни
                                    </Nav.Link>
                                    <p className='nav__main-link'>|</p>
                                    <Nav.Link href="#"
                                              onClick={(e) => {
                                                  showModal(e)
                                              }}
                                              className='nav__secondary-link'>
                                        Административни
                                    </Nav.Link>
                                    <NavDropdown
                                        title={
                                            <div className="">
                                                <img className="thumbnail-image"
                                                     src={BG}
                                                     alt="lang"
                                                />
                                            </div>
                                        }
                                        className='nav__main-link dropdown-lang'
                                        id="collasible-nav-dropdown">
                                        <NavDropdown.Item>
                                            <img className="thumbnail-image" src={BG} alt="" itemProp="image"
                                                 onClick={(e) => setLanguage('bg', e)}/>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <img className="thumbnail-image" src={EN} alt="" itemProp="image"
                                                 onClick={(e) => setLanguage('en', e)}/>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </div>
                            <div className='header-navigation__nav'>
                                <Nav className="" activeKey="/news">
                                    <NavDropdown title="Фондове" className='nav__main-link'
                                                 id="collasible-nav-dropdown">
                                        <NavDropdown.Item
                                            className="nav__secondary-link"
                                            onClick={(e) => {
                                                showModal(e)
                                            }}
                                            href="#">
                                            Основни Фондове
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className="nav__secondary-link"
                                            onClick={(e) => {
                                                showModal(e)
                                            }}
                                            href="#">
                                            Виртуални фондове
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link
                                        href="#"
                                        onClick={(e) => {
                                            showModal(e)
                                        }}
                                        className='nav__main-link '>
                                        Експозиции
                                    </Nav.Link>
                                    <Nav.Link href="/news" eventKey="news" className='nav__main-link'>
                                        <FormattedMessage id="header.menu.news"/>
                                    </Nav.Link>
                                    <Nav.Link href="/about-us" className='nav__main-link'>
                                        <FormattedMessage id="header.menu.about-us"/>
                                    </Nav.Link>
                                    <Nav.Link href="/contacts" className='nav__main-link'>
                                        контакти
                                    </Nav.Link>
                                    <p className='nav__main-link'>|</p>
                                    <Nav.Link
                                        href="#"
                                        onClick={(e) => {
                                            showModal(e)
                                        }}
                                        className='nav__main-link'>
                                        Къща музей Ласло Наги
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

export default Header;
