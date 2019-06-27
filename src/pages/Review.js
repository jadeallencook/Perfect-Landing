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
        firebase
            .database()
            .ref(`pending/${this.props.uid}`)
            .once('value', snapshot => {
                this.setState({
                    ...this.state,
                    flag: (snapshot.val()) ? 1 : 2,
                    review: snapshot.val()
                });
            });
    }

    handler(event) {
        event.preventDefault();
        const overall = Number(event.target.querySelector('select').value);
        const review = event.target.querySelector('textarea').value;
        const elem = event.target;
        if (overall && review && this.state.flag === 1) {
            firebase.database().ref(`pending/${this.props.uid}`).set({
                ...this.state.review,
                review: review,
                overall: overall
            }).then(value => {
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
                                <input type="text" className="form-control" value={this.state.review.name} disabled required />
                                <br />
                                <label>Date: </label>
                                <input type="text" className="form-control" value={this.state.review.date} disabled required />
                                <br />
                                <label>Property (<Link to={`/property/${this.state.review.id}`}>link</Link>): </label>
                                <input type="text" className="form-control" value={this.state.review.id} disabled required />
                                <br />
                                <label>Overall: </label>
                                <select className="form-control" defaultValue={this.state.review.overall} required>
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
                                <textarea className="form-control" defaultValue={this.state.review.review} placeholder="Write your review here..." required></textarea>
                                <br />
                                <input type="submit" value="Leave Review" className="btn btn-primary" />
                            </form>
                        </div>
                    ) : (
                            <div>
                                <h1>Review not found!</h1>
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
