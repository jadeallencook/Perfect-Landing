import React, { Component } from 'react';
import './Featured.scss';

class Featured extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
        <div className="Featured">
            <h3>Featured</h3>
            <input type="text" className="form-control" placeholder="Property 1 ID" />
            <input type="text" className="form-control" placeholder="Property 2 ID" />
            <input type="text" className="form-control" placeholder="Property 3 ID" />
            <button className="btn-primary">Save</button>
        </div>
        );
    }
}

export default Featured;
