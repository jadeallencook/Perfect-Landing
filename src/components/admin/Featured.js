import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Featured.scss';

class Featured extends Component {
    constructor(props) {
        super(props);
        const temp = {
            featured: {
                0: '',
                1: '',
                2: ''
            },
            error: null,
            success: null
        }
        this.state = (props.featured) ? {
            ...temp,
            featured: {
                ...props.featured
            }
        } : {
                ...temp
            }
    }

    submit(event) {
        event.preventDefault();
        firebase.database().ref('featured/').set({ ...this.state.featured }).then(error => {
            if (!error) {
                this.setState({
                    ...this.state,
                    success: 'Succeessfully saved!'
                });
            } else {
                this.setState({
                    ...this.state,
                    error: error
                });
            }
            setTimeout(this.reset.bind(this), 3000);
        });
    }

    reset() {
        this.setState({
            ...this.state,
            error: null,
            success: null
        })
    }

    handler(event) {
        let obj = this.state.featured;
        const key = Number(event.target.getAttribute('data-key'));
        obj[key] = event.target.value;
        this.setState({
            ...this.state,
            featured: {
                ...obj
            }
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            featured: {
                ...props.featured
            }
        });
    }

    render() {
        return (
            <div className="Featured">
                <h3>Featured</h3>
                {
                    (this.props.featured) ? (
                        <form onSubmit={this.submit.bind(this)}>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Property 1 ID"
                                value={this.state.featured[0]}
                                data-key="0"
                                onChange={this.handler.bind(this)}
                            />
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Property 2 ID"
                                value={this.state.featured[1]}
                                data-key="1"
                                onChange={this.handler.bind(this)}
                            />
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Property 3 ID"
                                value={this.state.featured[2]}
                                data-key="2"
                                onChange={this.handler.bind(this)}
                            />
                            {(this.state.success) ? <span className="success">{this.state.success}</span> : null}
                            {(this.state.error) ? <span className="error">{this.state.error}</span> : null}
                            <input type="submit" className="btn btn-primary" value="Save" />
                        </form>
                    ) : (<p>Loading...</p>)
                }
            </div>
        );
    }
}

export default Featured;
