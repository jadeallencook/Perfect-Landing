import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import config from './information/firebase.json';
import './App.scss';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Browse from './pages/Browse';
import Property from './pages/Property';
import Review from './pages/Review';
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
            },
            blogs: [],
            banner: {},
            featured: [],
            calendars: {}
        };
        firebase.initializeApp(config);
    }

    componentDidMount() {
        firebase.database().ref('/banner').on('value', snapshot => {
            this.setState({
                ...this.state,
                banner: snapshot.val()
            });
        });
        firebase.database().ref('/blogs').on('value', snapshot => {
            this.setState({
                ...this.state,
                blogs: snapshot.val()
            });
        });
        firebase.database().ref('/featured').on('value', snapshot => {
            this.setState({
                ...this.state,
                featured: snapshot.val()
            });
        });
        firebase.database().ref('/calendars').on('value', snapshot => {
            this.setState({
                ...this.state,
                calendars: snapshot.val()
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
                    <Route
                        path="/review/:uid"
                        render={route => {
                            return <Review
                                uid={route.match.params.uid}
                                properties={this.props.properties}
                            />
                        }}
                    />
                    <Route path="/property/:id" render={route => {
                        return <Property
                            property={this.props.properties[Number(route.match.params.id)]}
                            filters={this.state.filters}
                            calendar={(Object.keys(this.state.calendars).length) ? this.state.calendars[Number(route.match.params.id)] : null}
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
                            calendars={this.state.calendars}
                        />
                    )} />
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;