import React from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { Input, ListItem } from 'react-native-elements'
import Modal from "react-native-modal";
import { Col, Grid, Row } from 'react-native-easy-grid';
import { BarIndicator } from 'react-native-indicators';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import moment from 'moment';
import { connect } from "react-redux";
import { BASE_URL } from "../constans/network";

//商家收到的优惠券
class StoreListRedeemer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            popupIndicator: true,
            list: [],
            avatar_url_1: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            avatar_url_2: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            // avatar_url_2: "http://pic.5tu.cn/uploads/allimg/1001/182227593320.jpg",
            checked: false,
            data: {},
        }
    }
    // 静态属性，设置title
    static navigationOptions = {
        title: 'Store User List',
    }

    doHideIndicator = () => {
        this.setState({ popupIndicator: false });
    };

    doShowIndicator = () => {
        this.setState({ popupIndicator: true });
    };


    componentDidMount() {

        console.log(" ---- StoreListRedeemer ------ " + JSON.stringify(this.props.user.token));
        let token = JSON.stringify(this.props.user.token)
        this.getListAsset(token.replace(/\"/g, ""))
    }

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
        fetch(BASE_URL+'user/redeemer/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => {
                console.log(" ---- 创建优惠券数据 response ------ ", JSON.stringify(response));
                return response.json();
            })
            .then((data) => {
                this.doHideIndicator();
                console.log(" ---- 创建优惠券数据 ------ ", JSON.stringify(data));
                var success = data.description;
                console.log("this.props", success);
                if (success === "SUCCESS") {
                    this.setState({
                        list: data.data,
                        data: data,
                    })
                } else {
                    this.setState({
                        data: data
                    })
                }
            }
            ).catch(
                (error) => {
                    this.doHideIndicator();
                    this.setState({
                        data: error
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
            subtitle={
                <View>
                    <Text style={styles.ratingImage}>{"Store ： " + item.store} </Text>
                    <Text style={styles.ratingImage}>{"User ： " + item.user} </Text>
                    <Text style={styles.ratingImage}>{"FirstTransaction ： " + moment(item.firstTransaction).format("YYYY-MM-DD HH:mm:ss")} </Text>
                    <Text style={styles.ratingImage}>{"LastTransaction ： " + moment(item.lastTransaction).format("YYYY-MM-DD HH:mm:ss")} </Text>
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
        if (this.state.data.code === 100) {
            return <FlatList
                style={
                    styles.subtitleView2
                }
                keyExtractor={
                    this.keyExtractor
                }
                data={
                    this.state.list
                }
                renderItem={
                    this.renderItem
                }
            />
        } else {
            return <View style={{ flexDirection: 'row', width: "100%", justifyContent: "center", marginTop: 10 }}>
                <Text style={{ width: "100%", justifyContent: "center" }}>
                    {this.state.data.data}
                </Text>
            </View>
        }
    }
    render() {
        return (
            <View>
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

            </View>
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
        user: state.userLoginIn.userLogin.data,
    })
)(
    StoreListRedeemer
)
