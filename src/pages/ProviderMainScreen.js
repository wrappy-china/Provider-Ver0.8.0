import React from "react";
import {View, Alert, ScrollView, StyleSheet, Image,TouchableOpacity } from "react-native";
import { Input } from 'react-native-elements';
import { ThemeProvider, Button, Text } from 'react-native-elements';

import { connect } from "react-redux";
import {
    doProviderLogout
} from '../redux/redux-acitons';

class ProviderMainScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            denomination: { value: [100, 200, 300], error: '', secure: true, hideIcon: true },
            token: "",
            error: ""

        };
    }

    // 静态属性，设置title
    static navigationOptions = {
        title: 'Provider',
        headerTitleStyle:{
            textAlign: 'center',
            flex:1,
        },
    };
    render() {
        const {
            provider,
            navigation,
            doLogout,
        } = this.props;

       // const username = navigation.getParam('username', 'NO-otherParam')
       //  console.log("username username 1111username " + username)
        console.log("username username 222username " + JSON.stringify(provider))
        const username = provider.user.name

        return (


                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' ,backgroundColor:'#F4F4F4'}}>


                    <View style={{flex:1, flexDirection: 'column',width:'100%'}}>
                        <View style={{flexDirection: 'row',width:'100%',height:'35%'}}>


                        <View style={{
                            height: '95%', width: '45%', backgroundColor: '#ffffff', marginTop: "5%", marginLeft: '3%', marginRight: '2%', flexDirection: 'column',
                        }}>
                                <TouchableOpacity onPress ={ ()=>
                                    navigation.navigate('RegisterCoupon', {
                                    token: JSON.stringify(provider.token)})
                                }>
                                <View style={{width:'100%',height:'100%',flexDirection:'column',alignItems:'center',display:'flex'}}>
                                    <Image
                                        source={require('../assets/images/coupon_registration.png')}
                                        style = {
                                            {
                                                width: 80,
                                                height: 70,
                                                marginTop: '25%'
                                            }
                                        }
                                    />
                                    <Text style={{marginTop:'15%',color:"#000000"}}>Coupon Registration</Text>
                                </View>
                                </TouchableOpacity>
                            </View>


                            <View style={{height:'95%',width:'45%',backgroundColor:'#ffffff',marginTop:'5%',marginLeft:'2%',marginRight:'3%',flexDirection: 'column'}}>
                                <TouchableOpacity onPress ={ ()=>
                                navigation.navigate('RegisterStore',
                                    {
                                        username: username,
                                        token: JSON.stringify(provider.token)
                                    })
                                }>
                                    <View style={{width:'100%',height:'100%',flexDirection:'column',alignItems:'center',display:'flex'}}>
                                        <Image
                                            source={require('../assets/images/store_registration.png')}
                                             style = {
                                                 {
                                                     width: 80,
                                                     height: 70,
                                                       marginTop: '25%'
                                                 }
                                             }
                                        />
                                        <Text style={{marginTop:'15%',color:"#000000"}}>Store Registration</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{flexDirection: 'row',width:'100%',height:'35%'}}>
                            <View style={{height:'95%',width:'45%',backgroundColor:'#ffffff',marginTop:"5%",marginLeft:'3%',marginRight:'2%'}}>
                                <TouchableOpacity onPress ={ ()=>
                                    navigation.navigate('IssueCoupon', {
                                        token: JSON.stringify(provider.token)})
                                }>
                                    <View style={{width:'100%',height:'100%',flexDirection:'column',alignItems:'center',display:'flex'}}>
                                        <Image
                                            source={require('../assets/images/coupon_Issue.png')}
                                             style = {
                                                 {
                                                     width: 80,
                                                     height: 70,
                                                       marginTop: '25%'
                                                 }
                                             }
                                        />
                                        <Text style={{marginTop:'15%',color:"#000000"}}>Coupon Issue</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <View style={{height:'95%',width:'45%',backgroundColor:'#ffffff',marginTop:'5%',marginLeft:'2%',marginRight:'3%'}}>
                                <TouchableOpacity onPress ={ ()=>
                                    navigation.navigate('ProviderListCoupon', {
                                        token: JSON.stringify(provider.token)})
                                }>
                                    <View style={{width:'100%',height:'100%',flexDirection:'column',alignItems:'center',display:'flex'}}>
                                        <Image
                                            source={require('../assets/images/coupon_List.png')}
                                             style = {
                                                 {
                                                     width: 80,
                                                     height: 70,
                                                     marginTop: '25%'
                                                 }
                                             }
                                        />
                                        <Text style={{marginTop:'15%',color:"#000000"}}>Coupon List</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>



                    {/*<View*/}
                        {/*style={{*/}
                            {/*height: 50,*/}
                            {/*width: "80%",*/}
                            {/*marginTop: 15,*/}
                            {/*borderRadius: 10*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*style={{*/}
                                {/*width: "100%",*/}
                            {/*}}*/}
                            {/*title="Digital Asset List"*/}
                            {/*onPress={() => navigation.navigate('Profile', {*/}
                                {/*token: JSON.stringify(provider.token)*/}
                            {/*})}*/}
                        {/*/>*/}
                    {/*</View>*/}



                    {/*<View*/}
                        {/*style={{*/}
                            {/*height: 50,*/}
                            {/*width: "30%",*/}
                            {/*marginTop: 15,*/}
                            {/*borderRadius: 10*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*style={{*/}
                                {/*width: "100%",*/}
                            {/*}}*/}
                            {/*title="Coupon List"*/}
                            {/*onPress={() => navigation.navigate('ProviderListCoupon', {*/}
                                {/*token: JSON.stringify(provider.token)*/}
                            {/*})}*/}
                        {/*/>*/}
                    {/*</View>*/}


                    {/*<View*/}
                        {/*style={{*/}
                            {/*width: "80%",*/}
                            {/*marginTop: 15,*/}
                            {/*borderRadius: 10*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*style={{*/}
                                {/*width: "100%",*/}
                            {/*}}*/}
                            {/*title="Provider Transaction History"*/}
                            {/*onPress={() => navigation.navigate('ProviderTransactionHistory', {*/}
                                {/*token: JSON.stringify(provider.token)*/}
                            {/*})}*/}
                        {/*/>*/}
                    {/*</View>*/}

                    {/*
                        add by anakin
                    */}

                    {/*<View*/}
                        {/*style={{*/}
                            {/*height: 50,*/}
                            {/*width: "30%",*/}
                            {/*marginTop: 15,*/}
                            {/*borderRadius: 10*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*style={{*/}
                                {/*width: "100%",*/}
                            {/*}}*/}
                            {/*title="Register Coupon"*/}
                            {/*onPress={() => navigation.navigate('RegisterCoupon', {*/}
                                {/*token: provider.token*/}
                            {/*})}*/}
                        {/*/>*/}
                    {/*</View>*/}


                    {/*<View*/}
                        {/*style={{*/}
                            {/*height: 50,*/}
                            {/*width: "80%",*/}
                            {/*marginTop: 15,*/}
                            {/*borderRadius: 10*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*style={{*/}
                                {/*width: "100%",*/}
                            {/*}}*/}
                            {/*title="Issue Coupon"*/}
                            {/*onPress={() => navigation.navigate('IssueCoupon', {*/}
                                {/*token: provider.token*/}
                            {/*})}*/}
                        {/*/>*/}
                    {/*</View>*/}

                    {/*<View*/}
                        {/*style={{*/}
                            {/*height: 50,*/}
                            {/*width: "80%",*/}
                            {/*marginTop: 15,*/}
                            {/*borderRadius: 10*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*style={{*/}
                                {/*width: "100%",*/}
                            {/*}}*/}
                            {/*title="User Coupon List"*/}
                            {/*onPress={() => navigation.navigate('ListCoupon', {*/}
                                {/*token: provider.token*/}
                            {/*})}*/}
                        {/*/>*/}
                    {/*</View>*/}



                    {/*<View*/}
                        {/*style={{*/}
                            {/*height: 50,*/}
                            {/*width: "80%",*/}
                            {/*marginTop: 15,*/}
                            {/*borderRadius: 10*/}
                        {/*}}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*style={{*/}
                                {/*width: "100%",*/}
                            {/*}}*/}
                            {/*title="Store Registration"*/}
                            {/*onPress={() => {*/}
                                {/*navigation.navigate('RegisterStore',{*/}
                                    {/*username: username*/}
                                {/*});*/}
                            {/*}}*/}
                        {/*/>*/}
                    {/*</View>*/}



                    <View
                        style={{
                            height: 50,
                            width: "100%",
                            marginTop: 20,
                            borderRadius: 10
                        }}
                    >
                        <Button
                            buttonStyle={{
                                width: "100%",
                                height:50,
                                backgroundColor:"#1F707A",

                            }}
                            title="Logout"
                            onPress={() => {
                                doLogout();
                                navigation.navigate('Auth');
                            }}
                        />
                    </View>


                </View>


        )
    };
}
export default connect(
    state => ({
        provider: state.providerLoginIn.providerLogin.data,
    }), {
        doLogout: doProviderLogout
    }
)(
    ProviderMainScreen
)


