import React, { Component } from 'react';
import './Contact.scss';
import * as firebase from 'firebase/app';
import 'firebase/database';

class Contact extends Component {

    constructor() {
        super();
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let captcha = '';
        for (let x = 0; x < 6; x++) {
            captcha += letters[Math.floor(Math.random() * 26)];
        }
        this.state = {
            name: '',
            email: '',
            message: '',
            captcha: captcha
        };
    }

    send(event) {
        event.preventDefault();
        const elem = document.getElementById('check');
        const robot = (elem.value.toLowerCase() !== this.state.captcha.toLowerCase()) ? true : false;
        if (!robot) {
            const form = document.getElementById('send-message');
            firebase.database().ref('messages/').push({
                ...this.state
            }).then(() => {
                form.innerHTML = '<h2>Thank you!<h2>';
            });
        } else {
            elem.style.border = 'solid thin red';
        }
    }

    render() {
        return (
        <div className="Contact">
            <h1>Contact Us</h1>
            <p><b>Email:</b> hello@perfectlandingrentals.com</p>
            <p><b>Phone:</b> (989) 362-3300</p>
            <p><b>Address:</b> 125 Birch Street Tawas City</p>
            <br />
            <form onSubmit={this.send.bind(this)} id="send-message">
                <input className="form-control" placeholder="Name" type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} required />
                <input className="form-control" placeholder="Email" type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} required />
                <textarea className="form-control" placeholder="Type your message here..." value={this.state.message} onChange={event => this.setState({ message: event.target.value })} required></textarea>
                <span>{ this.state.captcha } </span>
                <input className="form-control" id="check" placeholder="Enter letters above..." type="text" required />
                <input className="btn btn-primary" type="submit" value="Send" />
            </form>
        </div>
        );
    }
}

export default Contact;
