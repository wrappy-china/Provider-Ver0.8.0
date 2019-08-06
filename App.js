/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @todo  alex : 消费者
 * @todo  我们（service provider ） :  注册店铺， 登录,发行qupen , 历史记录 （清单） ，代金券分配给消费者，
 * @format
 * @flow
 */
import React from "react";
import AppContainer from "./src/router/router";
import { Provider } from 'react-redux';
import store from "./src/redux/AppStore";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer
          onNavigationStateChange={(state) => {
            // console.log("handleNavigationChange :" + JSON.stringify(state));
          }}
          uriPrefix="/app"
        />
      </Provider>
    );
  }
}
