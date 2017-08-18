import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostIndex from './components/post_index';
import PostsNew from './components/posts_new';
import PostShow from './components/post_show';
import NotFound from './components/not_found';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
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
