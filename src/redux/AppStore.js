import {
    applyMiddleware,
    createStore
} from "redux";
import thunk from 'redux-thunk';
import appReducers from "./appReducers";
import {composeWithDevTools} from "redux-devtools-extension";
/**
 *redux 最核心管理对象
 */
// const createStoreWithMiddleware = applyMiddleware(
//     thunkMiddleware
// )(
//     createStore
// );
//
// export default function appStore(initialState) {
//     let store = createStoreWithMiddleware(appReducers, initialState);
//     return store;
// }

const store  = createStore(
    appReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export  default  store ;
