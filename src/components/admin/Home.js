import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
        <div className="Home">
            <h1>Dashboard</h1>
            <h2>Perfect Landing Rentals <span onClick={this.props.signout}>(Logout)</span></h2>
            <ul>
                <li><Link to="/dashboard/banner">Banner</Link></li>
                <li><Link to="/dashboard/featured">Featured</Link></li>
                <li><Link to="/dashboard/blogs">Blogs</Link></li>
                <li><Link to="/dashboard/reviews">Reviews</Link></li>
            </ul>
        </div>
        );
    }
}

export default Home;
