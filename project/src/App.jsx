import React from 'react'

import GlobalStyledProvide from './HOC/GlobalStyledProvider'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import RootRoute from './Route/RootRoute'
import { store, persist } from './store/initStore'
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client'
export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persist} loading={null}>
          <BrowserRouter>
            <GlobalStyledProvide />

            <RootRoute />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

export default App
