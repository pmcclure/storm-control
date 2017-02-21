import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap'
import axios from 'axios';

import './Dns.css';
import DnsRecords from './DnsRecord';

export default class Dns extends Component {

    constructor(props) {
        super(props);

        this.soa = null;
        this.ns = null;
        this.a = null;
        this.aaaa = null;
        this.txt = null;
        this.cname = null;
        this.mx = null;

        this.state = {
            dns: '',
            data: null
        }
        this.handleChangeDns = this.handleChangeDns.bind(this);
        this.getDnsData = this.getDnsData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    getValidationStateDns() {
        if (this.state.dns === '') return null
        else if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(this.state.dns)) return 'success';
        else if (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(this.state.dns)) return 'success';
        else return 'error';
    }

    getDnsData() {
        console.log('test')
        const dnsQuery = this.state.dns;
        if ((this.getValidationStateDns()) === 'success') {
            axios.get(`http://localhost:8080/api/dns?dnsquery=${dnsQuery}`)
                .then(response => {
                    console.log('here: ', response.data.answer)
                    this.setState({ data: response.data.answer });
                })
                .catch(error => {
                    console.log('nope: ', error)
                    this.setState({ data: {} })
                });
        }
        else {
            this.setState.data = {};
        }
    }

    // getDnsDisplayData() {
    //     if (this.state.data !== null) {
    //         //this.ns = this.state.data.filter((element) => { return element.type === "NS" });
    //         this.a = this.state.data.filter((element) => { return element.type === "A" });
    //         this.aaaa = this.state.data.filter((element) => { return element.type === "AAAA" });
    //         this.soa = this.state.data.filter((element) => { return element.type === "SOA" });
    //         this.txt = this.state.data.filter((element) => { return element.type === "TXT" });
    //         this.mx = this.state.data.filter((element) => { return element.type === "MX" });
    //         console.log(this.a);
    //     }
    // }

    handleChangeDns(e) {
        this.setState({ dns: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getDnsData();
    }

    render() {
        //this.getDnsDisplayData()
        var dnsRecordData = {};
        if (this.state.data !== null){
            dnsRecordData = this.state.data;
        }

        return (
            <div className="dns-root-div">
                <h3> DNS Lookup </h3>
                <div className="dns-form-class">
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formDns" validationState={this.getValidationStateDns()}>
                            <FormControl
                                type="text"
                                value={this.state.dns}
                                placeholder="domain"
                                onChange={this.handleChangeDns}
                            />
                            <Button type="submit">Submit</Button>
                            <HelpBlock>Enter a domain</HelpBlock>
                        </FormGroup>
                    </Form>
                </div>
                     <DnsRecords dnsRecordData={dnsRecordData}/>
                <div>
                   
                </div>
            </div>
        );
    }
}