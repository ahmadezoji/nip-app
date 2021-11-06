"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

var _StyleSheet$create;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = _reactNative.StyleSheet.create((_StyleSheet$create = {
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
    width: _reactNative.Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textScreen: {
    color: 'black',
    fontSize: 25
  },
  reviewCardStyle: {
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  },
  requestCardStyle: {
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 300,
    height: 100,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  },
  DayDetailRowCardStyle: {
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  }
}, _defineProperty(_StyleSheet$create, "container", {
  flex: 1,
  backgroundColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
}), _defineProperty(_StyleSheet$create, "loginBox", {
  backgroundColor: 'white',
  flex: 1,
  marginRight: 50,
  marginLeft: 50,
  borderRadius: 5,
  elevation: 2,
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.1,
  paddingBottom: 20
}), _defineProperty(_StyleSheet$create, "loginTitle", _objectSpread({}, Platform.select({
  ios: {
    fontFamily: 'IRANSansMobile',
    fontWeight: 'bold'
  },
  android: {
    fontFamily: 'IRANSansMobile_Bold'
  }
}), {
  margin: 2,
  textAlign: 'center',
  fontSize: 18,
  paddingTop: 10,
  paddingBottom: 10
})), _defineProperty(_StyleSheet$create, "inputGroups", {
  margin: 5,
  marginRight: 20,
  marginLeft: 20
}), _defineProperty(_StyleSheet$create, "labelText", _objectSpread({
  textAlign: 'right',
  marginBottom: 10,
  color: '#5256c9'
}, Platform.select({
  ios: {
    fontFamily: 'IRANSansMobile',
    fontWeight: '500'
  },
  android: {
    fontFamily: 'IRANSansMobile_Medium'
  }
}))), _defineProperty(_StyleSheet$create, "inputText", {
  fontFamily: 'IRANSansMobile',
  textAlign: 'right',
  borderColor: 'rgba(0,0,0,.1)',
  borderWidth: 1,
  padding: 10,
  borderRadius: 2,
  height: 60,
  fontSize: 12
}), _defineProperty(_StyleSheet$create, "loginButton", {
  fontFamily: 'IRANSansMobile',
  marginRight: 25,
  marginLeft: 25,
  backgroundColor: '#426bd7',
  textAlign: 'center',
  padding: 10,
  borderRadius: 20,
  color: 'white',
  marginTop: 15,
  elevation: 2,
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.1,
  overflow: 'hidden'
}), _defineProperty(_StyleSheet$create, "forgetPassword", {
  fontFamily: 'IRANSansMobile',
  textAlign: 'center',
  marginTop: 15
}), _defineProperty(_StyleSheet$create, "draggableList", {
  width: 300
}), _defineProperty(_StyleSheet$create, "infoBox", {
  width: 10
}), _defineProperty(_StyleSheet$create, "acceptbtn", {
  width: 70,
  height: 40,
  margin: 2,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5,
  backgroundColor: '#A01F'
}), _defineProperty(_StyleSheet$create, "btnTxt", {
  color: 'white',
  fontSize: 15,
  textAlign: 'center',
  fontFamily: 'IRANSansMobile'
}), _StyleSheet$create));

exports.styles = styles;