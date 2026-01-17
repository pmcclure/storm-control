import { Component, type ChangeEvent, type FormEvent } from 'react';
import { Form, FormGroup, FormControl, Button, InputGroup, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

import './Mac.css';

interface MacState {
    mac: string;
    data: any;
    loading: boolean;
}

class Mac extends Component<any, MacState> {
    constructor(props: any) {
        super(props);

        this.state = {
            mac: '',
            data: null,
            loading: false 
        };

        this.handleChangeMac = this.handleChangeMac.bind(this);
        this.getMacData = this.getMacData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    getValidationStateMac() {
        const isValidMac = /^(([a-fA-F0-9]{2}-){5}[a-fA-F0-9]{2}|([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}|([0-9A-Fa-f]{4}\.){2}[0-9A-Fa-f]{4})$/;
        if (this.state.mac === '') return null;
        else if (isValidMac.test(this.state.mac)) return 'success';
        else return 'error';
    }

    getMacData() {
        const macQuery = this.state.mac;
        
        const apiUrl = import.meta.env.VITE_MAC_API_BASE;
    
        if (this.getValidationStateMac() === 'success') {
            this.setState({ loading: true, data: null });
            
            axios.get(apiUrl, { params: { macLookupQuery: macQuery } })
                .then(response => {
                    this.setState({ 
                        loading: false,
                        data: { 
                            data: { 
                                organization_name: response.data,
                                assignment: macQuery                               
                            } 
                        } 
                    });
                })
                .catch(error => {
                    console.error("MAC Lookup Error:", error);
                    this.setState({ 
                        loading: false,
                        data: { 
                            data: { 
                                organization_name: "Not Found or API Rate Limited", 
                                assignment: "N/A" 
                            } 
                        } 
                    });
                });
        }
    }     

    handleChangeMac(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ mac: e.target.value, data: null });
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();
        this.getMacData();
    }

    handleModal(e: any) {
        e.preventDefault();
        Swal.fire({
            title: 'MAC address formatting',
            icon: 'info',
            html:
              'Use ' +
              '<a href="https://en.wikipedia.org/wiki/MAC_address#Notational_conventions" target="_blank" rel="noopener noreferrer">standard conventions</a>  ' +
              'e.g. <p />' + 
              '<div style="color:#BE5108; font-size: 15px"> <b> 11:11:11:11:11:11 </b> </div><p />' +
              '<div style="color:#BE5108; font-size: 15px"> <b> 11-11-11-11-11-11 </b> </div><p />' +
              '<div style="color:#BE5108; font-size: 15px"> <b> 1111.1111.1111 </b> </div><p />',
            showConfirmButton: false
          });
    }

    render() {
        const { loading, data } = this.state;
        let MacRecordData: any = {}; 

        if (data && data.data) {
            MacRecordData = data.data;
        }

        const isSuccess = this.getValidationStateMac() === 'success';
        const isError = this.getValidationStateMac() === 'error';

        const orangeTextStyle = {
            color: '#be5108',
            fontFamily: '"Courier New", Courier, monospace',
            fontWeight: 'bold' as const
        };

        const headerRowStyle = {
            backgroundColor: 'rgb(35, 40, 48)',
            color: '#ffffff',
        };

        return (
            <div className="mac-root-div">
                <h3 > MAC Address Lookup </h3>
                <div className="mac-form-class">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formMac">
                            <InputGroup hasValidation>
                                <FormControl
                                    type="text"
                                    value={this.state.mac}
                                    placeholder="Enter a MAC address"
                                    onChange={this.handleChangeMac}
                                    isValid={isSuccess}
                                    isInvalid={isError}
                                />
                                <Button 
                                    type="submit" 
                                    variant="outline-secondary" 
                                    disabled={loading}
                                    style={{ minWidth: '85px' }}
                                >
                                    {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Submit'}
                                </Button>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Button 
                        variant="outline-secondary" // Clear background with a grey border
                        size="sm" 
                        onClick={this.handleModal}
                        style={{ 
                            fontSize: '0.8rem', 
                            marginTop: '12px', 
                            padding: '2px 10px',
                            border: '1px solid #dee2e6',
                            borderRadius: '12px' // Rounded "pill" look
                        }}
>                   
                        Formatting examples
                    </Button>
                </div>

                {!loading && data && isSuccess && (
                    <div className="record-class animate__animated animate__fadeIn">
                        <Table bordered hover size="sm" style={{ maxWidth: '800px', marginTop: '20px' }}>
                            <thead>
                                <tr style={headerRowStyle}>
                                    <th colSpan={2}>Vendor Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ ...orangeTextStyle, width: '30%' }}>MAC Address</td>
                                    <td style={orangeTextStyle}>{MacRecordData.assignment}</td>
                                </tr>
                                <tr>
                                    <td style={orangeTextStyle}>Org. Name</td>
                                    <td style={orangeTextStyle}>{MacRecordData.organization_name}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        );
    }
}

export default Mac;