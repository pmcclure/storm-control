import React, { Component } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap'
import * as bits2bytes from 'bits2bytes';

import './BitsnBytes.css';

export default class BitsnBytes extends Component {
    constructor(props) {
        super(props);

		this.conversion = []

        this.state = {
            input: '',
            selection: 'b'
        }

        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleChangeSelection = this.handleChangeSelection.bind(this)
    }

    getValidationStateInput() {
        const length = this.state.input.length;
        if (this.state.input === '') return null
        else if (length > 50) return 'error';
        else if ((/^\d+$/.test(this.state.input))) return 'success';
        else return 'error';
    }

	getFieldValues() {
		if (this.getValidationStateInput() === 'success') {
			this.conversion = bits2bytes.convert(this.state.input,this.state.selection,'array');
		}
		else if (this.getValidationStateInput() === 'error') {
			this.conversion = this.conversion.fill('Nope!');
		} 
		else {
			this.conversion = this.conversion.fill('');
		};

	}

    handleChangeInput(e) {
        this.setState({ input: e.target.value });
    }

    handleChangeSelection(e) {
        this.setState({ selection: e.target.value });
    }

    render() {

		this.getFieldValues()

        return (
            <div className="bitsnbytes-root-div">
                <h3>Bits/Bytes Converter</h3>

                <div className="bitsnbytes-form-class">
                    <Form inline >
                        <FormGroup controlId="formBitsInput" validationState={this.getValidationStateInput()}>
                            <FormControl
                                type="text"
                                value={this.state.input}
                                placeholder="Enter a Value"
                                onChange={this.handleChangeInput}
                            />
                        </FormGroup>

                        <FormGroup controlId="formBitsSelection" >
                            <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeSelection}>
                                <option value="b">Bits</option>
                                <option value="B">Bytes</option>
                                <option value="kb">Kilobits</option>
                                <option value="kB">KiloBytes</option>
                                <option value="mb">Megabits</option>
                                <option value="mB">Megabytes</option>
                                <option value="gb">Gigabits</option>
                                <option value="gB">Gigabytes</option>
                                <option value="tb">Terabits</option>
                                <option value="tB">Terabytes</option>
                            </FormControl>
                        </FormGroup>
                    </Form>
                </div>
                   <div className="bitsnbytes-field-class">
                    <div>
                        <div className="bitsnbytes-field-title"> Bits </div> <div className="field-value"> {this.conversion[0]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Bytes </div> <div className="field-value"> {this.conversion[1]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Kilobits </div> <div className="field-value"> {this.conversion[2]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> KiloBytes </div> <div className="field-value"> {this.conversion[3]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Megabits </div> <div className="field-value"> {this.conversion[4]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Megabytes </div> <div className="field-value"> {this.conversion[5]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Gigabits </div> <div className="field-value"> {this.conversion[6]}  </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Gigabytes </div> <div className="field-value"> {this.conversion[7]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Terabits </div> <div className="field-value"> {this.conversion[8]} </div>
                    </div>
                    <div>
                        <div className="bitsnbytes-field-title"> Terabytes </div> <div className="field-value"> {this.conversion[9]} </div>
                    </div>
                </div>
            </div >
        )
    }
}
