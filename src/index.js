import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {
  createStackNavigator,
  HeaderTitle,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from 'react-navigation-stack'
import {Root, Icon} from 'native-base'
import {Alert, Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import {Colors} from './components/Colors'
import Splash from './components/Spalsh'
import {styles} from './assets/MyStyles'
import {reviewScreen} from './components/review/Review'
import {DayDetail} from './components/review/DayDetails'
import Login from './components/Login'
import {requestScreen} from './components/request/Request'
import {MyRequestTab} from './components/request/Tab'
const MyTransitionToDown = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    }
  },
}
const MyTransitionToLeft = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,

  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    }
  },
}
const screen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textScreen}>screen2</Text>
    </View>
  )
}
const profile =  () => {
  let [logined, setLogined] = useState(false)
  // useEffect(() => {
  //   console.log('profile');
  //   AsyncStorage.getItem('userLogined').then(e => setLogined(e))
  // })
  if (!logined) return <Login />
  else
    return (
      <View style={styles.container}>
        <Text style={styles.textScreen}>screen3</Text>
      </View>
    )
}
const MyTilte = navigation => {
  // console.log(navigation.navigation);
  let [pName, setPname] = useState('')
  useEffect(() => {
    try {
      console.log(navigation.navigation.state.params)
    } catch (err) {
      console.log(err)
    }
    // if (navigation.navigation.state.params.personnelName !== undefined || navigation.navigation.state.params.personnelName !== null) {
    // setPname(navigation.navigation.state.params.personnelName)
    // }
  }, [pName])
  return (
    <Text style={{fontSize: 10, fontFamily: 'IRANSansMobile_Bold'}}>
      {pName}
    </Text>
  )
}
const ShiftRequestStack = createStackNavigator(
  {
    request: {
      screen: MyRequestTab,
      navigationOptions: ({navigation}) => ({
        headerShown: true,
        headerTitleStyle: {
          fontFamily: 'IRANSansMobile_Bold',
        },
        headerTitle: 'سمیه کلبادی',
        // headerTitle: navigation.state.params.personnelName,
        ...MyTransitionToLeft,
        headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 2}}>
            <TouchableOpacity
              onPress={() => console.log(navigation.state.params)}>
              <Icon
                name='add-outline'
                type='Ionicons'
                style={{color: 'black', fontSize: 30}}
              />
            </TouchableOpacity>
          </View>
        ),
      }),
    },
  },
  {
    initialRouteName: 'request',
  },
)
const ShiftReviewStack = createStackNavigator(
  {
    review: {
      screen: reviewScreen,
      navigationOptions: ({navigation}) => ({
        headerShown: true,
        headerTitleStyle: {
          fontFamily: 'IRANSansMobile_Bold',
        },
        headerTitle: 'سمیه کلبادی',
        // headerTitle: navigation.state.params.personnelName,
        ...MyTransitionToLeft,
        headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 2}}>
            <TouchableOpacity
              onPress={() => console.log(navigation.state.params)}>
              <Icon
                name='add-outline'
                type='Ionicons'
                style={{color: 'black', fontSize: 30}}
              />
            </TouchableOpacity>
          </View>
        ),
      }),
    },
    dayDetail: {
      screen: DayDetail,
      navigationOptions: ({navigation}) => ({
        headerShown: true,
        headerTitleStyle: {
          fontFamily: 'IRANSansMobile_Bold',
        },
        headerTitle: '',
        ...MyTransitionToLeft,
        headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 2}}>
            <TouchableOpacity onPress={() => console.log('dsd')}>
              <Icon
                name='add-outline'
                type='Ionicons'
                style={{color: 'black', fontSize: 30}}
              />
            </TouchableOpacity>
          </View>
        ),
      }),
    },
    login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'review',
  },
)
const TabNavigator = createMaterialBottomTabNavigator(
  {
    shiftRequestStack: {
      screen: ShiftRequestStack,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: (
          <Text
            style={{
              fontFamily: 'IRANSansMobile',
              textAlign: 'center',
              fontSize: 12,
            }}>
            درخواست ها
          </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              color={tintColor}
              style={{fontSize: 18}}
              name={'chrome-reader-mode'}
              type={'MaterialIcons'}
            />
          </View>
        ),
        activeColor: 'black',
        inactiveColor: 'red',
        barStyle: {backgroundColor: Colors.background},
      }),
    },
    shiftReviewStack: {
      screen: ShiftReviewStack,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              fontFamily: 'IRANSansMobile',
              textAlign: 'center',
              fontSize: 12,
            }}>
            شیف من
          </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <Icon
            color={tintColor}
            style={{fontSize: 18}}
            name={'book-reader'}
            type={'FontAwesome5'}
          />
        ),
        activeColor: 'black',
        inactiveColor: 'red',
        barStyle: {backgroundColor: Colors.background},
      },
    },
    profileStack: {
      screen: profile,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              fontFamily: 'IRANSansMobile',
              textAlign: 'center',
              fontSize: 12,
            }}>
            پروفایل
          </Text>
        ),
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              color={tintColor}
              style={{fontSize: 18}}
              type='FontAwesome5'
              name='user'
            />
          </View>
        ),
        activeColor: 'black',
        inactiveColor: 'red',
        barStyle: {backgroundColor: Colors.background},
      },
    },
  },
  {
    initialRouteName: 'shiftReviewStack',
    activeColor: 'black',
    inactiveColor: 'red',
    barStyle: {backgroundColor: 'blue'},
  },
)
const RootNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    Main: TabNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
)

const Main = createAppContainer(RootNavigator)
export default Main
