import React from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';

const Banner = props => (
    <section id="header-page" className="header-margin-base">
        <div className="skyline">
            <div data-offset="50" className="p1 parallax"></div>
            <div data-offset="25" className="p2 parallax"></div>
            <div data-offset="15" className="p3 parallax"></div>
            <div data-offset="8" className="p4 parallax"></div>
            <span className="cover"></span>
            <div className="container header-text">
                <div>
                    <h1 className="title">Browse Properties</h1></div>
                <div>
                    <h2 className="sub-title">Let's find you the perfect getaway</h2></div>
            </div>
        </div>
        <div id="breadcrumb">
            <div className="container">
                <ol className="breadcrumb">
                    <li><Link to="/"><i className="fa fa-home"></i></Link></li>
                    <li><Link to="/browse">Browse</Link></li>
                </ol>
            </div>
        </div>
        <span className="cover"></span>
    </section>
);

export default Banner;