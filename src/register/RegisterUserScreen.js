import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  Dimensions,
  Keyboard,
  NativeModules,
  Image,
  Alert,
} from 'react-native'
import NaviBar from '../components/navi-bar';
import { Col, Grid, Row } from "react-native-easy-grid";
import { TextField } from "react-native-material-textfield";
import {
  getStatusBarHeight
} from "react-native-status-bar-height";
import history from '../constans/history';
import { color } from '../styles/color';
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-elements";
// import { inject, observer } from 'mobx-react';
// const PushManager = NativeModules.PushManager;
import Modal from "react-native-modal";
import { BarIndicator } from "react-native-indicators";
// import { conditionalExpression } from '@babel/types';
import Dialog from "react-native-dialog";
import { BASE_URL } from '../constans/network';
// @inject('rootStore')
// @observer
export default class RegisterUserScreen extends Component {

    // 静态属性，设置title
    static navigationOptions = {
        title: 'User Registration',
    };

  constructor(props) {
    super(props);
    this.state = {
      redirect: 0,
      registerResult: "",
      popupNotice: {
        visible: false,
        type: 0,
        message: ""
      },
      popupIndicator: false,
      id: {
        value: "",
        error: ""
      },
      name: {
        value: "",
        error: ""
      },
      password: {
        value: "",
        error: ""
      },
      provider: {
        value: "",
        error: ""
      },
      dialog: {
        visible: false,
        title: "",
        description: "",
      }
    }
  }

  noticeImage = [
    require('../assets/images/failed.png'),
    require('../assets/images/success.png'),
  ];

  doShowNotice = (type, message) => {
    this.setState({
      popupNotice: {
        visible: true,
        type: type,
        message: message
      }
    });
  };

  doRegister = () => {
    // if (Platform.OS === "ios") {
    // PushManager.endEditing();//iOS调用关闭键盘
    // }
    if (this.doValidate()) {
      this.doShowIndicator();
      fetch(BASE_URL+'user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id.value,
          name: this.state.name.value,
          password: this.state.password.value,
          provider: this.state.provider.value,
          type: "CONSUMER"
        }),
      })
        .then(response => response.json())
        .then((data) => {
          console.log(" ---- response ------ ", JSON.stringify(data));
          var code = data.code;
          this.doHideIndicator();
          if (code === 100) {
            this.setState({
              redirect: 1,
              registerResult: "Registration Completed"
            }); // 成功
          } else {
            this.setState({
              redirect: -1,
              registerResult: data.data
            });  // 失败
          }
        }
        ).catch(
          (error) => {
            console.log(" ---- error ------ ");
            this.doHideIndicator();
            this.setState({ redirect: 0 });  // 没有网络
          }
        )
    }
  };
  renderIndicator = () => (
    <Grid style={{ alignItems: "center" }}>
      <Row />
      <Row
        style={{
          width: 180,
          height: 70,
          borderWidth: 1,
          borderColor: color.dark,
          padding: 10,
          backgroundColor: color.background,
          borderRadius: 10
        }}
      >
        <Col>
          {/***** Message Panel *****/}
          <Row style={{ height: 30 }}>
            <Col style={{ alignItems: "center" }}>
              <BarIndicator color={color.statusBarRed} count={8} size={30} />
            </Col>
          </Row>
          {/***** Message Panel *****/}
          <Row>
            <Col style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: color.dark }}>
                {"Registering"}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row />
    </Grid>
  );
  doHideIndicator = () => {
    this.setState({ popupIndicator: false });
  };

  doShowIndicator = () => {
    this.setState({ popupIndicator: true });
  };

  doDone = () => {
    this.setState({ popupNotice: { visible: false } });
  };
  onIndicatorHide = () => {
    if (this.state.redirect === 0) {
      this.doShowNotice(this.state.redirect, "Unable to connect to server");
    } else if (this.state.redirect === -1) {
      this.doShowNotice(0, this.state.registerResult ===""?"Registration Failed":this.state.registerResult);
    } else {  // 1 
      this.doShowNotice(this.state.redirect, this.state.registerResult === "" ? "Registration Completed" : this.state.registerResult);
    }
  };


  checkEmpty = (value, text) => {
    if (value.trim().length == 0) {
      return `${text} ` + "";
    } else {
      return "";
    }
  };
  doValidate = () => {
    let isValid = true;
    let idCheck = this.checkEmpty(
      this.state.id.value,
      "User ID cannot be empty"
    );
    if (idCheck.length > 0) isValid = false;
    this.setState({
      id: {
        ...this.state.id,
        error: idCheck
      }
    });

    let passwordCheck = this.checkEmpty(
      this.state.password.value,
      "Password cannot be empty"
    );
    if (passwordCheck.length > 0) isValid = false;
    this.setState({
      password: {
        ...this.state.password,
        error: passwordCheck
      }
    });

    let nameCheck = this.checkEmpty(
      this.state.name.value,
      "User Name cannot be empty"
    );
    if (nameCheck.length > 0) isValid = false;
    this.setState({
      name: {
        ...this.state.name,
        error: nameCheck
      }
    });

    let providerCheck = this.checkEmpty(
      this.state.provider.value,
      "Service Peer cannot be empty"
    );
    if (providerCheck.length > 0) isValid = false;
    this.setState({
      provider: {
        ...this.state.provider,
        error: providerCheck
      }
    });
    return isValid;
  };

  handleCancel = () => {
    this.setState(
      {
        dialog: {
          visible: false,
          title: "",
          description: "",
        }
      }
    );
  }

  renderNotice = () => (
    <Grid style={{ alignItems: "center" }}>
      <Row />
      <Row
        style={{
          width: 260,
          height: 240,
          borderWidth: 2,
          borderColor: "black",
          padding: 20,
          backgroundColor: color.background,
          borderRadius: 10
        }}
      >
        <Col>
          {/***** Message Panel *****/}
          <Row style={{ height: 120 }}>
            <Col style={{ alignItems: "center" }}>
              <Image
                style={{ width: 110, height: 110 }}
                source={this.state.redirect === 1 ? this.noticeImage[1] : this.noticeImage[0]}
              />
            </Col>
          </Row>
          {/***** Message Panel *****/}
          <Row style={{ height: 20 }}>
            <Col style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: color.dark }}>
                {this.state.popupNotice.message}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col style={{ alignItems: "center" }}>
              <Button
                backgroundColor={color.statusBarBlue}
                buttonStyle={{ borderRadius: 10, width: 170, marginTop: 10 }}
                title="OK"
                onPress={this.doDone}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row />
    </Grid>
  );

  render() {
    const spacer = 10 + (Platform.OS === "ios" ? getStatusBarHeight() : 1);
    const width = Dimensions.get("window").width;
    return (
      <View style={{ flex: 1 }}>
        {/*<NaviBar*/}
          {/*title={'Register'}*/}
          {/*onBack={history.goBack.bind(this, this)}*/}
        {/*/>*/}
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          style={{ flex: 1, backgroundColor: color.background }}
        >
          <Row style={{ height: 60, marginLeft: 20, marginRight: 30 }}>
            <Col>
              <TextField
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
                maxLength={48}
                label={"Please enter User ID"}
                value={this.state.id.value}
                error={this.state.id.error}
                onBlur={() =>
                  Keyboard.dismiss()
                }
                onChangeText={id =>
                  this.setState({
                    id: {
                      ...this.state.id,
                      value: id,
                      error: ""
                    }
                  })
                }
              />
            </Col>
          </Row>
          <Row style={{ height: 20 }} />
          <Row style={{ height: 60, marginLeft: 20, marginRight: 30 }}>
            <Col>
              <TextField
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
                maxLength={48}
                label={"Please enter User Name"}
                value={this.state.name.value}
                error={this.state.name.error}
                onBlur={() =>
                  Keyboard.dismiss()
                }
                onChangeText={name =>
                  this.setState({
                    name: {
                      ...this.state.name,
                      value: name,
                      error: ""
                    }
                  })
                }
              />
            </Col>
          </Row>
          <Row style={{ height: 20 }} />
          <Row style={{ height: 60, marginLeft: 20, marginRight: 30 }}>
            <Col>
              <TextField
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
                maxLength={48}
                label={"Please enter Password"}
                value={this.state.password.value}
                error={this.state.password.error}
                onBlur={() =>
                  Keyboard.dismiss()
                }
                onChangeText={password =>
                  this.setState({
                    password: {
                      ...this.state.password,
                      value: password,
                      error: ""
                    }
                  })
                }
              />
            </Col>
          </Row>
          <Row style={{ height: 20 }} />
          <Row style={{ height: 60, marginLeft: 20, marginRight: 30 }}>
            <Col>
              <TextField
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
                maxLength={48}
                label={"Please enter a Service Peer"}
                value={this.state.provider.value}
                error={this.state.provider.error}
                onBlur={() =>
                  Keyboard.dismiss()
                }
                onChangeText={provider =>
                  this.setState({
                    provider: {
                      ...this.state.provider,
                      value: provider,
                      error: ""
                    }
                  })
                }
              />
            </Col>
          </Row>
          <Row style={{ height: 20 }} />
          <Row
            style={{ height: 40, justifyContent: "center", marginTop: 20 }}
          >
        

            <Button
              backgroundColor={color.primary}
              buttonStyle={{ borderRadius: 10, width: width - 60, height: 40 }}
              title = {
                "Register"
              }
              onPress={this.doRegister}
            />
          </Row>
          <Row style={{ height: 20 }} />
          {/***** Modal Views *****/}
          <View>
            <Modal
              onModalHide={this.onIndicatorHide}
              isVisible={this.state.popupIndicator}
              animationIn="zoomIn"
              animationOut="zoomOut"
            >
              {this.renderIndicator()}
            </Modal>
          </View>
          <View>
            <Modal
              isVisible={this.state.popupNotice.visible}
              style={styles.bottomModal}
            >
              {this.renderNotice()}
            </Modal>
          </View>
          <Dialog.Container visible={this.state.dialog.visible}>
            <Dialog.Title>{this.state.dialog.title}</Dialog.Title>
            <Dialog.Description>
              {this.state.dialog.description}
            </Dialog.Description>
            <Dialog.Button label="Cance" onPress={this.handleCancel} />
          </Dialog.Container>
          {/***** Modal Views *****/}
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
