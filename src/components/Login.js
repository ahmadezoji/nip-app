import React from 'react'
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {
  Container,
  Header,
  View,
  Text,
  Left,
  Button,
  Right,
  Content,
  Form,
  Item,
  Icon,
  Input,
  Spinner,
} from 'native-base'

export default class Login extends React.Component {
  constructor () {
    super()
    this._isMounted = false
    this.state = {
      phone: '',
      pass: '',
      sendMsg: false,
      token:''
    }
  }
  componentDidMount () {
    this._isMounted = true
    this.setState({
      phone: '',
    })
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  render () {
    if (this.state.sendMsg) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItem: 'center',
            backgroundColor: 'black',
          }}>
          <StatusBar
            translucent
            backgroundColor='transparent'
            barStyle='dark-content'
          />
          <Spinner color='white' />
        </View>
      )
    }
    return (
      <Container>
        <StatusBar
          translucent
          backgroundColor='transparent'
          barStyle='dark-content'
        />
        <View style={styles.container}>
          <View style={styles.loginBox}>
            <Text style={styles.loginTitle}>ورود</Text>
            <View style={styles.inputGroups}>
              <Text style={styles.labelText}>شماره همراه :‌ </Text>
              <TextInput
                style={styles.inputText}
                value={this.state.phone}
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                onChangeText={this.changePhoneInput.bind(this)}
                placeholder='لطفا نام کاربری خود را وارد کنید'
              />
            </View>
            <View style={styles.inputGroups}>
              <Text style={styles.labelText}>پسورد :‌ </Text>
              <TextInput
                style={styles.inputText}
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                onChangeText={this.changePassInput.bind(this)}
                placeholder='لطفا پسورد خود را وارد کنید'
              />
            </View>
            <TouchableOpacity onPress={this.login.bind(this)}>
              <Text style={styles.loginButton}>ورود به اپلیکیشن</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgetPassword}>فراموشی رمز عبور</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    )
  }
  login () {
    this._isMounted &&
      this.requrestLoginFromApi({
        phone: this.state.phone,
        pass: this.state.pass,
      })
  }
  changePassInput (text) {
    this.setState({
      pass: text,
    })
  }
  changePhoneInput (text) {
    this.setState({
      phone: text,
    })
  }
  async requrestLoginFromApi (parrams) {
    let {phone, pass} = params

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: phone,
        password: pass,
      }),
    }

    fetch('http://10.2.9.132:81/api/account/login', requestOptions)
      .then(response => response.json())
      .then(result =>{
          console.log(result);
        this.setState({token:result.token})
        this.loginWithPass()
      })
      .catch(error => {
        alert('user or pass not valid')
      })
  }
  loginWithPass() {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json','Authorization':this.state.token},
      }
      console.log(this.state.token);
      fetch('http://10.2.9.132:81/api/account/profile', requestOptions)
        .then(response => response.json())
        .then(result =>{
          console.log(result);
        })
        .catch(error => {
          alert('user or pass not valid')
        })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f4f1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginBox: {
    backgroundColor: 'white',
    flex: 1,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 5,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    paddingBottom: 20,
  },
  loginTitle: {
    ...Platform.select({
      ios: {
        fontFamily: 'IRANSansMobile',
        fontWeight: 'bold',
      },
      android: {
        fontFamily: 'IRANSansMobile_Bold',
      },
    }),
    margin: 2,
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputGroups: {
    margin: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  labelText: {
    textAlign: 'right',
    marginBottom: 10,
    color: '#5256c9',
    ...Platform.select({
      ios: {
        fontFamily: 'IRANSansMobile',
        fontWeight: '500',
      },
      android: {
        fontFamily: 'IRANSansMobile_Medium',
      },
    }),
  },
  inputText: {
    fontFamily: 'IRANSansMobile',
    textAlign: 'right',
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 60,
    fontSize: 12,
  },
  loginButton: {
    fontFamily: 'IRANSansMobile',
    marginRight: 25,
    marginLeft: 25,
    backgroundColor: '#00ff23',
    textAlign: 'center',
    padding: 10,
    borderRadius: 20,
    color: '#042e62',
    marginTop: 15,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    overflow: 'hidden',
  },
  forgetPassword: {
    fontFamily: 'IRANSansMobile',
    textAlign: 'center',
    fontSize:12,
    marginTop: 15,
  },
})
