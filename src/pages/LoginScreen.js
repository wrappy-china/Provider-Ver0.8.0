import React from "react";
import { View ,Image,Text} from "react-native";
import { Button, CheckBox} from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { doLoginProvider, doLoginUser } from "../redux/redux-acitons";
import { removeDoubleQuotes } from '../utils/stringUtil';

class LoginScreen extends React.Component {

    static  navigationOptions = ({ navigation,navigationOptions}) => ({
        header:null,
    });

    /**
     *"username": "tom004@world_gourmet_v",
     "password": "123456"
     */
    constructor(props) {
        super(props);
        this.state = {
            Provider: false,
            UserStore: false,
            username: {
                value: "serviceProvider", //world_gourmet_v   serviceProvider
                // value: "",
                error: "",
            },
            password: {
                value: "sam888",//sam888
                // value: "",
                error: "",
            }
        }
    }


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


    logIn = () => {
        if (this.state.UserStore) {
            this.props.doLoginUser(this.state.username.value, this.state.password.value)
        } else {
            this.props.doLoginProvider(this.state.username.value, this.state.password.value)
        }
    }

    render() {

        const { provider, user, navigation } = this.props;
        console.log('LoginScreen  ##### ', JSON.stringify(provider));
        if (provider.data != null && provider.success === true) {
            navigation.navigate("ProviderMain")
        } else if (user.data != null && user.success === true) {
            navigation.navigate("Main", { token: user.data.token })
        }

        console.log(' =======  LoginScreen provider ======= ', JSON.stringify(provider));


        return (
            <KeyboardAwareScrollView>

                <View
                    style={{
                        flex: 1,
                        // alignItems: "center",
                        justifyContent: "center",
                        margin: 10,
                        marginTop: 30,
                    }}
                >
                    <View style={
                        {
                            alignItems: "center",
                            marginTop: 50,
                        }
                    }>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{ width: 200, height: 160, }}
                        />
                    </View>


                    <View  style={
                        {
                            marginLeft:35,
                            marginRight:35,
                            marginTop:30
                        }
                    }>

                        {/*<Image*/}
                            {/*source={require('../assets/images/logo.png')}*/}
                            {/*style={{ width: 15, height: 10, marginTop:100 }}*/}
                        {/*/>*/}
                        <TextField
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoFocus={false}
                            maxLength={48}
                            label="Please enter provider's username"
                            error={this.state.UserStore === true ?
                                user.data === null || user.data === "" ? '' : user.data.error === null || user.data.error === "" ? '' : user.data.error :
                                provider.data === null || provider.data === "" ? '' : provider.data.error === null || provider.data.error === "" ? '' : provider.data.error
                            }
                            value={
                                this.state.username.value
                            }
                            onChangeText={(username) => this.setState({
                                username: {
                                    value: username
                                }
                            })
                            }
                            // secureTextEntry={
                            //     true
                            // }
                        />
                    </View>


                    <View  style={
                        {
                            marginLeft:35,
                            marginRight:35
                        }
                    }>
                    <TextField

                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={false}
                        maxLength={48}
                        label='Please enter password'
                        error={this.state.UserStore === true ?
                            user.data === null || user.data === "" ? '' : user.data.error === null || user.data.error === "" ? '' : user.data.error :
                            provider.data === null || provider.data === "" ? '' : provider.data.error === null || provider.data.error === "" ? '' : provider.data.error 
                        }
                        value={
                            this.state.password.value
                        }
                        onChangeText={
                            (password) => this.setState({
                                password: {
                                    value: password
                                }
                            })
                        }
                        secureTextEntry={
                            true
                        }
                    />
                    </View>

                    <View
                        style={
                            {
                                flexDirection: 'column',
                                marginTop: 20,
                                justifyContent: 'space-around',
                                alignItems: "center"
                            }
                        }
                    >

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            {/*<CheckBox*/}
                                {/*title='Provider'*/}
                                {/*checked={this.state.Provider}*/}
                                {/*onPress={() => this.setState({*/}
                                    {/*Provider: !this.state.Provider,*/}
                                    {/*UserStore: !this.state.UserStore,*/}
                                    {/*username: "world_gourmet_v",*/}
                                    {/*password: "sam888",*/}
                                {/*})}*/}
                            {/*/>*/}
                            {/*<CheckBox*/}
                                {/*title='User/Store'*/}
                                {/*checked={this.state.UserStore}*/}
                                {/*onPress={() => this.setState({*/}
                                    {/*UserStore: !this.state.UserStore,*/}
                                    {/*Provider: !this.state.Provider,*/}
                                    {/*username: "tom004",*/}
                                    {/*password: "123456",*/}
                                {/*})}*/}
                            {/*/>*/}
                        </View>

                    </View>
                    <View
                        style={
                            {
                                // margin: 10,
                                marginRight:30,
                                marginLeft:30,
                                marginTop: 30,
                            }
                        }
                    >
                        <Button
                            buttonStyle={{
                                backgroundColor: "#1F707A",
                                height:50
                            }}
                            title="Login"
                            // 传递数据
                            onPress={() =>
                                this.logIn()
                            }
                            loading={user.loading || provider.loading}
                        />
                    </View>


                    <View
                        style={
                            {
                                alignItems:'center',
                                margin: 10,
                                marginTop: 80,
                                height: 20,
                            }
                        }
                    >
                        <Text>
                            Release 1.0 Beta
                        </Text>
                    </View>

                    {/*<View*/}
                        {/*style={*/}
                            {/*{*/}
                                {/*margin: 10,*/}
                            {/*}*/}
                        {/*}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*title="Store Registration"*/}
                            {/*onPress={() =>*/}
                                {/*this.props.navigation.navigate("RegisterStore")*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</View>*/}

                    {/*<View*/}
                        {/*style={*/}
                            {/*{*/}
                                {/*margin: 10,*/}
                            {/*}*/}
                        {/*}*/}
                    {/*>*/}
                        {/*<Button*/}
                            {/*title="User Registration"*/}
                            {/*// 传递数据*/}
                            {/*onPress={() =>*/}
                                {/*this.props.navigation.navigate("RegisterUser")*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</View>*/}
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default connect(
    state => {
        return ({
            user: state.userLoginIn.userLogin,
            provider: state.providerLoginIn.providerLogin,
        })
    }, {
        doLoginUser: doLoginUser,
        doLoginProvider: doLoginProvider,
    }
)(
    LoginScreen
);


