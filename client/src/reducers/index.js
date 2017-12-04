import { combineReducers } from 'redux'
import recipeReducer from './recipeReducer'
import authReducer from './authReducer'

export default combineReducers({
    recipes: recipeReducer, 
    auth: authReducer
})