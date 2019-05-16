import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Card } from 'react-native-elements'

import { Preview } from '../components/Preview';
import { changeOverlayVisibility } from '../actions/UI'

const Album = ({ changeOverlayVisibility, photos = [], userID, albums = [] }) => {
    const userAlbums = albums.filter((album) => album.userId === userID)
    return userAlbums.map((album) => (
        <TouchableWithoutFeedback key={album.id} onPress={() => changeOverlayVisibility()}>
            <Card containerStyle={styles.albumCard} titleStyle={styles.titleCard} title={album.title}>
                <View style={[styles.album, { maxHeight: Dimensions.get('window').width * 2 / 4 }]}>
                    <Preview photos={photos} albumID={album.id} minIndex={0} maxIndex={2} ></Preview>
                </View>
                <View style={[styles.album, { maxHeight: Dimensions.get('window').width * 1 / 4 }]}>
                    <Preview photos={photos} albumID={album.id} minIndex={3} maxIndex={5} ></Preview>
                </View>
            </Card>
        </TouchableWithoutFeedback>
    ))
}

const styles = StyleSheet.create({
    albumCard: {
        marginTop: 25,
        paddingBottom: 25,
        backgroundColor: '#eaeaea',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#ccc'
    },
    titleCard: {
        fontSize: 20,
        padding: 0,
        marginBottom: 0
    },
    album: {
        margin: 0,
        padding: 0,
        flexWrap: 'wrap',
        alignSelf: 'center',
    }
})

const mapDispatchToProps = (dispatch) => ({
    changeOverlayVisibility: () => dispatch(changeOverlayVisibility())
})

export default connect(undefined, mapDispatchToProps)(Album)