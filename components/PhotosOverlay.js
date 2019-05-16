import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Text, Dimensions, TouchableHighlight, ActivityIndicator } from 'react-native'
import { Overlay, Divider, Image, Icon } from 'react-native-elements'

import { changeOverlayVisibility } from '../actions/UI'

class PhotosOverlay extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedPhotoIndex: 0,
            showTitle: false
        }
    }

    renderOtherPhotos() {
        const photos = this.getOverlayAlbum().photos
        return (
            <ScrollView horizontal={true} style={styles.Scroll}>
                {
                    photos.map((photo, index) => {
                        return (
                            <TouchableHighlight key={index} onPress={() => this.setState({ selectedPhotoIndex: index })} underlayColor='white'>
                                <Image
                                    containerStyle={styles.ImagePreview}
                                    source={{ uri: photo.thumbnailUrl }}
                                    style={styles.ImagePreview}
                                    PlaceholderContent={<ActivityIndicator />} />
                            </TouchableHighlight>
                        )
                    })
                }
            </ScrollView>
        )
    }

    renderSelectedPhoto() {
        const { selectedPhotoIndex, title } = this.state
        const overlayAlbum = this.getOverlayAlbum()
        const selectedPhoto = overlayAlbum.photos[selectedPhotoIndex]
        return (
            <View>
                <View>
                    <Image
                        source={{ uri: selectedPhoto.url }}
                        style={styles.Image}
                        PlaceholderContent={<ActivityIndicator />} />
                </View>
            </View>
        )

    }

    getOverlayAlbum() {
        const { overlayAlbumID, data, userID } = this.props
        const userData = data.find((object) => object.userID === userID).userData
        return userData.find((object) => object.albumID === overlayAlbumID)
    }

    render() {
        const { overlayVisibility, overlayAlbumID } = this.props
        const { selectedPhotoIndex, showTitle } = this.state
        return (
            <View>
                {overlayAlbumID && <Overlay
                    overlayStyle={styles.Overlay}
                    isVisible={overlayVisibility}
                    onBackdropPress={() => {
                        this.props.changeOverlayVisibility()
                        this.setState({ selectedPhotoIndex: 0 })
                    }}
                    windowBackgroundColor="rgba(0, 0, 0, .5)"
                    overlayBackgroundColor="#eaeaea"
                    width={Dimensions.get('window').width * 0.9}
                    height={Dimensions.get('window').height * 0.7} >
                    <View>
                        {showTitle && <Text style={styles.title}>{this.getOverlayAlbum().photos[selectedPhotoIndex].title}</Text>}
                        <View style={styles.IconView}>
                            <Icon raised reverse
                                onPress={() => this.setState({ showTitle: !showTitle })}
                                name='info' size={20}
                                color='#f50'
                                containerStyle={styles.IconContainer} />
                        </View>

                        <View style={styles.container}>
                            {this.renderSelectedPhoto()}
                            <Divider style={styles.Divider} />
                            {this.renderOtherPhotos()}
                        </View>
                    </View>
                </Overlay>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.7,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    Overlay: {
        position: 'absolute',
        borderRadius: 25,
        top: 50,
        borderWidth: 2,
        borderColor: '#ccc'
    },
    Scroll: {
        width: Dimensions.get('window').width * 0.8,
        maxHeight: Dimensions.get('window').width * 0.3
    },
    Divider: {
        backgroundColor: 'black',
        width: Dimensions.get('window').width * 0.8,
        height: 3
    },
    Image: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
    },
    ImagePreview: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3
    },
    title: {
        display: 'none',
        position: 'absolute',
        fontSize: 20,
        fontWeight: '700',
        zIndex: 1,
        top: 0,
        paddingRight: 30,
        paddingLeft: 15,
        maxHeight: 55
    },
    IconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
    },
    IconView: {
        position: 'absolute',
        top: -10,
        left: -10,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.7,
        borderRadius: 25,
    }
})

const mapStateToProps = (state) => ({
    overlayVisibility: state.UI.overlayVisibility,
    overlayAlbumID: state.UI.overlayAlbumID,
    userID: state.auth.userID
})

const mapDispatchToProps = (dispatch) => ({
    changeOverlayVisibility: () => dispatch(changeOverlayVisibility())
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosOverlay)