import React from 'react';
import './Banner.scss';

const Banner = props => (
    <section id="home-slide" className="header-margin-color-line Banner">
        <div className="home-slider carousel">
            <div className="crsl-wrap">
                <figure className="crsl-item" id="banner-image" style={{ backgroundImage: (props.banner) ? `url(${props.banner.image})` : null}}>
                    <div className="container slider-box">
                        <div className="content">
                            <h2 id="banner-1-top-text">{(props.banner) ? props.banner.small : null}</h2>
                        </div>
                        <div className="content">
                            <h1 id="banner-1-big-text">{(props.banner) ? props.banner.large : 'loading...'}</h1>
                        </div>
                    </div>
                </figure>
            </div>
        </div>
    </section>
);

export default Banner;