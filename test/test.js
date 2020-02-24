"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _index = _interopRequireDefault(require("../index.js"));

var _assert = _interopRequireDefault(require("assert"));

var _reactFormstateFp = require("react-formstate-fp");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formstate, form;

var html = _server["default"].renderToString(_react["default"].createElement("html", {
  lang: "en"
}, _react["default"].createElement("head", null, _react["default"].createElement("meta", {
  charSet: "utf-8"
}), _react["default"].createElement("title", null, "CI Test")), _react["default"].createElement("body", null, _react["default"].createElement(_index["default"], {
  model: {
    test: 'hello world!'
  },
  grabFormstate: function grabFormstate(fs) {
    return formstate = fs;
  },
  grabForm: function grabForm(fm) {
    return form = fm;
  }
}))));

describe('App', function () {
  it('injects the model data', function () {
    _assert["default"].equal('hello world!', _reactFormstateFp.rff.getValue(formstate, 'test'));
  });
  it('validates onChange', function () {
    _assert["default"].equal(false, _reactFormstateFp.rff.isValidated(formstate, 'test'));

    form.setFormstate = function (f) {
      formstate = f(formstate);
    };

    _reactFormstateFp.rff.handleChange(form, 'a', _reactFormstateFp.rff.getId(formstate, 'test'));

    _assert["default"].equal('a', _reactFormstateFp.rff.getValue(formstate, 'test'));

    _assert["default"].equal(true, _reactFormstateFp.rff.isValidated(formstate, 'test'));

    _assert["default"].equal(true, _reactFormstateFp.rff.isInvalid(formstate, 'test'));

    _assert["default"].equal('Test must be at least 8 characters.', _reactFormstateFp.rff.getMessage(formstate, 'test'));
  });
});
