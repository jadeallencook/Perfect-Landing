import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Banner.scss';

class Banner extends Component {
    constructor(props) {
        super(props);
        const temp = {
            banner: {
                small: '',
                large: '',
                image: ''
            },
            error: null,
            success: null
        }
        this.state = (props.banner) ? {
            ...temp,
            banner: {
                ...props.banner
            }
        } : {
                ...temp
            }
    }

    submit(event) {
        event.preventDefault();
        firebase.database().ref('banner/').set({ ...this.state.banner }).then(error => {
            if (!error) {
                this.setState({
                    ...this.state,
                    success: 'Successfully saved!'
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
        let obj = this.state.banner;
        const key = event.target.getAttribute('data-key');
        obj[key] = event.target.value;
        this.setState({
            ...this.state,
            banner: {
                ...obj
            }
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            banner: {
                ...props.banner
            }
        });
    }

    render() {
        return (
            <div className="Banner">
                <h3>Banner</h3>
                <p>Update this form to change text and images on the homepage!</p>
                <br />
                {
                    (this.props.banner) ? (
                        <form onSubmit={this.submit.bind(this)}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Subheader Text"
                                value={this.state.banner.small}
                                data-key="small"
                                onChange={this.handler.bind(this)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Header Text"
                                value={this.state.banner.large}
                                data-key="large"
                                onChange={this.handler.bind(this)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Image URL"
                                value={this.state.banner.image}
                                data-key="image"
                                onChange={this.handler.bind(this)}
                            />
                            <p>Free image hosting available at <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">ImgBB</a></p>
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

export default Banner;
