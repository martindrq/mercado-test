import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Breadcrumb from '../../ui-components/breadcrumb/breadcrumb';
import ResultBox from '../../ui-components/result-box/result-box';
import { parseQueryString } from '../../helpers';
import styles from './search-result.css';
import { fetchProducts, goToProduct } from './actions'

class SearchResultContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
        this.hasSearch = this.getSearchParam(this.props.location) !== null;
    }

    componentWillMount() {
        const { location } = this.props;
        this.fetchProducts(this.getSearchParam(location));
    }

    componentWillReceiveProps(nextProps){
      const { location } = this.props;
      const newsearchWord = this.getSearchParam(nextProps.location);
      const oldsearchWord = this.getSearchParam(location);
      if( newsearchWord !== oldsearchWord){
        this.fetchProducts(newsearchWord);
      }
    }

    fetchProducts(searchWord){
        const { dispatch } = this.props;
        if(searchWord){
            dispatch(fetchProducts(searchWord));
        }
    }

    getSearchParam(location){
      const query = parseQueryString(location.search);
      if(query.search){
        return query.search;
      }
      return null;
    }

    render(){
        const { products, dispatch, history, location, fetching } = this.props;
        if(!this.hasSearch || fetching) return null;

        return (
          <section className="result-page-container">
              { products && products.categories &&
                  <Breadcrumb list={products.categories.concat([this.getSearchParam(location)])}/>
              }
              { products && products.items &&
                  products.items.map((result, key) =>
                      <ResultBox
                          onClick={() => dispatch(goToProduct(result.id, history))}
                          key={key}
                          image={result.picture}
                          price={`${result.price.currency} ${result.price.amount}`}
                          title={result.title}
                          address={result.state_name}/>
                  )
              }
          </section>
        )
    }
}


const mapStateToProps = state => {
  const { products, fetching } = state.SearchResultContainerReducer;
  return {
    products,
    fetching
  }
}

export default withRouter(connect(mapStateToProps)(SearchResultContainer));
