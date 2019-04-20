import React from 'react';
import './Footer.scss';
import social from '../information/social';
import contact from '../information/contact';
import { Link } from 'react-router-dom';

const Footer = props => (
    <footer id="footer-page" className="section-color">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-3">
                    <span className="title with-icon">
                        <img className="logo-footer" src="/assets/images/mini-logo-x1.png" alt="logo" />
                        About Us
            </span>
                    <span className="text">
                        Perfect Landing Specializes in Vacation & Monthly Rentals, in addition to Real Estate
                        Services, and Property Management.
            </span>
                </div>
                <div className="col-sm-6 col-md-3">
                    <span className="title">CALL US NOW</span>
                    <span className="phone"><i className="fa fa-phone"></i> {contact.phone}</span>

                    <span className="address">
                    </span> {contact.address.street} <strong>{contact.address.city}</strong>
                    <br />

                    <i className="fa fa-map-marker"></i> {contact.address.state} {contact.address.zipcode}
          </div>
                <div className="hidden-xs hidden-sm col-md-3">
                    <span className="title">Extras</span>
                    <ul className="link-extra">
                        <li><a href="idx/">Real Estate</a></li>
                        <li><a href="contact/">Contact Us</a></li>
                        <li><a href="http://www.rentals4you.info/" target="_blank"  rel="noopener noreferrer">Monthly Rentals</a></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-3">
                    <span className="title">Social Media</span> Happy to connect!
            <br />
                    <br />
                    <b>Feel Free To Email Us!</b>
                    <br /> {contact.email}
          </div>
            </div>
        </div>
        <div className="credits">
            <div className="container">
                <div id="badges-wrapper">
                    <img src="/assets/images/bbb-badge.png" alt="Better Business Bureau Logo" />
                    <img src="/assets/images/pure-michigan.png" alt="Pure Michigan Logo" />
                </div>
                <br />
                <div className="row">
                    <div className="hidden-xs col-md-9 credits-text">
                        Copyright <span id="footer-year">{new Date().getFullYear()}</span> 
                        <b id="perfectlanding"> Perfect Landing</b> | Developed By <b id="jadeallencook">Jade Allen
                Cook</b> | UI By <b id="andylab">AndyLab</b>
                    </div>
                    <div className="col-md-3">
                        <ul className="social-icons">
                            <li><a target="_blank" rel="noopener noreferrer" href={social.facebook} className="facebook"><i className="fa fa-facebook"></i></a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href={social.pinterest} className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href={social.instagram} className="instagram"><i className="fa fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;