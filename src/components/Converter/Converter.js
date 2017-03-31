import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'

import './Converter.css';

class Converter extends Component {
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
		const isValidDecimal = /^\d+$/;
       		const length = this.state.decimal.length;
		
		if (this.state.decimal === '') return null
        	else if (length > 16) return 'error';
		else if ((isValidDecimal.test(this.state.decimal)) && (this.state.binary === '') && (this.state.hex === '')) return 'success';
		else return 'error';
	}

	getValidationStateBinary() {
		const isValidBinary = /^[0-1]*$/
        	const length = this.state.binary.length;

		if (this.state.binary === '') return null
       		else if (length > 80) return 'error';
		else if ((isValidBinary.test(this.state.binary)) && (this.state.decimal === '') && (this.state.hex === '')) return 'success';
		else return 'error';
	}

	getValidationStateHex() {
		const isvalidHex = /^[0-9A-Fa-f]+$/;
        	const length = this.state.hex.length;
		
		if (this.state.hex === '') return null
        	else if (length > 13) return 'error';
		else if ((isvalidHex.test(this.state.hex)) && (this.state.decimal === '') && (this.state.binary === '')) return 'success';
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
		this.setState({ binary: '' });
		this.setState({ hex: '' });
	}

	handleChangeBinary(e) {
		this.setState({ binary: e.target.value });
		this.setState({ decimal: '' });
		this.setState({ hex: '' });
	}

	handleChangeHex(e) {
		this.setState({ hex: e.target.value });
		this.setState({ decimal: '' });
		this.setState({ binary: '' });
	}

	render() {
		var fieldClass = 'converter-field-class-hidden';

		if ((this.getValidationStateDecimal() === 'success') || (this.getValidationStateBinary() === 'success') || (this.getValidationStateHex() === 'success')  ) {
			fieldClass = 'converter-field-class';
		}
		else {
			fieldClass = 'converter-field-class-hidden';
		}

		return (
			<div className="converter-root-div">
				<h3> Decimal/Binary/Hex Converter </h3>
				<div className="converter-form-class">
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
				<div className={fieldClass}>
					<div>
						<div className="converter-field-title"> Decimal </div> <div className="converter-field-value"> {this.getDecimalFieldValue()} </div>
					</div>
					<div>
						<div className="converter-field-title"> Binary </div> <div className="converter-field-value"> {this.getBinaryFieldValue()} </div>
					</div>
					<div>
						<div className="converter-field-title"> Hex </div> <div className="converter-field-value"> {this.getHexFieldValue()} </div>
					</div>
				</div>
			</div>
		);
	}
}

export default Converter;
