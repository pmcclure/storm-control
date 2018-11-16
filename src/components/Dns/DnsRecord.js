import React from 'react';
import Masonry from 'react-masonry-component';
import { Panel } from 'react-bootstrap';

import './DnsRecord.css';

const DnsRecords = ({dnsRecordData}) => {
    //If the dnsRecordData object is empty then return an empty div
    if (Object.keys(dnsRecordData).length === 0 && dnsRecordData.constructor === Object) {
        return <div></div>
    }

    var masonryOptions = {
        transitionDuration: 1,
    };

    var aRecords = dnsRecordData.filter((data) => { return data.type === "A" });
    var aaaaRecords = dnsRecordData.filter((data) => { return data.type === "AAAA" });
    var mxRecords = dnsRecordData.filter((data) => { return data.type === "MX" });
    var txtRecords = dnsRecordData.filter((data) => { return data.type === "TXT" });
    var nsRecords = dnsRecordData.filter((data) => { return data.type === "NS" });
    var soaRecords = dnsRecordData.filter((data) => { return data.type === "SOA" });

    var aElements = aRecords.map((aRecord) => {
        return (
            <Panel key={Math.random()}>
                <Panel.Heading>
                    <Panel.Title>Type: {aRecord.type}</Panel.Title>
                </Panel.Heading>
                <div className="panel-body">
                    <div> Name: {aRecord.name} </div>
                    <div> Adddress: {aRecord.address} </div>
                    <div> ttl: {aRecord.ttl} </div>
                </div>
            </Panel>
        )
    });

    var aaaaElements = aaaaRecords.map((aaaaRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()}>
                <Panel.Heading>
                    <Panel.Title>Type: {aaaaRecord.type}</Panel.Title>
                </Panel.Heading>
                <div className="panel-body">
                    <div> Name: {aaaaRecord.name} </div>
                    <div> Adddress: {aaaaRecord.address} </div>
                    <div> ttl: {aaaaRecord.ttl} </div>
                </div>
            </Panel>
        )
    });

    var mxElements = mxRecords.map((mxRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()}>
                <Panel.Heading>
                    <Panel.Title>Type: {mxRecord.type}</Panel.Title>
                </Panel.Heading>
                <div className="panel-body">
                    <div> Name: {mxRecord.name} </div>
                    <div> Exchange: {mxRecord.exchange} </div>
                    <div> Priority: {mxRecord.priority} </div>
                    <div> ttl: {mxRecord.ttl} </div>
                </div>
            </Panel>
        )
    });

    var txtElements = txtRecords.map((txtRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()}>
                <Panel.Heading>
                    <Panel.Title>Type: {txtRecord.type}</Panel.Title>
                </Panel.Heading>
                <div className="panel-body">
                    <div> Name: {txtRecord.name} </div>
                    <div> Value: {txtRecord.data[0]} </div>
                    <div> ttl: {txtRecord.ttl} </div>
                </div>
            </Panel>
        )
    });

    var nsElements = nsRecords.map((nsRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()}>
                <Panel.Heading>
                    <Panel.Title>Type: {nsRecord.type}</Panel.Title>
                </Panel.Heading>
                <div className="panel-body">
                    <div> Name: {nsRecord.name} </div>
                    <div> Data: {nsRecord.data} </div>
                    <div> ttl: {nsRecord.ttl} </div>
                </div>
            </Panel>
        )
    });
    
    var soaElements = soaRecords.map((soaRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()}>
                <Panel.Heading>
                    <Panel.Title>Type: {soaRecord.type}</Panel.Title>
                </Panel.Heading>
                <div className="panel-body">
                    <div> Name: {soaRecord.name} </div>
                    <div> Primary: {soaRecord.primary} </div>
                    <div> Admin: {soaRecord.admin} </div>
                    <div> Serial: {soaRecord.serial} </div>
                    <div> Expiration: {soaRecord.expiration} </div>
                    <div> Minimum: {soaRecord.minimum} </div>
                    <div> Retry: {soaRecord.retry} </div>
                    <div> ttl: {soaRecord.ttl} </div>
                </div>
            </Panel>
        )
    });

    return (
        <div className="dnsrecord-masonry-container">
            <h4>DNS Records</h4>
            <Masonry options={masonryOptions}>
                {aElements}
                {aaaaElements}
                {mxElements}
                {txtElements}
                {nsElements}
                {soaElements}
            </Masonry>
        </div>
    )
}

export default DnsRecords;