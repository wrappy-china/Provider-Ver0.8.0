import {combineReducers} from 'redux'

import {
    assetList,
    issueCoupon,
    providerList,
    redeemerList,
    registerCoupon,
    userLoginIn,
    userRegister,
    couponList,
    providerLoginIn,
} from './redux-reducers';

const appReducers = combineReducers({
    providerLoginIn: providerLoginIn,
    userLoginIn: userLoginIn,
    userRegister: userRegister,
    registerCoupon: registerCoupon,
    issueCoupon: issueCoupon,
    assetList: assetList, // 暂时没有用到
    redeemerList: redeemerList,
    providerList: providerList,
    couponList: couponList,
});

export default appReducers;
