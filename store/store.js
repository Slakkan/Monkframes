import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from  'redux-thunk'

import { data } from '../reducers/data'
import { auth } from '../reducers/auth'

const reducers = combineReducers({data, auth})

const store = createStore(reducers, applyMiddleware(thunk))

export default store