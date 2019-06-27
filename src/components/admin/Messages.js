import React, { Component } from 'react';
import './Messages.scss';
import * as firebase from 'firebase/app';
import 'firebase/database';

class Messages extends Component {

    constructor() {
        super();
        this.state = null;
    }

    componentDidMount() {
        firebase.database().ref('messages/').on('value', snapshot => {
            this.setState(snapshot.val());
        });
    }

    render() {
        return (
        <div className="Messages">
            <ul>
                {
                    this.state ? Object.keys(this.state).map(key => {
                        const { email, message, name } = this.state[key];
                        return (
                            <li key={key}>
                                <b>Name: </b> { name }<br />
                                <b>Email: </b> { email }<br />
                                <b>Message: </b> { message }<br /><br />
                                <button className="btn btn-danger" onClick={() => {
                                    firebase.database().ref(`messages/${key}`).remove();
                                }}>Delete</button>
                            </li>
                        );
                    }) : <li>Loading or no messages...</li>
                }
            </ul>
        </div>
        );
    }
}

export default Messages;
