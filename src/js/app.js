import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import store from 'js/store'
import route from 'js/route'

import 'style/app.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={route} />
  </Provider>,
  document.getElementById('app')
)
