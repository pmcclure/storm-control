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

	var style = {

	};

	var childElements = prefixesData.locations.map((prefixData) => {
		return (
			<Panel className="panel" key={prefixData.country} header={`Country - ${prefixData.country}`} >
				<PrefixCard prefix={prefixData} />
			</Panel>
		)
	});

	return (
		<div className="masonry-container">
			Prefixes
			<Masonry
				className={'my-gallery-class'} // default ''
				style={style}
				elementType={'div'} // default 'div'
				options={masonryOptions} // default {}
				disableImagesLoaded={false} // default false
				updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
			>
				{childElements}
			</Masonry>
		</div>
	)
}

export default Prefixes;