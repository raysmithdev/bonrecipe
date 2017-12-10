import { FETCH_USER_SUCCESS, ON_LOGOUT } from '../actions/types'
const initialState = {
    isLoggedIn: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {     
            return {
                ...state,
                id: action.id,
                email: action.email,
                name: action.name,
                service: action.service,
                isLoggedIn: true
            }
        }
        case ON_LOGOUT:
            window.localStorage.clear()
            window.location = '/login'
            // return state = {}
        default:
            return state
    }
}
