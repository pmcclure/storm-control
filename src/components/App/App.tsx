import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'react-sidebar'; 
import SidebarContent from '../SideBarContent/SideBarContent';
import Header from '../Header/Header';
import './App.css';


const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: '#be5108',
    padding: 8,
  },
  sidebar: {
    root: { left: '0' },
    content: { overflowY: 'scroll' as const, WebkitOverflowScrolling: 'touch' as const },
  }
};

const App: React.FC = () => { 
  const mql = window.matchMedia(`(min-width: 800px)`);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches);

  useEffect(() => {
    const mediaQueryChanged = () => {
      setSidebarDocked(mql.matches);
    };

    mql.addEventListener('change', mediaQueryChanged);
    
    return () => {
      mql.removeEventListener('change', mediaQueryChanged);
    };
  }, [mql]);

  const onSetSidebarOpen = (open: boolean) => {
    setSidebarOpen(open);
  };

  const toggleOpen = (ev?: React.MouseEvent) => {
    if (ev) ev.preventDefault();
    setSidebarOpen(!sidebarOpen);
  };

  const contentHeader = (
    <span>
      {!sidebarDocked && (
        <a onClick={toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>
      )}
      <span> s t o r m c o n t r o l </span>
    </span>
  );

  return (
    <div>
      <Sidebar
        styles={styles.sidebar}
        sidebarClassName="sidebarClass"
        overlayClassName="overlayClass"
        sidebar={<SidebarContent />}
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={onSetSidebarOpen}
      >
        <Header title={contentHeader}>         
          <Outlet />
        </Header>
      </Sidebar>
    </div>
  );
};

export default App;