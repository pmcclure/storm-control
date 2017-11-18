import React, { Component } from 'react';
import { Form, FormGroup, FormControl, HelpBlock, Button, InputGroup } from 'react-bootstrap'
import axios from 'axios';

import './Bgp.css';
import Prefixes from './Prefixes/Prefixes';

class Bgp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bgp: '',
            holder: '',
            geoData: {}
        }
        this.handleChangeBgp = this.handleChangeBgp.bind(this);
        this.getBgpData = this.getBgpData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationStateBgp() {
        if (this.state.bgp === '') return null
        else if (this.state.bgp >= 1 && this.state.bgp <= 4200000000) return 'success';
        else return 'error';
    }

    getBgpData() {
        const bgpQuery = this.state.bgp;
        if ((this.getValidationStateBgp()) === 'success') {
            axios.all([
                axios.get(`https://stat.ripe.net/data/as-overview/data.json?resource=${bgpQuery}`),
                axios.get(`https://stat.ripe.net/data/geoloc/data.json?resource=${bgpQuery}`)
            ])
                .then(axios.spread((overview, geoData) => {
                    this.setState({ holder: overview.data.data.holder });
                    this.setState({ geoData: geoData.data.data });
                }))
                .catch(error => {
                    this.setState({ holder: '' })
                });
        }
        else {
            this.setState.holder = '';
        }
    }

    handleChangeBgp(e) {
        this.setState({ bgp: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getBgpData();
    }

    render() {
        return (
            <div className="bgp-root-div">
                <h3>BGPv4 Prefixes</h3>
                <div className="bgp-form-class">
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="formBgp"
                            validationState={this.getValidationStateBgp()}
                        >
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={this.state.bgp}
                                    placeholder="BGP"
                                    onChange={this.handleChangeBgp}
                                />
                                <InputGroup.Button>
                                    <Button type="submit">Submit</Button>
                                </InputGroup.Button>
                            </InputGroup>
                            <HelpBlock>Enter a BGP ASN</HelpBlock>
                        </FormGroup>
                    </Form>
                </div>
                <div className="bgp-results">
					<div className="bgp-holder">
                    	<h3>{this.state.holder}</h3>
					</div>
					<div>
						<Prefixes prefixesData={this.state.geoData}/>					
					</div>
                </div>
            </div>
        )
    }
}

export default Bgp;