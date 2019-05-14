import axios from 'axios'

const jsonplaceholder = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 1000,
  });

export const setAlbums = (albums) => ({
    type: 'SET_ALBUMS',
    albums
})

export const fetchAlbums = () => {
    return (dispatch) => {
        return jsonplaceholder.get('albums').then((response) => dispatch(setAlbums(response.data)))
    }
}

export const setPhotos = (photos) => ({
    type: 'SET_PHOTOS',
    photos
})

export const fetchPhotos = () => {
    return (dispatch) => {
        return jsonplaceholder.get('photos').then((response) => dispatch(setPhotos(response.data)))
    }
}