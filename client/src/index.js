import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { loadState, saveState } from './localStorage'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const persistedState = loadState()
const store = createStore(
    reducers, 
    persistedState, 
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
store.subscribe(() => saveState(store.getState()))
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
