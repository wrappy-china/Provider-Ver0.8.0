import React from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import { ListItem, Text } from "react-native-elements";
import {Col, Grid, Row} from "react-native-easy-grid";
import {BarIndicator} from "react-native-indicators";
import moment from 'moment';
import { BASE_URL } from '../constans/network';

export default class ListCouponScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupIndicator: true,
            list: [],
        }
    }
    static navigationOptions = {
        title: 'User List',
    };

    doHideIndicator = () => {
        this.setState({ popupIndicator: false });
    };

    doShowIndicator = () => {
        this.setState({ popupIndicator: true });
    };

    componentDidMount() {
         const {
             navigation
         } = this.props;
         const token = navigation.getParam('token', 'NO-otherParam');
        console.log(" ---- ListCouponScreen token ------ ", token);
        this.getListAsset(token.replace(/\"/g, ""))
    }

    getListAsset  = (token) => {

        fetch(BASE_URL+'provider/coupon/list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "filter": "ALL"
            }),
        })
            .then(response =>{
                console.log(" ---- ProfileScreen response ------ ", JSON.stringify(response));
                return  response.json();
            })
            .then((data) => {
                    this.doHideIndicator();
                    console.log(" ---- ProfileScreen ------ ", JSON.stringify(data));
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
                console.log(" ----ProfileScreen error ------ " + JSON.stringify(error)  + "   "  + error);
            }
        )
    };


    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={"Coupon Name : " + item.name}
            subtitle={
                <View>
                    <Text>
                        Coupon ID : {item.id}
                    </Text>
                    <Text>
                        Denomination : {item.value}
                    </Text>
                    <Text>
                        Expiry Date: {moment(item.expiryDate).format("YYYY-MM-DD HH:mm:ss")}
                    </Text>
                </View>
            }
            leftAvatar={{
                source: require('../assets/images/avatar_01.jpg'),
                title: item.name,
            }}
            bottomDivider
        />
    )



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



    /**
     *{
         "$class": "net.wrappy.asset.service.Coupon",
         "id": "1830S51BJ5JVQ2X9FS",
         "name": "coupou_sam",
         "value": 100,
         "expiryDate": "2019-05-17T03:13:22.329Z",
         "status": "EXPIRED",
         "issuedDate": "2019-05-16T03:13:22.329Z",
         "modifiedDate": "2019-05-28T05:54:45.006Z",
         "modifiedBy": "resource:net.wrappy.participant.ServiceProvider#sam_provider",
         "reason": "",
         "issuedBy": "resource:net.wrappy.participant.ServiceProvider#sam_provider",
         "asset": "resource:net.wrappy.asset.common.DigitalAsset#1830S51BJ5JVQ1MS9B",
         "owner": "resource:net.wrappy.participant.ServiceUser#sam014@world_gourmet_v",
         "issuer": "resource:net.wrappy.asset.service.ServicePeer#world_gourmet_v"
     }
     */
    render() {
         
        const {
            data,
            getCouponList,
        } = this.props;
        console.log('======   ListCouponScreen  : ', JSON.stringify(data));
        return (
            <View>
                <FlatList
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
    }

}

styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },

})
// provider/coupon/list
// export default connect(
//     state => {
//         return ({
//             data: state.couponList,
//         })
//     },
//     {
//         getCouponList: getCouponList,
//     }
//
// )(
//     ListCouponScreen
// );
