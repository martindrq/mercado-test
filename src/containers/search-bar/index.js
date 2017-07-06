import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parseQueryString } from '../../helpers';
import SearchBar from '../../ui-components/search-bar/search-bar';
import styles from './search-bar.css';
import { searchProduct, changeSearch, initialize } from './actions';
import { Redirect, withRouter } from 'react-router-dom';


class SearchBarContainer extends React.Component{
    constructor(props){
        super(props);
        const { location, dispatch } = this.props;
        const query = parseQueryString(location.search);
        if(query && query.search) {
            dispatch(initialize(query.search));
        }
    }

    render(){
      const { dispatch, text, history } = this.props;

      return (
          <header className="search-page">
            <div className="search-bar-container">
              <SearchBar
                onSearch={() => dispatch(searchProduct(text, history))}
                onChange={(text) => dispatch(changeSearch(text))}
                value={text}
              />
            </div>
          </header>
      );
    }
}

const mapStateToProps = state => {
  const { text } = state.SearchBarContainerReducer;
  return {
    text
  }
}

export default withRouter(connect(mapStateToProps)(SearchBarContainer));
