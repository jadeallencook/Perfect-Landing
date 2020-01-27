import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.scss';

import Banner from '../components/homepage/Banner';
import Featured from '../components/homepage/Featured';
import Search from '../components/homepage/Search';
import About from '../components/homepage/About';
import Blog from '../components/homepage/Blog';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            hash: window.location.hash.replace('#', '')
        };
        window.scrollTo(0, 0);
    }
    
    render() { 
        console.log(this.props);
        return (
        <div className="Home">
            { (this.state.hash) ? <Redirect to={`/property/${this.state.hash}`} /> : null }
            <Banner banner={this.props.banner} />
            <Search search={this.props.search} filters={this.props.filters} properties={this.props.properties} />
            <Featured properties={this.props.properties} featured={this.props.featured} />
            <About />
            <Blog blogs={this.props.blogs} />
        </div>
        );
    }
}

export default Home;
