import React, {useEffect, useState, useRef} from 'react'
import {
  useWindowDimensions,
} from 'react-native'
import {SceneMap, TabView} from 'react-native-tab-view'
import { ChangeScreen } from './change'
import { RequestScreen} from './Request'

const MyRequestTab = ({navigation}) => {
  const layout = useWindowDimensions()
  let [index, setIndex] = React.useState(0)

  let [routes, setRoutes] = React.useState([
    {key: 'first', title: 'خود اظهاری'},
    {key: 'second', title: 'جایگزینی'},
  ])

  useEffect(() => {
    return(()=> {})
  })

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={SceneMap({
        first: () => <RequestScreen navigation={navigation} />,
        second: () => <ChangeScreen navigation={navigation} />,
      })}
      onIndexChange={index => setIndex(index)}
      initialLayout={{width: layout.width}}
    />
  )
}

export {MyRequestTab}
