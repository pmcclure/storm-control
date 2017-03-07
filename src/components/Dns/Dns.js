import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap'
import axios from 'axios';

import './Dns.css';
import DnsRecords from './DnsRecord';

class Dns extends Component {
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
		const dnsQuery = this.state.dns;
		if ((this.getValidationStateDns()) === 'success') {
			axios.get(`https://stormcontrol.net/dns?dnsquery=${dnsQuery}`)
				.then(response => {
					this.setState({ data: response.data.answer });
				})
				.catch(error => {
					this.setState({ data: {} })
				});
		}
		else {
			this.setState.data = {};
		}
	}

	handleChangeDns(e) {
		this.setState({ dns: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.getDnsData();
	}

	render() {
		var dnsRecordData = {};
		if (this.state.data !== null) {
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
				<DnsRecords dnsRecordData={dnsRecordData} />
			</div>
		);
	}
}

export default Dns;