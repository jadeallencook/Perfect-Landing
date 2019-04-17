import React, { Component } from 'react';
import './Browse.scss';
import Banner from '../components/browse/Banner';
import Search from '../components/browse/Search';
import Results from '../components/browse/Results';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div className="Browse">
                <Banner></Banner>
                <section id="grid-content">
                    <div className="container">
                        <div className="row">
                            <Results properties={this.props.properties} calendars={this.props.calendars} filters={this.props.filters}></Results>
                            <Search search={this.props.search} filters={this.props.filters}></Search>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Browse;
