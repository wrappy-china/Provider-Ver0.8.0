// 包含所有的reducer 函数 ， （根据老的state和action返回一个新的state）
import * as types from './action-types';
const initialState = {
    data: '',
}

const initAssetList = {
    data: '等待请求返回数据。默认数据'
}

const initRegisterCoupon = {
    data: '等待注册',
    loading: false,
}

const initIssueCoupon = {
    loading: false,
    data: '等待请求返回',

}
const initRedeemerList = {
    data: '等待请求返回'
}


const initState = {
    userLogin: {
        data: null,
        loading: false,

    },
    providerLogin: {
        data: null,
        loading: false,
    }
}


export function assetList(state = initAssetList, action) {
    console.log('--------- assetList reducers ', action.data);
    switch (action.type) {
        case types.REQUEST_DOING:
            // 返回新的状态
            return action.data;
        case types.REQUEST_DONE:
            // 返回新的状态
            return action.data;
        case types.REQUEST_ERROR:
            // 返回新的状态
            return action.data;
        default:
            return state;
    }
}

export function registerCoupon(state = initRegisterCoupon, action) {
    console.log('--------- registerCoupon reducers ', action.data);
    switch (action.type) {
        case types.REQUEST_DOING:
            return {
                data: action.data,
                    loading: true,
            };
        case types.REQUEST_DONE:
            return {
                data: action.data,
                    loading: false,
            };
        case types.REQUEST_ERROR:
            return {
                data: action.data,
                    loading: false,
            };
        default:
            return state;
    }

}

export function issueCoupon(state = initIssueCoupon, action) {
    console.log('--------- issueCoupon reducers ', action.data);
    switch (action.type) {
        case types.REQUEST_DOING:
            return {
                data: action.data,
                    loading: true,
            };
        case types.REQUEST_DONE:
            return {
                data: action.data,
                    loading: false,
            };
        case types.REQUEST_ERROR:
            return {
                data: action.data,
                    loading: false,
            };
        default:
            return state;
    }
}

//redeemerList

export function redeemerList(state = initRedeemerList, action) {
    console.log('--------- redeemerList reducers ', action.data);
    switch (action.type) {
        case types.REQUEST_DOING:
            return action.data;
        case types.REQUEST_DONE:
            return action.data;
        case types.REQUEST_ERROR:
            return action.data;
        default:
            return state;
    }
}


//providerList
export function providerList(state = initRedeemerList, action) {
    console.log('--------- providerList reducers ', action.data);
    switch (action.type) {
        case types.REQUEST_DOING:
            return action.data;
        case types.REQUEST_DONE:
            return action.data;
        case types.REQUEST_ERROR:
            return action.data;
        default:
            return state;
    }
}

const initUserLoginInState = {
    loading: false,
    user: '',
}
const initProviderLoginInState = {
    loading: false,
    provider: '',
}

const initRegisterState = {
    loading: false,
    data: '',
}
//loginIn
export function userLoginIn(state = initState, action) {
    switch (action.type) {
        case types.USER_LOGIN_LOADING:
            return {
                ...state,
                userLogin: {
                    data: '',
                    loading: true,
                },
            };
        case types.USER_LOGIN_DONE:
            return {
                ...state,
                userLogin: {
                        data: action.data,
                        loading: false
                    },

            };
        case types.USER_LOGIN_ERROR:
            return {
                ...state,
                userLogin: {
                    data: action.data,
                    loading: false
                },
            };
        case types.USER_LOGOUT:
            return {
                ...state,
                userLogin: {
                    data: null,
                    loading: false
                },
            };
        default:
            return state
    }
}

//providerLoginIn
export function providerLoginIn(state = initState, action) {

    console.log('providerLoginIn ^^^^^^^^^', JSON.stringify(action));
    switch (action.type) {
        case types.PROVIDER_LOGIN_LOADING:
            return {
                ...state,
                providerLogin: {
                    data: null,
                    loading: true,
                    success: action.success,
                }
            };
        case types.PROVIDER_LOGIN_DONE:
            return {
                ...state,
                providerLogin: {
                    data: action.data,
                    loading: false,
                    success: action.success
                }
            };
        case types.PROVIDER_LOGIN_ERROR:
            return {
                ...state,
                providerLogin: {
                    data: action.data,
                    loading: false,
                    success: action.success
                }
            };
        case types.PROVIDER_LOGOUT:
            return {
                ...state,
                providerLogin: {
                    data: null,
                    loading: false,
                }
            };
        default:
            return state
    }
}
export function userRegister(state = initRegisterState, action) {
    switch (action.type) {
        case types.REQUEST_DOING:
            return {
                data: action.data,
                    loading: true,
            };
        case types.REQUEST_DONE:
            return {
                data: action.data,
                    loading: false,
            };
        case types.REQUEST_ERROR:
            return {
                data: action.data,
                    loading: false,
            };

        default:
            return state;
    }
}
//couponList
export function couponList(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST_DOING:
            return action.data;
        case types.REQUEST_DONE:
            return action.data;
        case types.REQUEST_ERROR:
            return action.data;
        default:
            return state;
    }
}