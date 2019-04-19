import React, { Component } from 'react';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div className="Login">
                <h1>Dashboard</h1>
                <input type="email" className="form-control" placeholder="jane@email.com" onChange={event => {
                    this.setState({ email: event.target.value });
                }} value={this.state.email} />
                <input type="password" className="form-control" placeholder="•••••••" onChange={event => {
                    this.setState({ password: event.target.value });
                }} value={this.state.password} />
                <span>{(this.props.error) ? this.props.error : null} </span>
                <button className="btn-primary" onClick={() => this.props.signin(this.state.email, this.state.password)}>Login</button>
            </div>
        );
    }
}

export default Login;