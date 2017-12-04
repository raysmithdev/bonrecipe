import { FETCH_USER_SUCCESS, ON_LOGOUT } from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {     
            return {
                ...state,
                id: action.id,
                email: action.email,
                name: action.name
            }
        }
        case ON_LOGOUT:
            window.localStorage.clear()
            window.location = '/login'
            return state = {}
        default:
            return state
    }
}
