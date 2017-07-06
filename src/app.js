import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SearchBarContainer from './containers/search-bar';
import SearchResultContainer from './containers/search-result';
import ItemPageContainer from './containers/item-page';

import SearchBarContainerReducer from './containers/search-bar/reducers';
import SearchResultContainerReducer from './containers/search-result/reducers';
import ItemPageContainerReducer from './containers/item-page/reducers';
import mainStyle from './common.css';

let store = createStore(
    combineReducers({
      SearchBarContainerReducer,
      SearchResultContainerReducer,
      ItemPageContainerReducer
    }),
    applyMiddleware(
      thunkMiddleware
    )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route component={SearchBarContainer} />
            <Switch>
              <Route path="/items/:id" component={ItemPageContainer}/>
              <Route path="/items" component={SearchResultContainer}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
