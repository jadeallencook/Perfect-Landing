import React, { Component } from 'react';
import './Contact.scss';

class Contact extends Component {
    constructor() {
        super();
        this.state = {};
    }

    send(event) {
        event.preventDefault();
        console.log('send');
    }

    render() {
        return (
        <div className="Contact">
            <h1>Contact Us</h1>
            <form onSubmit={this.send}>
                <input className="form-control" placeholder="Name" type="text" />
                <input className="form-control" placeholder="Email" type="email" />
                <textarea className="form-control" placeholder="Type your message here..."></textarea>
                <input className="btn btn-primary" type="submit" value="Send" />
            </form>
        </div>
        );
    }
}

export default Contact;
