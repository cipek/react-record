"use strict";

exports.__esModule = true;
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MicrophoneRecorder = require("../libs/MicrophoneRecorder");

var _MicrophoneRecorder2 = _interopRequireDefault(_MicrophoneRecorder);

var _AudioPlayer = require("../libs/AudioPlayer");

var _AudioPlayer2 = _interopRequireDefault(_AudioPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

var ReactRecord = function (_Component) {
  _inherits(ReactRecord, _Component);

  function ReactRecord(props) {
    _classCallCheck(this, ReactRecord);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      microphoneRecorder: null
    };
    return _this;
  }

  ReactRecord.prototype.componentDidMount = function componentDidMount() {
    console.log("IN componentDidMount", _props.interval); 
    if (!_AudioPlayer2.default) return;
    var _props = this.props,
        onSave = _props.onSave,
        onStop = _props.onStop,
        onStart = _props.onStart,
        onData = _props.onData,
        audioElem = _props.audioElem,
        audioBitsPerSecond = _props.audioBitsPerSecond,
        mimeType = _props.mimeType,
        interval = _props.interval;

    var options = {
      audioBitsPerSecond: audioBitsPerSecond,
      mimeType: mimeType
    };

    if (audioElem) {
      _AudioPlayer2.default.create(audioElem);
    } else {
      this.setState({
        microphoneRecorder: new _MicrophoneRecorder2.default(onStart, onStop, onSave, onData, options, interval)
      });
    }
  };

  ReactRecord.prototype.render = function render() {
    var _props2 = this.props,
        record = _props2.record,
        onStop = _props2.onStop,
        children = _props2.children;
    var microphoneRecorder = this.state.microphoneRecorder;


    if (microphoneRecorder) {
      if (record) {
        microphoneRecorder.startRecording();
      } else {
        microphoneRecorder.stopRecording(onStop);
      }
    }

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      children
    );
  };

  return ReactRecord;
}(_react.Component);

exports.default = ReactRecord;


ReactRecord.defaultProps = {
  className: "record",
  audioBitsPerSecond: 128000,
  mimeType: "audio/webm;codecs=opus",
  record: false
};
module.exports = exports["default"];
