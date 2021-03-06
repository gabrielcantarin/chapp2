import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";


class Button extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity style={[this.props.style, { justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => {
                    if (this.props.tap) {
                        this.props.tap()
                    }
                }}
            >
                <View style={[styles.labelContainer, { backgroundColor: this.props.filled ? '#BA2C6B' : 'white' }]}>
                    <Text style={{ color: this.props.labelColor || 'black', fontSize: 16 }}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    labelContainer: { padding: 8, width: '85%', paddingHorizontal: 22, backgroundColor: 'white', borderRadius: 2, borderWidth: 2, borderColor: '#BA2C6B', alignItems: 'center', justifyContent: 'center' }
})
export default Button;
