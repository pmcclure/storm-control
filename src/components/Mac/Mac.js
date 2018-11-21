
import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, InputGroup } from 'react-bootstrap'
import axios from 'axios';
import swal from 'sweetalert2'

import './Mac.css';

class Mac extends Component {
    constructor(props) {
        super(props);

        this.state = {
			mac: '',
			data: null
		}

        this.handleChangeMac = this.handleChangeMac.bind(this);
        this.getMacData = this.getMacData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationStateMac() {
        //Match 6 groups of 2 hex digits separated by : or - or 3 groups of 4 hex digits separated by . 
        const isValidMac = /^(([a-fA-F0-9]{2}-){5}[a-fA-F0-9]{2}|([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}|([0-9A-Fa-f]{4}\.){2}[0-9A-Fa-f]{4})?$/

        if (this.state.mac === '') return null
        else if (isValidMac.test(this.state.mac)) return 'success';
        else if (isValidMac.test(this.state.mac)) return 'success';
        else return 'error';
    }

    getMacData() {
		const macQuery = this.state.mac;
		const apiKey = process.env.REACT_APP_API_KEY;
		const config = {
			headers: {'Authorization': 'Bearer ' + apiKey}
			}
	
        if ((this.getValidationStateMac()) === 'success') {
			axios.get(`https://api.macvendors.com/v1/lookup/${macQuery}`, config)
                .then(response => {
					this.setState({ data: response.data });
                })
                .catch(error => {
                    this.setState({ data: { data: {assignment: "Not found", organization_address: "", organization_name: "", registry: ""} } })
                });
        }
        else {
            this.setState.data = '';
        }
    }

    handleChangeMac(e) {
        this.setState({ mac: e.target.value });
        this.setState( {data: null} );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getMacData();
    }

    handleModal(e) {
        e.preventDefault();
        swal({
            title: 'MAC address formatting',
            type: 'info',
            html:
              'Use ' +
              '<a href="https://en.wikipedia.org/wiki/MAC_address#Notational_conventions" target="_blank" rel="noopener noreferrer">standard conventions</a>  ' +
              'e.g. <p />' + 
              '<div style="color:#BE5108; font-size: 15px"> <b> 11:11:11:11:11:11 </b> </div><p />' +
              '<div style="color:#BE5108; font-size: 15px"> <b> 11-11-11-11-11-11 </b> </div><p />' +
              '<div style="color:#BE5108; font-size: 15px"> <b> 1111.1111.1111 </b> </div><p />',
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false
          })
        
    }

    render() {

		var MacRecordData = '';
		if (this.state.data !== null) {
			MacRecordData = this.state.data.data;
		}
		
		var fieldClass = 'mac-field-class-hidden';

		if ((this.state.data !== null) && (this.getValidationStateMac() === 'success')) {
			fieldClass = 'mac-field-class';
		}
		else {
            fieldClass = 'mac-field-class-hidden';
		}
		
        return (
            <div className="mac-root-div">
                <h3> MAC Address Lookup </h3>
                <div className="mac-form-class">
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formMac" validationState={this.getValidationStateMac()}>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={this.state.mac}
                                    placeholder="Enter a MAC address"
                                    onChange={this.handleChangeMac}
                                />
                                <InputGroup.Button>
                                    <Button type="submit">Submit</Button>
                                </InputGroup.Button>
                            </InputGroup>
                            <HelpBlock> </HelpBlock>
                        </FormGroup>
                    </Form>
                    <p />
                    <Button bsSize="xsmall" onClick={this.handleModal}>Formatting examples</Button>
                </div>
				<div className={fieldClass}>
					<div>
						<div className="mac-field-title"> Assignment </div> <div className="mac-field-value"> {MacRecordData.assignment} </div>
					</div>
                    <div>
						<div className="mac-field-title"> Org. Name </div> <div className="mac-field-value"> {MacRecordData.organization_name} </div>
					</div>
					<div>
						<div className="mac-field-title"> Org. Address </div> <div className="mac-field-value"> {MacRecordData.organization_address} </div>
					</div>
					<div>
						<div className="mac-field-title"> Registry </div> <div className="mac-field-value"> {MacRecordData.registry} </div>
					</div>
                </div>
            	
			</div>
        );
    }
}

export default Mac;