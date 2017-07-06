import React from 'react';
import PropTypes from 'prop-types';
import style from './styles/breadcrumb.css';

const Breadcrumb = ({list}) => (
  <div className="breadcrumb">
        <ul className="list">
            {
              list.map((item, key) =><li key={key} className="item">{item}</li>)
            }
        </ul>
  </div>
);

Breadcrumb.propTypes = {
  list: PropTypes.array.isRequired
};

export default Breadcrumb;
