import React, { Component } from 'react';
var Sidebar = require('react-sidebar').default;

import './App.css';

import SidebarContent from '../SideBarContent/SideBarContent';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: false,
			sidebarDocked: false,
			mql: undefined
		}
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	componentDidMount() {
		var mql = window.matchMedia(`(min-width: 800px)`);
		mql.addListener(this.mediaQueryChanged.bind(this));
		this.setState({ mql: mql, sidebarDocked: mql.matches });
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}

	mediaQueryChanged() {
		this.setState({ sidebarDocked: this.state.mql.matches });
	}

	sidebarStyles = {
		root: {left: 0},
		content: { overflowY: 'scroll', WebkitOverflowScrolling: 'touch' },
       
	}

	render() {
		const sidebarContent =<SidebarContent />;

		return (
			<div>
				<Sidebar

					styles={this.sidebarStyles}
					sidebar={sidebarContent}
					open={this.state.sidebarOpen}
					docked={this.state.sidebarDocked}
					onSetOpen={this.onSetSidebarOpen}>
					{this.props.children}
				</Sidebar>

			</div>
		);
	}
}

export default App;
