import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'
import { Netmask } from 'netmask';

import './Subnetting.css';

class Subnetting extends Component {
	constructor(props) {
		super(props);

		this.state = {
			subnet: '',
			mask: ''
		}

		this.handleChangeSubnet = this.handleChangeSubnet.bind(this)
		this.handleChangeMask = this.handleChangeMask.bind(this)
	}

	getValidationStateSubnet() {
		const isValidIP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

		if (this.state.subnet === '') return null
		else if (isValidIP.test(this.state.subnet)) return 'success';
		else return 'error';
	}

	getValidationStateMask() {
		const isValidSubnetMask = /^([1-9]|[12]\d|3[0-2])$/;
		
		if (this.state.mask === '') return null
		else if (isValidSubnetMask.test(this.state.mask)) return 'success';
		else return 'error';
	}

	getHosts() {
		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			const hosts = new Netmask(`${this.state.subnet}/${this.state.mask}`);
			return hosts.size;
		}
	}

	getWildcard() {
		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			const subnet = new Netmask(`${this.state.subnet}/${this.state.mask}`);
			return subnet.hostmask;
		}
	}

	getStartAddress() {
		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			const startAddress = new Netmask(`${this.state.subnet}/${this.state.mask}`);
			return startAddress.first;
		}
	}

	getEndAddress() {
		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			const endAddress = new Netmask(`${this.state.subnet}/${this.state.mask}`);
			return endAddress.last;
		}
	}

	getBroadcastAddress() {
		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			const broadcast = new Netmask(`${this.state.subnet}/${this.state.mask}`);
			return broadcast.broadcast;
		}
	}

	getNetworkAddress() {
		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			const networkAddress = new Netmask(`${this.state.subnet}/${this.state.mask}`);
			return networkAddress.base;
		}
	}

	getNetmask() {
		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			const netMask = new Netmask(`${this.state.subnet}/${this.state.mask}`);
			return netMask.mask;
		}
	}

	handleChangeSubnet(e) {
		this.setState({ subnet: e.target.value });
	}

	handleChangeMask(e) {
		this.setState({ mask: e.target.value });
	}

	render() {
		var fieldClass = 'subnetting-field-class-hidden';

		if ((this.getValidationStateSubnet() === 'success') && (this.getValidationStateMask() === 'success')) {
			fieldClass = 'subnetting-field-class';
		}
		else {
			fieldClass = 'subnetting-field-class-hidden';
		}

		return (
			<div className="subnetting-root-div">
				<h3> Subnet Calculator </h3>
				<div className="subnetting-form-class">
					<Form inline className="subnet-inline">
						<FormGroup
							controlId="formSubnet"
							validationState={this.getValidationStateSubnet()}
						>
							<FormControl
								type="text"
								value={this.state.subnet}
								placeholder="Subnet"
								onChange={this.handleChangeSubnet}
							/>
							<FormControl.Feedback />
							<HelpBlock>Enter an IP address</HelpBlock>
						</FormGroup>
						<span className="subnetting-slash">/</span>

						<FormGroup
							controlId="formMask"
							validationState={this.getValidationStateMask()}
						>
							<FormControl
								type="text"
								value={this.state.mask}
								placeholder="Mask"
								onChange={this.handleChangeMask}
							/>
							<FormControl.Feedback />
							<HelpBlock>Enter a Mask (eg 24)</HelpBlock>
						</FormGroup>
					</Form>
				</div>
				<div className={fieldClass}>
					<div>
						<div className="subnetting-field-title"> Netmask </div> <div className="subnetting-field-value"> {this.getNetmask()} </div>
					</div>
					<div>
						<div className="subnetting-field-title"> Wildcard </div> <div className="subnetting-field-value"> {this.getWildcard()} </div>
					</div>
					<div>
						<div className="subnetting-field-title"> Addresses </div> <div className="subnetting-field-value"> {this.getHosts()} </div>
					</div>
					<div>
						<div className="subnetting-field-title"> Network Address </div> <div className="subnetting-field-value"> {this.getNetworkAddress()} </div>
					</div>
					<div>
						<div className="subnetting-field-title"> Host Start Address </div> <div className="subnetting-field-value"> {this.getStartAddress()} </div>
					</div>
					<div>
						<div className="subnetting-field-title"> Host End Address </div> <div className="subnetting-field-value"> {this.getEndAddress()} </div>
					</div>					
					<div>
						<div className="subnetting-field-title"> Broadcast Address </div> <div className="subnetting-field-value"> {this.getBroadcastAddress()} </div>
					</div>
				</div>
			</div>
		);
	}
}

export default Subnetting;