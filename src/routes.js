import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App/App';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';
import Subnetting from './components/Subnetting/Subnetting';
import Dns from './components/Dns/Dns';
import Mac from './components/Mac/Mac.js';
import WhoIs from './components/WhoIs/WhoIs';
import Converter from './components/Converter/Converter';
import Bgp from './components/Bgp/Bgp';
import BitsnBytes from './components/BitsnBytes/BitsnBytes';

const Routes = (props) => (
	<Router {...props}>
		<Route path="/" component={App}>
			<IndexRoute component={Subnetting} />
			<Route path="/subnetting" component={Subnetting} />
			<Route path="/converter" component={Converter} />
            		<Route path="/bitsnbytes" component={BitsnBytes} />
            		<Route path="dns" component={Dns} />
			<Route path="/whois" component={WhoIs} />
			<Route path="/bgp" component={Bgp} />
			<Route path="/mac" component={Mac} />
			<Route path="/about" component={About} />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
);

export default Routes;
