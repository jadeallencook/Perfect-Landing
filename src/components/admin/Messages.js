import React, { Component } from 'react';
import './Messages.scss';
import * as firebase from 'firebase/app';
import 'firebase/database';

class Messages extends Component {

    constructor() {
        super();
        this.state = {
            messages: null
        };
    }

    loadMessages() {
        firebase.database().ref('messages/').once('value', snapshot => {
            this.setState({
                ...this.state,
                messages: snapshot.val() ? Object.keys(snapshot.val()).map(uid => {
                    return {
                        ...snapshot.val()[uid],
                        uid: uid
                    };
                }) : []
            });
        });
    }

    componentDidMount() {
        this.loadMessages();
    }

    render() {
        return (
            <div className="Messages">
                <ul>
                    {
                        this.state.messages && this.state.messages.length > 0 ? this.state.messages.map(obj => {
                            const { email, message, name, uid } = obj;
                            return (
                                <li key={uid}>
                                    <b>Name: </b> {name}<br />
                                    <b>Email: </b> {email}<br />
                                    <b>Message: </b> {message}<br /><br />
                                    <button className="btn btn-danger" onClick={() => {
                                        firebase.database().ref(`messages/${uid}`).remove();
                                        this.loadMessages();
                                    }}>Delete</button>
                                </li>
                            );
                        }) : !this.state.messages ? <b>Loading messages...</b>: <b>No new messages!</b>
                    }
                </ul>
            </div>
        );
    }
}

export default Messages;
