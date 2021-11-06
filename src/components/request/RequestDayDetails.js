import {Icon} from 'native-base'
import React, {useState, useEffect} from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {styles} from '../../assets/MyStyles'
import {shift_colors} from '../Colors'
import {shift_type, shift_value} from '../Consts'

const RequestDayDetail = ({navigation}) => {
  let [yw_id, setYwId] = useState('2022')
  let [selectedDay, setSelectedDay] = useState(
    navigation.state.params.selectedDay,
  )
  let [worksection, setWorksection] = useState(
    navigation.state.params.selectedWorkSection,
  )
  let [dayDetail, setDayDetaile] = useState([])
  let [refreshing, setRefreshing] = useState(false)
  
  const _onRefresh = async () => {
    // setRefreshing(true)
    try {
      let response = await fetch(
        `http://10.2.9.132:81/api/self-declaration-get-day-details/?worksection_id=${worksection}&yw_id=${yw_id}&day=${selectedDay}`,
      )
      let result = await response.json()
      let json = await result.results
      let array = []
      Object.keys(result.results).forEach(key => {
        let val = result.results[key]
        array = [...array, val]
      })

      setDayDetaile(array)

      setRefreshing(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !refreshing && _onRefresh()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
      }}>
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
        pagingEnabled={true}
        data={dayDetail}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              backgroundColor: '#Aff',
              margin: 2,
              width: '100%',
              height: 100,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#Aff',
                height: 70,
                width: 70,
                borderRadius: 35,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Icon name='user-female' type='SimpleLineIcons' />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                  verticalAlign: 'center',
                }}>
                {item.Personnel.FullName}
              </Text>
            </View>
            <Text style={{color: 'black'}}>{shift_type[item.ShiftType]}</Text>
            <Text style={{color: 'black'}}>
              {shift_value[String(item.Value)]}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => {
          return item.id
        }}
        ListFooterComponent={<View style={{height: 100}} />}
      />
    </View>
  )
}
export {RequestDayDetail}
