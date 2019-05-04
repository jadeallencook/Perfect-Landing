import React, { Component } from 'react';
import './Reviews.scss';

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="Reviews details">
                <div className="row feedback">
                    {
                        (Object.keys(this.props.reviews).length) ? Object.keys(this.props.reviews).map(key => {
                            const review = this.props.reviews[key];
                            return (
                                <div className="user-feedback" key={key}>
                                    <span className="name">{review.name}</span>
                                    <span className="text">{review.review}</span>
                                    <span className="vote">
                                        {
                                            new Array(5).fill(0).map((num, x) => {
                                                const { overall } = review;
                                                return (x < Number(overall)) ?
                                                    (<i key={`review-${key}-${x}`} className="fa fa-star"></i>) :
                                                    (<i key={`review-${key}-${x}`} className="fa fa-star-o"></i>);
                                            })
                                        }
                                    </span>
                                    <span className="date">{review.date}</span>
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
