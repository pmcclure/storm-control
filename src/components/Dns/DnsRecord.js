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
    var nsRecords = dnsRecordData.filter((data) => { return data.type === "NS" });

    var aElements = aRecords.map((aRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()} header={`Type: ${aRecord.type}`} >
                <div> Name: {aRecord.name} </div>
                <div> Adddress: {aRecord.address} </div>
                <div> ttl: {aRecord.ttl} </div>

            </Panel>
        )
    });

     var aaaaElements = aaaaRecords.map((aaaaRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()} header={`Type: ${aaaaRecord.type}`} >
                <div> Name: {aaaaRecord.name} </div>
                <div> Adddress: {aaaaRecord.address} </div>
                <div> ttl: {aaaaRecord.ttl} </div>
            </Panel>
        )
    });


     var nsElements = nsRecords.map((nsRecord) => {
        return (
            <Panel className="dnsrecord-panel" key={Math.random()} header={`Type: ${nsRecord.type}`} >
                <div> Name: {nsRecord.name} </div>
                <div> Data: {nsRecord.data} </div>
                <div> ttl: {nsRecord.ttl} </div>
            </Panel>
        )
    });

    return (
        <div className="dnsrecord-masonry-container">
            <h4>DNS Records</h4>

            <Masonry options={masonryOptions}>
                {aElements}
                {aaaaElements}
                {nsElements}
            </Masonry>
        </div>
    )

}

export default DnsRecords;