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
            <ul>
                <Link to="/dashboard/banner" className="btn btn-primary"><li>Banner</li></Link>
                <Link to="/dashboard/featured" className="btn btn-primary"><li>Featured</li></Link>
                <Link to="/dashboard/blogs" className="btn btn-primary"><li>Blogs</li></Link>
                <Link to="/dashboard/reviews" className="btn btn-primary"><li>Reviews</li></Link>
                <a onClick={this.props.signout} className="btn"><li>Logout</li></a>
            </ul>
        </div>
        );
    }
}

export default Home;
