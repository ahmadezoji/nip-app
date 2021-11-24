/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react'
import Main from './src'

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_DETAIL } from './src/components/Consts';
import { getUserInfo } from './src/components/Login';

// import { connect } from 'react-redux';
// import { changeCount } from './src/components/actions/counts';
// import { bindActionCreators } from 'redux';


// class App extends Component {
//   componentDidMount(){

//   }
//   decrementCount() {

//     let { count, actions } = this.props;
//     count.count--;
//     actions.actions.changeCount(count.count);
//   }
//   incrementCount() {
//     let { count, actions } = this.props;
//     count.count++;
//     actions.changeCount(count.count);
//   }
//   render() {
//     const { count } = this.props;
//     return (
//       <View styles={{flex:1,backgroundColor: 'red'}}>
//         <Button
//           title="increment"
//           onPress={() => this.incrementCount()}
//         />
//          <Text>{count.count}</Text>
//         <Button
//           title="decrement"
//           onPress={() => this.decrementCount()}
//         />
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   vv: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

// const mapStateToProps = state => ({
//   count: state.count,
// });

// const ActionCreators = Object.assign(
//   {},
//   changeCount,
// );
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    try {
      console.log('START');
      let json = await AsyncStorage.getItem(USER_DETAIL)
      getUserInfo(JSON.parse(json).user_id, result => {
        // console.log(result);
      })

    } catch (error) {
      // Error saving data
    }
  }
  render() {
    return <Main />
  }
}
