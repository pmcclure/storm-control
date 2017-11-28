import React, { Component } from 'react';
import './App.css';
import SidebarContent from '../SideBarContent/SideBarContent';
import Header from '../Header/Header';
const Sidebar = require('react-sidebar').default;


const mql = window.matchMedia(`(min-width: 800px)`); 
const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: '#be5108',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: false,
			sidebarDocked: false,
			mql: mql
		}

		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
		this.toggleOpen = this.toggleOpen.bind(this);
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged.bind(this));
		this.setState({ mql: mql, sidebarDocked: mql.matches });
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	}

	mediaQueryChanged() {
		this.setState({ sidebarDocked: this.state.mql.matches });
	}

	toggleOpen(ev) {
	    this.setState({sidebarOpen: !this.state.sidebarOpen});

	    if (ev) {
	        ev.preventDefault();
	    }
	}

	sidebarStyles = {
		root: {left: 0},
		content: { overflowY: 'scroll', WebkitOverflowScrolling: 'touch'},      
	}

	render() {
		const sidebarContent =<SidebarContent />;

    	const contentHeader = (
			<span>
				{!this.state.sidebarDocked && <a onClick={this.toggleOpen.bind(this)} href="#" style={styles.contentHeaderMenuLink}>=</a>}
				<span> s t o r m c o n t r o l </span>
			</span>
        );

		return (
			<div>
				<Sidebar
					styles={this.sidebarStyles}
					sidebarClassName={'sidebarClass'}
					overlayClassName={'overlayClass'}
					sidebar={sidebarContent}
					open={this.state.sidebarOpen}
					docked={this.state.sidebarDocked}
					onSetOpen={this.onSetSidebarOpen}>
					<Header title={contentHeader}>
						{this.props.children}
					</Header>
				</Sidebar>
			</div>
		);
	}
}

export default App;
