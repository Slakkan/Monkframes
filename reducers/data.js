const albumsDefault = {
    albums: [],
    photos: []
}

export const data = (state = albumsDefault, action) => {
    switch (action.type) {
        case 'SET_ALBUMS':
            return { ...state, albums: action.albums }
        case 'SET_PHOTOS':
            return { ...state, photos: action.photos }
        default:
            return state
    }
}
