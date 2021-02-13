import { combineReducers } from 'redux'
import AUTH from './auth'

const AllReducer = combineReducers({
    isLogged: AUTH,
})

export default AllReducer;