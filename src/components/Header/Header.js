import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  header: {
    backgroundColor: 'rgb(35, 40, 48)',
    color: '#be5108',
    padding: '10px 10px 10px 30px',
    fontSize: '32px',
  },
};

const StormControlTitlePanel = (props) => {
  return (
    <div>
      <div style={styles.header}>{props.title}</div>
      {props.children}
    </div>
  );
};

StormControlTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  children: PropTypes.object,
};

export default StormControlTitlePanel;