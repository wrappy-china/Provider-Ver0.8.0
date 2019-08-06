import React from "react";
import { View, Alert, ScrollView, StyleSheet } from "react-native";
import { Input } from 'react-native-elements';
import { ThemeProvider, Button, Text } from 'react-native-elements';
import Modal from "react-native-modal";
import { Col, Grid, Row } from 'react-native-easy-grid';
import { BarIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import { doUserLogout } from "../redux/redux-acitons";
class SettingsScreen extends React.Component {

    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            popupIndicator: false,
            userName: "",
            denomination: { value: [100, 200, 300], error: '', secure: true, hideIcon: true },
            // denomination: { value: [100,200,300,400,500,600] , error: '', secure: true, hideIcon: true },
            popupNotice: { visible: false },
            token: navigation.getParam("token"),
            error: ""

        };
    }


    // 静态属性，设置title
    static navigationOptions = {
        title: 'Data List',
    };


    doHideIndicator = () => {
        this.setState({ popupIndicator: false });
    };

    doShowIndicator = () => {
        this.setState({ popupIndicator: true });
    };


    renderIndicator = () => (
        <Grid style={{ alignItems: 'center' }}>
            <Row />
            <Row
                style={{
                    width: 180,
                    height: 70,
                    borderWidth: 1,
                    borderColor: "#808080",
                    padding: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 10
                }}
            >
                <Col>
                    {/***** Message Panel *****/}
                    <Row style={{ height: 30 }}>
                        <Col style={{ alignItems: 'center' }}>
                            <BarIndicator color={'#ff5858'} count={8} size={30} />
                        </Col>
                    </Row>
                    {/***** Message Panel *****/}
                    <Row>
                        <Col style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, color: "#808080" }}>
                                {'Authenticating'}
                            </Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row />
        </Grid>
    );


    showAlert = (textnubmer) => {
        Alert.alert(
            'Alert Title',
            textnubmer,
            [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
        )
    }


    render() {
        console.log("===SettingsScreen ====== " + JSON.stringify(this.props.user.token) + "===")
        const { user, navigation, doLogout } = this.props;
        return (

            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>

                    <View
                        style={{
                            // height: 50,
                            width: "80%",
                            marginTop: 15,
                            borderRadius: 10
                        }}
                    >
                        <Button
                            style={{
                                width: "100%",
                            }}
                            title="Service User/Store Coupon List"
                            onPress={() => navigation.navigate('ServiceUserAndStoreListCoupon', {
                                token: JSON.stringify(user.token)
                            })}
                        />
                    </View>



                    <View
                        style={{
                            height: 50,
                            width: "80%",
                            marginTop: 15,
                            borderRadius: 10
                        }}
                    >
                        <Button
                            style={{
                                width: "100%",
                            }}
                            title="Store User List"
                            onPress={() => navigation.navigate('StoreListRedeemer', {
                                token: JSON.stringify(user.token)
                            })}
                        />
                    </View>


                    <View
                        style={{
                            width: "80%",
                            marginTop: 15,
                            borderRadius: 10,
                            marginBottom: 20
                        }}
                    >
                        <Button
                            style={{
                                width: "100%",
                            }}
                            title="Service User Transaction History "
                            onPress={() => navigation.navigate('ServiceUserTransactionHistory', {
                                token: JSON.stringify(user.token)
                            })}
                        />
                    </View>

                    < View style={
                        {
                            margin: 10
                        }
                    }>
                        <Button title="Logout" onPress={
                            () => {
                                this.props.doLogout();
                                this.props.navigation.navigate("Auth");
                            }
                        } />
                    </View>
                    {/***** Modal Views *****/}
                    <View>
                        <Modal
                            isVisible={this.state.popupIndicator}
                            animationIn="zoomIn"
                            animationOut="zoomOut"
                        >
                            {this.renderIndicator()}
                        </Modal>
                    </View>

                </View>
            </ScrollView>
        )
    };
}

export default connect(
    state => ({
        user: state.userLoginIn.userLogin.data,
    }),
    {
        doLogout: doUserLogout,
    }
)(
    SettingsScreen
)

