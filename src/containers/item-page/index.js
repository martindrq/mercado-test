import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ItemPage from '../../ui-components/item-page/item-page';
import styles from './item-page.css';
import { fetchProduct } from './actions'
import Breadcrumb from '../../ui-components/breadcrumb/breadcrumb';


class ItemPageContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { match } = this.props;
        this.fetchProduct(match.params.id);
    }

    fetchProduct(itemId){
        const { dispatch } = this.props;
        if(itemId){
            dispatch(fetchProduct(itemId));
        }
    }

    render(){
        const { product } = this.props;
        if(!product || !product.item) return null;
        const item = product.item;
        return (
          <section className="item-page-container">
              <Breadcrumb list={item.categories}/>
              <ItemPage
                image={item.picture}
                condition={item.condition}
                title={item.title}
                currency={item.price.currency}
                amount={item.price.amount}
                description={item.description}
                soldQuantity={item.sold_quantity}
              />
          </section>
        )
    }
}


const mapStateToProps = state => {
  const { product } = state.ItemPageContainerReducer;
  return {
    product
  }
}

export default withRouter(connect(mapStateToProps)(ItemPageContainer));
