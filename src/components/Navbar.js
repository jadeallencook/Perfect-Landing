import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import contact from '../information/contact.json';

const Navbar = props => (
    <header className="menu-color-line" id="header-container-box">
        <div className="info">
            <div className="container">
                <div className="row">
                    <a id="mobile-menu-button" href="#mobile-menu" className="visible-xs"><i className="fa fa-bars"></i></a>
                    <div className="col-md-2 logo-withe">
                        <Link to="/"><img src="./assets/images/logo_x1_w.png" alt="Perfect Landing Rentals Logo" /></Link>
                    </div>
                    <div className="col-md-10 hidden-xs" id="login-pan">
                        <a href="call:1-989-362-3300">
                            <i className="icon fa fa-phone"></i>
                            { contact.phone }
                        </a>
                        <a className="hidden-sm" href="contact/">
                            <i className="icon fa fa-envelope-o"></i>
                            { contact.email }
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="container" id="menu-nav">
            <nav id="navigation">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/browse">Browse</Link>
                    </li>
                    <li>
                        <a href="http://www.rentals4you.info/" rel="noopener noreferrer" target="_blank">Monthly Rentals</a>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Navbar;