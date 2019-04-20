import React, { Component } from 'react';
import './Reviews.scss';
import * as firebase from 'firebase/app';
import 'firebase/database';

class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: {},
            results: [],
            delete: false,
            property: '',
            review: {
                name: '',
                date: '',
                id: '',
                overall: '',
                review: '',
                response: ''
            },
            error: {
                search: null
            }
        };
    }

    componentDidMount() {
        firebase.database().ref('reviews').on('value', snapshot => {
            this.setState({
                reviews: snapshot.val()
            });
        });
    }

    search(id) {
        const results = (this.state.reviews[id]) ? Object.keys(this.state.reviews[id]).map(key => {
            return {
                ...this.state.reviews[id][key],
                ...{
                    id: key
                }
            }
        }) : [];
        this.setState({
            results: results,
            property: id
        });
    }

    delete(id, sudo) {
        if (!this.state.delete && id) {
            this.setState({
                delete: (this.state.delete) ? false : id
            });
        } else if (this.state.delete && id && sudo) {
            firebase.database().ref(`reviews/${this.state.property}/${id}`).remove(error => {
                if (error) {
                    this.error('search', error.message);
                } else {
                    this.search(this.state.property);
                }
            });
            this.setState({
                delete: false
            });
        } else if (this.state.delete && !id) {
            this.setState({
                delete: false
            });
        } else {
            this.setState({
                delete: false
            });
        }
    }

    add(event) {
        event.preventDefault();
        const inputs = [...event.target.children];
        let obj = {};
        inputs.forEach(input => {
            const key = input.getAttribute('data-key');
            if (key) obj[key] = input.value;
        });
        firebase.database().ref(`reviews/${obj.id}`).push(obj).then(() => {
            this.setState({
                ...this.state,
                ...{
                    review: {
                        name: '',
                        date: '',
                        id: '',
                        overall: '',
                        review: '',
                        response: ''
                    }
                }
            }, () => {
                this.search(obj.id);
            });
        })
    }

    handler(key, value) {
        let review = this.state.review;
        review[key] = value;
        this.setState({
            ...this.state,
            review: review
        });
    }

    error(key, error) {
        let obj = {};
        obj[key] = error;
        this.setState({
            ...this.state,
            error: obj
        });
        setTimeout(() => {
            obj[key] = null;
            this.setState({
                ...this.state,
                error: false
            });
        }, 3000);
    }


    render() {
        return (
            <div className="Reviews">
                <h3>Reviews</h3>
                <form onSubmit={this.add.bind(this)}>
                    <input type="text" className="form-control" data-key="name" placeholder="Name" onChange={event => this.handler('name', event.target.value)} value={this.state.review.name} required />
                    <input type="date" className="form-control" data-key="date" placeholder="Date" onChange={event => this.handler('date', event.target.value)} value={this.state.review.date} required />
                    <input type="number" className="form-control" data-key="id" placeholder="Property ID" onChange={event => this.handler('id', event.target.value)} value={this.state.review.id} required />
                    <input type="number" className="form-control" data-key="overall" placeholder="Overall (0-5)" onChange={event => this.handler('overall', event.target.value)} value={this.state.review.overall} required />
                    <textarea type="text" className="form-control" data-key="review" placeholder="Description" onChange={event => this.handler('review', event.target.value)} value={this.state.review.review} required></textarea>
                    <textarea type="text" className="form-control" data-key="response" placeholder="Response" onChange={event => this.handler('response', event.target.value)} value={this.state.review.response} ></textarea>
                    <input type="submit" className="btn-primary" />
                </form>
                <h3>Pending</h3>
                <h4>No reviews pending...</h4>
                <h3>Search</h3>
                <input type="number" className="form-control" placeholder="Property ID" onChange={event => this.search(event.target.value)} value={this.state.property} />
                {
                    (this.state.error.search) ? <span className="error">{this.state.error.search}</span> : null
                } {
                    (this.state.results.length > 0) ?
                        this.state.results.map((result, x) => {
                            const date = new Date(result.date);
                            return (
                                <div key={`review-${x}`}>
                                    <h4>{result.name} ({result.overall}/5)</h4>
                                    <h5>{`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</h5>
                                    <h5><b>Review: </b>{result.review}</h5>
                                    {
                                        (result.response) ? <h5><b>Response: </b>{result.response}</h5> : null
                                    } {
                                        (this.state.delete !== result.id) ?
                                            <button className="btn-danger" onClick={() => this.delete(result.id)}>Delete</button> :
                                            <div>
                                                <button className="btn-danger" onClick={() => this.delete(result.id, true)}>Yes I'm Sure</button>
                                                <button className="btn-primary" onClick={() => this.delete(false)}>No Keep It</button>
                                            </div>
                                    }
                                </div>
                            );
                        }) : <h4>No results...</h4>
                }
            </div>
        )
    }
}

export default Reviews;