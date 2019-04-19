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

class Admin extends Component {
    constructor() {
        super();
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
                                return (<Banner />)
                            }}></Route>
                            <Route path="/dashboard/banner" render={() => {
                                return (<Banner />)
                            }}></Route>
                            <Route path="/dashboard/featured" render={() => {
                                return (<Featured />)
                            }}></Route>
                            <Route path="/dashboard/blogs" render={() => {
                                return (<Blogs />)
                            }}></Route>
                            <Route path="/dashboard/reviews" render={() => {
                                return (<Reviews />)
                            }}></Route>
                        </Router>
                        : <Login signin={this.signin.bind(this)} error={this.state.error} />
                }
            </div>
        );
    }
}

export default Admin;
