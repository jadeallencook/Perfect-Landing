import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Browse from './pages/Browse';
import Property from './pages/Property';
import Contact from './pages/Contact';

import filter from './services/filter';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                name: '',
                checkin: '',
                checkout: '',
                city: '',
                beds: '',
                baths: '',
                amenities: []
            }
        };
    }

    search(key, value) {
        let obj = this.state.filters;
        obj[key] = value;
        this.setState({
            filters: obj
        });
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar />
                    <Route exact path="/" render={() => (
                        <Home 
                            properties={this.props.properties} 
                            search={this.search.bind(this)} 
                            filters={this.state.filters} 
                        />
                    )} />
                    <Route path="/browse" render={() => (
                        <Browse 
                            properties={this.props.properties} 
                            calendars={this.props.calendars} 
                            filters={this.state.filters} 
                            search={this.search.bind(this)} 
                        />
                    )} />
                    <Route path="/property/:id" render={route => {
                        return <Property 
                            property={this.props.properties[Number(route.match.params.id)]} 
                            filters={this.state.filters} 
                            properties={Object.keys(this.props.properties).filter(key => filter(this.props.properties[key], this.state.filters)).map(key => this.props.properties[key])} />
                        }} />
                    <Route path="/contact" render={() => (
                        <Contact />
                    )} />
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;