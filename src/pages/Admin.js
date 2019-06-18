import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Admin.scss';
import firebase from 'firebase/app';
import 'firebase/auth';

import Login from '../components/admin/Login';
import Home from '../components/admin/Home';
import Banner from '../components/admin/Banner';
import Featured from '../components/admin/Featured';
import Blogs from '../components/admin/Blogs';
import Reviews from '../components/admin/Reviews';
import Messages from '../components/admin/Messages';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            auth: false
        };
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                auth: (user) ? true : false
            });
        });
    }

    signin(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
            this.setState({
                error: error.message
            });
            this.resetError();
        });
    }

    signout() {
        firebase.auth().signOut().catch(error => {
            this.setState({
                error: error.message
            });
            this.resetError();
        });
    }

    resetError() {
        setTimeout(() => {
            this.setState({
                error: false
            });
        }, 3000);
    }

    render() {
        return (
            <div className="Admin">
                {
                    (this.state.auth) ?
                        <Router>
                            <Home signout={this.signout.bind(this)} />
                            <Route exact path="/dashboard" render={() => {
                                return (<Banner banner={this.props.banner} />)
                            }}></Route>
                            <Route path="/dashboard/banner" render={() => {
                                return (<Banner banner={this.props.banner} />)
                            }}></Route>
                            <Route path="/dashboard/featured" render={() => {
                                return (<Featured featured={this.props.featured} />)
                            }}></Route>
                            <Route path="/dashboard/blogs" render={() => {
                                return (<Blogs blogs={this.props.blogs} />)
                            }}></Route>
                            <Route path="/dashboard/reviews" render={() => {
                                return (<Reviews />)
                            }}></Route>
                            <Route path="/dashboard/messages" render={() => {
                                return (<Messages />)
                            }}></Route>
                        </Router>
                        : <Login signin={this.signin.bind(this)} error={this.state.error} />
                }
            </div>
        );
    }
}

export default Admin;
