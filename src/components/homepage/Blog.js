import React from 'react';
import './Blog.scss';

const Blog = props => (
    <section id="recent-news">
        <div className="section-detail">
            <h1>Recent News</h1>
            <h2>If you need assistance in finding your ideal rental just give us a call!</h2>
        </div>
        <div className="container" id="blog">
            <div className="row">
                {
                    (props.blogs) ? Object.keys(props.blogs).map(key => {
                        const blog = props.blogs[key];
                        return (
                            <div className="col-md-4" key={key}>
                                <div className="blog-list masonry-post">
                                    <div className="image blog-image" style={{ backgroundImage: `url(assets/images/stairs.jpg)`}}></div>
                                    <div className="text">
                                        <h3 className="subtitle">{blog.title}</h3>
                                        <span>{blog.description}</span>
                                    </div>
                                    <a className="btn btn-default button-read" href='#'>Read now</a>
                                </div>
                            </div>
                        );
                    }) : null
                }
            </div>
        </div>
    </section>
);

export default Blog;