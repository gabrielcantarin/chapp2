import React, { Component } from "react";
import { AdMobBanner } from "expo";

import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Container, Content, Icon, Button } from 'native-base'
//import CustomHeader from './CustomHeader';


class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Settings",
        headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        // drawerIcon:
        //     <Image
        //         source={require('./assets/DrawerIcons/settings.png')}
        //         style={[styles.icon]}
        //     />

    })

    render() {
        return (

            <Container>

               {/*  <CustomHeader
                    title="Settings"
                    drawerOpen={() => this.props.navigation.navigate("DrawerOpen")}
                /> */}
                <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                    <Button
                        full
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ color: 'white' }}>Go to Home screen</Text>
                    </Button>


                </Content>
                <AdMobBanner
                        style={styles.bottomBanner}
                        bannerSize="smartBannerPortrait"
                        // adUnitID="ca-app-pub-3940256099942544/6300978111"
                        adUnitID="ca-app-pub-7397930156564286/6195646990"
                        // adUnitID="ca-app-pub-7397930156564286/8534891957"
                        // Test ID, Replace with your-admob-unit-id
                        testDeviceID="EMULATOR"
                        didFailToReceiveAdWithError={this.bannerError}
                    />
            </Container>
        )
    }

}

export default SettingsScreen

const styles = StyleSheet.create({
    icon: {
        height: 24,
        width: 24
    }
})