import React from "react";
import {Button, Platform, View} from "react-native";
import {connect} from 'react-redux';
import {doUserLogout} from "../redux/redux-acitons";

const isAndroid = Platform.OS === 'android';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: "Home",
    };

    // static defaultProps = {
    //     data: '等待返回'
    // }

    // static propTypes = {
    //     data: PropTypes.string.isRequired,
    //     doRegisterCoupon: PropTypes.func.isRequired,
    // }

    render() {
        console.log('========  HomeScreen ======= ', JSON.stringify(this.props));
        const {user} = this.props;
        return (
            <View style={{
                margin: 10
            }}>
                {/* < View style={
                    {
                        margin: 10
                    }
                }>
                    <Button title=" TO ListRedeemer" onPress={() => {
                        this.props.navigation.navigate("ListRedeemer");
                    }}/>
                </View> */}
                < View style={
                    {
                        margin: 10
                    }
                }>
                    <Button title="退出登录" onPress={this._signOutAsync}/>
                </View>
            </View>
        );
    }

    _signOutAsync = async () => {
        // await AsyncStorage.clear();
        this.props.doLogout();
        this.props.navigation.navigate("Auth");
    };
}

export default connect(
    state => ({
        user: state.userLoginIn.userLogin.data,
    })
    , {
        doLogout: doUserLogout,
    }
)(
    HomeScreen
)


