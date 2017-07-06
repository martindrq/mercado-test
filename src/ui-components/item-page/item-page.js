import React from 'react';
import Img from 'react-image';
import PropTypes from 'prop-types';
import style from './styles/item-page.css';
import imagePlaceholder from './images/image-placeholder.svg';

const ItemPage = ({image, condition, title, currency, amount, description, soldQuantity}) => {

  const rawMarkup = () => {
    const rawMarkup = description;
    return { __html: rawMarkup };
  }

  return (
    <div className="item-page">
      <div className="image">
          <Img src={[
            image,
            imagePlaceholder
          ]}/>
      </div>
      <div className="info">
          <span className="type"> {condition} - {soldQuantity} vendidos</span>
          <span className="title">{title}</span>
          <span className="price">{currency} 1980</span>
          <button className="buy">Comprar</button>
      </div>
      <div className="description">
          <span className="title">Descripción del producto</span>
          <span className="content"><span dangerouslySetInnerHTML={rawMarkup()} /></span>
      </div>
    </div>
  )
};

ItemPage.propTypes = {
  image: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  title:  PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  soldQuantity: PropTypes.number.isRequired,
};

export default ItemPage;
