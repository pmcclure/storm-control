import { Component, type ChangeEvent, type FormEvent } from 'react';
import { Form, FormGroup, FormControl, Button, InputGroup, Table, Spinner, Collapse } from 'react-bootstrap';
import axios from 'axios';

import './WhoIs.css';

interface WhoIsState {
    whois: string;
    data: any;
    loading: boolean;
    showRaw: boolean;
}

class WhoIs extends Component<any, WhoIsState> {
    constructor(props: any) {
        super(props);

        this.state = {
            whois: '',
            data: null,
            loading: false,
            showRaw: false
        };

        this.handleChangeWhois = this.handleChangeWhois.bind(this);
        this.getWhoisData = this.getWhoisData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleRaw = this.toggleRaw.bind(this);
    }

    getValidationStateWhois() {
        const isValidIPv4 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
        const isValidURL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        const isValidIPv6 = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

        if (this.state.whois === '') return null;
        if (isValidIPv4.test(this.state.whois) || isValidURL.test(this.state.whois) || isValidIPv6.test(this.state.whois)) {
            return 'success';
        }
        return 'error';
    }

    getWhoisData() {
        const whoisQuery = this.state.whois;
        const apiBase = import.meta.env.VITE_WHOIS_API_BASE;
        
        if ((this.getValidationStateWhois()) === 'success') {
            this.setState({ loading: true, data: null, showRaw: false });
            
            axios.get(`${apiBase}?whoisquery=${whoisQuery}`)
                .then(response => {
                    this.setState({ data: response.data, loading: false });
                })
                .catch(error => {
                    console.error("Whois error:", error);
                    this.setState({ data: null, loading: false });
                });
        }
    }

    handleChangeWhois(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ whois: e.target.value });
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();
        this.getWhoisData();
    }

    toggleRaw() {
        this.setState(prev => ({ showRaw: !prev.showRaw }));
    }

    render() {
        const isSuccess = this.getValidationStateWhois() === 'success';
        const isError = this.getValidationStateWhois() === 'error';
        const { data, loading, showRaw } = this.state;

        let info: any = null;
        let isIPData = false;

        if (data && typeof data === 'object') {
            if (data.range || data.NetName || data.netname || data.NetRange) {
                info = data;
                isIPData = true;
            } else {
                const servers = Object.keys(data);
                const bestServer = servers.reduce((prev, current) => {
                    const prevCount = Object.keys(data[prev] || {}).length;
                    const currentCount = Object.keys(data[current] || {}).length;
                    return (currentCount >= prevCount) ? current : prev;
                }, servers[0]);
                
                info = data[bestServer];
            }
        }

        const formatVal = (val: any) => Array.isArray(val) ? val.join(', ') : (val || 'N/A');

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
            <div className="whois-root-div">
                <h3> Whois Lookup </h3>
                <div className="whois-form-class">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formWhois">
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={this.state.whois}
                                    placeholder="Enter domain or IP..."
                                    onChange={this.handleChangeWhois}
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
                </div>

                {!loading && info && (
                    <div className="record-class">
                        <Table bordered hover size="sm" style={{ maxWidth: '800px', marginTop: '10px' }}>
                            {isIPData ? (
                                <>
                                    <thead>
                                        <tr style={headerRowStyle}>
                                            <th colSpan={2}>IP Network Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ ...orangeTextStyle, width: '30%' }}>Net Name</td>
                                            <td style={orangeTextStyle}>{info.NetName || info.netname || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={orangeTextStyle}>IP Range</td>
                                            <td style={orangeTextStyle}>{info.range || info.NetRange || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={orangeTextStyle}>Organization</td>
                                            <td style={orangeTextStyle}>
                                                {info.Organization || info.org || info.descr || (info.organisation && info.organisation["org-name"]) || (info.organisation && info.organisation.OrgName) || 'N/A'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={orangeTextStyle}>Country</td>
                                            <td style={orangeTextStyle}>{info.Country || info.country || (info.organisation && info.organisation.country) || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style={orangeTextStyle}>CIDR / Route</td>
                                            <td style={orangeTextStyle}>{info.route || info.CIDR || 'N/A'}</td>
                                        </tr>
                                    </tbody>
                                </>
                            ) : (
                                <>
                                    <thead>
                                        <tr style={headerRowStyle}>
                                            <th colSpan={2}>Registrar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td style={{ ...orangeTextStyle, width: '30%' }}>Domain Name</td><td style={orangeTextStyle}>{info["Domain Name"] || info.domain || 'N/A'}</td></tr>
                                        <tr><td style={orangeTextStyle}>Registrar</td><td style={orangeTextStyle}>{info["Registrar"] || info.registrar || 'N/A'}</td></tr>
                                        <tr>
                                            <td style={orangeTextStyle}>Registrar URL</td>
                                            <td style={{...orangeTextStyle, wordBreak: 'break-all'}}>
                                                {info["Registrar URL"] || info["Referral URL"] || 'N/A'}
                                            </td>
                                        </tr>
                                        <tr><td style={orangeTextStyle}>Expiry Date</td><td style={orangeTextStyle}>{info["Expiry Date"] || info["Registry Expiry Date"] || info["Expiration Date"] || 'N/A'}</td></tr>
                                    </tbody>
                                    <thead>
                                        <tr style={headerRowStyle}>
                                            <th colSpan={2}>Registrant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td style={orangeTextStyle}>Organization</td><td style={orangeTextStyle}>{info["Registrant Organization"] || 'N/A'}</td></tr>
                                        <tr><td style={orangeTextStyle}>Name</td><td style={orangeTextStyle}>{info["Registrant Name"] || 'N/A'}</td></tr>
                                        <tr><td style={orangeTextStyle}>Email</td><td style={orangeTextStyle}>{info["Registrant Email"] || 'N/A'}</td></tr>
                                    </tbody>
                                    <thead>
                                        <tr style={headerRowStyle}>
                                            <th colSpan={2}>Network</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td style={orangeTextStyle}>Nameservers</td><td style={orangeTextStyle}>{formatVal(info["Name Server"])}</td></tr>
                                        <tr><td style={orangeTextStyle}>DNSSEC</td><td style={orangeTextStyle}>{info["DNSSEC"] || 'N/A'}</td></tr>
                                    </tbody>
                                </>
                            )}
                        </Table>

                        <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '800px' }}>
                            <Button 
                                variant="link" 
                                onClick={this.toggleRaw} 
                                style={{ padding: 0, textDecoration: 'none', color: '#6c757d', fontSize: '0.85rem' }}
                            >
                                {showRaw ? '[-] Hide Raw WHOIS' : '[+] Show Raw WHOIS'}
                            </Button>
                            <Collapse in={showRaw}>
                                <div id="raw-whois-block">
                                    <pre style={{ 
                                        marginTop: '10px', 
                                        padding: '15px', 
                                        backgroundColor: '#f8f9fa', 
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        maxHeight: '400px',
                                        overflow: 'auto',
                                        border: '1px solid #dee2e6',
                                        fontFamily: 'monospace'
                                    }}>
                                        {info.__raw || JSON.stringify(data, null, 2)}
                                    </pre>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default WhoIs;