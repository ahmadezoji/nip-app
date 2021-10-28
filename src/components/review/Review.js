import { CommonActions } from '@react-navigation/native'
import React, {useState, useEffect} from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import {styles} from '../../assets/MyStyles'
import {shift_colors} from '../Colors'
import { shift_type } from '../Consts'

const reviewScreen = ({navigation}) => {
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
    !refreshing &&  _onRefresh()
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
        style={{flex: 1}}
        virtical
        showsVerticalScrollIndicator={false}
        // onRefresh={() => _onRefresh()}
        refreshing={refreshing}
        numColumns={3}
        pagingEnabled={true}
        data={data}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('dayDetail', {
                selectedDay: `${index + 1}`,
                selectedWorkSection: workSection,
                personnel: personnel,
              })
            }
            style={[
              styles.reviewCardStyle,
              {opacity: item.Title === 'off' ? 0.5 : 1},
            ]}>
            {/* <Text style={{color: 'white', fontFamily: 'IRANSansMobile'}}>
              {item.Code}
            </Text>
            <Text style={{color: 'white', fontFamily: 'IRANSansMobile_Bold'}}>
              {item.Type}
            </Text> */}
            <Text style={{color: 'black', fontFamily: 'IRANSansMobile_Bold'}}>
              {item.Title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          return item.id
        }}
        ListFooterComponent={<View style={{height: 100}} />}
      />
    </LinearGradient>
  )
}

export {reviewScreen}
