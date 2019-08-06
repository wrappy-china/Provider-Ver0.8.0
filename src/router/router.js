import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";
import HomeScreen from "../pages/HomeScreen";
import IssueCouponScreen from "../pages/IssueCouponScreen";
import SettingsScreen from "../pages/SettingsScreen";
import ProfileScreen from "../pages/ProfileScreen";
import ProviderListCoupon from "../pages/ProviderListCoupon";
import ServiceUserAndStoreListCoupon from "../pages/ServiceUserAndStoreListCoupon"
import StoreListRedeemer from "../pages/StoreListRedeemer"
import ServiceUserTransactionHistory from "../pages/ServiceUserTransactionHistory"
import ProviderTransactionHistory from "../pages/ProviderTransactionHistory"
import LoginScreen from "../pages/LoginScreen";
import RegisterStoreScreen from "../register/RegisterStoreScreen"
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import ListProviderScreen from "../pages/ListProviderScreen";
import ListRedeemerScreen from "../pages/ListRedeemerScreen";
import ListCouponScreen from "../pages/ListCouponScreen";
import RegisterCouponScreen from "../pages/RegisterCouponScreen";
import RegisterUserScreen from "../register/RegisterUserScreen";
import ProviderMainScreen from "../pages/ProviderMainScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    ListRedeemer: ListRedeemerScreen,
});

const OthersStack = createStackNavigator({
    Settings: SettingsScreen,
    ServiceUserAndStoreListCoupon: ServiceUserAndStoreListCoupon,
    StoreListRedeemer: StoreListRedeemer,
    ServiceUserTransactionHistory: ServiceUserTransactionHistory,

});

const MainNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Others: OthersStack,
}, );
const AuthenticationNavigator = createStackNavigator({
    Login: LoginScreen,
    RegisterUser: RegisterUserScreen,

});



const ProviderMainStack = createStackNavigator({
    ProviderMain: ProviderMainScreen,
    Profile: ProfileScreen,
    ProviderListCoupon: ProviderListCoupon,
    ProviderTransactionHistory: ProviderTransactionHistory,
    ListProvider: ListProviderScreen,
    IssueCoupon: IssueCouponScreen,
    ListCoupon: ListCouponScreen,
    RegisterCoupon: RegisterCouponScreen,
    RegisterStore: RegisterStoreScreen,
});

const AppNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthenticationNavigator,
    Main: OthersStack,
    ProviderMain: ProviderMainStack,
}, {
    initialRouteName: "Auth",
    /* The header config from HomeScreen is now here */
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;