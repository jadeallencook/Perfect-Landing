import React, { Component } from 'react';
import './Banner.scss';

class Banner extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
        <div className="Banner">
            <h3>Banner</h3>
            <input type="text" className="form-control" placeholder="Header Text" />
            <input type="text" className="form-control" placeholder="Subheader Text" />
            <input type="text" className="form-control" placeholder="Image URL" />
            <button className="btn-primary">Save</button>
        </div>
        );
    }
}

export default Banner;
