import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import { Provider } from 'react-redux'
import store from './redux/store'

const getToken = () => {
  return store.getState().jwt.jwt
}

const client = new ApolloClient({
  uri: 'https://compsci.cl/ept/graphql', // 1337
  request: operation => {
    const token = getToken()
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }
    else {
      operation.setContext({})
    }
  }
})

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
