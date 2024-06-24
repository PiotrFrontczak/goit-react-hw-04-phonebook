import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';





Contacts.propTypes = {
  initialContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

Contacts.defaultProps = {
  initialContacts: [],
};

ReactDOM.render(<App />, document.getElementById('root'));
