import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import config from './information/firebase.json';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Browse from './pages/Browse';
import Property from './pages/Property';
import Contact from './pages/Contact';
import Dashboard from './pages/Admin';
import IDX from './pages/IDX';

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
        firebase.initializeApp(config);
    }

    componentDidMount() {
        firebase.database().ref('/').on('value', snapshot => {
            this.setState({
                ...this.state,
                ...snapshot.val()
            });
        });
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
                            banner={this.state.banner}
                            featured={this.state.featured}
                            blogs={this.state.blogs}
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
                            reviews={(this.state.reviews) ? this.state.reviews[Number(route.match.params.id)] : {}}
                            properties={Object.keys(this.props.properties).filter(key => filter(this.props.properties[key], this.state.filters)).map(key => this.props.properties[key])} />
                        }} />
                    <Route path="/contact" render={() => (
                        <Contact />
                    )} />
                    <Route path="/IDX" render={IDX} />
                    <Route path="/dashboard" render={() => (
                        <Dashboard 
                            banner={this.state.banner} 
                            featured={this.state.featured} 
                            blogs={this.state.blogs}
                        />
                    )} />
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;