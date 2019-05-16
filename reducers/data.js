export const data = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ALBUMS':
            return { ...state, albums: action.albums }
        case 'SET_PHOTOS':
            return { ...state, photos: action.photos }
        case 'CLEAR_ALBUMS_STORE':
            return { }
        default:
            return state
    }
}
