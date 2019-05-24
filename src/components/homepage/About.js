import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

const About = props => (
    <section className="About" id="submit-property" data-parallax-speed="0">
        <span className="overlay"></span>
        <div className="container">
            <div className="section-detail">
                <h1>About Us</h1>
                <h2>Perfect Landing Specializes in Vacation &amp; Monthly Rentals, in addition to Real Estate Services,
                        and Property Management.</h2>
            </div>
            <div className="row text-center">
                <Link to="/browse" className="btn btn-reverse button-large">Browse Our Properties</Link>
            </div>
        </div>
    </section>
);

export default About;