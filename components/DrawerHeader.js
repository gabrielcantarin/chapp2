import React, { Component } from 'react';
import { Image, Text, View, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { AdMobBanner } from "expo";


import { Thumbnail, Left } from 'native-base'

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyAh909aD4-QPCgoKx0j5tYZRHiUcqBv1jo",
    authDomain: "chapp-57fc0.firebaseapp.com",
    databaseURL: "https://chapp-57fc0.firebaseio.com",
    projectId: "chapp-57fc0",
    storageBucket: "chapp-57fc0.appspot.com",
    messagingSenderId: "366662293434"
};

firebase.initializeApp(firebaseConfig);

class DrawerHeader extends Component {
    constructor(props) {

        super(props);

        this.state = {
            name: 'John Doe',
            email: null,
            picture: 'https://pbs.twimg.com/profile_images/680053476500631552/Yvw3yGfe_400x400.jpg',
        };

    }

    async loginWithFacebook() {

        //ENTER YOUR APP ID 
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1957052991253516', { permissions: ['public_profile', 'email'] })

        if (type == 'success') {

            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                console.log(error)
            })
        }
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log(user.providerData[0].displayName);
                this.setState({ 
                    name: user.providerData[0].displayName, 
                    email: user.providerData[0].email,
                    picture: user.providerData[0].photoURL + '?type=large',
                 });
            }
        })
    }


    render() {
        return (

            <ScrollView style={{ backgroundColor: '#dddddd' }}>
            {
                this.state.email == null ?
                <View style={styles.profile}>
                    <View>
                        <Thumbnail source={{ uri: this.state.picture }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.userName}>{this.state.name}</Text>
                        <Text style={styles.amount}>R$ 430,00</Text>
                    </View>
                </View>
                :
                <View style={styles.login}>
                    <Thumbnail source={{ uri: 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png' }} />
                    <TouchableOpacity style={styles.facebook} onPress={() => this.loginWithFacebook()}>
                        <Text style={styles.facebookText}>Login with Facebook</Text>
                    </TouchableOpacity>
                </View>
            }

                <View style={styles.cause}>
                    <View>
                        <Text style={styles.supportCauseTitle}>All the revenue goes to</Text>
                        <Text style={styles.supportCauseName}>Socials Causes</Text>
                    </View>
                    <View>
                        <Image style={styles.causeImage} source={{ uri: 'https://static1.squarespace.com/static/53dcf4f6e4b0461efc56807b/t/599c8e37ccc5c54ab62a52c3/1503432279563/Donation-Icon.jpg' }} />
                    </View>
                </View>
                <DrawerItems {...this.props} />

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
            </ScrollView >
        )
    }

}
const styles = StyleSheet.create({
    profile: {
        paddingTop: StatusBar.currentHeight + 30, flexDirection: 'row', padding: 16, height: 150, alignItems: 'center', backgroundColor: 'black'
    },
    login: {
        paddingTop: StatusBar.currentHeight + 30, flexDirection: 'column', paddingTop: 50, height: 200, alignItems: 'center', backgroundColor: 'black'
    },
    facebook: {
        backgroundColor: '#425bb4',
        // padding: 20,
        // height: 10,
        // width: '100%',
        // flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    facebookText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
        marginHorizontal: 25,
    },
    userName: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
        width: '100%',
        fontFamily: 'Helvetica Neue',
    },
    amount: {
        color: 'white',
        fontSize: 20,
        textAlign: 'right',
        fontFamily: 'Helvetica Neue',

    },
    textContainer: {
        marginLeft: 5,
        flex: 1,
    },

    cause: {
        height: 60,
        width: '100%',
        backgroundColor: '#BA2C6B',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'flex-end',
        flex: 1,
    },
    causeImage: {
        width: 40, height: 40, marginLeft: 20
    },
    supportCauseTitle: {
        textAlign: 'right',
        color: 'white', fontSize: 16, width: '100%',
    },
    supportCauseName: {
        textAlign: 'right',
        color: 'white', fontSize: 20, fontWeight: 'bold'
    }


})

export default DrawerHeader

