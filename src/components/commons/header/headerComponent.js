import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

import { getCookie } from '../../../utils/cookies';

import './headerComponent.css';

import asteriskilogo from '../../assets/asteriski-logo.png';
import '../../assets/rotating-logo.css';

class HeaderComponent extends Component {
    componentDidMount() {
        document.title = 'Jäsenrekisteri';
    }

    render() {
        return (
            <div className="header-container">
                <Navbar variant="dark" bg="dark" expand="lg">
                    <Navbar.Brand href="/member">
                        <img
                            alt="navbar-brand"
                            width="32"
                            height="32"
                            className="d-inline-block align-top rotating-logo"
                            src={asteriskilogo}
                        />{' '}
                        Jäsenrekisteri
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {getCookie('role').toLowerCase() === 'admin' ||
                            getCookie('role').toLowerCase() === 'board' ? (
                                <Nav.Link href="/admin">Hallinta</Nav.Link>
                            ) : null}
                            <Nav.Link href="/member">Tiedot</Nav.Link>
                            <Nav.Link href="/logout">Kirjaudu ulos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default HeaderComponent;
