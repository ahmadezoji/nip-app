import {CommonActions} from '@react-navigation/native'
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
import DraggableFlatList from 'react-native-draggable-flatlist'
import LinearGradient from 'react-native-linear-gradient'
import {NavigationEvents} from 'react-navigation'
import {styles} from '../../assets/MyStyles'
import {shift_colors} from '../Colors'

const ChangeScreen = ({navigation}) => {
  let [data, setData] = useState([
    {
      item:'ahmad',
    },
    {
      item:'abbas'
    },
    {
      item:'ahmad',
    },
    {
      item:'abbas'
    },
    {
      item:'ahmad',
    },
    {
      item:'abbas'
    }
  ])
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
  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity style={{
        backgroundColor: 'white',
        marginTop: 10,
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: isActive ? 'red' : 'white',
      }} onLongPress={drag} >
        <Text style={{color:'red'}}>{index}</Text>
      </TouchableOpacity>

    );
  }
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
      <DraggableFlatList
        style={styles.draggableList}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({data}) => setData(data)}
      />
    </LinearGradient>
  )
}

export {ChangeScreen}
