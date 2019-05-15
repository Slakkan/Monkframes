import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Card } from 'react-native-elements'

import { Preview } from '../components/Preview';

export const Album = ({ photos, userID, albums }) => {
    const userAlbums = albums.filter((album) => album.userId === userID)
    return userAlbums.map((album) => (
        <Card key={album.id} containerStyle={styles.albumCard} titleStyle={styles.titleCard} title={album.title}>
            <View style={[styles.album, { maxHeight: Dimensions.get('window').width * 2 / 3 }]}>
                <Preview photos={photos} albumID={album.id} minIndex={0} maxIndex={2} ></Preview>
            </View>
            <View style={[styles.album, { maxHeight: Dimensions.get('window').width * 1 / 3 }]}>
                <Preview photos={photos} albumID={album.id} minIndex={3} maxIndex={5} ></Preview>
            </View>
        </Card>
    ))
}

const styles = StyleSheet.create({
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
    }
})