import React from 'react';
import { Link } from 'react-router'

import './SideBarContent.css';
import stormOrange from './stormOrange.png';
import githubFooter from './github-footer.png';

const styles = {
	sidebar: {
		width: 256,
		height: '100%',
	},
	sidebarLink: {
		display: 'block',
		padding: '30px 16px 16px 60px',
		color: 'white',
        fontSize: '16px',
		textDecoration: 'none',
	},
	divider: {
		margin: '8px 0',
		height: 1,
		backgroundColor: '#757575',
	},
	content: {
		width: 256,
        paddingTop: '25px',
		height: '100%',
		backgroundColor: '#232830',
		position: 'relative'
	},
};

const SideBarContent = (props) => {
	return (
		<div style={styles.content}>
            <div className="image">
                <img src={stormOrange} alt="Storm Control" />
            </div>
            <div >
				<Link to="/subnetting" style={styles.sidebarLink}  >
					<div className="linkFade">Subnetting</div>
				</Link>
			</div>
            <div>
				<Link to="/converter" style={styles.sidebarLink}>
					<div className="linkFade">Decimal/Binary/Hex</div>
				</Link>
			</div>
             <div>
				<Link to="/bitsnbytes" style={styles.sidebarLink}>
					<div className="linkFade">Bits/Bytes</div>
				</Link>
			</div>
			<div>
				<Link to="/mac" style={styles.sidebarLink}>
					<div className="linkFade">MAC lookup</div>
				</Link>
			</div>
            <div>
				<Link to="/dns" style={styles.sidebarLink}>
					<div className="linkFade">DNS Lookup</div>
				</Link>
			</div>
			<div>
				<Link to="/whois" style={styles.sidebarLink}>
					<div className="linkFade">Whois</div>
				</Link>
			</div>
			<div>
				<Link to="/bgp" style={styles.sidebarLink}>
					<div className="linkFade">BGP</div>
				</Link>
			</div>
			<div className="github-footer">
				<a href="https://github.com/pmcclure/storm-control" target="_blank" rel="noopener noreferrer"><img src={githubFooter} alt="Github" /></a>
			</div>
		</div>
	);
};

export default SideBarContent;
