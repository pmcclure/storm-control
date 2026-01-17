import React, { type ReactNode } from 'react';


interface HeaderProps {
  title: string | ReactNode; 
  children?: ReactNode;      
  style?: React.CSSProperties; 
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: '#232830',
    color: '#be5108',
    padding: '10px 10px 10px 30px',
    fontSize: '32px',
  },
};

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <div>
      <div style={styles.header}>{title}</div>
      {children}
    </div>
  );
};

export default Header;