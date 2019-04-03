import React from 'react';
import './Banner.scss';

const Banner = props => (
    <section id="home-slide" className="header-margin-color-line Banner">
        <div className="home-slider carousel">
            <div className="crsl-wrap">
                <figure className="crsl-item" id="banner-image">
                    <div className="container slider-box">
                        <div className="content">
                            <h2 id="banner-1-top-text">Northern Michigan's</h2>
                        </div>
                        <div className="content">
                            <h1 id="banner-1-big-text">Perfect Landing</h1>
                        </div>
                    </div>
                </figure>
            </div>
        </div>
    </section>
);

export default Banner;