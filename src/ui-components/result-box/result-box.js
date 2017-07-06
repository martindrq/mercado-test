import React from 'react';
import Img from 'react-image';
import PropTypes from 'prop-types';
import style from './styles/result-box.css';
import imagePlaceholder from './images/image-placeholder.svg';

const ResultBox = ({image, price, title, address, onClick}) => (
  <div className="result-box">
      <div className="image" onClick={onClick}>
          <Img src={[
            image,
            imagePlaceholder
          ]}/>
      </div>
      <div className="info">
        <span className="price">{price}</span>
        <span onClick={onClick} className="description">{title}</span>
      </div>
      <div className="place">{address}</div>
  </div>
);

ResultBox.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
};

export default ResultBox;
