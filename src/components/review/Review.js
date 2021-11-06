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
  let [personnel,setPersonnel] = useState({
    id:33581,
    FullName : 'سمیه کلبادی'
  })
  let [refreshing, setRefreshing] = useState(false)
  const _onRefresh = async () => {
    try {
      
      let response = await fetch(
        `http://10.2.9.132:81/api/shifts-personnel-details/?p_id=33581&yw_id=2020&nooff=0`,
      )
      let result = await response.json()
      // let array = []
      // Object.keys(result.results[0]).forEach(key => {
      //   if (key.includes('D')) {
      //     let val = result.results[0][key]
      //     array = [...array, val]
      //   }
      // })
      // await navigation.setParams({personnelName:result.results[0].Personnel.FullName})
      
      setData(result.results)
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
                selectedDay: parseInt(item.DayNo),
                Personnel : personnel
              })
            }
            style={[
              styles.reviewCardStyle,
              {opacity: item.Shift.Title === 'off' ? 0.5 : 1},
            ]}>
            <Text style={{color: 'color', fontFamily: 'IRANSansMobile'}}>
              روز {item.DayNo}
            </Text>
             {/*<Text style={{color: 'white', fontFamily: 'IRANSansMobile_Bold'}}>
              {item.Type}
            </Text> */}
            <Text style={{color: 'black', fontFamily: 'IRANSansMobile_Bold'}}>
              {item.Date}
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
