import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Blogs.scss';

class Blogs extends Component {
    constructor() {
        super();
        this.state = {
            blog: {
                title: '',
                link: '',
                photo: '',
                description: ''
            },
            error: '',
            success: '',
            blogs: {}
        };
    }

    handler(event) {
        const key = event.target.getAttribute('data-key');
        let obj = { ...this.state.blog };
        obj[key] = event.target.value;
        this.setState({
            ...this.state,
            blog: {
                ...obj
            }
        });
    }

    reset() {
        this.setState({
            ...this.state,
            ...{
                blog: {
                    title: '',
                    link: '',
                    photo: '',
                    description: ''
                },
                error: '',
                success: ''
            }
        })
    }

    submit(event) {
        event.preventDefault();
        firebase.database().ref('/blogs').push({ ...this.state.blog }).then(error => {
            if (error) {
                this.setState({ 
                    ...this.state, 
                    ...{
                        blog: {
                            title: '',
                            link: '',
                            photo: '',
                            description: ''
                        }
                    },
                    error: error.message });
            } else {
                this.setState({ 
                    ...this.state, 
                    ...{
                        blog: {
                            title: '',
                            link: '',
                            photo: '',
                            description: ''
                        }
                    },
                    success: 'Entry successfully added!' 
                });
            }
            setTimeout(this.reset.bind(this), 3000);
        });
    }

    remove(id) {
        firebase.database().ref(`blogs/${id}`).remove().then(error => {
            if (error) {
                this.setState({ 
                    ...this.state,
                    error: error.message 
                });
            }
            setTimeout(this.reset.bind(this), 3000);
        });
    }

    render() {
        return (
            <div className="Blogs">
                <h3>Blogs</h3>
                <form onSubmit={this.submit.bind(this)}>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Title" 
                        value={this.state.blog.title} 
                        data-key="title" 
                        onChange={this.handler.bind(this)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Link" 
                        value={this.state.blog.link} 
                        data-key="link" 
                        onChange={this.handler.bind(this)} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Photo" 
                        value={this.state.blog.photo} 
                        data-key="photo" 
                        onChange={this.handler.bind(this)} 
                        required 
                    />
                    <textarea 
                        className="form-control" 
                        placeholder="Description" 
                        value={this.state.blog.description} 
                        data-key="description" 
                        onChange={this.handler.bind(this)} 
                        required 
                    />
                    {(this.state.error) ? <p>{this.state.error}</p> : null}
                    {(this.state.success) ? <p>{this.state.success}</p> : null}
                    <input type="submit" className="btn btn-primary" value="Add" />
                </form>
                <h3>Recent</h3>
                <ul>
                {
                    (this.props.blogs && Object.keys(this.props.blogs).length) ? Object.keys(this.props.blogs).map((key, x) => {
                        const blog = this.props.blogs[key];
                        return (
                            <li key={key}>
                                <h4><b>{blog.title}</b></h4>
                                <p>{blog.description}</p>
                                <a rel="noopener noreferrer" href={blog.link} target="_blank">{blog.link}</a>
                                <img src={blog.photo} alt={`blog photo ${x + 1}`} />
                                <div>
                                    <button className="btn btn-danger" onClick={() => this.remove(key)}>Delete</button>
                                </div>
                            </li>
                        )
                    }) : <li>No blogs found...</li>
                }
                </ul>
            </div>
        );
    }
}

export default Blogs;
