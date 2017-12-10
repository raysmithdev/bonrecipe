import { FETCH_RECIPES, SEARCH_RECIPE } from '../actions/types'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_RECIPES:
            return action.payload
        case SEARCH_RECIPE:
            return action.payload
        default:
            return state
    }
}