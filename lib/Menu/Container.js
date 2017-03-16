'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ThemedComponent2 = require('../utils/theming/ThemedComponent');

var _ThemedComponent3 = _interopRequireDefault(_ThemedComponent2);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _View = require('../core/View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrowPositions = {
  'bottom': 'top',
  'bottom_left': 'top_right',
  'bottom_right': 'top_left',
  'left': 'right',
  'right': 'left',
  'top': 'bottom',
  'top_left': 'bottom_right',
  'top_right': 'bottom_left'
};

var Container = function (_ThemedComponent) {
  (0, _inherits3.default)(Container, _ThemedComponent);

  function Container(props, context) {
    (0, _classCallCheck3.default)(this, Container);
    return (0, _possibleConstructorReturn3.default)(this, _ThemedComponent.call(this, props, context, {
      namespace: 'Menu',
      styles: _styles2.default
    }));
  }

  Container.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        animate = _props.animate,
        arrow = _props.arrow,
        children = _props.children,
        dir = _props.dir,
        fixedWidth = _props.fixedWidth,
        maxHeight = _props.maxHeight,
        position = _props.position,
        size = _props.size;


    var style = {};
    var hasMaxHeight = typeof maxHeight !== 'undefined';

    if (hasMaxHeight) {
      style.maxHeight = typeof maxHeight === 'number' ? maxHeight + 'px' : maxHeight;
    }

    var theme = this.theme;


    return _react2.default.createElement(
      _View2.default,
      {
        className: (0, _classnames2.default)(theme.menu, theme['size_' + size], theme['position_' + position], theme[dir], (_classNames = {}, _classNames[theme.animate] = animate, _classNames[theme.fixed_width] = fixedWidth, _classNames[theme.arrow] = arrow, _classNames[theme['arrow_' + arrowPositions[position]]] = arrow, _classNames[theme.scrollable] = hasMaxHeight, _classNames)),
        role: 'menu',
        style: style
      },
      children
    );
  };

  return Container;
}(_ThemedComponent3.default);

Container.propTypes = {
  animate: _react.PropTypes.bool,
  arrow: _react.PropTypes.bool,
  dir: _react.PropTypes.oneOf(['ltr', 'rtl']),
  fixedWidth: _react.PropTypes.bool,
  children: _react.PropTypes.node.isRequired,
  maxHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  position: _react.PropTypes.oneOf(['bottom', 'bottom_left', 'bottom_right', 'bottom_stretch', 'left', 'right', 'top', 'top_left', 'top_right', 'top_stretch']),
  size: _react.PropTypes.oneOf(['small', 'large'])
};
Container.defaultProps = {
  animate: false,
  arrow: false,
  dir: 'ltr',
  position: 'bottom_right',
  size: 'small'
};
exports.default = Container;