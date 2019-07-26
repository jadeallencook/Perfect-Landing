import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import './Review.scss';

class Review extends Component {
    constructor() {
        super();
        this.state = {
            flag: 0
        };
    }

    componentWillMount() {
        const { properties, uid } = this.props;
        this.setState({
            flag: (properties[uid]) ? 1 : 2
        });
    }

    handler(event) {
        event.preventDefault();
        const elem = event.target;
        const overall = Number(elem.querySelector('select').value);
        const review = elem.querySelector('textarea').value;
        const name = elem.querySelector('input#name').value;
        const date = elem.querySelector('input[type="date"]').value;
        if (overall && review && this.state.flag === 1) {
            firebase.database().ref(`pending/`).push({
                date: date,
                name: name,
                review: review,
                overall: overall,
                property: this.props.uid
            }).then(() => {
                elem.innerHTML = '<h2>Thank you!</h2>';
            });
        }
    }

    render() {
        const { flag } = this.state;
        return (
            <div className="Review">
                {
                    flag ? flag === 1 && flag !== null ? (
                        <div>
                            <h1>Tell us about your stay!</h1>
                            <form onSubmit={this.handler.bind(this)}>
                                <label>Name: </label>
                                <input type="text" id="name" className="form-control" required />
                                <br />
                                <label>Date: </label>
                                <input type="date" className="form-control" required />
                                <br />
                                <label>Property (<Link to={`/property/${this.props.uid}`}>link</Link>): </label>
                                <input type="text" className="form-control" defaultValue={this.props.uid} disabled required />
                                <br />
                                <label>Overall: </label>
                                <select className="form-control" required>
                                    {
                                        new Array(5).fill(null).map((val, index) => {
                                            const num = 5 - index;
                                            return (
                                                <option value={num} key={num}>
                                                    {`Overall rating of ${num} out of 5`}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <br />
                                <label>Review: </label>
                                <textarea className="form-control" placeholder="Write your review here..." required></textarea>
                                <br />
                                <input type="submit" value="Leave Review" className="btn btn-primary" />
                            </form>
                        </div>
                    ) : (
                            <div>
                                <h1>Property not found!</h1>
                            </div>
                        ) : (
                            <div>
                                <h1>Starting session...</h1>
                                <p>Thanks for taking the time to leave a review!</p>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default Review;
