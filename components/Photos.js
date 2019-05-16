import React from 'react'
import { connect } from 'react-redux'
import { Overlay, Text } from 'react-native-elements'

import { changeOverlayVisibility } from '../actions/UI'

class PhotosOverlay extends React.Component {
    render() {
        const { overlayVisibility } = this.props
        return (
            <Overlay
                isVisible={overlayVisibility}
                onBackdropPress={ () => this.props.changeOverlayVisibility() }
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto">
                <Text>Hello from Overlay!</Text>
            </Overlay>
        )
    }
}

const mapStateToProps = (state) => ({
    overlayVisibility: state.UI.overlayVisibility
})

const mapDispatchToProps = (dispatch) => ({
    changeOverlayVisibility: () => dispatch(changeOverlayVisibility())
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosOverlay)