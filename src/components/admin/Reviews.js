import React, { Component } from 'react';
import './Reviews.scss';

class Reviews extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
        <div className="Reviews">
            <h3>Reviews</h3>
            <input type="text" className="form-control" placeholder="Name" />
            <input type="text" className="form-control" placeholder="Date" />
            <input type="text" className="form-control" placeholder="Property ID" />
            <input type="text" className="form-control" placeholder="Overall (0-5)" />
            <textarea type="text" className="form-control" placeholder="Description"></textarea>
            <textarea type="text" className="form-control" placeholder="Response"></textarea>
            <button className="btn-primary">Add</button>
            <h3>Pending</h3>
            <h4>No reviews pending...</h4>
            <h3>Recent</h3>
            <h4>No recent reviews...</h4>
        </div>
        );
    }
}

export default Reviews;
