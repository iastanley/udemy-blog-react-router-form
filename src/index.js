import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import PostIndex from './components/post_index';
import PostsNew from './components/posts_new';
import PostShow from './components/post_show';
import NotFound from './components/not_found';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// TODO - add default 404 route
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostShow}/>
          <Route exact path="/" component={PostIndex}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
