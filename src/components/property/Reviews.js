import React, { Component } from 'react';
import './Reviews.scss';
import format from '../../services/format';

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
                        (this.props.reviews && Object.keys(this.props.reviews).length > 0) ? Object.keys(this.props.reviews).map(key => {
                            const { name, review, response, overall, date } = this.props.reviews[key];
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
