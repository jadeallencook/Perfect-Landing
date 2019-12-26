import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Calendars.scss';

class Calendars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calendars: {},
            property: '',
            calendar: ''
        };
    }

    addCalendar() {
        firebase.database()
            .ref(`/calendars/${this.state.property}`)
            .set(this.state.calendar).then(error => {
                if (!error) {
                    this.setState({
                        ...this.state,
                        property: '',
                        calendar: ''
                    });
                }
            });
    }

    deleteCalendar(property) {
        firebase
            .database()
            .ref(`/calendars/${property}`)
            .remove();
    }

    render() {
        return (
            <div className="Calendars">
                <h2>Calendars</h2>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <input
                            value={this.state.property}
                            type="number"
                            className="form-control"
                            placeholder="Property"
                            onChange={event => {
                                this.setState({ ...this.state, property: event.target.value });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <input
                            value={this.state.calendar}
                            type="number"
                            className="form-control"
                            placeholder="Calendar"
                            onChange={event => {
                                this.setState({ ...this.state, calendar: event.target.value });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <button className="btn btn-primary" onClick={this.addCalendar.bind(this)}>Add Calendar</button>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Property</th>
                            <th scope="col">Calendar</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(this.props.calendars).map(property => {
                                return (
                                    <tr key={property}>
                                        <td>{property}</td>
                                        <td>{this.props.calendars[property]}</td>
                                        <td><span className="delete" onClick={() => this.deleteCalendar(property)}>Delete</span></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div >
        );
    }
}

export default Calendars;
