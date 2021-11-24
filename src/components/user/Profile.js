import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {
  Container,
  Header,
  View,
  Text,
  Left,
  Button,
  Right,
  Content,
  Form,
  Item,
  Icon,
  Input,
  Spinner,
} from 'native-base'
import { styles } from '../../assets/MyStyles'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'
import { USER_DETAIL } from '../Consts'
import Login from '../Login'
const PersonnelIcon = navigation => {
  let [personnel, setPersonnel] = useState(navigation.personnel)
  return (
    <TouchableOpacity
      style={{
        height: 60,
        width: 60,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 40,
        justifyContent: 'center',
        margin: 2,
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.onRequestClose(false)
        // navigation.navigation.push('profile', params.navigation)
      }}>
      <Icon name='user-female' type='SimpleLineIcons' />
      <Text
        style={{
          width: '70%',
          color: 'white',
          fontSize: 12,
          textAlign: 'center',
          verticalAlign: 'center',
        }}>
        {personnel.FullName.substring(0, 20)}
      </Text>
    </TouchableOpacity>
  )
}

const ProfileSwitcher = ({ params }) => {
  let [personnel, setPersonnel] = useState(null)
  let myview = (<Profile />)
  useEffect(async () => {
    let json = await AsyncStorage.getItem(USER_DETAIL)
    setPersonnel(JSON.parse(json))
    console.log('in');
    myview = <Login />
  }, [])

  if (personnel == null) {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Login />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Profile />
    </View>
  )

}
const Profile = ({ params }) => {
  let [refreshing, setRefreshing] = useState(false)
  let [personnel, setPersonnel] = useState(null)
  const _onRefresh = async () => {
    try {
      setRefreshing(true)

      console.log(params);
      // let response = await fetch(
      // `http://10.2.9.132:81/api/personnel/?id=${params.pid}`,
      // )
      // let result = await response.json()

      // setPersonnel(result.results[0])
      setRefreshing(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !refreshing && _onRefresh()
  })

  return <LinearGradient
    colors={['#12c2e9', '#c471ed', '#f64f59']}
    style={styles.profileLinearGradient}>
    {/* <Text style={{ color: 'white', fontSize: 25 }}>{personnel.FullName}</Text> */}
  </LinearGradient>
}

export { Profile, PersonnelIcon, ProfileSwitcher }
