import React from 'react';

import './PrefixCard.css';

const PrefixCard = ({prefix}) => {
	return (

		<div className="panel-body">
			<ul>
				{prefix.prefixes.map((singlePrefix) => {
					return <li key={Math.random()}>{singlePrefix} </li>
				})}
			</ul>
		</div>
	)
}

export default PrefixCard;