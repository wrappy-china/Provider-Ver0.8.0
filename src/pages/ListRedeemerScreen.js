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
    getRedeemerList
} from '../redux/redux-acitons';
import { ListItem } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class ListRedeemerScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getRedeemerList()
    }

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
        } = this.props;
        console.log('=== ListRedeemerScreen === ',this.props);
        return (
            < KeyboardAwareScrollView>
                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={
                            data
                        }
                        renderItem={this.renderItem}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

export default connect(
    state => {
        return ({
            data: state.redeemerList,
        })
    },
    {
        getRedeemerList: getRedeemerList,
    }
)(
    ListRedeemerScreen
);
