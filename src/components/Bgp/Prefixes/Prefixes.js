import React from 'react';
import Masonry from 'react-masonry-component';
import { Panel } from 'react-bootstrap';
import PrefixCard from './PrefixCard';
import './Prefixes.css';

const Prefixes = ({prefixesData}) => {
    //If the prefixesData object is empty then return an empty div
    if (Object.keys(prefixesData).length === 0 && prefixesData.constructor === Object) {
        return <div></div>
    }

    var masonryOptions = {
        transitionDuration: 1
    };

    var childElements = prefixesData.locations.map((prefixData) => {
        return (
            <Panel className="panel" key={prefixData.country}>
                <Panel.Heading className="panel-heading">
                    <Panel.Title>Country: {prefixData.country}</Panel.Title>
                </Panel.Heading>
                <PrefixCard prefix={prefixData} />
            </Panel>
        )
    });

    return (
        <div className="masonry-container">
            <h4>Prefixes</h4>

            <Masonry options={masonryOptions}>
                {childElements}
            </Masonry>
        </div>
    )
}

export default Prefixes;