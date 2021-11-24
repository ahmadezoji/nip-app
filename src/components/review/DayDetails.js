import { Icon } from 'native-base'
import React, { useState, useEffect } from 'react'
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
import { styles } from '../../assets/MyStyles'
import { shift_colors } from '../Colors'
import { PersonnelIcon } from '../user/Profile'


const DayDetail = ({ navigation }) => {
  let [userDetail, setUserDetail] = useState([])
  let [selectedDay, setSelectedDay] = useState(
    navigation.state.params.selectedDay,
  )
  let [worksection, setWorksection] = useState(navigation.state.params.Personnel.ywp_id)
  let [yw_id, setYwId] = useState(navigation.state.params.Personnel.ws_id)
  let [refreshing, setRefreshing] = useState(false)
  const getArray = type => {
    if (type == '1') return [true, false, false]
    else if (type == '12') return [true, true, false]
    else if (type == '13') return [true, false, true]
    else if (type == '2') return [false, true, false]
    else if (type == '23') return [false, true, true]
    else if (type == '3') return [false, false, true]
  }
  const _onRefresh = async () => {
    // setRefreshing(true)

    try {
      let response = await fetch(
        `http://10.2.9.132:81/api/shifts-day-details/?worksection=${worksection}&yw_id=${yw_id}&day=${selectedDay}`,
      )
      let result = await response.json()
      setUserDetail(result.results)
      setRefreshing(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !refreshing && _onRefresh()
  }, [userDetail])
  // const data = [{true,false,false},'b':[true,true,false],'c':[false,false,true]}]
  const data = [
    {
      pid: 10,
      shift: [true, false, false],
    },
    {
      pid: 11,
      shift: [false, true, true],
    },
    {
      pid: 12,
      shift: [false, false, true],
    },
    {
      pid: 13,
      shift: [false, false, true],
    },
    {
      pid: 14,
      shift: [false, false, true],
    },
  ]
  const shift = [
    {
      name: 'شام',
    },
    {
      name: 'عصر',
    },
    {
      name: 'صبح',
    },
  ]
  const renderRow = data => {
    if (data.item.Shift.Type == '0') return
    let mShiftType = getArray(data.item.Shift.Type)

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            width: '25%',
            height: 60,
            borderRightColor: 'blue',
            borderRightWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {mShiftType[0] && (
            <View
              style={{
                backgroundColor: '#d5ec0c',
                borderRadius: 4,
                width: '100%',
                height: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 10, color: 'red' }}>18:00 - 24:00</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            width: '25%',
            height: 60,
            borderRightColor: 'blue',
            borderRightWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {mShiftType[1] && (
            <View
              style={{
                backgroundColor: '#d5ec0c',
                width: '100%',
                borderRadius: 4,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 10, color: 'red' }}>12:00 - 18:00</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            width: '25%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {mShiftType[2] && (
            <View
              style={{
                backgroundColor: '#d5ec0c',
                width: '100%',
                borderRadius: 4,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 10, color: 'red' }}>8:00 - 12:00</Text>
            </View>
          )}
        </View>
        <View
          style={{
            width: '25%',
            borderColor: 'transparent',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {data.item.Personnel.FullName && (
            <PersonnelIcon
              personnel={data.item.Personnel}
              onRequestClose={() => params}
            />
          )}
        </View>
      </View>
    )
  }

  return (
    // <View style={{flex: 1, backgroundColor: '#12c2e9', flexDirection: 'column'}}>
    <LinearGradient
      colors={['#12c2e9', '#c471ed', '#f64f59']}
      style={styles.survaylinearGradient}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <View
        style={{
          flexDirection: 'row',
          height: 100,
        }}>
        {shift.map(item => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 40,
                  width: 60,
                  borderRadius:5,
                  backgroundColor:'#f64f59',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                  {item.name}
                </Text>
              </View>
            </View>
          )
        })}
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View>
      <FlatList
      style={{width:'100%'}}
        vertical
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        data={userDetail}
        renderItem={renderRow}
        ListFooterComponent={<View style={{ paddingRight: 60 }} />}
      />
    </LinearGradient>
    // </View>

  )
}
const RenderM = ({ params }) => {
  let [users, setUsers] = useState([])
  let [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    setUsers(params)
  })
  return (
    <View>
      <FlatList
        style={{ flex: 1 }}
        horizontal
        showHorizontal={false}
        refreshing={refreshing}
        pagingEnabled={true}
        data={users}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.DayDetailRowCardStyle}>
            <Text style={styles.userName}>{item.Personnel.FullName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          return item.id
        }}
        ListFooterComponent={<View style={{ paddingRight: 60 }} />}
      />
    </View>
  )
}
export { DayDetail }
