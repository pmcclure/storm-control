import { Component, type ChangeEvent } from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import * as bits2bytes from 'bits2bytes';

import './BitsnBytes.css';

interface BitsnBytesState {
    input: string;
    selection: string;
}

class BitsnBytes extends Component<any, BitsnBytesState> {
    private conversion: any[] = []; 

    constructor(props: any) {
        super(props);

        this.conversion = [];

        this.state = {
            input: '',
            selection: 'b'
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeSelection = this.handleChangeSelection.bind(this);
    }

    getValidationStateInput() {
        const isValidDecimal = /^\d*\.?\d*$/;
        const length = this.state.input.length;
        if (this.state.input === '') return null;
        else if (length > 50) return 'error';
        else if (isValidDecimal.test(this.state.input)) return 'success';
        else return 'error';
    }

    getFieldValues() {
        if (this.getValidationStateInput() === 'success') {
            this.conversion = bits2bytes.convert(this.state.input, this.state.selection, 'array');
        }
        else if (this.getValidationStateInput() === 'error') {
            this.conversion = new Array(10).fill('Nope!');
        }
        else {
            this.conversion = new Array(10).fill('');
        };
    }

    handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ input: e.target.value });
    }

    handleChangeSelection(e: ChangeEvent<HTMLSelectElement>) {
        this.setState({ selection: e.target.value });
    }

    render() {
        var fieldClass = 'bitsnbytes-field-class-hidden';
        this.getFieldValues();

        const isValid = this.getValidationStateInput() === 'success';
        const isInvalid = this.getValidationStateInput() === 'error';	

        if (isValid) {
            fieldClass = 'bitsnbytes-field-class';
        } else {
            fieldClass = 'bitsnbytes-field-class-hidden';
        }

        return (
            <div className="bitsnbytes-root-div">
                <h3>Bits/Bytes Converter</h3>

                <div className="bitsnbytes-form-class">                 
                    <Form className="d-flex align-items-start gap-2">
                        <FormGroup controlId="formBitsInput">
                            <FormControl
                                type="text"
                                value={this.state.input}
                                placeholder="Enter a Value"
                                onChange={this.handleChangeInput}
                                isValid={isValid}  
                                isInvalid={isInvalid}
                            />
                        </FormGroup>

                        <FormGroup controlId="formBitsSelection">                           
                            <Form.Select 
                                value={this.state.selection}
                                onChange={this.handleChangeSelection as any}
                            >
                                <option value="b">Bits</option>
                                <option value="B">Bytes</option>
                                <option value="kb">Kilobits</option>
                                <option value="kB">Kilobytes</option>
                                <option value="mb">Megabits</option>
                                <option value="mB">Megabytes</option>
                                <option value="gb">Gigabits</option>
                                <option value="gB">Gigabytes</option>
                                <option value="tb">Terabits</option>
                                <option value="tB">Terabytes</option>
                            </Form.Select>
                        </FormGroup>
                    </Form>
                </div>
                
                <div className={fieldClass}>
   
    {[
        "Bits", "Bytes", "Kilobits", "Kilobytes", 
        "Megabits", "Megabytes", "Gigabits", "Gigabytes", 
        "Terabits", "Terabytes"
    ].map((label, index) => (
        <div key={label}>
            <div className="bitsnbytes-field-title"> {label} </div>
            <div className="bitsnbytes-field-value"> {this.conversion[index]} </div>
        </div>
    ))}
</div>
            </div >
        )
    }
}

export default BitsnBytes;