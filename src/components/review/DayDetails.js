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

const DayDetail = ({navigation}) => {
  // let [data, setData] = useState([])
  let [userDetail, setUserDetail] = useState([])
  let [m_users, setM_users] = useState([])
  let [selectedDay, setSelectedDay] = useState(
    navigation.state.params.selectedDay,
  )
  let [worksection, setWorksection] = useState('2020')
  let [yw_id, setYwId] = useState('2022')
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
        `http://10.2.9.132:81/api/shifts-day-details/?worksection=45234&yw_id=2020&day=${selectedDay}`,
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
          margin: 1,
        }}>
        <View
          style={{
            flex: 1,
            width: '25%',
            height: 60,
            borderColor: 'black',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {mShiftType[0] && (
            <View
              style={{
                backgroundColor: 'black',
                width: '100%',
                height: 20,
              }}></View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            width: '25%',
            height: 60,
            borderColor: 'black',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {mShiftType[1] && (
            <View
              style={{
                backgroundColor: 'black',
                width: '100%',
                height: 20,
              }}></View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            width: '25%',
            height: 60,
            borderColor: 'black',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {mShiftType[2] && (
            <View
              style={{
                backgroundColor: 'black',
                width: '100%',
                height: 20,
              }}></View>
          )}
        </View>
        <View
          style={{
            width: '25%',
            borderColor: 'red',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {data.item.Personnel.FullName && (
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
                  fontWeight:
                    data.item.Personnel.id ==
                    navigation.state.params.personnel.id
                      ? 'bold'
                      : '400',
                }}>
                {data.item.Personnel.FullName}
              </Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          borderColor: 'red',
          borderWidth: 1,
        }}>
        {shift.map(item => {
          return (
            <View
              style={{
                flex: 1,
                borderColor: 'black',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#Aff',
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
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
            borderColor: 'black',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View>
      {/* <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {userDetail.map(datum => {
          return renderRow(datum)
        })}
      </ScrollView> */}
      <FlatList
        // style={{flex: 1,borderColor: 'black',borderWidth: 1}}
        vertical
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        data={userDetail}
        renderItem={renderRow}
        ListFooterComponent={<View style={{paddingRight: 60}} />}
      />
    </View>
  )
}
const RenderM = ({params}) => {
  let [users, setUsers] = useState([])
  let [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    setUsers(params)
  })
  return (
    <View>
      <FlatList
        style={{flex: 1}}
        horizontal
        showHorizontal={false}
        refreshing={refreshing}
        pagingEnabled={true}
        data={users}
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.DayDetailRowCardStyle}>
            <Text style={styles.userName}>{item.Personnel.FullName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          return item.id
        }}
        ListFooterComponent={<View style={{paddingRight: 60}} />}
      />
    </View>
  )
}
export {DayDetail}
