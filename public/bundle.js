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

	var _todoFilter = __webpack_require__(11);

	var _todoFilter2 = _interopRequireDefault(_todoFilter);

	var _todoCreationForm = __webpack_require__(14);

	var _todoCreationForm2 = _interopRequireDefault(_todoCreationForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _todoCreationForm2.default)(_applicationController2.default); /**
	                                                                   * Created by ridel1e on 12/10/2016.
	                                                                   */

	(0, _todoFilter2.default)(_applicationController2.default);

	_applicationController2.default.startAll();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(2);

	var _core2 = _interopRequireDefault(_core);

	var _dom = __webpack_require__(7);

	var _dom2 = _interopRequireDefault(_dom);

	var _errors = __webpack_require__(10);

	var _errors2 = _interopRequireDefault(_errors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// errors handler
	(0, _errors2.default)(_core2.default.debug);

	// extensions
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

	var _invalidArgumentError = __webpack_require__(5);

	var _invalidArgumentError2 = _interopRequireDefault(_invalidArgumentError);

	var _loggerService = __webpack_require__(6);

	var _loggerService2 = _interopRequireDefault(_loggerService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var core = function () {

	  var moduleData = {};
	  var debug = false;

	  return {
	    get debug() {
	      return debug;
	    },
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
	      _loggerService2.default.log(2, 'register(): method got invalid arguments' + 'first argument must be a "string", second argument must be a "function")');
	    }
	  }

	  /**
	   * Start concrete module
	   * @param moduleName
	   */
	  function start(moduleName) {

	    if (typeof moduleName !== 'string') {
	      _loggerService2.default.log(2, 'start(): method got invalid arguments' + 'argument must be a "string", ');
	    }

	    moduleData[moduleName].instance = moduleData[moduleName].creator(new _sandbox2.default(this, moduleName));

	    var instance = moduleData[moduleName].instance;

	    try {
	      instance.init();
	    } catch (e) {
	      _loggerService2.default.log(2, 'start(): ' + e.message);
	    }
	  }

	  /**
	   * Stop concrete module
	   * @param moduleName
	   */
	  function stop(moduleName) {

	    if (typeof moduleName !== 'string') {
	      _loggerService2.default.log(2, 'stop(): method got invalid arguments' + 'argument must be a "string", ');
	    }

	    var module = moduleData[moduleName];

	    try {
	      module.instance.destroy();
	      module.instance = null;
	    } catch (e) {
	      _loggerService2.default.log(2, 'start(): ' + e.message);
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
	      _loggerService2.default.log(2, 'extend', 'first argument must be a "string", ' + 'second argument must be an "Object"');
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
	}(); /**
	      * Created by ridel1e on 13/10/2016.
	      */

		exports.default = core;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _sandbox = __webpack_require__(4);

	var _sandbox2 = _interopRequireDefault(_sandbox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _sandbox2.default; /**
	                                      * Created by ridel1e on 13/10/2016.
	                                      */

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ridel1e on 13/10/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _invalidArgumentError = __webpack_require__(5);

	var _invalidArgumentError2 = _interopRequireDefault(_invalidArgumentError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sandbox = function () {
	  function Sandbox(applicationController, moduleSelector) {
	    _classCallCheck(this, Sandbox);

	    this.applicationController = applicationController;
	    this.container = applicationController.dom.findOne('#' + moduleSelector);
	  }

	  _createClass(Sandbox, [{
	    key: 'findOne',
	    value: function findOne(selector) {
	      return this.container.findOne(selector);
	    }
	  }, {
	    key: 'findAll',
	    value: function findAll(selector) {
	      return this.container.findAll(selector);
	    }
	  }, {
	    key: 'initializeTemplate',
	    value: function initializeTemplate(html) {
	      this.container.html(html);
	    }

	    // events

	  }, {
	    key: 'click',
	    value: function click(element, callback) {
	      if (element.click instanceof Function) {
	        element.click(callback);
	      } else {
	        throw new _invalidArgumentError2.default('click():', 'first argument should be a DOM Object');
	      }
	    }
	  }]);

	  return Sandbox;
	}();

		exports.default = Sandbox;

/***/ },
/* 5 */
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Created by ridel1e on 17/10/2016.
	 */

	exports.default = function () {
	  return {
	    log: log
	  };

	  function log(type, message) {
	    switch (type) {
	      case 1:
	        console.log(message);
	        break;
	      case 2:
	        console.error(message);
	        break;
	      case 3:
	        console.warn(message);
	        break;
	    }
	  }
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _domManipulator = __webpack_require__(17);

	var _domManipulator2 = _interopRequireDefault(_domManipulator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dom = function () {
	  return {
	    findAll: findAll,
	    findOne: findOne
	  };

	  function findAll(selector) {
	    return _domManipulator2.default.findAll(selector);
	  }

	  function findOne(selector) {
	    return _domManipulator2.default.findOne(selector);
	  }
	}(); /**
	      * Created by ridel1e on 13/10/2016.
	      */

		exports.default = dom;

/***/ },
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(6);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (debug) {
	  if (debug) {
	    window.onerror = function (msg, url, line, col, error) {
	      throw error;
	    };
	  } else {
	    window.onerror = function (msg, url, line, col, error) {
	      _logger2.default.log(2, error.message + '\n' + error.stack);
	      return true;
	    };
	  }
	}; /**
	    * Created by ridel1e on 17/10/2016.
	    */

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _widget = __webpack_require__(12);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (applicationController) {
	  return (0, _widget2.default)(applicationController);
	}; /**
	    * Created by ridel1e on 12/10/2016.
	    */

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _template = __webpack_require__(13);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WIDGET_NAME = 'todo-filter'; /**
	                                  * Created by ridel1e on 12/10/2016.
	                                  */

	var widget = function widget(sandbox) {

	  return {
	    init: init,
	    destroy: destroy
	  };

	  function init() {
	    sandbox.initializeTemplate(_template2.default);
	  }

	  function destroy() {}
	};

	exports.default = function (applicationController) {
	  return applicationController.register(WIDGET_NAME, widget);
		};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by ridel1e on 12/10/2016.
	 */

		exports.default = ['<span>Filter Field:</span>', '<br>', '<input placeholder="filter">'].join('');

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _widget = __webpack_require__(15);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (ApplicationController) {
	  return (0, _widget2.default)(ApplicationController);
	}; /**
	    * Created by ridel1e on 13/10/2016.
	    */

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _template = __webpack_require__(16);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WIDGET_NAME = 'todo-creation-form'; /**
	                                         * Created by ridel1e on 13/10/2016.
	                                         */

	var widget = function widget(sandbox) {

	  return {
	    init: init,
	    destroy: destroy
	  };

	  function init() {
	    sandbox.initializeTemplate(_template2.default);

	    var createButton = sandbox.findOne('.create-button');
	    createButton.click(function () {
	      console.log('created');
	    });
	  }

	  function destroy() {}
	};

	exports.default = function (ApplicationController) {
	  return ApplicationController.register(WIDGET_NAME, widget);
		};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by ridel1e on 13/10/2016.
	 */

		exports.default = ['<label>Create task</label>', '<br>', '<input type="text">', '<br>', '<button class="create-button">Create</button>'].join('');

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _domElementDecorator = __webpack_require__(18);

	var _domElementDecorator2 = _interopRequireDefault(_domElementDecorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DomManipulator = function () {

	  var documentElement = new _domElementDecorator2.default(document);

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
	    return new _domElementDecorator2.default(element);
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by ridel1e on 13/10/2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _invalidArgumentError = __webpack_require__(5);

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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGZkMjBmMjEwYTVjY2FhMzRhOWM1Iiwid2VicGFjazovLy9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvY29yZS5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy9hcHAvY29yZS9zYW5kYm94L2luZGV4LmpzIiwid2VicGFjazovLy9hcHAvY29yZS9zYW5kYm94L3NhbmRib3guanMiLCJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2xvZ2dlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy9hcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2RvbS5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvcmUvYXBwbGljYXRpb24tY29udHJvbGxlci9lcnJvcnMuaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tZmlsdGVyL3dpZGdldC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL3dpZGdldC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy9hcHAvaGVscGVycy9kb20vZG9tLW1hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy9hcHAvaGVscGVycy9kb20vZG9tLWVsZW1lbnQuZGVjb3JhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRjb21wb25lbnRzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIGNvbXBvbmVudHMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gY29tcG9uZW50cztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmQyMGYyMTBhNWNjYWEzNGE5YzVcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMi8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBBcHBsaWNhdGlvbkNvbnRyb2xsZXIgZnJvbSAnY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyJztcbmltcG9ydCB0b2RvRmlsdGVyV2lkZ2V0IGZyb20gJ2NvbXBvbmVudHMvdG9kby1maWx0ZXInO1xuaW1wb3J0IHRvZG9DcmVhdGlvbkZvcm1XaWRnZXQgZnJvbSAnY29tcG9uZW50cy90b2RvLWNyZWF0aW9uLWZvcm0nO1xuXG50b2RvQ3JlYXRpb25Gb3JtV2lkZ2V0KEFwcGxpY2F0aW9uQ29udHJvbGxlcik7XG50b2RvRmlsdGVyV2lkZ2V0KEFwcGxpY2F0aW9uQ29udHJvbGxlcik7XG5cbkFwcGxpY2F0aW9uQ29udHJvbGxlci5zdGFydEFsbCgpO1xuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IENvcmUgZnJvbSAnLi9jb3JlLmpzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGVycm9yc0hhbmRsZXIgZnJvbSAnLi9lcnJvcnMuaGFuZGxlcic7XG5cbi8vIGVycm9ycyBoYW5kbGVyXG5lcnJvcnNIYW5kbGVyKENvcmUuZGVidWcpO1xuXG4vLyBleHRlbnNpb25zXG5Db3JlLmV4dGVuZCgnZG9tJywgZG9tKTtcblxuXG5leHBvcnQgZGVmYXVsdCBDb3JlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBTYW5kYm94IGZyb20gJ2NvcmUvc2FuZGJveCc7XG5pbXBvcnQgSW52YWxpZEFyZ3VtZW50c0Vycm9yIGZyb20gJ2hlbHBlcnMvaW52YWxpZC1hcmd1bWVudC5lcnJvci5qcyc7XG5pbXBvcnQgbG9nZ2VyU2VydmljZSBmcm9tICdoZWxwZXJzL2xvZ2dlci5zZXJ2aWNlLmpzJztcblxuY29uc3QgY29yZSA9ICgoKSA9PiB7XG4gIFxuICBjb25zdCBtb2R1bGVEYXRhID0ge307XG4gIGNvbnN0IGRlYnVnID0gZmFsc2U7XG4gIFxuICByZXR1cm4ge1xuICAgIGdldCBkZWJ1ZygpIHtcbiAgICAgIHJldHVybiBkZWJ1ZztcbiAgICB9LFxuICAgIGV4dGVuZCxcbiAgICByZWdpc3RlcixcbiAgICBzdGFydCxcbiAgICBzdGFydEFsbCxcbiAgICBzdG9wLFxuICAgIHN0b3BBbGwsXG4gIH07XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIG1vZHVsZSBpbiBhcHBcbiAgICogQHBhcmFtIG1vZHVsZU5hbWVcbiAgICogQHBhcmFtIGNyZWF0b3JcbiAgICovXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyKG1vZHVsZU5hbWUsIGNyZWF0b3IpIHtcbiAgICBpZih0eXBlb2YgbW9kdWxlTmFtZSA9PT0gJ3N0cmluZycgJiYgY3JlYXRvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBtb2R1bGVEYXRhW21vZHVsZU5hbWVdID0ge1xuICAgICAgICBjcmVhdG9yLFxuICAgICAgICBpbnN0YW5jZTogbnVsbFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvZ2dlclNlcnZpY2UubG9nKDIsICdyZWdpc3RlcigpOiBtZXRob2QgZ290IGludmFsaWQgYXJndW1lbnRzJyArXG4gICAgICAgICdmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBcImZ1bmN0aW9uXCIpJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGNvbmNyZXRlIG1vZHVsZVxuICAgKiBAcGFyYW0gbW9kdWxlTmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gc3RhcnQobW9kdWxlTmFtZSkge1xuXG4gICAgaWYodHlwZW9mIG1vZHVsZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBsb2dnZXJTZXJ2aWNlLmxvZygyLCAnc3RhcnQoKTogbWV0aG9kIGdvdCBpbnZhbGlkIGFyZ3VtZW50cycgK1xuICAgICAgICAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCIsICcpO1xuICAgIH1cblxuICAgIG1vZHVsZURhdGFbbW9kdWxlTmFtZV0uaW5zdGFuY2UgPVxuICAgICAgbW9kdWxlRGF0YVttb2R1bGVOYW1lXS5jcmVhdG9yKG5ldyBTYW5kYm94KHRoaXMsIG1vZHVsZU5hbWUpKTtcblxuICAgIGNvbnN0IGluc3RhbmNlID0gbW9kdWxlRGF0YVttb2R1bGVOYW1lXS5pbnN0YW5jZTtcblxuICAgIHRyeSB7XG4gICAgICBpbnN0YW5jZS5pbml0KCk7XG4gICAgfVxuICAgIGNhdGNoIChlKXtcbiAgICAgIGxvZ2dlclNlcnZpY2UubG9nKDIsIGBzdGFydCgpOiAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBjb25jcmV0ZSBtb2R1bGVcbiAgICogQHBhcmFtIG1vZHVsZU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIHN0b3AobW9kdWxlTmFtZSkge1xuXG4gICAgaWYodHlwZW9mIG1vZHVsZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBsb2dnZXJTZXJ2aWNlLmxvZygyLCAnc3RvcCgpOiBtZXRob2QgZ290IGludmFsaWQgYXJndW1lbnRzJyArXG4gICAgICAgICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlID0gbW9kdWxlRGF0YVttb2R1bGVOYW1lXTtcblxuICAgIHRyeSB7XG4gICAgICBtb2R1bGUuaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgbW9kdWxlLmluc3RhbmNlID0gbnVsbDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlclNlcnZpY2UubG9nKDIsIGBzdGFydCgpOiAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIGFwcGxpY2F0aW9uIGNvbnRyb2xsZXJcbiAgICogQHBhcmFtIGV4dGVuc2lvbk5hbWVcbiAgICogQHBhcmFtIGV4dGVuc2lvbk9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gZXh0ZW5kKGV4dGVuc2lvbk5hbWUsIGV4dGVuc2lvbk9iamVjdCkge1xuICAgIGlmKHR5cGVvZiBleHRlbnNpb25OYW1lID09PSAnc3RyaW5nJyAmJiBleHRlbnNpb25PYmplY3QgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHRoaXNbZXh0ZW5zaW9uTmFtZV0gPSBleHRlbnNpb25PYmplY3Q7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICBsb2dnZXJTZXJ2aWNlLmxvZygyLCAnZXh0ZW5kJywgJ2ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiLCAnICtcbiAgICAgICAnc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYW4gXCJPYmplY3RcIicpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gc3RhcnRBbGwoKSB7XG4gICAgT2JqZWN0LmtleXMobW9kdWxlRGF0YSkuZm9yRWFjaCgobW9kdWxlTmFtZSkgPT4gdGhpcy5zdGFydChtb2R1bGVOYW1lKSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHN0b3BBbGwoKSB7XG4gICAgT2JqZWN0LmtleXMobW9kdWxlRGF0YSkuZm9yRWFjaCgobW9kdWxlTmFtZSkgPT4gdGhpcy5zdG9wKG1vZHVsZU5hbWUpKTtcbiAgfVxufSkoKTtcblxuXG5leHBvcnQgZGVmYXVsdCBjb3JlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvY29yZS5qc1xuICoqLyIsInVuZGVmaW5lZFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIFxuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IHNhbmRib3ggZnJvbSAnLi9zYW5kYm94JztcblxuZXhwb3J0IGRlZmF1bHQgc2FuZGJveDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9zYW5kYm94L2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgSW52YWxpZEFyZ3VtZW50c0Vycm9yIGZyb20gJ2hlbHBlcnMvaW52YWxpZC1hcmd1bWVudC5lcnJvci5qcyc7ICBcbiAgXG5jbGFzcyBTYW5kYm94IHtcbiAgY29uc3RydWN0b3IoYXBwbGljYXRpb25Db250cm9sbGVyLCBtb2R1bGVTZWxlY3Rvcikge1xuICAgIHRoaXMuYXBwbGljYXRpb25Db250cm9sbGVyID0gYXBwbGljYXRpb25Db250cm9sbGVyO1xuICAgIHRoaXMuY29udGFpbmVyID1cbiAgICAgIGFwcGxpY2F0aW9uQ29udHJvbGxlci5kb20uZmluZE9uZShgIyR7bW9kdWxlU2VsZWN0b3J9YCk7XG4gIH1cbiAgXG4gIGZpbmRPbmUoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZmluZE9uZShzZWxlY3Rvcik7XG4gIH1cbiAgXG4gIGZpbmRBbGwoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZmluZEFsbChzZWxlY3Rvcik7XG4gIH1cblxuICBpbml0aWFsaXplVGVtcGxhdGUoaHRtbCkge1xuICAgIHRoaXMuY29udGFpbmVyLmh0bWwoaHRtbCk7XG4gIH1cblxuICAvLyBldmVudHNcbiAgY2xpY2soZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICBpZihlbGVtZW50LmNsaWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGVsZW1lbnQuY2xpY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2NsaWNrKCk6JywgJ2ZpcnN0IGFyZ3VtZW50IHNob3VsZCBiZSBhIERPTSBPYmplY3QnKVxuICAgIH1cbiAgfTtcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFNhbmRib3g7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvcmUvc2FuZGJveC9zYW5kYm94LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTcvMTAvMjAxNi5cbiAqL1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1ldGhvZE5hbWUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSAnSW52YWxpZEFyZ3VtZW50RXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IGAke21ldGhvZE5hbWV9KCk6IG1ldGhvZCBnb3QgaW52YWxpZCBhcmd1bWVudHM6ICR7bWVzc2FnZX1gO1xuICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRBcmd1bWVudEVycm9yO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxNy8xMC8yMDE2LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nXG4gIH07XG4gIFxuICBmdW5jdGlvbiBsb2codHlwZSwgbWVzc2FnZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaGVscGVycy9sb2dnZXIuc2VydmljZS5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IERvbU1hbmlwdWxhdG9yIGZyb20gJ2hlbHBlcnMvZG9tL2RvbS1tYW5pcHVsYXRvcic7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmluZEFsbCxcbiAgICBmaW5kT25lICBcbiAgfTtcblxuICBmdW5jdGlvbiBmaW5kQWxsKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIERvbU1hbmlwdWxhdG9yLmZpbmRBbGwoc2VsZWN0b3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmluZE9uZShzZWxlY3Rvcikge1xuICAgIHJldHVybiBEb21NYW5pcHVsYXRvci5maW5kT25lKHNlbGVjdG9yKTtcbiAgfVxuXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvcmUvYXBwbGljYXRpb24tY29udHJvbGxlci9kb20uanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxNy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBsb2dnZXJTZXJ2aWNlIGZyb20gJ2hlbHBlcnMvbG9nZ2VyLnNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCAoKGRlYnVnKSA9PiB7XG4gIGlmKGRlYnVnKSB7XG4gICAgd2luZG93Lm9uZXJyb3IgPSAobXNnLCB1cmwsIGxpbmUsIGNvbCwgZXJyb3IpID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH07XG4gIH1cbiAgZWxzZSB7XG4gICAgd2luZG93Lm9uZXJyb3IgPSAobXNnLCB1cmwsIGxpbmUsIGNvbCwgZXJyb3IpID0+IHtcbiAgICAgIGxvZ2dlclNlcnZpY2UubG9nKDIsIGAke2Vycm9yLm1lc3NhZ2V9XFxuJHtlcnJvci5zdGFja31gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH1cbn0pO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2Vycm9ycy5oYW5kbGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTIvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgd2lkZ2V0IGZyb20gJy4vd2lkZ2V0JztcblxuZXhwb3J0IGRlZmF1bHQgKGFwcGxpY2F0aW9uQ29udHJvbGxlcikgPT4gXG4gIHdpZGdldChhcHBsaWNhdGlvbkNvbnRyb2xsZXIpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMi8xMC8yMDE2LlxuICovXG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcblxuY29uc3QgV0lER0VUX05BTUUgPSAndG9kby1maWx0ZXInO1xuXG5jb25zdCB3aWRnZXQgPSAoc2FuZGJveCkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH07XG4gIFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNhbmRib3guaW5pdGlhbGl6ZVRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcblxuICB9XG4gIFxufTtcblxuZXhwb3J0IGRlZmF1bHQgKGFwcGxpY2F0aW9uQ29udHJvbGxlcikgPT4gXG4gIGFwcGxpY2F0aW9uQ29udHJvbGxlci5yZWdpc3RlcihXSURHRVRfTkFNRSwgd2lkZ2V0KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb21wb25lbnRzL3RvZG8tZmlsdGVyL3dpZGdldC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEyLzEwLzIwMTYuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAnPHNwYW4+RmlsdGVyIEZpZWxkOjwvc3Bhbj4nLFxuICAnPGJyPicsXG4gICc8aW5wdXQgcGxhY2Vob2xkZXI9XCJmaWx0ZXJcIj4nXG5dLmpvaW4oJycpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb21wb25lbnRzL3RvZG8tZmlsdGVyL3RlbXBsYXRlLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgd2lkZ2V0IGZyb20gJy4vd2lkZ2V0JztcblxuZXhwb3J0IGRlZmF1bHQgKEFwcGxpY2F0aW9uQ29udHJvbGxlcikgPT4gXG4gIHdpZGdldChBcHBsaWNhdGlvbkNvbnRyb2xsZXIpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybS9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG5jb25zdCBXSURHRVRfTkFNRSA9ICd0b2RvLWNyZWF0aW9uLWZvcm0nO1xuXG5jb25zdCB3aWRnZXQgPSAoc2FuZGJveCkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH07XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBzYW5kYm94LmluaXRpYWxpemVUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgXG4gICAgY29uc3QgY3JlYXRlQnV0dG9uID0gc2FuZGJveC5maW5kT25lKGAuY3JlYXRlLWJ1dHRvbmApO1xuICAgIGNyZWF0ZUJ1dHRvbi5jbGljayggKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZWQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKEFwcGxpY2F0aW9uQ29udHJvbGxlcikgPT5cbiAgQXBwbGljYXRpb25Db250cm9sbGVyLnJlZ2lzdGVyKFdJREdFVF9OQU1FLCB3aWRnZXQpXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL3dpZGdldC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAnPGxhYmVsPkNyZWF0ZSB0YXNrPC9sYWJlbD4nLFxuICAnPGJyPicsXG4gICc8aW5wdXQgdHlwZT1cInRleHRcIj4nLFxuICAnPGJyPicsXG4gICc8YnV0dG9uIGNsYXNzPVwiY3JlYXRlLWJ1dHRvblwiPkNyZWF0ZTwvYnV0dG9uPidcblxuXS5qb2luKCcnKVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybS90ZW1wbGF0ZS5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IERvbUVsZW1lbnREZWNvcmF0b3IgZnJvbSAnLi9kb20tZWxlbWVudC5kZWNvcmF0b3IuanMnO1xuXG5jb25zdCBEb21NYW5pcHVsYXRvciA9ICgoKSA9PiB7XG5cbiAgdmFyIGRvY3VtZW50RWxlbWVudCA9IG5ldyBEb21FbGVtZW50RGVjb3JhdG9yKGRvY3VtZW50KTtcbiAgXG4gIHJldHVybiB7XG4gICAgZmluZEFsbCxcbiAgICBmaW5kT25lXG4gIH07XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBuZXcgZG9tIGVsZW1lbnRcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHJldHVybnMge0RvbUVsZW1lbnREZWNvcmF0b3J9XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGUoZWxlbWVudCkge1xuICAgIHJldHVybiBuZXcgRG9tRWxlbWVudERlY29yYXRvcihlbGVtZW50KVxuICB9XG5cbiAgLyoqXG4gICAqINCaZXR1cm5zIG9uZSByZWxldmFudGluZyBlbGVtZW50IGZvciB0aGlzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7RG9tRWxlbWVudERlY29yYXRvcn1cbiAgICovXG4gIGZ1bmN0aW9uIGZpbmRPbmUoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRFbGVtZW50LmZpbmRPbmUoc2VsZWN0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHJlbGV2YW50aW5nIGVsZW1lbnRzIGZvciB0aGlzIHNlbGVjdG9yXG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBmdW5jdGlvbiBmaW5kQWxsKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50RWxlbWVudC5maW5kQWxsKHNlbGVjdG9yKTtcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgRG9tTWFuaXB1bGF0b3JcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaGVscGVycy9kb20vZG9tLW1hbmlwdWxhdG9yLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgSW52YWxpZEFyZ3VtZW50c0Vycm9yIGZyb20gJy4vLi4vaW52YWxpZC1hcmd1bWVudC5lcnJvci5qcyc7XG5cbmNsYXNzIERvbUVsZW1lbnREZWNvcmF0b3Ige1xuXG4gIC8qKlxuICAgKiBjbGFzcyBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTERvY3VtZW50KSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdjb25zdHJ1Y3RvcicsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJIVE1MRWxlbWVudFwiIG9yIGEgXCJIVE1MRG9jdW1lbnRcIicpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNzcyBjbGFzcyBtYW5pcHVsYXRpb25zXG5cbiAgLyoqXG4gICAqIENoZWNrIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc05hbWUpICE9PSAtMVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2hhc0NsYXNzJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjc3MgY2xhc3MgdG8gZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZih0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc05hbWUgKz0gYCAke2NsYXNzTmFtZX1gXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignYWRkQ2xhc3MnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGNzcyBjbGFzcyBmcm9tIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy5fZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShgICR7Y2xhc3NOYW1lfWAsICcnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdyZW1vdmVDbGFzcycsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGV2ZW50c1xuXG4gIC8qKlxuICAgKiBhZGQgY2xpY2sgZXZlbnQgaGFuZGxlciB0byBlbGVtZW50XG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgY2xpY2soY2FsbGJhY2spIHtcbiAgICBpZihjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLm9uKCdjbGljaycsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdjbGljaycsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJmdW5jdGlvblwiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBtb3VzZWVudGVyIGFuZCBtb3VzZWxlYXZlIGV2ZW50IGhhbmRsZXJzIHRvIGVsZW1lbnRcbiAgICogQHBhcmFtIG1vdXNlRW50ZXJDYWxsYmFja1xuICAgKiBAcGFyYW0gbW91c2VMZWF2ZUNhbGxiYWNrXG4gICAqL1xuICBob3Zlcihtb3VzZUVudGVyQ2FsbGJhY2ssIG1vdXNlTGVhdmVDYWxsYmFjaykge1xuICAgIGlmKG1vdXNlRW50ZXJDYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIG1vdXNlTGVhdmVDYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLm9uKCdtb3VzZWVudGVyJywgbW91c2VFbnRlckNhbGxiYWNrKTtcbiAgICAgIHRoaXMub24oJ21vdXNlbGVhdmUnLCBtb3VzZUxlYXZlQ2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2hvdmVyJywgJ2ZpcnN0IGFuZCBzZWNvbmQgYXJndW1lbnRzIG11c3QgYmUgYSBcImZ1bmN0aW9uXCInKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIGV2ZW50IGhhbmRsZXIgdG8gZWxlbWVudFxuICAgKiBAcGFyYW0gZXZlbnROYW1lXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgIGlmKHR5cGVvZiBldmVudE5hbWUgPT09ICdzdHJpbmcnICYmIGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdvbicsICdmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgJyArXG4gICAgICAgICdzZWNvbmQgYXJndW1lbnRzIG11c3QgYmUgYSBcImZ1bmN0aW9uXCInKTtcbiAgICB9XG4gIH1cblxuICAvLyBodG1sXG5cbiAgLyoqXG4gICAqIGNoYW5nZSBlbGVtZW50IGlubmVyIGh0bWxcbiAgICogQHBhcmFtIHRlbXBsYXRlXG4gICAqL1xuICBodG1sKHRlbXBsYXRlKSB7XG4gICAgaWYodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fZWxlbWVudC5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdodG1sJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJyk7XG4gICAgfVxuICB9XG4gIFxuICAvLyBkb21cblxuICAvKipcbiAgICogUmV0dXJucyBvbmUgcmVsZXZhbnRpbmcgZWxlbWVudCBmb3IgdGhpcyBzZWxlY3RvclxuICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge0RvbUVsZW1lbnREZWNvcmF0b3J9XG4gICAqL1xuICBmaW5kT25lKHNlbGVjdG9yKSB7XG4gICAgaWYodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBEb21FbGVtZW50RGVjb3JhdG9yKHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2ZpbmRPbmUnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCByZWxldmFudGluZyBlbGVtZW50cyBmb3IgdGhpcyBzZWxlY3RvclxuICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgZmluZEFsbChzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGVcbiAgICAgICAgLm1hcC5jYWxsKHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIChlbGVtZW50KSA9PlxuICAgICAgICAgIG5ldyBEb21FbGVtZW50RGVjb3JhdG9yKGVsZW1lbnQpKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2ZpbmRBbGwnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb21FbGVtZW50RGVjb3JhdG9yO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2RvbS9kb20tZWxlbWVudC5kZWNvcmF0b3IuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2xDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBOzs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTs7OztBQVlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUM5R0E7QUFDQTs7Ozs7QUFMQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUlBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUNBO0FGQUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0FHdENBOzs7O0FBSUE7QUhDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7QUliQTs7OztBQUlBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBSkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTs7Ozs7Ozs7Ozs7OztBS2pCQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBTENBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QU1sQkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QU5DQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FPZEE7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7Ozs7QUFDQTs7OztBQUVBO0FBQ0E7QVJDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7O0FTekJBOzs7O0FBSUE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7Ozs7O0FBQ0E7Ozs7QUFFQTtBQUNBO0FYQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7QVk3QkE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBYkNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FjM0NBOzs7O0FBSUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FkQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQUdBOzs7Iiwic291cmNlUm9vdCI6IiJ9