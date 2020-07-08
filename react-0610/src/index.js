import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import './common.less';
import Router from './Router';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
let store = createStore(reducer)



ReactDOM.render(
  <Provider store={store}>
    <Router /></Provider>,
  document.getElementById('root')
);
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
