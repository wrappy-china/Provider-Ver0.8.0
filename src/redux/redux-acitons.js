// 包含所有的action creator 工厂函数
import {
    service
} from "../service/service";
import * as types from './action-types';
import {
    BASE_URL,
    USER_TOKEN,
    PROVIDER_TOKEN
} from "../constans/network";



export const getAssetList = () => {
    console.log('------ getAssetList action  ----');
    return dispatch => {
        dispatch(getAssetListing());
        service('provider/asset/list', JSON.stringify({
            'coupon': ['3VDHWRJV5806LS ']
        }))
            .then(
                (data) => {
                    dispatch(getAssetListSuccess(data))
                }
            )
            .catch(error => {
                dispatch(getAssetListError(error))
            });
    }
}


function getAssetListing() {
    return {
        type: types.REQUEST_DOING,
        data: '网络请求中'
    }
}

function getAssetListSuccess(data) {
    return {
        type: types.REQUEST_DONE,
        data: data
    }
}

function getAssetListError(data) {
    return {
        type: types.REQUEST_ERROR,
        data: '网络请求失败。。。。'
    }
}
/**
 * 注册优惠券
 */
export const doRegisterCoupon = (token, json) => {
    console.log('doRegisterCoupon  paramers : ', JSON.stringify(json));
    const strarr = json.denomination;
    let intarr = [];
    strarr.map(
        (value) => {
            intarr.push(parseInt(value));
        }
    );
    json.denomination = intarr;
     console.log('doRegisterCoupon  new : ', JSON.stringify(json));
    return dispatch => {
        dispatch(isRegisterCouponing());
        fetch(BASE_URL + 'provider/coupon/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(json),

        })
            .then(response => {
                console.log("fetch : ", JSON.stringify(response));
                return response.json();
            })
            .then((data) => {
                console.log(" ---- doRegisterCoupon ------ ", JSON.stringify(data));
                let code = data.code;
                if (code === 100) {
                    dispatch(registerCouponSuccess(data))
                } else {
                    dispatch(registerCouponError(data));
                }
            }).catch(
                (error) => {
                    console.log("doRegisterCoupon  error : ", error);
                    dispatch(registerCouponError(error));
                }
            );
    }
}

function isRegisterCouponing() {
    return {
        type: types.REQUEST_DOING,
        data: ""
    }
}

function registerCouponSuccess(data) {
    return {
        type: types.REQUEST_DONE,
        data: data,
    }
}

function registerCouponError(data) {
    return {
        type: types.REQUEST_ERROR,
        data: data,
    }
}

/**
 * 发放优惠券 
 * @param {*} paramer
 */
export const doIssueCoupon = (paramer, token) => {
    console.log('doIssueCoupon  paramer : ', JSON.stringify(paramer));
    return dispatch => {
        dispatch(isIssueCouponing());
        fetch(BASE_URL + 'provider/coupon/issue', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(paramer),

        })
            .then(response => {
                console.log("fetch : ", JSON.stringify(response));
                return response.json();
            })
            .then((data) => {
                console.log(" ---- doIssueCoupon ------ ", JSON.stringify(data));
                let code = data.code;
                if (code === 100) {
                    dispatch(isssueCouponSuccess(data))
                } else {
                    dispatch(isssueCouponError(data));
                }
            }).catch(
                (error) => {
                    dispatch(isssueCouponError(error));
                }
            );
    }
}

function isIssueCouponing() {
    return {
        type: types.REQUEST_DOING,
        data: 'Loading'
    }
}

function isssueCouponSuccess(data) {
    return {
        type: types.REQUEST_DONE,
        data: data
    }
}

function isssueCouponError(data) {
    return {
        type: types.REQUEST_ERROR,
        data: data
    }
}

export const getRedeemerList = () => {
    return dispatch => {
        dispatch(isRedeemerListing());
        fetch(BASE_URL + 'user/redeemer/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + USER_TOKEN
            },
        })
            .then(response => {
                console.log("fetch  user/redeemer/list :  ", JSON.stringify(response));
                return response.json();
            })
            .then((data) => {
                console.log(" ---- getRedeemerList ------ ", JSON.stringify(data));
                let code = data.code;
                if (code === 100) {
                    dispatch(getRedeemerListSuccess(data))
                } else {
                    dispatch(getRedeemerListError(data));
                }
            }).catch(
                (error) => {
                    dispatch(getRedeemerListError(error));
                }
            );
    }
}

function isRedeemerListing() {
    return {
        type: types.REQUEST_DOING,
        data: 'Loading'
    }
}

function getRedeemerListSuccess(data) {
    return {
        type: types.REQUEST_DONE,
        data: data
    }
}

function getRedeemerListError(data) {
    return {
        type: types.REQUEST_ERROR,
        data: data
    }
}

//getProviderList

///provider/coupon/list
export const getProviderList = (token) => {
    return dispatch => {
        dispatch(isProviderListing());
        fetch(BASE_URL + 'provider/coupon/list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "filter": "ALL"
            }),

        })
            .then(response => {
                console.log("fetch : ", JSON.stringify(response));
                return response.json();
            })
            .then((data) => {
                console.log(" ---- getProviderList ------ ", JSON.stringify(data));
                let code = data.code;
                if (code === 100) {
                    dispatch(getProviderListSuccess(data))
                } else {
                    dispatch(getProviderListError(data));
                }
            }).catch(
                (error) => {
                    dispatch(getProviderListError(error));
                }
            );
    }
}

function isProviderListing() {
    return {
        type: types.REQUEST_DOING,
        data: 'Loading'
    }
}

function getProviderListSuccess(data) {
    return {
        type: types.REQUEST_DONE,
        data: data
    }
}

function getProviderListError(data) {
    return {
        type: types.REQUEST_ERROR,
        data: data
    }
}

// Provider登录
export const
    doLoginProvider = (username, password) => {
        return dispatch => {
            dispatch(isLoginProvidering());
            service('provider/authenticate', JSON.stringify({
                "username": username,
                "password": password,
                "type": "provider"
            }))
                .then((data) => {
                    console.log(' -----  doLoginProvider data ------- ', JSON.stringify(data));
            
                    // var success = data.success;
                    // if (success === true) {
                    //     dispatch(loginProviderSuccess(true, data))
                    // } else {
                    //     dispatch(loginProviderError(data));
                    // }
                    if (data.error == undefined) {
                        console.log(' -----  doLoginProvider success ------- ', data);
                         dispatch(loginProviderSuccess(true, data))
                    } else {
                        dispatch(loginProviderError(data));
                    }
                    
                }).catch(
                    (error) => {
                        dispatch(loginProviderError(error));
                    }
                );
        }
    }


function isLoginProvidering() {
    return {
        type: types.PROVIDER_LOGIN_LOADING,
        data: 'Loading',
        success: false,
        loading: true,
    }
}
function loginProviderSuccess(success,data) {
    return {
        type: types.PROVIDER_LOGIN_DONE,
        data: data,
        success: success,
        loading: false,
    }
}
function loginProviderError(error) {
    return {
        type: types.PROVIDER_LOGIN_ERROR,
        data: error,
        success: false,
        loading: false,
    }
}

// 退出登录

export const doUserLogout = () => {
    return dispatch => {
        dispatch(userLogout());
    }
}

function userLogout() {
    return {
        type: types.USER_LOGOUT,
        data: { success: false, token: "", data: null, error: null },
        success: false,
    }
}


export const doProviderLogout = () => {
    return dispatch => {
        dispatch(providerLogout());
    }
}

function providerLogout() {
    return {
        type: types.PROVIDER_LOGOUT,
        data: { success: false, token: "", data: null, error: null },
        success: false,
    }
}



// 用户登录 
export const
    doLoginUser = (username, password) => {
        return dispatch => {
            dispatch(isLoginUsering());
            service('user/authenticate', JSON.stringify({
                "username": username,
                "password": password
            }))
                .then((data) => {
                      console.log(' -----  doLoginUser data ------- ', JSON.stringify(data));
                    var success = data.success;
                    if (success === true) {
                        dispatch(loginUserSuccess(true, data))
                    } else {
                        dispatch(loginUserError(data));
                    }
                }).catch(
                    (error) => {
                        dispatch(loginUserError(error));
                    }
                );
        }
    }

function isLoginUsering() {
    return {
        type: types.USER_LOGIN_LOADING,
        data: 'Loading',
        success: false,
        loading: true,
    }
}

function loginUserSuccess(isSuccess, data) {
    return {
        type: types.USER_LOGIN_DONE,
        data: data,
        success: isSuccess,
        loading: false,
    }
}

function loginUserError(data) {
    return {
        type: types.USER_LOGIN_ERROR,
        data: data,
        success: false,
        loading: false,
    }
}


export const doRegisterUser = (id, name, password, provider = "world_gourmet_v") => {
    return dispatch => {
        dispatch(isRegisterUsering());
        service('user/register', JSON.stringify({
            "id": id,
            "name": name,
            "password": password,
            "provider": provider,
            "type": "CONSUMER"
        }))
            .then((data) => {
                console.log(" ----doRegister response ------ ", JSON.stringify(data));
                let code = data.code;
                if (code === 100) {
                    dispatch(RegisterUserSuccess(true, data))
                } else {
                    dispatch(registerUserError(data));
                }
            }).catch(
                (error) => {
                    dispatch(registerUserError(error));
                }
            )

    }
}


function isRegisterUsering() {
    return {
        type: types.REQUEST_DOING,
        data: 'Loading'
    }
}

function RegisterUserSuccess(isSuccess, data) {
    return {
        type: types.REQUEST_DONE,
        data: data,
    }
}

function registerUserError(data) {
    return {
        type: types.REQUEST_ERROR,
        data: data,
    }
}

//getCouponList provider/coupon/list
export const getCouponList = (token) => {
    return dispatch => {
        dispatch(isProviderListing());
        fetch(BASE_URL + 'provider/coupon/list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "filter": "ALL"
            }),

        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                let code = data.code;
                if (code === 100) {
                    dispatch(getProviderListSuccess(data))
                } else {
                    dispatch(getProviderListError(data));
                }
            }).catch(
                (error) => {
                    dispatch(getProviderListError(error));
                }
            );
    }

}

//providerLoginIn


// function isRegisterUsering() {
//     return {
//         type: types.REQUEST_DOING,
//         data: '网络请求中'
//     }
// }

// function RegisterUserSuccess(isSuccess, data) {
//     return {
//         type: types.REQUEST_DONE,
//         data: data,
//     }
// }

// function registerUserError(data) {
//     return {
//         type: types.REQUEST_ERROR,
//         data: data,
//     }
// }