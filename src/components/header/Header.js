import React from 'react';
import {Link} from "react-router-dom";
import rimLogo from '../../assets/images/rim-logo.svg'
import searchIcon from '../../assets/images/search-icon.svg'
import BG from '../../assets/images/BG.svg'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function Header() {
    return (
        <header className="header">
            <Container>
                <Navbar collapseOnSelect expand="xl" variant="dark">
                    <Navbar.Brand href="#home">
                        <div className="header-brand__wrap">
                            <div className='header-logo__wrap'>
                                <Image src={rimLogo} fluid/>
                            </div>
                            <p className='header-text'>
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
                                            <img className="" src={searchIcon} alt="" itemprop="image"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Търсене"
                                        aria-label="Търсене"
                                        aria-describedby="search in  rim website"
                                    />
                                </InputGroup>
                                <Nav className="header-navigation__inner__child">
                                    <Nav.Link href="#features" className='nav__secondary-link'>Подкрепете дейността
                                        ни</Nav.Link>
                                    <p className='nav__main-link'>|</p>
                                    <Nav.Link href="#pricing" className='nav__secondary-link'>Административни</Nav.Link>
                                    <NavDropdown
                                        title={
                                            <div className="">
                                                <img className="thumbnail-image"
                                                     src={BG}
                                                     alt="lang"
                                                />
                                            </div>
                                        } className='nav__main-link'
                                        id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">
                                            <img className="" src={BG} alt="" itemprop="image"/>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            <img className="" src={BG} alt="" itemprop="image"/>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </div>
                            <div className='header-navigation__nav'>
                                <Nav className="">
                                    <NavDropdown title="Фондове" className='nav__main-link'
                                                 id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#features" className='nav__main-link'>Експозиции</Nav.Link>
                                    <Nav.Link href="#pricing" className='nav__main-link'>новини</Nav.Link>
                                    <Nav.Link href="#pricing" className='nav__main-link'>за нас</Nav.Link>
                                    <Nav.Link href="#pricing" className='nav__main-link'>контакти</Nav.Link>
                                    <p className='nav__main-link'>|</p>
                                    <Nav.Link href="#pricing" className='nav__main-link'>Къща музей Ласло
                                        Наги</Nav.Link>
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
