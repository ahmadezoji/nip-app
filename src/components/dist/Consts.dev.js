"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shift_colors = exports.shift_value = exports.shift_type = exports.Colors = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Colors = {
  background: '#0000',
  icons: '#8C0303'
};
exports.Colors = Colors;
var shift_type = {
  0: 'off',
  1: "صبح",
  2: "عصر",
  3: "شب",
  13: "شب تا صیح",
  23: "عصر تا شب"
};
exports.shift_type = shift_type;
var shift_value = {
  '1': "می خواهد ",
  '-1': "نمی خواهد",
  '0': "بدون رای"
};
exports.shift_value = shift_value;
var shift_colors = {
  '0': '#e4f4f1',
  '-1': '#00CD00',
  '1': '#FF0000'
};
exports.shift_colors = shift_colors;