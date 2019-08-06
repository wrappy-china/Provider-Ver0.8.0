import React from "react";
import {View, Text, FlatList, StyleSheet, Alert} from "react-native";
import {Input, ListItem} from 'react-native-elements'
import Modal from "react-native-modal";
import { Col, Grid, Row } from 'react-native-easy-grid';
import { BarIndicator } from 'react-native-indicators';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import moment from 'moment';
import { BASE_URL } from "../constans/network";

export default class ProviderListCoupon extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            popupIndicator: true,
             token:"",
            list: [],
            avatar_url_1: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            avatar_url_2:"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            // avatar_url_2: "http://pic.5tu.cn/uploads/allimg/1001/182227593320.jpg",
            checked: false,
        }
    }


    // 静态属性，设置title
    static navigationOptions = {
        title: 'Coupon List',
        // headerTitleStyle:{
        //     textAlign: 'center',
        //     flex:1,
        // },
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
        console.log('========  ProviderListCoupon111111 ======= ', token);
        if (token === undefined) {
            this.setState({
                popupIndicator: false
            })
        }else {
            this.getListAsset(token.replace(/\"/g, ""))
        }
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

    getListAsset  = (token) => {

        fetch(BASE_URL+'provider/coupon/list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                filter:"ALL"
            }),
        })
            .then(response =>{
                return  response.json();
            })
            .then((data) => {
                    this.doHideIndicator();
                    console.log(" ---- ProviderListCoupon ------ ", JSON.stringify(data));
                    var success = data.description;
                    console.log("this.props", success);
                    if (success === "SUCCESS") {
                        // this.props.navigation.push('main')
                        this.setState({
                            list: data.data
                        })
                    }
                }
            ).catch(
            (error) => {
                this.doHideIndicator();
                console.log(" ---- ProviderListCouponerror ------ " + JSON.stringify(error)  + "   "  + error);
            }
        )
    };



    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item ,index}) => (
        <ListItem
            friction={90}
            tension={100}
            activeScale={0.9}

            Component={TouchableScale}
            title={"Coupon ID : " + item.id}
            subtitle={
                <View>
                    <Text style={styles.ratingImage}>{"Coupon Name ：" + item.name} </Text>
                    <Text style={styles.ratingImage}>{"Denomination ：" + item.value} </Text>
                    <Text style={styles.ratingImage}>{"Status ： " + item.status} </Text>
                    <Text style={styles.ratingImage}>{"Duration ： " + moment(item.expiryDate).format("YYYY-MM-DD HH:mm:ss")} </Text>
                    <Text style={styles.ratingImage}>{"Issued On ： " + moment(item.issuedDate).format("YYYY-MM-DD HH:mm:ss")} </Text>
                    <Text style={styles.ratingImage}>{"Last Modified ： " + moment(item.modifiedDate).format("YYYY-MM-DD HH:mm:ss")} </Text>
                </View>
            }
            leftAvatar={{ source: { uri: (index % 2 === 0) ? this.state.avatar_url_1 : this.state.avatar_url_2 } }}
            containerStyle={{
                // backgroundColor: (index%2 === 0 ) ? "#FF9800" : '#F44336', margin: 3,
                borderRadius: 15

            }}
            bottomDivider={true}

        />
    )


    render() {

        return (
            <View>

                <FlatList
                    style={styles.subtitleView2}
                    keyExtractor={this.keyExtractor}
                    data={this.state.list}
                    renderItem={this.renderItem}
                />

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
