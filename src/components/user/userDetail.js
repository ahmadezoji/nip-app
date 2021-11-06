import React, {useState, useEffect} from 'react'
import {
  AsyncStorage,
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
const PersonnelIcon = navigation => {
  let [personnel, setPersonnel] = useState(navigation.personnel)
  return (
    <TouchableOpacity
      style={{
        height: 70,
        width: 70,
        borderColor: 'black',
        borderRadius: 35,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.onRequestClose(false)
        navigation.navigation.push('userDetail', params.navigation)
      }}>
      <Icon name='user-female' type='SimpleLineIcons' />
      <Text
        style={{
          color: 'black',
          fontSize: 12,
          textAlign: 'center',
          verticalAlign: 'center',
        }}>
        {personnel.FullName}
      </Text>
    </TouchableOpacity>
  )
}
const userDetail = ({navigation}) => {
  let [refreshing, setRefreshing] = useState(false)
  let [personnel, setPersonnel] = useState({})
  // console.log(navigation);
  // let {personnel} = params
  let [pId, setPId] = useState('36108')
  const _onRefresh = async () => {
    // setRefreshing(true)
    try {
      let response = await fetch(
        `http://10.2.9.132:81/api/personnel/?id=${pId}`,
      )
      let result = await response.json()
      setPersonnel(result.results[0])
      setRefreshing(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !refreshing && _onRefresh()
  })

  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export {userDetail, PersonnelIcon}
