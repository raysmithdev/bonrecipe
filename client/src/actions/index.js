import axios from 'axios'
import { FETCH_RECIPES } from './types'
import { FETCH_USER_RECIPES } from './types'
import { FETCH_USER_SUCCESS } from './types'
import { ON_LOGOUT } from './types'

export const fetchRecipes = () => async dispatch => {
    const route = `http://localhost:5000/api/recipes`
    const res = await axios.get(route)
    dispatch({ type: FETCH_RECIPES, payload: res.data })
}

export const fetchUserSuccess = (id, email, name, service) => ({
    type: FETCH_USER_SUCCESS, id, email, name, service
})

export const fetchUserRecipes = (id, service) => async dispatch => {
    // console.log(id, service, type)
    const route = `http://localhost:5000/recipes/${id}/${service}`
    const res = await axios.get(route)
    dispatch({ type: FETCH_USER_RECIPES, payload: res.data })
}

export const onLogout = () => {
    return { type: ON_LOGOUT }
}
