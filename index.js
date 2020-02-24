"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TestForm;

var _react = _interopRequireWildcard(require("react"));

var _reactFormstateFp = require("react-formstate-fp");

var _reactFormstateValidation = require("react-formstate-validation");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Input(_ref) {
  var label = _ref.label,
      value = _ref.value,
      help = _ref.help,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", null, label), _react["default"].createElement("input", {
    type: "text",
    value: value,
    onChange: onChange,
    onBlur: onBlur
  }), _react["default"].createElement("div", null, help));
}

function RffInput(_ref2) {
  var formstate = _ref2.formstate,
      modelKey = _ref2.modelKey,
      form = _ref2.form,
      other = _objectWithoutProperties(_ref2, ["formstate", "modelKey", "form"]);

  return _react["default"].createElement(Input, _extends({
    value: _reactFormstateFp.rff.getValue(formstate, modelKey),
    help: form.calculatePrimed(formstate, modelKey) && _reactFormstateFp.rff.getMessage(formstate, modelKey),
    onChange: function onChange(e) {
      return _reactFormstateFp.rff.handleChange(form, e.target.value, _reactFormstateFp.rff.getId(formstate, modelKey));
    },
    onBlur: function onBlur() {
      return _reactFormstateFp.rff.handleBlur(form, _reactFormstateFp.rff.getId(formstate, modelKey));
    }
  }, other));
}

function TestForm(_ref3) {
  var model = _ref3.model,
      grabFormstate = _ref3.grabFormstate,
      grabForm = _ref3.grabForm;

  var _useState = (0, _react.useState)(function () {
    return _reactFormstateFp.rff.initializeFormstate(model);
  }),
      _useState2 = _slicedToArray(_useState, 2),
      formstate = _useState2[0],
      setFormstate = _useState2[1];

  var form = {
    setFormstate: setFormstate,
    adaptors: [RffInput],
    calculatePrimed: _reactFormstateFp.rff.primeOnChange
  };
  grabFormstate(formstate);
  grabForm(form);
  return _react["default"].createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleSubmit(e, form);
    }
  }, _react["default"].createElement(_reactFormstateFp.FormScope, {
    formstate: formstate,
    form: form
  }, _react["default"].createElement(_reactFormstateFp.FormField, {
    name: "test",
    required: true,
    validate: validateTest
  }, _react["default"].createElement(RffInput, {
    label: "Test"
  }))), _react["default"].createElement("input", {
    type: "submit",
    value: "Submit",
    disabled: _reactFormstateFp.rff.isPrimedModelInvalid(formstate, form.calculatePrimed)
  }));
}

function validateTest(value) {
  if (value.length < 8) {
    return 'Test must be at least 8 characters.';
  }
}

function handleSubmit(e, form) {
  e.preventDefault();
  form.setFormstate(function (fs) {
    fs = _reactFormstateFp.rff.validateForm(fs, form);

    if (_reactFormstateFp.rff.isModelValid(fs)) {
      alert(JSON.stringify(fs.model));
    }

    return fs;
  });
}
