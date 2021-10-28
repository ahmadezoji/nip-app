import { CommonActions } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import { styles } from '../../assets/MyStyles'
import { shift_colors } from '../Colors'
import { Icon } from 'native-base';

const RequestScreen = ({ navigation }) => {
  let [data, setData] = useState([])
  let [workSection, setWorkSection] = useState(0)
  let [period, setPeriod] = useState('140005')
  let [personnel, setPersonnel] = useState({})
  let [refreshing, setRefreshing] = useState(false)
  const _onRefresh = async () => {
    try {
      let response = await fetch(
        `http://10.2.9.132:81/api/psd/?limit=100&p_id=33581&YearWorkingPeriod=${period}`,
      )
      let result = await response.json()
      setWorkSection(result.results[0].Personnel.WorkSection.id)
      setPersonnel(result.results[0].Personnel)
      let array = []
      Object.keys(result.results[0]).forEach(key => {
        if (key.includes('D')) {
          let val = result.results[0][key]
          array = [...array, val]
        }
      })

      // await navigation.setParams({personnelName:result.results[0].Personnel.FullName})

      setData(array)
      // setRefreshing(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !refreshing && _onRefresh()
    return () => setRefreshing(true)
  })
  //{backgroundColor:shift_colors[item.Title]}
  return (
    <LinearGradient
      colors={['#e4f4f1', '#e4f4f1', '#e4f4f1']}
      style={styles.linearGradient}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <FlatList
        style={{ flex: 1 }}
        virtical
        showsVerticalScrollIndicator={false}
        // onRefresh={() => _onRefresh()}
        refreshing={refreshing}
        pagingEnabled={true}
        data={data}
        renderItem={({ item, index }) => (
          <RenderRequestDay index={index} item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => {
          return item.id
        }}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </LinearGradient>
  )
}

const RenderRequestDay = (params) => {
  let [chooseM, setChooseM] = useState(false)
  let [chooseA, setChooseA] = useState(false)
  let [chooseN, setChooseN] = useState(false)
  return (
    <View style={{ flex: 1, width: Dimensions.get('window').width, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', margin: 2 }}>
      <TouchableOpacity
        style={{ width: '10%', height: 30 }}
        onPress={() => params.navigation.navigate('requestDayDetail', {
          selectedDay: `${params.index + 1}`,
          selectedWorkSection: '45234'
        })}>
        <Icon
          name='infocirlceo'
          type='AntDesign'
          style={{ color: 'black', fontSize: 30 }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, width: 300, height: 100, flexDirection: 'row-reverse' }}>
        <View style={{
          width: '15%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <Text style={{ color: 'black', fontFamily: 'IRANSansMobile' }}>روز {params.index + 1}</Text>
        </View>
        <TouchableOpacity
          onLongPress={() => setChooseM(!chooseM)}
          onPress={() => setChooseM(!chooseM)}
          style={{
            borderWidth: 1, borderColor: 'black', borderRadius: 5,
            backgroundColor: chooseM ? 'red' : '#e4f4f1',
            width: '25%',
            height: '100%',
            margin: 5
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => setChooseA(!chooseA)}
          style={{
            borderWidth: 1, borderColor: 'black', borderRadius: 5,
            backgroundColor: chooseA ? 'red' : '#e4f4f1',
            width: '25%',
            height: '100%',
            margin: 5
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => setChooseN(!chooseN)}
          style={{
            borderWidth: 1, borderColor: 'black', borderRadius: 5,
            backgroundColor: chooseN ? 'red' : '#e4f4f1',
            width: '25%',
            height: '100%',
            margin: 5
          }}></TouchableOpacity>
      </View>

    </View>

  )
}
export { RequestScreen }
