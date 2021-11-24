import { CommonActions } from '@react-navigation/native'
import { Icon, Picker, Spinner } from 'native-base'
import React, { useState, useEffect, useRef } from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native'
import InputSpinner from "react-native-input-spinner";
import DraggableFlatList from 'react-native-draggable-flatlist'
import { value } from 'react-native-extended-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationEvents } from 'react-navigation'
import { styles } from '../../assets/MyStyles'
import { shift_colors } from '../Colors'
import { shift_title, USER_DETAIL } from '../Consts';
import AsyncStorage from '@react-native-community/async-storage';

const SurveyScreen = ({ navigation }) => {
  let [data, setData] = useState(null)
  let [workSection, setWorkSection] = useState(0)
  let [period, setPeriod] = useState('140005')
  let [personnel, setPersonnel] = useState({})
  let [refreshing, setRefreshing] = useState(false)
  let [dropdownList, setDropdownlList] = useState([])
  let [selectedRate, setSelectedRate] = useState();
  let [selectedPoint, setSelectedPoint] = useState(1)
  let [selectedStatus, setSelectedStatus] = useState(0)
  useEffect(() => {
    !refreshing && _onRefresh()
    loadlist();
  }, [selectedRate])

  useEffect(() => {
    setChange()
  }, [selectedPoint, selectedStatus])

  const _onRefresh = async () => {
    try {

      setRefreshing(false)
      let json = await AsyncStorage.getItem(USER_DETAIL)
      setPersonnel(JSON.parse(json))

      let response1 = await fetch(
        `http://10.2.9.132:81/api/shifts-assignment/?p_id=${JSON.parse(json).p_id}&yw_id=2027`,
      )
      let result1 = await response1.json()
      setDropdownlList(result1.results);
      setSelectedRate(result1.results[0].id)

      console.log(result1.results[0].id);


      setRefreshing(true)
    } catch (error) {
      console.log(error)
    }
  }

  const loadlist = async () => {
    try {
      setData(null)
      let response = await fetch(
        `http://10.2.9.132:81/api/shifts-assignment-details/?shiftassignment=${selectedRate}&personnel=${personnel.p_id}`,
      )
      let result = await response.json()


      result.results.map((value => {
        console.log(value.DayNo, value.Shift);
      }))
      setData(result.results)
    } catch (error) {
      console.log(error)
    }
  }
  const setChange = async () => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    let raw = JSON.stringify(
      {
        "Personnel": personnel.id,
        "ShiftAssignment": selectedRate,
        "Liked": selectedStatus == true ? 1 : 0,
        "Rank": 1,
        "Point": selectedPoint
      }
    )

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('http://10.2.9.132:81/api/personnel-shiftAssignment-points-post/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#12c2e9', '#c471ed', '#f64f59']}
        style={styles.survaylinearGradient}>
        <StatusBar
          translucent
          backgroundColor='transparent'
          barStyle='dark-content'
        />
        <Picker
          style={{
            width: 200
          }}
          iosHeader="Branch"
          Header="Branch"
          mode="dropdown"
          textStyle={{ color: 'grey', textAlign: 'center' }}
          placeholder='Select Rank'
          headerBackButtonText='Geri'
          headerBackButtonTextStyle={{ color: 'red' }}
          selectedValue={selectedRate}
          onValueChange={(value) => setSelectedRate(value)}
        >
          {dropdownList.map((branches, i) => {
            return (
              <Picker.Item label={`رتبه ${String(branches.Rank)}`} value={branches.id} key={i} />
            );
          }
          )}
        </Picker>
        {data == null ? <Spinner color="red" /> :
          <FlatList
            virtical
            showsVerticalScrollIndicator={false}
            numColumns={3}
            pagingEnabled={true}
            data={data}
            renderItem={({ item, index }) => item.Shift !== null && (
              <TouchableOpacity
                style={[
                  styles.surveyCardStyle,
                  { opacity: item.Shift.Title === 'off' ? 0.5 : 1 },
                ]}>
                <Text style={{ color: 'color', fontFamily: 'IRANSansMobile' }}>
                  {item.PersianWeekDayTitle}
                </Text>
                <Text style={{ color: 'color', fontFamily: 'IRANSansMobile', fontSize: 10 }}>
                  {item.PersianDate}
                </Text>
                <Text style={{ color: 'color', fontFamily: 'IRANSansMobile' }}>
                  {shift_title[item.Shift.Title]}
                </Text>

              </TouchableOpacity>
            )
            }
            keyExtractor={(item, index) => {
              return item.id
            }}
            ListFooterComponent={< View style={{ height: 50 }} />}
          />}
        < Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> آیا با این لیست موافق هستید ؟</Text >
        <View style={{ width: 150, flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
          <TouchableOpacity style={screenStyle.btnText} onPress={() => setChange()}>
            <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontWeight: 'normal' }}>خیر</Text>
          </TouchableOpacity>
          <TouchableOpacity style={screenStyle.btnText} onPress={() => setChange()}>
            <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontWeight: 'normal' }}>بلی</Text>
          </TouchableOpacity>

        </View>
        < Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> چه امتیازی میدهید ؟</Text >
        <View style={{ justifyContent: 'center', margin: 5 }}>
          <InputSpinner
            skin={'round'}
            max={10}
            min={0}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            value={1}
            onChange={(num) => {
              setChange()
            }}
          />
        </View>

      </LinearGradient >
    </ScrollView>
  )
}

const screenStyle = StyleSheet.create({
  btnText: {
    backgroundColor:
      'white',
    borderRadius: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    margin: 2
  }
})

export { SurveyScreen }

