import React from 'react';
import {
    View,
    Text,
    Button,
    FlatList
} from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getProviderList
} from '../redux/redux-acitons';
import {ListItem} from "react-native-elements";

class ListProviderScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'List Provider',
    };
    // static defaultProps = {
    //     data: '等待返回'
    // }
    componentDidMount() {
        console.log('===== ListProviderScreen ======= ',
            JSON.stringify(this.props));
        this.props.getProviderList('');
      
    }
    
    // static propTypes = {
    //     data: PropTypes.object.isRequired,
    //     getProviderList: PropTypes.func.isRequired,
    // }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.value}
            leftAvatar={{
                source: require('../assets/images/avatar_01.jpg'),
                title: item.status,
            }}
             bottomDivider
        />
    )
    render() {
        const {
            data,
            getProviderList,
        } = this.props;

        return (
            <View>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.data.data}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

}

export default connect(
    state => {
        return ({
            data: state.providerList,
        })
    },
    {
        getProviderList: getProviderList,
    }

)(
    ListProviderScreen
);
