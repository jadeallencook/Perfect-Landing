import React, { Component } from 'react';
import './Blogs.scss';

class Blogs extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
        <div className="Blogs">
            <h3>Blogs</h3>
            <input type="text" className="form-control" placeholder="Title" />
            <input type="text" className="form-control" placeholder="Photo URL" />
            <textarea type="text" className="form-control" placeholder="Description"></textarea>
            <button className="btn-primary">Add</button>
            <h3>Recent</h3>
            <h4>No recent posts...</h4>
        </div>
        );
    }
}

export default Blogs;
