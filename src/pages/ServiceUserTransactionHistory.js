import React from "react";
import { View, Text, FlatList, StyleSheet, Alert, AppRegistry, TouchableOpacity,ScrollView } from "react-native";
import { Input, ListItem, Button, Divider} from 'react-native-elements'
import Modal from "react-native-modal";
import { Col, Grid, Row } from 'react-native-easy-grid';
import { BarIndicator } from 'react-native-indicators';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { BASE_URL } from "../constans/network";

//用户或者商家
class ServiceUserTransactionHistory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            popupIndicator: false,
            list: [],
            avatar_url_1: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            avatar_url_2: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            // avatar_url_2: "http://pic.5tu.cn/uploads/allimg/1001/182227593320.jpg",
            checked: "",
            startTime: this.getCurrentDate(),
            endTime: this.getCurrentDate(),
            isDateTimePickerVisible: false,
            data: {},
            success : true
        }
    }

    //获取当前日期  格式如 2018-12-15
    getCurrentDate = () => {
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth() + 1).toString()
        month = month.padStart(2, '0')
        var dateDay = currDate.getDate().toString()
        dateDay = dateDay.padStart(2, '0')
        let time = year + '-' + month + '-' + dateDay
        return time;
    }



    showDateTimePicker = (tiem) => {
        this.setState({
            isDateTimePickerVisible: true,
            checked: tiem,
        });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", moment(date).format("YYYY-MM-DD HH:mm:ss"));
        if (this.state.checked === "start") {
            this.setState({
                startTime: date
            })
        } else {
            this.setState({
                endTime: date
            })
        }

        this.hideDateTimePicker();
    };



    // 静态属性，设置title
    static navigationOptions = {
        title: 'Transaction History',
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

    getListAsset = (token) => {

        this.doShowIndicator(),
            fetch(BASE_URL+'user/transaction/history', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    dateFrom: this.state.startTime,
                    dateTo: this.state.endTime,
                }),
            })
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    this.doHideIndicator();
                    console.log(" ---- 创建优惠券数据 ------ ", JSON.stringify(data));
                    var success = data.description;
                    console.log("this.props", success);
                    if (success === "SUCCESS") {
                        // this.props.navigation.push('main')
                        this.setState({
                            list: data.data,
                            success: true
                        })
                    } else {
                        this.setState({
                            data: data,
                            success: false
                        })
                    }
                }
                ).catch(
                    (error) => {
                        this.doHideIndicator();
                        this.setState({
                            data: error,
                            success: false
                        })
                        console.log(" ---- error ------ " + JSON.stringify(error) + "   " + error);
                    }
                )

    };



    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => (
        <ListItem
            friction={90}
            tension={100}
            activeScale={0.9}
            Component={TouchableScale}
            title={"name : " + item.name}
            subtitle={
                <View>
                    {/*<Text style={styles.ratingImage}>{ "Coupons Number ： " + item.denomination.length } </Text>*/}
                    <Text style={styles.ratingImage}>{"Amount ：" + item.amount} </Text>
                    <Text style={styles.ratingImage}>{"Type ： " + item.type} </Text>
                    <Text style={styles.ratingImage}>{"Date ： " + moment(item.date).format("YYYY-MM-DD HH:mm:ss")} </Text>
                </View>
            }
            leftAvatar={{ source: { uri: (index % 2 === 0) ? this.state.avatar_url_1 : this.state.avatar_url_2 } }}
            containerStyle={{
                // backgroundColor: (index % 2 === 0) ? "#FF9800" : '#F44336',
                // margin: 3,
                borderRadius: 15

            }}
            bottomDivider
        />
    )

    renderContentView = () => {
        if (this.state.success) {
            return <FlatList
                style={styles.subtitleView2}
                keyExtractor={this.keyExtractor}
                data={this.state.list}
                renderItem={this.renderItem}
            />
        } else {
            return <View
                style={
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }
                }
            >
                <Text
                    style={
                        {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }
                >
                    {
                        this.state.data === null ? "" : JSON.stringify(this.state.data.data)
                    }
                </Text>
            </View>
        }
    }


    render() {

        console.log(" ---- ServiceUserTransactionHistory ------ " + JSON.stringify(this.props.user.data.token));
        let token = JSON.stringify(this.props.user.data.token)
        return (

            <ScrollView>
            <View style={
                {
                    marginTop: 10,
                    // marginLeft: 20,
                    // marginRight: 20,
                }
            }>
                {/*  start date */}
                <View style={
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "space-between"
                    }
                }>
                    <Text style={
                        {
                            fontSize: 19,
                            alignItems: 'center',
                            padding: 10,
                        }
                    }>
                        {moment(this.state.startTime).format("YYYY-MM-DD HH:mm:ss").substring(0, 11)}
                    </Text>

                    <Button
                        style={
                            styles.buttonStyle
                        }
                        title="Start Date"
                        onPress={() => this.showDateTimePicker("start")} />
                </View>
                <Divider />
                <View
                    style={
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            marginTop: 10,
                        }
                    }
                >
                    <Text style={{
                        fontSize: 19,
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        {moment(this.state.endTime).format("YYYY-MM-DD HH:mm:ss").substring(0, 11)}
                    </Text>
                    <Button
                        title="End Date" onPress={() => this.showDateTimePicker("end")} />
                </View>
                <Divider />
                <View style={
                    {
                        marginTop: 20,
                    }
                }>
                    <Button
                        title="Query"
                        onPress={() => this.getListAsset(token.replace(/\"/g, ""))}
                    />
                </View>

                <Divider />
                {this.renderContentView()}
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

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />

            </View>
            </ScrollView>
            // old 
        )
    };

}

styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'column',
        // paddingLeft: 10,
        // paddingTop: 5
    },

    subtitleView2: {
        // flexDirection: 'column',
        // paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        // width: 100
    },
    ratingText: {
        // paddingLeft: 10,
        color: 'grey'
    }
})

export default connect(
    state => ({
        user: state.userLoginIn.userLogin,
    })
)(
    ServiceUserTransactionHistory
)
