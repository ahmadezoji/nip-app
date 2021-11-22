import React, { useEffect, useState, useRef } from 'react'
import {
  useWindowDimensions,
} from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { bounce, linear } from 'react-native/Libraries/Animated/Easing'
import { ChangeScreen } from './change'
import { RequestScreen } from './Request'
import { SurveyScreen } from './Survey'

const MyRequestTab = ({ navigation }) => {
  const layout = useWindowDimensions()
  let [index, setIndex] = React.useState(0)

  let [routes, setRoutes] = React.useState([
    { key: 'first', title: 'خود اظهاری' },
    { key: 'second', title: 'نظرسنجی' },
  ])

  return (
    <TabView
        style={{backgroundColor:'#12c2e9'}}
      lazy={bounce}
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: () => <RequestScreen navigation={navigation} />,
        second: () => <SurveyScreen navigation={navigation} />,
      })}
      onIndexChange={index => setIndex(index)}
      initialLayout={{ width: layout.width }}
      showPageIndicator={true}
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#f64f59',borderRadius:5,margin:10}}/>} // <-- add this line
    />
  )
}

export { MyRequestTab }
