import React from "react";
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, TouchableHighlight, Picker, PickerIOS, StyleSheet } from "react-native";
import { ListItem, Button, } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { Col, Grid, Row } from "react-native-easy-grid";
import { BarIndicator } from "react-native-indicators";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import TouchableScale from 'react-native-touchable-scale';
import { BASE_URL } from "../constans/network";


const data = [
    { title: 'Title Text', key: 'item1' },
    { title: 'Title Text', key: 'item2' },
    { title: 'Title Text', key: 'item3' },
    { title: 'Title Text', key: 'item4' },
    { title: 'Title Text', key: 'item5' },
    { title: 'Title Text', key: 'item6' },
    { title: 'Title Text', key: 'item7' },
    { title: 'Title Text', key: 'item7' },
    { title: 'Title Text', key: 'item7' },
    { title: 'Title Text', key: 'item7' },
    { title: 'Title Text', key: 'item7' },
    { title: 'Title Text', key: 'item8' },
    { title: 'Title Text', key: 'item8' },
    { title: 'Title Text', key: 'item8' },
    { title: 'Title Text', key: 'item8' },
    { title: 'Title Text', key: 'item8' },
];

export default class IssueCouponScreen extends React.Component {

    constructor(props) {
        super(props);
        this.inputRefs = {
            firstTextInput: null,
            couponName: null,
            favSport1: null,
            lastTextInput: null,
        };

        this.state = {
            popupIndicator: false,
            // recipient: 'tom008',
            // coupon: '3FUKT2NM5JW8Z7PY1',
            // quantity: '2',
            // expiry: '30',
            // value: '100',
            recipient: null,
            recipientName : null ,
            coupon: '',
            quantity: '',
            expiry: "30",
            value: [0],
            denomination : '',
            couponid: "",
            data: [],
            list: null,
            assetData: '',
            recipientError: '',
            expiryError: '',
            // add by anakin
            language: 'java',
            selectCount: 0,
            carMake: 'amc',
            showPicker: false,
            items: [], // 这个是优惠券列表集合
            listUser: [], // 这个是User集合
            listModalVisible: false,
            listUserModalVisible: false,
        }
    }

    // 静态属性，设置title
    static navigationOptions = {
        title: 'Issue Coupon',
        // headerTitleStyle:{
        //     textAlign: 'center',
        //     flex:1,
        // },
    };

    setListModalVisible(visible) {
        this.setState({ listModalVisible: visible });
    }


    doHideIndicator = () => {
        this.setState({ popupIndicator: false });
    };

    doShowIndicator = () => {
        this.setState({ popupIndicator: true });
    };


    componentDidMount() {
        let { navigation } = this.props;
        let token = navigation.getParam('token');
        this.getListAsset(token.replace(/\"/g, ""));
        this.getListUser(token.replace(/\"/g, ""));

    }



    getListAsset = (token) => {
        fetch(BASE_URL + 'provider/asset/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                this.doHideIndicator();
                console.log(" ---- getListAsset ------ ", JSON.stringify(data));
                var success = data.description;
                console.log("this.props", success);
                let arr = [];
                if (success === "SUCCESS") {
                    data.data.map(
                        (value, index) => {
                            arr.push(
                                {
                                    label: value.name + '   ' + value.denomination,
                                    value: value.denomination,
                                    id: value.id,
                                }
                            )
                        }
                    );
                    this.setState({
                        list: data.data,
                        items: arr,
                    })
                }
            }
            ).catch(
                (error) => {
                    this.doHideIndicator();
                    console.log(" ---- error ------ " + JSON.stringify(error) + "   " + error);
                }
            )
    };

    getListUser = (token) => {
        fetch(BASE_URL + 'provider/user/list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                filter: 'CONSUMER'
            }),
        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                this.doHideIndicator();
                console.log(" ----ProfileScreen getListUser  ------ " + JSON.stringify(data));
                if (data.code == 100) {
                    this.setState({
                        listUser: data.data,
                    })
                }
            }
            ).catch(
                (error) => {
                    this.doHideIndicator();
                    console.log(" ----ProfileScreen getListUser error ------ " + error);
                }
            )
    }

    doIssueCoupon = (paramer, token) => {

        if (this.state.recipient === "" && this.state.expiry === "") {
            this.setState({
                recipientError: "Please enter a recipient",
                expiryError: "Please enter Duration"
            })
            return false
        } else if (this.state.recipient === "") {

            this.setState({
                recipientError: "Please enter a recipient",
                expiryError: ''
            })
            return false
        } else if (this.state.expiry === "") {
            this.setState({
                expiryError: "Please enter Duration",
                recipientError: ''
            })
            return false
        }

        console.log(" ---- ProfileScreen paramer ------ ", JSON.stringify(paramer));
        this.doShowIndicator();
        fetch(BASE_URL + 'provider/coupon/issue', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(paramer),
        })
            .then(response => {
                console.log(" ---- ProfileScreen response ------ ", JSON.stringify(response));
                return response.json();
            })
            .then((data) => {
                this.doHideIndicator();
                console.log(" ---- ProfileScreen ------ ", JSON.stringify(data));
                var success = data.description;
                console.log("this.props", success);
                // if (success === "SUCCESS") {
                this.setState({
                    data: data,
                    // couponid : data.code === 100 ? 'SUCCESS ' + data.data : data.data
                })
                // }
            }
            ).catch(
                (error) => {
                    this.doHideIndicator();
                    console.log(" ----ProfileScreen error ------ " + JSON.stringify(error) + "   " + error);
                }
            )
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

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => (
        <ListItem
            // friction={90}
            // tension={100}
            // activeScale={0.9}
            // Component={TouchableScale}
            title={item.label}
            // subtitle={
            //     <View>
            //         <Text>{"value : " + item.value} </Text>
            //     </View>
            // }
            containerStyle={{
                // borderRadius: 15
            }}
            bottomDivider={true}

            onPress={() => {
                // console.log('onPress  :::: ', item, index);
                this.setState({
                    couponName: item.label,
                    couponid: this.state.items[index].id,
                    assetData: this.state.items[index].name,
                    quantity: item.value.length + "",
                    value: item.value,
                    denomination : item.value[0]+''
                });
                this.setListModalVisible(false)
            }}
        />
    )

    renderUserItem = ({ item, index }) => {
        console.log('####### renderUserItem', JSON.stringify(item));
        return <ListItem
            title={item.name}
            bottomDivider={true}
            onPress={() => {
                this.setState({
                    recipient: item.id,
                    recipientName :item.name,
                    listUserModalVisible: false,
                });
            }}

        />
    }


    renderUserIdList = () => {
        console.log('##renderUserIdList ##', JSON.stringify(this.state.listUser));
        return <View >
            <Modal
                isVisible={this.state.listUserModalVisible}
                style={{
                    // backgroundColor: 'yellow',
                    paddingBottom: 20,
                    paddingTop: 20,
                }}

            >
                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.listUser}
                        renderItem={this.renderUserItem}
                    />
                </View>
            </Modal>

        </View>
    }
    render() {

        const { navigation } = this.props;
        const token = navigation.getParam('token', 'NO-otherParam');

        let { recipient, recipientName, recipientError, coupon, expiry, value, denomination, quantity, couponid } = this.state;

        return (
            <KeyboardAwareScrollView>
                <View >

                    <View style={{
                        padding: 10,
                    }}>

                        <View style={{ flexDirection: 'row', height: 65, }}>
                            <View style={{
                                width: '40%',
                            }}>
                                <TextField
                                    style={{
                                        width: '100%'
                                    }}
                                    disabledLineWidth={0}
                                    disabled="true"
                                    label='Recipient'
                                    />
                            </View>

                            <TouchableHighlight
                                style={{
                                    width: "60%",
                                    height: '100%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 27,
                                }}
                                onPress={() => {
                                    this.setState({
                                        listUserModalVisible: true,
                                    })
                                }}
                            >
                                <Text
                                >
                                    {
                                        recipientName == null ? 'Select Recipient' : recipientName
                                    }
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{ backgroundColor: '#D8D8D8', height: 1 }} />
                        <View style={{ flexDirection: 'row', height: 65, }}>

                            <View style={{
                                width: '40%',
                            }}>
                                <TextField
                                    style={{
                                        width: '100%'
                                    }}
                                    disabledLineWidth={0}
                                    disabled="true"
                                    // containerStyle={{ width: '50%' }}
                                    label='Coupon name'//coupon
                                    value={this.state.assetData}
                                    onChangeText={(assetData) => this.setState({
                                        assetData: assetData
                                    })} />
                            </View>


                            <TouchableHighlight
                                style={{
                                    width: "60%",
                                    height: '100%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 27,
                                }}
                                onPress={() => {
                                    this.setListModalVisible(true)
                                }}
                            >
                                <Text
                                >
                                    {
                                        this.state.couponName === undefined ? 'Select coupon' : this.state.couponName
                                    }
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{ backgroundColor: '#D8D8D8', height: 1 }} />

                        <TextField
                            inputContainerStyle={{ paddingLeft: 10 }}
                            // disabled="true"
                            label='Quantity'
                            value={quantity}
                            onChangeText={(quantity) => this.setState({ quantity })}
                        />
                        <TextField
                            inputContainerStyle={{ paddingLeft: 10 }}
                            // disabled="true"
                            label='Denomination'
                            value={denomination}
                            onChangeText={(value) => this.setState({ denomination :value })}
                        />
                        <TextField
                            inputContainerStyle={{ paddingLeft: 10 }}
                            label='Duration'
                            value={expiry}
                            error={this.state.expiryError}
                            onChangeText={(expiry) => this.setState({ expiry })}
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
                                    backgroundColor: "#1F707A",
                                    height: 44,
                                }}
                                title="Issue"
                                onPress={
                                    () => this.doIssueCoupon({
                                        "recipient": recipient,
                                        "coupon": this.state.couponid,
                                        "quantity": parseInt(quantity),
                                        // "value": parseInt(value),
                                        "value": parseInt(denomination),
                                        "expiry": parseInt(expiry),
                                    }, token.replace(/\"/g, ""))
                                }
                                loading={
                                    this.props.loading
                                }
                            />
                        </View>

                        <Text>
                            {
                                this.state.data === null ? "" : this.state.data.code === 100 ? "SUCCESS  " + this.state.data.data : this.state.data.data
                            }
                        </Text>


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


                    <View >
                        <Modal
                            isVisible={this.state.listModalVisible}
                            style={{
                                // backgroundColor: 'yellow',
                                paddingBottom: 20,
                                paddingTop: 20,
                            }}

                        >
                            <View>
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.items}
                                    renderItem={this.renderItem}
                                />
                            </View>
                        </Modal>

                    </View>
                    <View >
                        <Modal
                            isVisible={this.state.listUserModalVisible}
                            style={{
                                paddingBottom: 20,
                                paddingTop: 20,
                            }}

                        >
                            <View>
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.listUser}
                                    renderItem={this.renderUserItem}
                                />
                            </View>
                        </Modal>

                    </View>

                </View>
            </KeyboardAwareScrollView>
        );
    }
}

// export default connect(
//     state => {
//         return ({
//             data: state.issueCoupon.data,
//             loading: state.issueCoupon.loading,
//         })
//     },
//     {
//         doIssueCoupon: doIssueCoupon,
//     }
// )(
//     IssueCouponScreen
// );
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },

});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: 'white',
    },
})