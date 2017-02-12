import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'

import './Converter.css';

export default class Converter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			decimal: '',
			binary: '',
			hex: ''
		}

		this.handleChangeDecimal = this.handleChangeDecimal.bind(this)
		this.handleChangeBinary = this.handleChangeBinary.bind(this)
		this.handleChangeHex = this.handleChangeHex.bind(this)
	}

	getValidationStateDecimal() {
        const length = this.state.decimal.length;
		if (this.state.decimal === '') return null
        else if (length > 16) return 'error';
		else if ((/^\d+$/.test(this.state.decimal)) && (this.state.binary === '') && (this.state.hex === '')) return 'success';
		else return 'error';
	}

	getValidationStateBinary() {
        const length = this.state.binary.length;
		if (this.state.binary === '') return null
        else if (length > 80) return 'error';
		else if ((/^[0-1]*$/.test(this.state.binary)) && (this.state.decimal === '') && (this.state.hex === '')) return 'success';
		else return 'error';
	}

	getValidationStateHex() {
        const length = this.state.hex.length;
		if (this.state.hex === '') return null
        else if (length > 13) return 'error';
		else if ((/^[0-9A-Fa-f]+$/.test(this.state.hex)) && (this.state.decimal === '') && (this.state.binary === '')) return 'success';
		else return 'error';
	}

	getDecimalFieldValue() {
		if (this.getValidationStateDecimal() === 'success') return this.state.decimal;
		else if (this.getValidationStateBinary() === 'success') return parseInt(this.state.binary, 2);
		else if (this.getValidationStateHex() === 'success') return parseInt(this.state.hex, 16);
		else if ((this.getValidationStateDecimal() === 'error') || (this.getValidationStateBinary() === 'error') || (this.getValidationStateHex() === 'error')) return 'Nope!';
		else return '';

	}

	getBinaryFieldValue() {
		if (this.getValidationStateBinary() === 'success') return this.state.binary;
		else if (this.getValidationStateDecimal() === 'success') return parseInt(this.state.decimal, 10).toString(2);
		else if (this.getValidationStateHex() === 'success') return parseInt(this.state.hex, 16).toString(2);
		else if ((this.getValidationStateDecimal() === 'error') || (this.getValidationStateBinary() === 'error') || (this.getValidationStateHex() === 'error')) return 'Nope!';
		else return '';

	}

	getHexFieldValue() {
		if (this.getValidationStateHex() === 'success') return this.state.hex.toUpperCase();
		else if (this.getValidationStateDecimal() === 'success') return parseInt(this.state.decimal, 10).toString(16).toUpperCase();
		else if (this.getValidationStateBinary() === 'success') return parseInt(this.state.binary, 2).toString(16).toUpperCase();
		else if ((this.getValidationStateDecimal() === 'error') || (this.getValidationStateBinary() === 'error') || (this.getValidationStateHex() === 'error')) return 'Nope!'
		else return '';

	}

	handleChangeDecimal(e) {
		this.setState({ decimal: e.target.value });
	}

	handleChangeBinary(e) {
		this.setState({ binary: e.target.value });
	}

	handleChangeHex(e) {
		this.setState({ hex: e.target.value });
	}

	render() {
		return (
			<div className="root-div">
				<h3> Decimal/Binary/Hex Converter </h3>
				<div> Use one field at a time </div>
				<div className="form-class">
					<Form>
						<FormGroup
							controlId="formDecimal"
							validationState={this.getValidationStateDecimal()}
							>
							<FormControl
								type="text"
								value={this.state.decimal}
								placeholder="Decimal"
								onChange={this.handleChangeDecimal}
								/>
							<FormControl.Feedback />
							<HelpBlock>Enter a Decimal Value</HelpBlock>
						</FormGroup>

						<FormGroup
							controlId="formBinary"
							validationState={this.getValidationStateBinary()}
							>
							<FormControl
								type="text"
								value={this.state.binary}
								placeholder="Binary"
								onChange={this.handleChangeBinary}
								/>
							<FormControl.Feedback />
							<HelpBlock>Enter a Binary Value</HelpBlock>
						</FormGroup>

						<FormGroup
							controlId="formHex"
							validationState={this.getValidationStateHex()}
							>
							<FormControl
								type="text"
								value={this.state.hex}
								placeholder="Hex"
								onChange={this.handleChangeHex}
								/>
							<FormControl.Feedback />
							<HelpBlock>Enter a Hex Value</HelpBlock>
						</FormGroup>
					</Form>
				</div>
				<div className="field-class">
					<div>
						<div className="field-title"> Decimal </div> <div className="field-value"> {this.getDecimalFieldValue()} </div>
					</div>
					<div>
						<div className="field-title"> Binary </div> <div className="field-value"> {this.getBinaryFieldValue()} </div>
					</div>
					<div>
						<div className="field-title"> Hex </div> <div className="field-value"> {this.getHexFieldValue()} </div>
					</div>
				</div>
			</div>

		);
	}
}