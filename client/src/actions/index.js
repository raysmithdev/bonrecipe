import axios from 'axios'
import { FETCH_RECIPES } from './types'
import { FETCH_USER_RECIPES } from './types'
import { FETCH_USER_SUCCESS } from './types'
import { ADD_SYS_RECIPE } from './types'
// import { ADD_USER_RECIPE } from './types'
import { SEARCH_RECIPE } from './types'
import { ON_LOGOUT } from './types'

export const fetchRecipes = () => async dispatch => {
    try {
        const route = `http://localhost:5000/api/recipes`
        const res = await axios.get(route)
        dispatch({ type: FETCH_RECIPES, payload: res.data })        
    } catch (error) {
        return error
    }
}

export const fetchUserSuccess = (id, email, name, service) => ({
    type: FETCH_USER_SUCCESS, id, email, name, service
})

export const fetchUserRecipes = (id, service) => async dispatch => {
    try {
        const route = `http://localhost:5000/recipes/${id}/${service}`
        const res = await axios.get(route)
        dispatch({ type: FETCH_USER_RECIPES, payload: res.data })        
    } catch (error) {
        return error
    }
}

export const addSysRecipe = (id, service, data) => async dispatch => {
    try {
        const route = `http://localhost:5000/sysrecipes/add/${id}/${service}`
        const res = await axios.post(route, data)
        dispatch({ type: ADD_SYS_RECIPE, payload: res.data })   
    } catch (error) {
        return error
    }
}

export const searchRecipe = (query) => async dispatch => {
    try {
        const route = `http://localhost:5000/api/search_recipes/${query}`
        const res = await axios.get(route)
        console.log(res)      
        dispatch({ type: SEARCH_RECIPE, payload: res.data })
    } catch (error) {
        return error
    }
}

// export const searchRecipe = (query) => async dispatch => {
//     try {
//         console.log(query)        
//         const route = `http://localhost:5000/api/recipes/`
//         const res = await axios.post(route, query)
//         // dispatch({ type: SEARCH_RECIPE, payload: res.data })
//     } catch (error) {
//         console.log(error)        
//         return error
//     }
// }

export const onLogout = () => {
    return { type: ON_LOGOUT }
}
