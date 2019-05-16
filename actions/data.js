import axios from 'axios'
import { AsyncStorage } from 'react-native'

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

export const clearAlbumsStore = () => ({
    type: 'CLEAR_ALBUMS_STORE'
})

export const storeData = async (key, data) => {
    try {
        const JSONdata = JSON.stringify(data)
        const savedData = await AsyncStorage.setItem(key, JSONdata)
        console.log('Data saved')
    } catch (e) {
        console.log(e)
    }
}

export const getData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        if (data !== null) {
            return JSON.parse(data)
        }
    } catch (e) {
        console.log(e)
    }
}

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear()
        console.log('Data cleared')
    } catch (error) {
        console.log(e)
    }
}