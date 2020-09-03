import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from '@apollo/react-hooks'
import { createUploadLink } from 'apollo-upload-client'

import { Provider } from 'react-redux'
import store from './redux/store'

const getToken = () => {
  return store.getState().jwt.jwt
}

const authLink = setContext((_, { headers }) => {
  const token = getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(createUploadLink({
    uri: 'https://compsci.cl/ept/graphql'
  })),
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
  },
  cache: new InMemoryCache()
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
