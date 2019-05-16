import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Card } from 'react-native-elements'

import { Preview } from '../components/Preview';
import { changeOverlayVisibility } from '../actions/UI'

const Album = ({ data, changeOverlayVisibility, userID }) => {
    const userData = data.filter((object) => object.userID === userID)[0].userData
    return userData.map((object) => (
        <TouchableWithoutFeedback key={object.albumID} onPress={() => changeOverlayVisibility(object.albumID)}>
            <Card containerStyle={styles.albumCard} titleStyle={styles.titleCard} title={object.title}>
                <View style={[styles.album, { maxHeight: Dimensions.get('window').width * 2 / 4 }]}>
                    <Preview photos={object.photos} albumID={object.albumID} minIndex={0} maxIndex={2} ></Preview>
                </View>
                <View style={[styles.album, { maxHeight: Dimensions.get('window').width * 1 / 4 }]}>
                    <Preview photos={object.photos} albumID={object.albumID} minIndex={3} maxIndex={5} ></Preview>
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
        fontWeight: '700',
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
    changeOverlayVisibility: (albumID) => dispatch(changeOverlayVisibility(albumID))
})

export default connect(undefined, mapDispatchToProps)(Album)