/******/ (function(components) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		components[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the components object (__webpack_modules__)
/******/ 	__webpack_require__.m = components;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _applicationController = __webpack_require__(1);

	var _applicationController2 = _interopRequireDefault(_applicationController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	// import todoFilterWidget from 'components/todo-filter';
	// import todoCreationFormWidget from 'components/todo-creation-form';
	//
	// todoFilterWidget(ApplicationController);
	// todoCreationFormWidget(ApplicationController);
	//
	// ApplicationController.startAll();
	//

	_applicationController2.default.dom.findAll(); /**
	                                                * Created by ridel1e on 12/10/2016.
	                                                */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(2);

	var _core2 = _interopRequireDefault(_core);

	var _dom = __webpack_require__(4);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by ridel1e on 13/10/2016.
	 */

	_core2.default.extend('dom', _dom2.default);

	exports.default = _core2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _sandbox = __webpack_require__(3);

	var _sandbox2 = _interopRequireDefault(_sandbox);

	var _invalidArgumentError = __webpack_require__(15);

	var _invalidArgumentError2 = _interopRequireDefault(_invalidArgumentError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by ridel1e on 13/10/2016.
	 */

	var core = function () {

	  var moduleData = {};

	  return {
	    extend: extend,
	    register: register,
	    start: start,
	    startAll: startAll,
	    stop: stop,
	    stopAll: stopAll
	  };

	  /**
	   * Register module in app
	   * @param moduleName
	   * @param creator
	   */
	  function register(moduleName, creator) {
	    if (typeof moduleName === 'string' && creator instanceof Function) {
	      moduleData[moduleName] = {
	        creator: creator,
	        instance: null
	      };
	    } else {
	      throw new _invalidArgumentError2.default('register', 'first argument must be a "string", ' + 'second argument must be a "function"');
	    }
	  }

	  /**
	   * Start concrete module
	   * @param moduleName
	   */
	  function start(moduleName) {

	    if (typeof moduleName !== 'string') {
	      throw new _invalidArgumentError2.default('start', 'argument must be a "string"');
	    }

	    moduleData[moduleName].instance = moduleData[moduleName].creator(new _sandbox2.default(this, moduleName));

	    var instance = moduleData[moduleName].instance;

	    if (instance.init instanceof Function && instance.destroy instanceof Function) {
	      instance.init();
	    } else {
	      throw new Error('start(): module doesn\'t have "init" or "destroy" function ');
	    }
	  }

	  /**
	   * Stop concrete module
	   * @param moduleName
	   */
	  function stop(moduleName) {

	    if (typeof moduleName !== 'string') {
	      throw new _invalidArgumentError2.default('stop', 'argument must be a "string"');
	    }

	    var module = moduleData[moduleName];

	    if (module.instance instanceof Object) {
	      if (module.instance.destroy instanceof Function) {
	        moduleData[moduleName].instance.destroy();
	        moduleData[moduleName].instance = null;
	      } else {
	        throw new Error('stop(): module does\'t have "destroy method"');
	      }
	    } else {
	      throw new Error('stop(): module should be started');
	    }
	  }

	  /**
	   * Extend application controller
	   * @param extensionName
	   * @param extensionObject
	   */
	  function extend(extensionName, extensionObject) {
	    if (typeof extensionName === 'string' && extensionObject instanceof Object) {
	      this[extensionName] = extensionObject;
	    } else {
	      throw new _invalidArgumentError2.default('extend', 'first argument must be a "string", ' + 'second argument must be an "Object"');
	    }
	  }

	  function startAll() {
	    var _this = this;

	    Object.keys(moduleData).forEach(function (moduleName) {
	      return _this.start(moduleName);
	    });
	  }

	  function stopAll() {
	    var _this2 = this;

	    Object.keys(moduleData).forEach(function (moduleName) {
	      return _this2.stop(moduleName);
	    });
	  }
	}();

		exports.default = core;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by ridel1e on 13/10/2016.
	 */

	var Sandbox = function () {
	  function Sandbox(applicationController, moduleSelector) {
	    _classCallCheck(this, Sandbox);

	    this.applicationController = applicationController;
	    this.container = applicationController.dom.findOne("#" + moduleSelector);
	  }

	  _createClass(Sandbox, [{
	    key: "findOne",
	    value: function findOne(selector) {
	      return this.container.findOne(selector);
	    }
	  }, {
	    key: "initializeTemplate",
	    value: function initializeTemplate(html) {
	      this.container.html(html);
	    }
	  }]);

	  return Sandbox;
	}();

		exports.default = Sandbox;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _domManipulator = __webpack_require__(5);

	var _domManipulator2 = _interopRequireDefault(_domManipulator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dom = function () {
	  return {
	    findAll: findAll,
	    findOne: findOne
	  };

	  /**
	   * Returns all relevanting elements for this selector
	   * @param selector
	   * @returns {*}
	   */
	  function findAll(selector) {
	    return _domManipulator2.default.findAll(selector);
	  }

	  /**
	   * Returns one relevanting element for this selector
	   * @param selector
	   * @returns {*}
	   */
	  function findOne(selector) {
	    return _domManipulator2.default.findOne(selector);
	  }
	}(); /**
	      * Created by ridel1e on 13/10/2016.
	      */

		exports.default = dom;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _domElement = __webpack_require__(6);

	var _domElement2 = _interopRequireDefault(_domElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DomManipulator = function () {

	  var documentElement = new _domElement2.default(document);

	  return {
	    findAll: findAll,
	    findOne: findOne
	  };

	  /**
	   * create new dom element
	   * @param element
	   * @returns {DomElementDecorator}
	   */
	  function create(element) {
	    return new _domElement2.default(element);
	  }

	  /**
	   * Кeturns one relevanting element for this selector
	   * @param selector
	   * @returns {DomElementDecorator}
	   */
	  function findOne(selector) {
	    return documentElement.findOne(selector);
	  }

	  /**
	   * Returns all relevanting elements for this selector
	   * @param selector
	   * @returns {Array}
	   */
	  function findAll(selector) {
	    return documentElement.findAll(selector);
	  }
	}(); /**
	      * Created by ridel1e on 13/10/2016.
	      */

		exports.default = DomManipulator;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ridel1e on 13/10/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _invalidArgumentError = __webpack_require__(15);

	var _invalidArgumentError2 = _interopRequireDefault(_invalidArgumentError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DomElementDecorator = function () {

	  /**
	   * class constructor
	   * @param element
	   */
	  function DomElementDecorator(element) {
	    _classCallCheck(this, DomElementDecorator);

	    if (element instanceof HTMLElement || element instanceof HTMLDocument) {
	      this._element = element;
	    } else {
	      throw new _invalidArgumentError2.default('constructor', 'argument must be a "HTMLElement" or a "HTMLDocument"');
	    }
	  }

	  // css class manipulations

	  /**
	   * Check element
	   * @param className
	   * @returns {boolean}
	   */


	  _createClass(DomElementDecorator, [{
	    key: 'hasClass',
	    value: function hasClass(className) {
	      if (typeof className === 'string') {
	        return this._element.className.indexOf(className) !== -1;
	      } else {
	        throw new _invalidArgumentError2.default('hasClass', 'argument must be a "string"');
	      }
	    }

	    /**
	     * Add css class to element
	     * @param className
	     */

	  }, {
	    key: 'addClass',
	    value: function addClass(className) {
	      if (typeof className === 'string') {
	        this._element.className += ' ' + className;
	      } else {
	        throw new _invalidArgumentError2.default('addClass', 'argument must be a "string"');
	      }
	    }

	    /**
	     * Remove css class from element
	     * @param className
	     */

	  }, {
	    key: 'removeClass',
	    value: function removeClass(className) {
	      if (typeof className === 'string') {
	        this._element.className = this._element.className.replace(' ' + className, '');
	      } else {
	        throw new _invalidArgumentError2.default('removeClass', 'argument must be a "string"');
	      }
	    }

	    // events

	    /**
	     * add click event handler to element
	     * @param callback
	     */

	  }, {
	    key: 'click',
	    value: function click(callback) {
	      if (callback instanceof Function) {
	        this.on('click', callback);
	      } else {
	        throw new _invalidArgumentError2.default('click', 'argument must be a "function"');
	      }
	    }

	    /**
	     * add mouseenter and mouseleave event handlers to element
	     * @param mouseEnterCallback
	     * @param mouseLeaveCallback
	     */

	  }, {
	    key: 'hover',
	    value: function hover(mouseEnterCallback, mouseLeaveCallback) {
	      if (mouseEnterCallback instanceof Function && mouseLeaveCallback instanceof Function) {
	        this.on('mouseenter', mouseEnterCallback);
	        this.on('mouseleave', mouseLeaveCallback);
	      } else {
	        throw new _invalidArgumentError2.default('hover', 'first and second arguments must be a "function"');
	      }
	    }

	    /**
	     * add event handler to element
	     * @param eventName
	     * @param callback
	     */

	  }, {
	    key: 'on',
	    value: function on(eventName, callback) {
	      if (typeof eventName === 'string' && callback instanceof Function) {
	        this._element.addEventListener(eventName, callback);
	      } else {
	        throw new _invalidArgumentError2.default('on', 'first argument must be a "string", ' + 'second arguments must be a "function"');
	      }
	    }

	    // html

	    /**
	     * change element inner html
	     * @param template
	     */

	  }, {
	    key: 'html',
	    value: function html(template) {
	      if (typeof template === 'string') {
	        this._element.innerHTML = template;
	      } else {
	        throw new _invalidArgumentError2.default('html', 'argument must be a "string"');
	      }
	    }

	    // dom

	    /**
	     * Returns one relevanting element for this selector
	     * @param selector
	     * @returns {DomElementDecorator}
	     */

	  }, {
	    key: 'findOne',
	    value: function findOne(selector) {
	      if (typeof selector === 'string') {
	        return new DomElementDecorator(this._element.querySelector(selector));
	      } else {
	        throw new _invalidArgumentError2.default('findOne', 'argument must be a "string"');
	      }
	    }

	    /**
	     * Returns all relevanting elements for this selector
	     * @param selector
	     * @returns {Array}
	     */

	  }, {
	    key: 'findAll',
	    value: function findAll(selector) {
	      if (typeof selector === 'string') {
	        return Array.prototype.map.call(this._element.querySelectorAll(selector), function (element) {
	          return new DomElementDecorator(element);
	        });
	      } else {
	        throw new _invalidArgumentError2.default('findAll', 'argument must be a "string"');
	      }
	    }
	  }]);

	  return DomElementDecorator;
	}();

		exports.default = DomElementDecorator;

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by ridel1e on 17/10/2016.
	 */

	var InvalidArgumentError = function InvalidArgumentError(methodName, message) {
	  _classCallCheck(this, InvalidArgumentError);

	  this.name = 'InvalidArgumentError';
	  this.message = methodName + '(): method got invalid arguments: ' + message;
	  this.stack = new Error().stack;
	};

		exports.default = InvalidArgumentError;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDI1ODQxNTMwYjQ0MDdjOWU0NzhkIiwid2VicGFjazovLy9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvY29yZS5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy9hcHAvY29yZS9zYW5kYm94L2luZGV4LmpzIiwid2VicGFjazovLy9hcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2RvbS5qcyIsIndlYnBhY2s6Ly8vYXBwL2hlbHBlcnMvZG9tLW1hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy9hcHAvaGVscGVycy9kb20tZWxlbWVudC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdGNvbXBvbmVudHNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgY29tcG9uZW50cyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBjb21wb25lbnRzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyNTg0MTUzMGI0NDA3YzllNDc4ZFxuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEyLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IEFwcGxpY2F0aW9uQ29udHJvbGxlciBmcm9tICdjb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXInO1xuLy9cbi8vIGltcG9ydCB0b2RvRmlsdGVyV2lkZ2V0IGZyb20gJ2NvbXBvbmVudHMvdG9kby1maWx0ZXInO1xuLy8gaW1wb3J0IHRvZG9DcmVhdGlvbkZvcm1XaWRnZXQgZnJvbSAnY29tcG9uZW50cy90b2RvLWNyZWF0aW9uLWZvcm0nO1xuLy9cbi8vIHRvZG9GaWx0ZXJXaWRnZXQoQXBwbGljYXRpb25Db250cm9sbGVyKTtcbi8vIHRvZG9DcmVhdGlvbkZvcm1XaWRnZXQoQXBwbGljYXRpb25Db250cm9sbGVyKTtcbi8vXG4vLyBBcHBsaWNhdGlvbkNvbnRyb2xsZXIuc3RhcnRBbGwoKTtcbi8vXG5cbkFwcGxpY2F0aW9uQ29udHJvbGxlci5kb20uZmluZEFsbCgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IENvcmUgZnJvbSAnLi9jb3JlLmpzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5Db3JlLmV4dGVuZCgnZG9tJywgZG9tKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29yZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgU2FuZGJveCBmcm9tICdjb3JlL3NhbmRib3gnO1xuaW1wb3J0IEludmFsaWRBcmd1bWVudHNFcnJvciBmcm9tICdoZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanMnO1xuXG5jb25zdCBjb3JlID0gKCgpID0+IHtcbiAgXG4gIGNvbnN0IG1vZHVsZURhdGEgPSB7fTtcbiAgXG4gIHJldHVybiB7XG4gICAgZXh0ZW5kLFxuICAgIHJlZ2lzdGVyLFxuICAgIHN0YXJ0LFxuICAgIHN0YXJ0QWxsLFxuICAgIHN0b3AsXG4gICAgc3RvcEFsbCxcbiAgfTtcblxuICAvKipcbiAgICogUmVnaXN0ZXIgbW9kdWxlIGluIGFwcFxuICAgKiBAcGFyYW0gbW9kdWxlTmFtZVxuICAgKiBAcGFyYW0gY3JlYXRvclxuICAgKi9cbiAgZnVuY3Rpb24gcmVnaXN0ZXIobW9kdWxlTmFtZSwgY3JlYXRvcikge1xuICAgIGlmKHR5cGVvZiBtb2R1bGVOYW1lID09PSAnc3RyaW5nJyAmJiBjcmVhdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIG1vZHVsZURhdGFbbW9kdWxlTmFtZV0gPSB7XG4gICAgICAgIGNyZWF0b3IsXG4gICAgICAgIGluc3RhbmNlOiBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdyZWdpc3RlcicsICdmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgJyArXG4gICAgICAgICAgJ3NlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEgXCJmdW5jdGlvblwiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGNvbmNyZXRlIG1vZHVsZVxuICAgKiBAcGFyYW0gbW9kdWxlTmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gc3RhcnQobW9kdWxlTmFtZSkge1xuXG4gICAgaWYodHlwZW9mIG1vZHVsZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdzdGFydCcsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cblxuICAgIG1vZHVsZURhdGFbbW9kdWxlTmFtZV0uaW5zdGFuY2UgPSBcbiAgICAgIG1vZHVsZURhdGFbbW9kdWxlTmFtZV0uY3JlYXRvcihuZXcgU2FuZGJveCh0aGlzLCBtb2R1bGVOYW1lKSk7XG4gICAgXG4gICAgY29uc3QgaW5zdGFuY2UgPSBtb2R1bGVEYXRhW21vZHVsZU5hbWVdLmluc3RhbmNlO1xuICAgIFxuICAgIGlmKGluc3RhbmNlLmluaXQgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBpbnN0YW5jZS5kZXN0cm95IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGluc3RhbmNlLmluaXQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc3RhcnQoKTogbW9kdWxlIGRvZXNuXFwndCBoYXZlIFwiaW5pdFwiIG9yIFwiZGVzdHJveVwiIGZ1bmN0aW9uICcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGNvbmNyZXRlIG1vZHVsZVxuICAgKiBAcGFyYW0gbW9kdWxlTmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gc3RvcChtb2R1bGVOYW1lKSB7XG5cbiAgICBpZih0eXBlb2YgbW9kdWxlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ3N0b3AnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGUgPSBtb2R1bGVEYXRhW21vZHVsZU5hbWVdO1xuXG4gICAgaWYobW9kdWxlLmluc3RhbmNlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBpZihtb2R1bGUuaW5zdGFuY2UuZGVzdHJveSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIG1vZHVsZURhdGFbbW9kdWxlTmFtZV0uaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICBtb2R1bGVEYXRhW21vZHVsZU5hbWVdLmluc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0b3AoKTogbW9kdWxlIGRvZXNcXCd0IGhhdmUgXCJkZXN0cm95IG1ldGhvZFwiJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdG9wKCk6IG1vZHVsZSBzaG91bGQgYmUgc3RhcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmQgYXBwbGljYXRpb24gY29udHJvbGxlclxuICAgKiBAcGFyYW0gZXh0ZW5zaW9uTmFtZVxuICAgKiBAcGFyYW0gZXh0ZW5zaW9uT2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBleHRlbmQoZXh0ZW5zaW9uTmFtZSwgZXh0ZW5zaW9uT2JqZWN0KSB7XG4gICAgaWYodHlwZW9mIGV4dGVuc2lvbk5hbWUgPT09ICdzdHJpbmcnICYmIGV4dGVuc2lvbk9iamVjdCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgdGhpc1tleHRlbnNpb25OYW1lXSA9IGV4dGVuc2lvbk9iamVjdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2V4dGVuZCcsICdmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgJyArXG4gICAgICAgJ3NlY29uZCBhcmd1bWVudCBtdXN0IGJlIGFuIFwiT2JqZWN0XCInKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHN0YXJ0QWxsKCkge1xuICAgIE9iamVjdC5rZXlzKG1vZHVsZURhdGEpLmZvckVhY2goKG1vZHVsZU5hbWUpID0+IHRoaXMuc3RhcnQobW9kdWxlTmFtZSkpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBzdG9wQWxsKCkge1xuICAgIE9iamVjdC5rZXlzKG1vZHVsZURhdGEpLmZvckVhY2goKG1vZHVsZU5hbWUpID0+IHRoaXMuc3RvcChtb2R1bGVOYW1lKSk7XG4gIH1cbn0pKCk7XG5cblxuZXhwb3J0IGRlZmF1bHQgY29yZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2NvcmUuanNcbiAqKi8iLCJ1bmRlZmluZWRcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmNsYXNzIFNhbmRib3gge1xuICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbkNvbnRyb2xsZXIsIG1vZHVsZVNlbGVjdG9yKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvbkNvbnRyb2xsZXIgPSBhcHBsaWNhdGlvbkNvbnRyb2xsZXI7XG4gICAgdGhpcy5jb250YWluZXIgPVxuICAgICAgYXBwbGljYXRpb25Db250cm9sbGVyLmRvbS5maW5kT25lKGAjJHttb2R1bGVTZWxlY3Rvcn1gKTtcbiAgfVxuXG4gIGZpbmRPbmUoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZmluZE9uZShzZWxlY3Rvcik7XG4gIH1cbiAgXG4gIGluaXRpYWxpemVUZW1wbGF0ZShodG1sKSB7XG4gICAgdGhpcy5jb250YWluZXIuaHRtbChodG1sKTtcbiAgfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgU2FuZGJveDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9zYW5kYm94L2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgRG9tTWFuaXB1bGF0b3IgZnJvbSAnaGVscGVycy9kb20tbWFuaXB1bGF0b3InO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbmRBbGwsXG4gICAgZmluZE9uZSAgXG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHJlbGV2YW50aW5nIGVsZW1lbnRzIGZvciB0aGlzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIGZpbmRBbGwoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gRG9tTWFuaXB1bGF0b3IuZmluZEFsbChzZWxlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBvbmUgcmVsZXZhbnRpbmcgZWxlbWVudCBmb3IgdGhpcyBzZWxlY3RvclxuICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBmaW5kT25lKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIERvbU1hbmlwdWxhdG9yLmZpbmRPbmUoc2VsZWN0b3IpO1xuICB9XG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2RvbS5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IERvbUVsZW1lbnREZWNvcmF0b3IgZnJvbSAnLi9kb20tZWxlbWVudC5kZWNvcmF0b3InO1xuXG5jb25zdCBEb21NYW5pcHVsYXRvciA9ICgoKSA9PiB7XG5cbiAgdmFyIGRvY3VtZW50RWxlbWVudCA9IG5ldyBEb21FbGVtZW50RGVjb3JhdG9yKGRvY3VtZW50KTtcbiAgXG4gIHJldHVybiB7XG4gICAgZmluZEFsbCxcbiAgICBmaW5kT25lXG4gIH07XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBuZXcgZG9tIGVsZW1lbnRcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHJldHVybnMge0RvbUVsZW1lbnREZWNvcmF0b3J9XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGUoZWxlbWVudCkge1xuICAgIHJldHVybiBuZXcgRG9tRWxlbWVudERlY29yYXRvcihlbGVtZW50KVxuICB9XG5cbiAgLyoqXG4gICAqINCaZXR1cm5zIG9uZSByZWxldmFudGluZyBlbGVtZW50IGZvciB0aGlzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7RG9tRWxlbWVudERlY29yYXRvcn1cbiAgICovXG4gIGZ1bmN0aW9uIGZpbmRPbmUoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRFbGVtZW50LmZpbmRPbmUoc2VsZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHJlbGV2YW50aW5nIGVsZW1lbnRzIGZvciB0aGlzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBmdW5jdGlvbiBmaW5kQWxsKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50RWxlbWVudC5maW5kQWxsKHNlbGVjdG9yKTtcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRG9tTWFuaXB1bGF0b3JcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaGVscGVycy9kb20tbWFuaXB1bGF0b3IuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBJbnZhbGlkQXJndW1lbnRzRXJyb3IgZnJvbSAnLi9pbnZhbGlkLWFyZ3VtZW50LmVycm9yLmpzJztcblxuY2xhc3MgRG9tRWxlbWVudERlY29yYXRvciB7XG5cbiAgLyoqXG4gICAqIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgaWYoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRG9jdW1lbnQpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2NvbnN0cnVjdG9yJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcIkhUTUxFbGVtZW50XCIgb3IgYSBcIkhUTUxEb2N1bWVudFwiJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gY3NzIGNsYXNzIG1hbmlwdWxhdGlvbnNcblxuICAvKipcbiAgICogQ2hlY2sgZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzTmFtZSkgIT09IC0xXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignaGFzQ2xhc3MnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNzcyBjbGFzcyB0byBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTmFtZSArPSBgICR7Y2xhc3NOYW1lfWBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdhZGRDbGFzcycsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY3NzIGNsYXNzIGZyb20gZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZih0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLl9lbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGAgJHtjbGFzc05hbWV9YCwgJycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ3JlbW92ZUNsYXNzJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXZlbnRzXG5cbiAgLyoqXG4gICAqIGFkZCBjbGljayBldmVudCBoYW5kbGVyIHRvIGVsZW1lbnRcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBjbGljayhjYWxsYmFjaykge1xuICAgIGlmKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMub24oJ2NsaWNrJywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2NsaWNrJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcImZ1bmN0aW9uXCInKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIG1vdXNlZW50ZXIgYW5kIG1vdXNlbGVhdmUgZXZlbnQgaGFuZGxlcnMgdG8gZWxlbWVudFxuICAgKiBAcGFyYW0gbW91c2VFbnRlckNhbGxiYWNrXG4gICAqIEBwYXJhbSBtb3VzZUxlYXZlQ2FsbGJhY2tcbiAgICovXG4gIGhvdmVyKG1vdXNlRW50ZXJDYWxsYmFjaywgbW91c2VMZWF2ZUNhbGxiYWNrKSB7XG4gICAgaWYobW91c2VFbnRlckNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgbW91c2VMZWF2ZUNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMub24oJ21vdXNlZW50ZXInLCBtb3VzZUVudGVyQ2FsbGJhY2spO1xuICAgICAgdGhpcy5vbignbW91c2VsZWF2ZScsIG1vdXNlTGVhdmVDYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignaG92ZXInLCAnZmlyc3QgYW5kIHNlY29uZCBhcmd1bWVudHMgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgZXZlbnQgaGFuZGxlciB0byBlbGVtZW50XG4gICAqIEBwYXJhbSBldmVudE5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYodHlwZW9mIGV2ZW50TmFtZSA9PT0gJ3N0cmluZycgJiYgY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5fZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ29uJywgJ2ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiLCAnICtcbiAgICAgICAgJ3NlY29uZCBhcmd1bWVudHMgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIicpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGh0bWxcblxuICAvKipcbiAgICogY2hhbmdlIGVsZW1lbnQgaW5uZXIgaHRtbFxuICAgKiBAcGFyYW0gdGVtcGxhdGVcbiAgICovXG4gIGh0bWwodGVtcGxhdGUpIHtcbiAgICBpZih0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2h0bWwnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIGRvbVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9uZSByZWxldmFudGluZyBlbGVtZW50IGZvciB0aGlzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7RG9tRWxlbWVudERlY29yYXRvcn1cbiAgICovXG4gIGZpbmRPbmUoc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IERvbUVsZW1lbnREZWNvcmF0b3IodGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignZmluZE9uZScsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHJlbGV2YW50aW5nIGVsZW1lbnRzIGZvciB0aGlzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBmaW5kQWxsKHNlbGVjdG9yKSB7XG4gICAgaWYodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZVxuICAgICAgICAubWFwLmNhbGwodGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgKGVsZW1lbnQpID0+XG4gICAgICAgICAgbmV3IERvbUVsZW1lbnREZWNvcmF0b3IoZWxlbWVudCkpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignZmluZEFsbCcsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvbUVsZW1lbnREZWNvcmF0b3I7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2hlbHBlcnMvZG9tLWVsZW1lbnQuZGVjb3JhdG9yLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTcvMTAvMjAxNi5cbiAqL1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1ldGhvZE5hbWUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSAnSW52YWxpZEFyZ3VtZW50RXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IGAke21ldGhvZE5hbWV9KCk6IG1ldGhvZCBnb3QgaW52YWxpZCBhcmd1bWVudHM6ICR7bWVzc2FnZX1gO1xuICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRBcmd1bWVudEVycm9yO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2xDQTtBQUNBOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFOQTs7OztBQU9BO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQU5BOzs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hIQTs7OztBQUlBO0FBQ0E7QURBQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7O0FFbEJBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FGQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUc1QkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBSENBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FJM0NBOzs7O0FBSUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FKQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FLNUpBOzs7O0FBSUE7QUxDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Iiwic291cmNlUm9vdCI6IiJ9