import { Component, type ChangeEvent } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

import './Converter.css';

interface ConverterState {
    decimal: string;
    binary: string;
    hex: string;
}

class Converter extends Component<any, ConverterState> {
    constructor(props: any) { 
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

    handleChangeDecimal(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ decimal: e.target.value, binary: '', hex: '' });
    }

    handleChangeBinary(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ binary: e.target.value, decimal: '', hex: '' });
    }

    handleChangeHex(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ hex: e.target.value, decimal: '', binary: '' });
    }

    render() {
        const isDecValid = this.getValidationStateDecimal() === 'success';
        const isDecError = this.getValidationStateDecimal() === 'error';
        const isBinValid = this.getValidationStateBinary() === 'success';
        const isBinError = this.getValidationStateBinary() === 'error';
        const isHexValid = this.getValidationStateHex() === 'success';
        const isHexError = this.getValidationStateHex() === 'error';

        const fieldClass = (isDecValid || isBinValid || isHexValid) 
            ? 'converter-field-class' 
            : 'converter-field-class-hidden';

        return (
            <div className="converter-root-div">
                <h3> Decimal/Binary/Hex Converter </h3>
                <div className="converter-form-class">
                    <Form>
                        <FormGroup controlId="formDecimal" className="mb-3">
                            <FormControl
                                type="text"
                                value={this.state.decimal}
                                placeholder="Decimal"
                                onChange={this.handleChangeDecimal}
                                isValid={isDecValid}
                                isInvalid={isDecError}
                                />
                            
                            <Form.Text className="text-muted">Enter a Decimal Value</Form.Text>
                        </FormGroup>

                        <FormGroup controlId="formBinary" className="mb-3">
                            <FormControl
                                type="text"
                                value={this.state.binary}
                                placeholder="Binary"
                                onChange={this.handleChangeBinary}
                                isValid={isBinValid}
                                isInvalid={isBinError}
                                />
                            
                            <Form.Text className="text-muted">Enter a Binary Value</Form.Text>
                        </FormGroup>

                        <FormGroup controlId="formHex" className="mb-3">
                            <FormControl
                                type="text"
                                value={this.state.hex}
                                placeholder="Hex"
                                onChange={this.handleChangeHex}
                                isValid={isHexValid}
                                isInvalid={isHexError}
                                />
                           
                            <Form.Text className="text-muted">Enter a Hex Value</Form.Text>
                        </FormGroup>
                    </Form>
                </div>
                <div className={fieldClass}>
                    <div>
                        <div className="converter-field-title"> Decimal </div> 
                        <div className="converter-field-value"> {this.getDecimalFieldValue()} </div>
                    </div>
                    <div>
                        <div className="converter-field-title"> Binary </div> 
                        <div className="converter-field-value"> {this.getBinaryFieldValue()} </div>
                    </div>
                    <div>
                        <div className="converter-field-title"> Hex </div> 
                        <div className="converter-field-value"> {this.getHexFieldValue()} </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Converter;