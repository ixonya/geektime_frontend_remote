/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./framework.js":
/*!**********************!*\
  !*** ./framework.js ***!
  \**********************/
/*! namespace exports */
/*! export Component [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => /* binding */ createElement,\n/* harmony export */   \"Component\": () => /* binding */ Component\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction createElement(type, attributes) {\n  var element;\n\n  if (typeof type === \"string\") {\n    element = new ElementWrapper(type);\n  } else {\n    element = new type();\n  }\n\n  for (var name in attributes) {\n    element.setAttribute(name, attributes[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n\n    if (typeof child === \"string\") {\n      child = new TextWrapper(child);\n    }\n\n    element.appendChild(child);\n  }\n\n  return element;\n}\nvar Component = /*#__PURE__*/function () {\n  function Component(type) {\n    _classCallCheck(this, Component);\n  }\n\n  _createClass(Component, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.mountTo(this.root);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Component;\n}();\n\nvar ElementWrapper = /*#__PURE__*/function (_Component) {\n  _inherits(ElementWrapper, _Component);\n\n  var _super = _createSuper(ElementWrapper);\n\n  function ElementWrapper(type) {\n    var _this;\n\n    _classCallCheck(this, ElementWrapper);\n\n    _this.root = document.createElement(type);\n    return _possibleConstructorReturn(_this);\n  }\n\n  return ElementWrapper;\n}(Component);\n\nvar TextWrapper = /*#__PURE__*/function (_Component2) {\n  _inherits(TextWrapper, _Component2);\n\n  var _super2 = _createSuper(TextWrapper);\n\n  function TextWrapper(content) {\n    var _this2;\n\n    _classCallCheck(this, TextWrapper);\n\n    _this2.root = document.createTextNode(content);\n    return _possibleConstructorReturn(_this2);\n  }\n\n  return TextWrapper;\n}(Component);\n\n//# sourceURL=webpack://week8/./framework.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _framework_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework.js */ \"./framework.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar Carousel = /*#__PURE__*/function (_Component) {\n  _inherits(Carousel, _Component);\n\n  var _super = _createSuper(Carousel);\n\n  function Carousel() {\n    var _this;\n\n    _classCallCheck(this, Carousel);\n\n    _this = _super.call(this);\n    _this.attributes = Object.create(null);\n    return _this;\n  }\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.attributes[name] = value;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      this.root = document.createElement(\"div\");\n      this.root.classList.add(\"carousel\");\n\n      var _iterator = _createForOfIteratorHelper(this.attributes.src),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var record = _step.value;\n          var child = document.createElement(\"div\");\n          child.style.backgroundImage = \"url('\".concat(record, \"')\");\n          this.root.appendChild(child);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      var position = 0;\n      this.root.addEventListener(\"mousedown\", function (event) {\n        var children = _this2.root.children;\n        var startX = event.clientX;\n\n        var move = function move(event) {\n          var x = event.clientX - startX;\n          var current = position - Math.round((x - x % 800) / 800);\n\n          for (var _i = 0, _arr = [-1, 0, 1]; _i < _arr.length; _i++) {\n            var offset = _arr[_i];\n            var pos = current + offset;\n            pos = (pos + children.length) % children.length;\n            children[pos].style.transition = \"none\";\n            children[pos].style.transform = \"translateX(\".concat(-pos * 800 + offset * 800 + x % 800, \"px)\");\n          }\n        };\n\n        var up = function up(event) {\n          var x = event.clientX - startX;\n          position = position - Math.round(x / 800);\n\n          for (var _i2 = 0, _arr2 = [0, -Math.sign(Math.round(x / 800) - x + 400 * Math.sign(x))]; _i2 < _arr2.length; _i2++) {\n            var offset = _arr2[_i2];\n            var pos = position + offset;\n            pos = (pos + children.length) % children.length;\n\n            if (offset === 0) {\n              position = pos;\n            }\n\n            children[pos].style.transition = \"\";\n            children[pos].style.transform = \"translateX(\".concat(-pos * 800 + offset * 800, \"px)\");\n          }\n\n          document.removeEventListener(\"mousemove\", move);\n          document.removeEventListener(\"mouseup\", up);\n        };\n\n        document.addEventListener(\"mousemove\", move);\n        document.addEventListener(\"mouseup\", up);\n      });\n      /*let currentIndex = 0;\r\n      setInterval(() => {\r\n          let children = this.root.children;\r\n          let nextIndex = (currentIndex + 1) % children.length;\r\n          let current = children[currentIndex];\r\n          let next = children[nextIndex];\r\n          next.style.transition = \"none\";\r\n          next.style.transform = `translateX(${100 - nextIndex * 100}%)`;\r\n            setTimeout(() => {\r\n              next.style.transition = \"\";\r\n              current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;\r\n              next.style.transform = `translateX(${- nextIndex * 100}%)`;\r\n              currentIndex = nextIndex;\r\n          }, 16);\r\n      }, 3000);*/\n\n      return this.root;\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.render());\n    }\n  }]);\n\n  return Carousel;\n}(_framework_js__WEBPACK_IMPORTED_MODULE_0__.Component);\n\nvar d = [\"https://news.fate-go.jp/wp-content/uploads/2021/re_2020summer_pgtwo/top_banner.png\", \"https://news.fate-go.jp/wp-content/uploads/2020/holy_grail_war_full_rehvk/top_banner.png\", \"https://news.fate-go.jp/wp-content/uploads/2019/fate-15th_cp_xpdai/top_banner.png\", \"https://news.fate-go.jp/wp-content/uploads/2020/5th_anniversary_eklac/top_banner.png\"];\nvar a = (0,_framework_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(Carousel, {\n  src: d\n});\na.mountTo(document.body);\n\n//# sourceURL=webpack://week8/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;