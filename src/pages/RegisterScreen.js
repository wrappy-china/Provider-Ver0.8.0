import React from "react";
import { View } from "react-native";
import { connect } from 'react-redux'; // 
import {
    TextField
} from 'react-native-material-textfield';
import {
    Button,
    Text
} from 'react-native-elements'
// 引入connect函数
import { doRegisterUser } from "../redux/redux-acitons";

class RegisterScreen extends React.Component {

    /**
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 'tom005',
                username: 'tom005',
                password: '123456',
                provider: 'world_gourmet_v',
            }
        }
    }

    // 静态属性，设置title
    static navigationOptions = {
        title: 'RegisterUserScreen',
    };

    render() {

        const { data, doRegisterUser } = this.props;
        let { id, username, password, provider} = this.state.user;
        return (
            <View
                style={{
                    flex: 1,
                    // justifyContent: "center",
                    margin: 10,
                }}
            >
                <TextField
                    label='Id'
                    value={
                        id
                    }
                    onChangeText={
                        (id) => this.setState({
                            id
                        })
                    }
                />

                <TextField
                    label='User Name'
                    value={
                        username
                    }
                    onChangeText={(username) => this.setState({ username })}
                />
                <TextField
                    label='Password'
                    value={ password}
                    onChangeText={
                        (password) => this.setState({
                            password
                        })
                    }
                />
                <TextField
                    label='Provider'
                    value={
                        provider
                    }
                    onChangeText={
                        (provider) => this.setState({
                            provider
                        })
                    }
                />
                <Button
                    title="User Register"
                    // 传递数据
                    onPress={() =>
                        this.props.doRegisterUser(id, username, password, provider)
                    }
                    loading={this.props.loading}
                    style={
                        {
                            margin: 10,
                        }
                    }
                />

                <Text>data : {JSON.stringify(data)}</Text>
            </View>
        );
    }
}


export default connect(
    state => {
        return ({
            data: state.userRegister.data,
            loading: state.userRegister.loading
        })
    },
    {
        doRegisterUser: doRegisterUser,
    }
)(
    RegisterScreen
);


