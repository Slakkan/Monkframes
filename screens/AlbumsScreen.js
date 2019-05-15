import React from 'react'
import { ScrollView, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'

import { fetchAlbums, fetchPhotos, setAlbums, setPhotos, getData, storeData } from '../actions/albums'
import { Album } from '../components/Album'

class AlbumsScreen extends React.Component {
  static navigationOptions = {
    title: 'Albums',
  };

  constructor() {
    super()

    this.state = {
      albumsLoaded: false,
      photosLoaded: false
    }

  }

  componentDidMount() {
    this.getStoredData('albums')
    this.getStoredData('photos')
  }

  async getStoredData(key) {
    const data = await getData(key)
    switch (key) {
      case 'albums':
        if (data) {
          this.props.setAlbums(data)
          this.setState({ albumsLoaded: true })
        }
        else { this.getAlbums() }
        return
      case 'photos':
        if (data) { 
          this.props.setPhotos(data)
          this.setState({ photosLoaded: true })
        }
        else { this.getPhotos() }
        return
      default:
        return
    }
  }

  async getAlbums() {
    const data = await this.props.fetchAlbums()
    if (data) {
      this.setState({ albumsLoaded: true })
      storeData('albums', data.albums)
    }
  }

  async getPhotos() {
    const data = await this.props.fetchPhotos()
    if (data) {
      this.setState({ photosLoaded: true })
      storeData('photos', data.photos)
    }
  }

  render() {
    const { albumsLoaded, photosLoaded } = this.state
    const { photos, userID, albums } = this.props
    return (
      <ScrollView style={styles.container}>
        {albumsLoaded && photosLoaded && <Album photos={photos} userID={userID} albums={albums} />
          || <Image style={styles.loading} source={require('../assets/images/loading.gif')} />}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    alignSelf: 'center',
    width: 150,
    height: 150
  }
})

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  albums: state.data.albums,
  photos: state.data.photos
})

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: () => dispatch(fetchAlbums()),
  setAlbums: (albums) => dispatch(setAlbums(albums)),
  fetchPhotos: () => dispatch(fetchPhotos()),
  setPhotos: (photos) => dispatch(setPhotos(photos))
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsScreen)