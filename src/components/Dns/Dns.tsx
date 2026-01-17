import { Component, type ChangeEvent, type FormEvent } from 'react';
import { Form, FormGroup, FormControl, Button, InputGroup, Spinner } from 'react-bootstrap'; 

import './Dns.css';
import DnsRecords from './DnsRecord';

interface DnsState {
    dns: string;
    data: any;
    loading: boolean; 
}

class Dns extends Component<any, DnsState> {
    constructor(props: any) {
        super(props);

        this.state = {
            dns: '',
            data: null,
            loading: false 
        };

        this.handleChangeDns = this.handleChangeDns.bind(this);
        this.getDnsData = this.getDnsData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationStateDns() {
        const isValidURL = /^[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;

        if (this.state.dns === '') return null;
        else if (isValidURL.test(this.state.dns)) return 'success';
        else return 'error';
    }

    async getDnsData() {
        const dnsQueryValue = this.state.dns;
        const apiBase = import.meta.env.VITE_DNS_API_BASE;

        if (this.getValidationStateDns() === 'success') {
            this.setState({ loading: true, data: null }); // Start Spinner
            try {
                const response = await fetch(`${apiBase}?dnsLookupQuery=${dnsQueryValue}`);
                const result = await response.json();
                
                this.setState({ data: result, loading: false }); // Stop Spinner
            } catch (error) {
                console.error("DNS Lookup failed:", error);
                this.setState({ data: [], loading: false }); // Stop Spinner on error
            }
        } else {
            this.setState({ data: [] });
        }
    }

    handleChangeDns(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ dns: e.target.value });
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();
        this.getDnsData();
    }

    render() {
        const dnsRecordData = this.state.data;
        const isSuccess = this.getValidationStateDns() === 'success';
        const isError = this.getValidationStateDns() === 'error';
        const { loading } = this.state; 

        return (
            <div className="dns-root-div mb-5">
                <h3> DNS Lookup </h3>
                <div className="dns-form-class">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formDns">
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={this.state.dns}
                                    placeholder="Enter a domain"
                                    onChange={this.handleChangeDns}
                                    isValid={isSuccess}
                                    isInvalid={isError}
                                />
                                <Button 
                                    type="submit" 
                                    variant="outline-secondary" 
                                    disabled={loading} 
                                    style={{ minWidth: '85px' }} 
                                >
                                    {loading ? (
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>

                {dnsRecordData && <DnsRecords dnsRecordData={dnsRecordData} />}
            </div>
        );
    }
}

export default Dns;