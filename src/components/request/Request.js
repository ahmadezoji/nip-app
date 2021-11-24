import { CommonActions } from '@react-navigation/native'
import React, { useState, useRef, useEffect } from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { styles } from '../../assets/MyStyles'
import { shift_colors } from '../Colors'
import { Icon, Spinner } from 'native-base'
import Popover from 'react-native-popover-view'
import { shift_type, shift_value, USER_DETAIL } from '../Consts'
import Toast from 'react-native-simple-toast'
import LinearGradient from 'react-native-linear-gradient'
import { PersonnelIcon } from '../user/Profile'
import AsyncStorage from '@react-native-community/async-storage'

const BtnColorStatus = {
  0: '#e4f4f1',
  1: '#00CD00',
  2: '#FF0000',
}
const ShiftDetail_popoup = params => {
  let [yw_id, setYwId] = useState('2022')
  let [shiftType, setShiftType] = useState(params.selectedShiftType)
  let [selectedDay, setSelectedDay] = useState(params.selectedDay)
  let [worksection, setWorksection] = useState(params.selectedWorkSection)
  let [dayDetail, setDayDetaile] = useState([])
  let [refreshing, setRefreshing] = useState(false)

  const _onRefresh = async () => {
    // setRefreshing(true)
    try {
      let response = await fetch(
        `http://10.2.9.132:81/api/self-declaration-get-day-details/?worksection_id=${worksection}&yw_id=${yw_id}&day=${selectedDay}&shift_type=2`,
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
        width: 300,
        height: 250,
        borderRadius: 20,
        backgroundColor: '#e4f4f1',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <FlatList
        style={{ margin: 5 }}
        virtical
        showsVerticalScrollIndicator={false}
        // onRefresh={() => _onRefresh()}
        refreshing={refreshing}
        pagingEnabled={true}
        data={dayDetail}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              backgroundColor: 'trasparent',
              margin: 2,
              width: 250,
              height: 70,
              borderRadius: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <PersonnelIcon
              personnel={item.Personnel}
              onRequestClose={() => params}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 2,
              }}>
              {/* <Text style={{color: 'black'}}>
                {shift_value[String(item.Value)]}
              </Text> */}
              <Icon
                name={shift_value == '1' ? 'close' : 'check'}
                type='AntDesign'
                color={shift_value == '1' ? 'red' : 'green'}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => {
          return item.id
        }}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  )
}
const RequestScreen = ({ navigation }) => {
  let [dayList, setDayList] = useState([])
  let [dayReq, setDayReq] = useState([])
  let [personnel, setPersonnel] = useState({})
  let [refreshing, setRefreshing] = useState(false)
  let [popupVisible, setPopupVisible] = useState(false)
  let [load, setLoad] = useState(false)
  let [changeListStatus, setChangeListStatus] = useState(false)
  let refPopup = useRef(null)
  const _onRefresh = async () => {
    try {
      setRefreshing(false)

      let json = await AsyncStorage.getItem(USER_DETAIL)
      setPersonnel(JSON.parse(json))

      let responseRequsted = await fetch(
        `http://10.2.9.132:81/api/self-declaration-get/?personnel_id=${JSON.parse(json).p_id}&yw_id=${JSON.parse(json).ywp_id}`,
      )
      let resultRequested = await responseRequsted.json()
      setDayReq(resultRequested.results)

      let response = await fetch(
        `http://10.2.9.132:81/api/self-declaration-initial/?personnel_id=${JSON.parse(json).p_id}`,
      )

      let result = await response.json()
      setDayList(result.results)

      setLoad(true)

      setRefreshing(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !refreshing && _onRefresh()
    // return () => setRefreshing(true)
  },[])
  const save = () => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    console.log(dayReq)
    let raw = JSON.stringify(dayReq)

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('http://10.2.9.132:81/api/self-declaration-post/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))

  }
  //{backgroundColor:shift_colors[item.Title]}
  if (!load) {
    return (
      <LinearGradient
        colors={['#12c2e9', '#c471ed', '#f64f59']}
        style={styles.linearGradient}>
        <Spinner color='black' />
      </LinearGradient>
    )
  }
  return (
    <LinearGradient
      colors={['#12c2e9', '#c471ed', '#f64f59']}
      style={styles.linearGradient}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <FlatList
        style={{ flex: 1, width: '100%', height: '88%' }}
        virtical
        showsVerticalScrollIndicator={false}
        // onRefresh={() => _onRefresh()}
        // refreshing={refreshing}
        pagingEnabled={true}
        data={dayList}
        renderItem={({ item, index }) => (
          <RenderRequestDay
            index={index}
            item={item}
            navigation={navigation}
            personnel={personnel}
            dayReq={dayReq}
            onChnage={value => {
              setChangeListStatus(true)
              setDayReq(value)
            }}
          />
        )}
        keyExtractor={(item, index) => {
          return item.id
        }}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-around',
          height: '10%',
          margin: 3,
        }}>
        <TouchableOpacity style={styles.acceptbtn} onPress={() => save()}>
          <Text style={styles.btnTxt}>ثبت</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptbtn}>
          <Text style={styles.btnTxt}>لغو</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const RenderRequestDay = params => {
  let [chooseM, setChooseM] = useState(0)
  let [chooseA, setChooseA] = useState(0)
  let [chooseN, setChooseN] = useState(0)

  const shiftToIndexColor = value => {
    if (value == 0) return -1
    else if (value == 1) return 1
    else if (value == 2) return 0
  }
  const shift_selector = value => {
    if (value == -1) return 1
    else if (value == 1) return 2
    else return 0
  }
  useEffect(() => {
    Object.keys(params.dayReq).forEach(key => {
      if (params.dayReq[key].Day == params.item.Day) {
        if (params.dayReq[key].ShiftTypeCode == 1)
          setChooseM(shift_selector(params.dayReq[key].Value))
        else if (params.dayReq[key].ShiftTypeCode == 2)
          setChooseA(shift_selector(params.dayReq[key].Value))
        else if (params.dayReq[key].ShiftTypeCode == 3)
          setChooseN(shift_selector(params.dayReq[key].Value))
      }
    })
  }, [])
  const [showPopoverM, setShowPopoverM] = useState(false)
  const [showPopoverA, setShowPopoverA] = useState(false)
  const [showPopoverN, setShowPopoverN] = useState(false)

  const onRefreshRequestList = async json => {
    try {
      const aaray = [...params.dayReq, json]
      params.onChnage(aaray)
    } catch (e) {
    } finally {
    }
  }

  return (
    <View
      style={{
        flex: 1,
        width: '90%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: params.item.SpecialDay == 1 ? 'red' : '#dbac9d',
        margin: 10,
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: params.item.SpecialDay == 1 ? 'red' : 'black',
            fontFamily: 'IRANSansMobile',
          }}>
          {params.item.PersianWeekDayTitle}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: params.item.SpecialDay == 1 ? 'red' : 'black',
            textAlign:'center',
            maxWidth:40,
            fontFamily: 'IRANSansMobile',
          }}>
          {params.item.PersianDate}
        </Text>
      </View>

      <Popover
        popoverStyle={{ borderRadius: 20 }}
        isVisible={showPopoverM}
        onRequestClose={() => setShowPopoverM(false)}
        from={
          <TouchableOpacity
            onLongPress={() => setShowPopoverM(true)}
            onPress={() => {
              setChooseM(chooseM < 2 ? chooseM + 1 : 0)
              onRefreshRequestList({
                Personnel: params.personnel.p_id,
                YearWorkingPeriod: params.personnel.ywp_id,
                Day: params.item.Day,
                ShiftTypeCode: 1,
                Value: shiftToIndexColor(chooseM),
              })
            }}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              backgroundColor: BtnColorStatus[chooseM],
              width: 50,
              height: 50,
              margin: 5,
            }}></TouchableOpacity>
        }>
        <ShiftDetail_popoup
          onRequestClose={status => setShowPopoverM(status)}
          navigation={params.navigation}
          selectedDay={`${params.index + 1}`}
          selectedWorkSection={'45234'}
          selectedShiftType={1}
        />
      </Popover>
      <Popover
        isVisible={showPopoverA}
        onRequestClose={() => setShowPopoverA(false)}
        from={
          <TouchableOpacity
            onLongPress={() => setShowPopoverA(true)}
            onPress={() => {
              setChooseA(chooseA < 2 ? chooseA + 1 : 0)
              onRefreshRequestList({
                Personnel: params.personnel.p_id,
                YearWorkingPeriod: params.personnel.ywp_id,
                Day: params.item.Day,
                ShiftTypeCode: 2,
                Value: shiftToIndexColor(chooseA),
              })
            }}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              backgroundColor: BtnColorStatus[chooseA],
              width: 50,
              height: 50,
              margin: 5,
            }}></TouchableOpacity>
        }>
        <ShiftDetail_popoup
          onRequestClose={status => setShowPopoverA(status)}
          navigation={params.navigation}
          selectedDay={`${params.index + 1}`}
          selectedWorkSection={'45234'}
          selectedShiftType={2}
        />
      </Popover>

      <Popover
        isVisible={showPopoverN}
        onRequestClose={() => setShowPopoverN(false)}
        from={
          <TouchableOpacity
            onLongPress={() => setShowPopoverN(true)}
            onPress={() => {
              setChooseN(chooseN < 2 ? chooseN + 1 : 0)
              onRefreshRequestList({
                Personnel: params.personnel.p_id,
                YearWorkingPeriod: params.personnel.ywp_id,
                Day: params.item.Day,
                ShiftTypeCode: 3,
                Value: shiftToIndexColor(chooseN),
              })
            }}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              backgroundColor: BtnColorStatus[chooseN],
              width: 50,
              height: 50,
              margin: 5,
            }}></TouchableOpacity>
        }>
        <ShiftDetail_popoup
          onRequestClose={status => setShowPopoverN(status)}
          navigation={params.navigation}
          selectedDay={`${params.index + 1}`}
          selectedWorkSection={'45234'}
          selectedShiftType={3}
        />
      </Popover>
    </View>
  )
}
export { RequestScreen }
