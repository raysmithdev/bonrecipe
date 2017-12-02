import axios from 'axios'
import { FETCH_RECIPES } from './types'

export const fetchRecipes = (dept) => async dispatch => {
    const route = `http://localhost:5000/api/recipes`
    const res = await axios.get(route)
    dispatch({ type: FETCH_RECIPES, payload: res.data })
}