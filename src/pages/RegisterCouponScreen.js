import React from "react";
import { Platform, View, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { Button, Text } from 'react-native-elements'
import { doRegisterCoupon } from "../redux/redux-acitons";
import { TextField } from "react-native-material-textfield";
import {
    removeDoubleQuotes
} from '../utils/stringUtil';

class RegisterCouponScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // name: 'tom008',
            // denomination: [100, 200, 300],
            name: "Coupon Test" ,
            denomination: [100, 200, 300],
            nameError:"",
            denominationError:'',

        }
    }

    static navigationOptions = {
        title: 'Coupon Registration',
        // headerTitleStyle:{
        //     textAlign: 'center',
        //     flex:1,
        // },
    };

    componentDidMount() {
        // this.props.doRegisterCoupon();
    }

    registerCoupon = (doRegisterCoupon,token,name,denomination,data) => {

        if (this.state.name === "" && this.state.denomination === ""){
            this.setState({
                nameError: "Please enter Coupon Name",
                denominationError:'Please enter Denomination'
            })

            return false
        } else if (this.state.name === ""){
            this.setState({
                nameError: "Please enter Coupon Name",
                denominationError:''
            })
           return false
        } else if (this.state.denomination === ""){
            this.setState({
                nameError: "",
                denominationError:'Please enter Denomination'
            })
            return false
        }


        doRegisterCoupon(token, {
            "name": name,
            "denomination": denomination,
        })

    }
    render() {

        const {
            navigation
        } = this.props;
        const token = navigation.getParam('token', 'provider token is null ');
        console.log("  token  "  + token)
        const {
            loading,
            data,
            doRegisterCoupon
        } = this.props;


        let { name, denomination } = this.state;
        return (
            <View >
                <View style={{
                    padding: 10,
                }}>
                    <TextField
                        label='Coupon Name'
                        error={ this.state.nameError }
                        value={name}
                        onChangeText={
                            (name) => this.setState({
                                name
                            })
                        }
                    // textColor = 'blue'
                    />

                    <TextField
                        label='Denomination'
                        error={this.state.denominationError}
                        value={denomination + ''}
                        onChangeText={
                            (denomination) => { 
                                console.log(' 输入的面值 ： ', denomination.split(","));
                                this.setState({ denomination: denomination.split(",") })
                            }
                        }
                    />

                    <View
                        style={
                            {
                                margin: 20
                            }
                        }
                    >
                        <Button
                            buttonStyle={{
                                backgroundColor:"#1F707A",
                                height: 44,
                            }}
                            title="Register"
                            onPress={
                                () =>
                                    this.registerCoupon(doRegisterCoupon,token.replace(/\"/g, ""),name,denomination,data)

                                //     doRegisterCoupon(token.replace(/\"/g, ""), {
                                //     "name": name,
                                //     "denomination": denomination,
                                // })
                            }
                            loading={
                                this.props.loading
                            }
                        />
                    </View>

                    <ScrollView>
                        <Text>
                            {
                                data === null ? "" : data.data

                            }
                        </Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default connect(
    state => {
        return ({
            data: state.registerCoupon.data,
            loading: state.registerCoupon.loading
        })
    },
    {
        doRegisterCoupon: doRegisterCoupon,
    }
)(
    RegisterCouponScreen
);

