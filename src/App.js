import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Browse from './pages/Browse';
import Property from './pages/Property';
import Contact from './pages/Contact';

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
                        <Home properties={this.props.properties} search={this.search.bind(this)} filters={this.state.filters} />
                    )} />
                    <Route path="/browse" render={() => (
                        <Browse properties={this.props.properties} filters={this.state.filters} search={this.search.bind(this)} />
                    )} />
                    <Route path="/property/:id" render={() => (
                        <Property properties={this.props.properties} />
                    )} />
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
