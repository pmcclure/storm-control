import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
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
		const isValidURL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

		if (this.state.dns === '') return null
		else if (isValidURL.test(this.state.dns)) return 'success';
		else return 'error';
	}

	getDnsData() {
		const dnsQuery = this.state.dns;
		if ((this.getValidationStateDns()) === 'success') {
			axios.get(`https://stormcontrol.net/api/dns?dnsquery=${dnsQuery}`)
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
							<InputGroup>
								<FormControl
									type="text"
									value={this.state.dns}
									placeholder="Enter a domain"
									onChange={this.handleChangeDns}
								/>
	                            <InputGroup.Button>
									<Button type="submit">Submit</Button>
	                            </InputGroup.Button>
							</InputGroup>
						</FormGroup>
					</Form>
				</div>
				<DnsRecords dnsRecordData={dnsRecordData} />
			</div>
		);
	}
}

export default Dns;