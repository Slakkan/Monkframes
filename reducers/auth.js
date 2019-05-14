const authDefault = {
    userID: 1
}

export const auth = (state = authDefault, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, userID: action.userID }
        default:
            return state
    }
}