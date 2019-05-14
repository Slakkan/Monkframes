import React from 'react'
import { View, ActivityIndicator, StyleSheet, Dimensions, ScrollView, FlatList, Image } from 'react-native'
import { Card, Text, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'

import { fetchAlbums, fetchPhotos } from '../actions/albums'

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
    this.getAlbums()
    this.getPhotos()
  }

  async getAlbums() {
    const success = await this.props.fetchAlbums()
    if (success) {
      this.setState({ albumsLoaded: true })
    }
  }

  async getPhotos() {
    const success = await this.props.fetchPhotos()
    if (success) {
      this.setState({ photosLoaded: true })
    }
  }

  renderAlbums() {
    const { userID, albums } = this.props
    // The database is extremely inefficient as it forces you to download other users data
    const userAlbums = albums.filter((album) => album.userId === userID)
    return userAlbums.map((album) => (
      <Card key={album.id} containerStyle={styles.albumCard} titleStyle={styles.titleCard} title={album.title}>
        <View style={[styles.album, {maxHeight: Dimensions.get('window').width * 2 / 3}]}>{this.renderPhotos(album.id, 0, 2)}</View>
        <View style={[styles.album, {maxHeight: Dimensions.get('window').width * 1 / 3}]}>{this.renderPhotos(album.id, 3, 5)}</View>
      </Card>
    ))
  }

  renderPhotos(albumID, minIndex, maxIndex) {
    const { photos } = this.props
    const albumPhotos = photos.filter((photo) => photo.albumId === albumID)
    return albumPhotos.map((photo, index) => {
      if (index >= minIndex && index <= maxIndex) {
        return (
          <Image
            key={index}
            source={{ uri: index === 0 ? photo.url : photo.thumbnailUrl }}
            style={index === 0 ? styles.imagePreviewMain : styles.imagePreview}
            PlaceholderContent={<ActivityIndicator />} />
        )
      } else { return }
    })
  }

  render() {
    const { albumsLoaded, photosLoaded } = this.state
    return (
      <View style={styles.container}>
        {albumsLoaded && photosLoaded && <ScrollView>{this.renderAlbums()}</ScrollView>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  albumCard: {
    margin: 0,
    padding: 0
  },
  titleCard: {
    fontSize: 20,
    paddingBottom: 0,
    marginBottom: 0
  },
  album: {
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  imagePreviewMain: {
    width: Dimensions.get('window').width * 2 / 3,
    height: Dimensions.get('window').width * 2 / 3,
    resizeMode: 'cover'
  },
  imagePreview: {
    width: Dimensions.get('window').width * 1 / 3,
    height: Dimensions.get('window').width * 1 / 3,
    resizeMode: 'cover'
  },
  image: {

  }
})

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  albums: state.data.albums,
  photos: state.data.photos
})

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: () => dispatch(fetchAlbums()),
  fetchPhotos: () => dispatch(fetchPhotos())
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsScreen)