import React, { Component } from 'react';
import './Home.scss';

import Banner from '../components/homepage/Banner';
import Featured from '../components/homepage/Featured';
import Search from '../components/homepage/Search';

class Home extends Component {
    constructor() {
        super();
        window.scrollTo(0, 0);
    }
    
    render() {
        return (
        <div className="Home">
            <Banner />
            <Search search={this.props.search} filters={this.props.filters} />
            <Featured properties={this.props.properties} />
        </div>
        );
    }
}

export default Home;
