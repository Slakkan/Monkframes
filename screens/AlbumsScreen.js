import React from 'react'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'

import loading from '../assets/images/loading.gif'
import { fetchAlbums, fetchPhotos, setAlbums, setPhotos, getData, storeData } from '../actions/data'
import Album from '../components/Album'
import PhotosOverlay from '../components/Photos'

class AlbumsScreen extends React.Component {
  static navigationOptions = {
    title: 'Albums',
  };

  constructor() {
    super()
    this.state = {
      albumsLoaded: false,
      photosLoaded: false,
    }
  }

  checkForData() {
    const { albums, photos } = this.props
    if (!albums) {
      this.setState({ albumsLoaded: false })
      this.getStoredData('albums')
    }
    if (!photos) {
      this.setState({ photosLoaded: false })
      this.getStoredData('photos')
    }
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
    const { albumsLoaded, photosLoaded, overlayVisible } = this.state
    const { photos, userID, albums } = this.props
    return (
      <ScrollView style={styles.container}>
        <NavigationEvents onDidFocus={() => this.checkForData()} />

        <PhotosOverlay />

        {albumsLoaded && photosLoaded && <Album photos={photos} userID={userID} albums={albums} />
          || <Image containerStyle={styles.loadingContainer} style={styles.loading} source={loading} />}

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 150
  },
  loading: {
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