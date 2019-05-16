const interfaceDefault = {
    overlayVisibility: false,
}

export const UI = (state = interfaceDefault, action) => {
    switch (action.type) {
        case 'OVERLAY_VISIBILITY':
            return { ...state,  overlayVisibility: !state.overlayVisibility, overlayAlbumID: action.albumID }
        default:
            return state
    }
}