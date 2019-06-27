import React, { Component } from 'react';
import './Reviews.scss';
import format from '../../services/format';
import * as firebase from 'firebase/app';
import 'firebase/database';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: null
        };
    }

    componentDidMount() {
        firebase.database().ref(`reviews/${this.props.propid}/`).once('value').then(snapshot => {
            this.setState({
                reviews: snapshot.val()
            });
        });
    }

    render() {
        return (
            <div className="Reviews details">
                <div className="row feedback">
                    {
                        (this.state.reviews && Object.keys(this.state.reviews).length > 0) ? Object.keys(this.state.reviews).map(key => {
                            const { name, review, response, overall, date } = this.state.reviews[key];
                            return (
                                <div className="user-feedback" key={key}>
                                    <span className="name">{(name) ? name : 'anonymous'}</span>
                                    <span className="text">{review}</span>
                                    { 
                                        (response) ? (
                                            <span className="text response">
                                                <br />
                                                <b>@PerfectLandingRentals:</b> {response}
                                            </span>
                                        ) : null 
                                    }
                                    <span className="vote">
                                        {
                                            new Array(5).fill(0).map((num, x) => {
                                                return (x < Number(overall)) ?
                                                    (<i key={`review-${key}-${x}`} className="fa fa-star"></i>) :
                                                    (<i key={`review-${key}-${x}`} className="fa fa-star-o"></i>);
                                            })
                                        }
                                    </span>
                                    <span className="date">{format(date)}</span>
                                </div>
                            )
                        }) : (
                                <p>No reviews found...</p>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default Reviews;
