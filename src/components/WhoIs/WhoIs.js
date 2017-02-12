import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap'
import axios from 'axios';

import './WhoIs.css';

export default class WhoIs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            whois: '',
            data: ''
        }

        this.handleChangeWhois = this.handleChangeWhois.bind(this);
        this.getWhoisData = this.getWhoisData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationStateWhois() {
        if (this.state.whois === '') return null
        else if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(this.state.whois)) return 'success';
        else if (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(this.state.whois)) return 'success';
        else return 'error';
    }

    getWhoisData() {
        const whoisQuery = this.state.whois;
        if ((this.getValidationStateWhois()) === 'success') {
            axios.get(`http://localhost:8080/api/whois?whoisquery=${whoisQuery}`)
                .then(response => {
                    this.setState({ data: response.data });
                })
                .catch(error => {
                    this.setState({ data: '' })
                    console.log(error);
                });
        }
        else {
            this.setState.data = '';
            console.log('error');
        }
    }

    handleChangeWhois(e) {
        this.setState({ whois: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getWhoisData();
    }

    render() {
        return (
            <div className="whois-root-div">
                <h3> Whois Lookup </h3>
                <div className="whois-form-class">
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formWhois" validationState={this.getValidationStateWhois()}>
                            <FormControl
                                type="text"
                                value={this.state.whois}
                                placeholder="Whois"
                                onChange={this.handleChangeWhois}
                            />
                            <Button type="submit">Submit</Button>
                            <HelpBlock>Enter an IP address or URL</HelpBlock>
                        </FormGroup>
                    </Form>
                </div>
                <div className="whois-results">
                    {this.state.data.split('\n').map(function (item, key) {
                        return (
                            <span key={key}>
                                {item}
                                <br />
                            </span>
                        )
                    })}
                </div>
            </div>
        );
    }
}