import React from 'react';
import { ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { Image } from 'react-native-elements'

export const Preview = ({photos, albumID, minIndex, maxIndex}) => {
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

const styles = StyleSheet.create({
    imagePreviewMain: {
      width: Dimensions.get('window').width * 2 / 4,
      height: Dimensions.get('window').width * 2 / 4,
    },
    imagePreview: {
      width: Dimensions.get('window').width * 1 / 4,
      height: Dimensions.get('window').width * 1 / 4,
    }
  })