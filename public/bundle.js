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

	var _todoFilter = __webpack_require__(8);

	var _todoFilter2 = _interopRequireDefault(_todoFilter);

	var _todoCreationForm = __webpack_require__(11);

	var _todoCreationForm2 = _interopRequireDefault(_todoCreationForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _todoFilter2.default)(_applicationController2.default); /**
	                                                             * Created by ridel1e on 12/10/2016.
	                                                             */

	(0, _todoCreationForm2.default)(_applicationController2.default);

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

	var _dom = __webpack_require__(4);

	var _dom2 = _interopRequireDefault(_dom);

	var _errors = __webpack_require__(17);

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

	var _invalidArgumentError = __webpack_require__(15);

	var _invalidArgumentError2 = _interopRequireDefault(_invalidArgumentError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by ridel1e on 13/10/2016.
	 */

	var core = function () {

	  var moduleData = {};
	  var debug = true;

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _sandbox = __webpack_require__(18);

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

	var _domManipulator = __webpack_require__(5);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _widget = __webpack_require__(9);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (applicationController) {
	  return (0, _widget2.default)(applicationController);
	}; /**
	    * Created by ridel1e on 12/10/2016.
	    */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _template = __webpack_require__(10);

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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _widget = __webpack_require__(12);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (ApplicationController) {
	  return (0, _widget2.default)(ApplicationController);
	}; /**
	    * Created by ridel1e on 13/10/2016.
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
/* 13 */
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

/***/ },
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(16);

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
/* 18 */
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
	        throw new _invalidArgumentError2.default('click():', 'argument should be DOM Object');
	      }
	    }
	  }]);

	  return Sandbox;
	}();

		exports.default = Sandbox;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDBiNTM0YWYwMjRmMGFiMDZjNGQ2Iiwid2VicGFjazovLy9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvY29yZS5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy9hcHAvY29yZS9zYW5kYm94L2luZGV4LmpzIiwid2VicGFjazovLy9hcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2RvbS5qcyIsIndlYnBhY2s6Ly8vYXBwL2hlbHBlcnMvZG9tLW1hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy9hcHAvaGVscGVycy9kb20tZWxlbWVudC5kZWNvcmF0b3IuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tZmlsdGVyL2luZGV4LmpzIiwid2VicGFjazovLy9hcHAvY29tcG9uZW50cy90b2RvLWZpbHRlci93aWRnZXQuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tZmlsdGVyL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy9hcHAvY29tcG9uZW50cy90b2RvLWNyZWF0aW9uLWZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybS93aWRnZXQuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybS90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vYXBwL2hlbHBlcnMvaW52YWxpZC1hcmd1bWVudC5lcnJvci5qcyIsIndlYnBhY2s6Ly8vYXBwL2hlbHBlcnMvbG9nZ2VyLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvZXJyb3JzLmhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL3NhbmRib3gvc2FuZGJveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0Y29tcG9uZW50c1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBjb21wb25lbnRzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IGNvbXBvbmVudHM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDBiNTM0YWYwMjRmMGFiMDZjNGQ2XG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTIvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgQXBwbGljYXRpb25Db250cm9sbGVyIGZyb20gJ2NvcmUvYXBwbGljYXRpb24tY29udHJvbGxlcic7XG5pbXBvcnQgdG9kb0ZpbHRlcldpZGdldCBmcm9tICdjb21wb25lbnRzL3RvZG8tZmlsdGVyJztcbmltcG9ydCB0b2RvQ3JlYXRpb25Gb3JtV2lkZ2V0IGZyb20gJ2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtJztcblxudG9kb0ZpbHRlcldpZGdldChBcHBsaWNhdGlvbkNvbnRyb2xsZXIpO1xudG9kb0NyZWF0aW9uRm9ybVdpZGdldChBcHBsaWNhdGlvbkNvbnRyb2xsZXIpO1xuXG5BcHBsaWNhdGlvbkNvbnRyb2xsZXIuc3RhcnRBbGwoKTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBDb3JlIGZyb20gJy4vY29yZS5qcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBlcnJvcnNIYW5kbGVyIGZyb20gJy4vZXJyb3JzLmhhbmRsZXInO1xuXG4vLyBlcnJvcnMgaGFuZGxlclxuZXJyb3JzSGFuZGxlcihDb3JlLmRlYnVnKTtcblxuLy8gZXh0ZW5zaW9uc1xuQ29yZS5leHRlbmQoJ2RvbScsIGRvbSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29yZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgU2FuZGJveCBmcm9tICdjb3JlL3NhbmRib3gnO1xuaW1wb3J0IEludmFsaWRBcmd1bWVudHNFcnJvciBmcm9tICdoZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanMnO1xuXG5jb25zdCBjb3JlID0gKCgpID0+IHtcbiAgXG4gIGNvbnN0IG1vZHVsZURhdGEgPSB7fTtcbiAgY29uc3QgZGVidWcgPSB0cnVlO1xuICBcbiAgcmV0dXJuIHtcbiAgICBnZXQgZGVidWcoKSB7XG4gICAgICByZXR1cm4gZGVidWc7XG4gICAgfSxcbiAgICBleHRlbmQsXG4gICAgcmVnaXN0ZXIsXG4gICAgc3RhcnQsXG4gICAgc3RhcnRBbGwsXG4gICAgc3RvcCxcbiAgICBzdG9wQWxsLFxuICB9O1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBtb2R1bGUgaW4gYXBwXG4gICAqIEBwYXJhbSBtb2R1bGVOYW1lXG4gICAqIEBwYXJhbSBjcmVhdG9yXG4gICAqL1xuICBmdW5jdGlvbiByZWdpc3Rlcihtb2R1bGVOYW1lLCBjcmVhdG9yKSB7XG4gICAgaWYodHlwZW9mIG1vZHVsZU5hbWUgPT09ICdzdHJpbmcnICYmIGNyZWF0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgbW9kdWxlRGF0YVttb2R1bGVOYW1lXSA9IHtcbiAgICAgICAgY3JlYXRvcixcbiAgICAgICAgaW5zdGFuY2U6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ3JlZ2lzdGVyJywgJ2ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiLCAnICtcbiAgICAgICAgICAnc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBcImZ1bmN0aW9uXCInKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgY29uY3JldGUgbW9kdWxlXG4gICAqIEBwYXJhbSBtb2R1bGVOYW1lXG4gICAqL1xuICBmdW5jdGlvbiBzdGFydChtb2R1bGVOYW1lKSB7XG5cbiAgICBpZih0eXBlb2YgbW9kdWxlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ3N0YXJ0JywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJyk7XG4gICAgfVxuXG4gICAgbW9kdWxlRGF0YVttb2R1bGVOYW1lXS5pbnN0YW5jZSA9IFxuICAgICAgbW9kdWxlRGF0YVttb2R1bGVOYW1lXS5jcmVhdG9yKG5ldyBTYW5kYm94KHRoaXMsIG1vZHVsZU5hbWUpKTtcbiAgICBcbiAgICBjb25zdCBpbnN0YW5jZSA9IG1vZHVsZURhdGFbbW9kdWxlTmFtZV0uaW5zdGFuY2U7XG4gICAgXG4gICAgaWYoaW5zdGFuY2UuaW5pdCBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIGluc3RhbmNlLmRlc3Ryb3kgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgaW5zdGFuY2UuaW5pdCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCgpOiBtb2R1bGUgZG9lc25cXCd0IGhhdmUgXCJpbml0XCIgb3IgXCJkZXN0cm95XCIgZnVuY3Rpb24gJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgY29uY3JldGUgbW9kdWxlXG4gICAqIEBwYXJhbSBtb2R1bGVOYW1lXG4gICAqL1xuICBmdW5jdGlvbiBzdG9wKG1vZHVsZU5hbWUpIHtcblxuICAgIGlmKHR5cGVvZiBtb2R1bGVOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignc3RvcCcsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZHVsZSA9IG1vZHVsZURhdGFbbW9kdWxlTmFtZV07XG5cbiAgICBpZihtb2R1bGUuaW5zdGFuY2UgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGlmKG1vZHVsZS5pbnN0YW5jZS5kZXN0cm95IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgbW9kdWxlRGF0YVttb2R1bGVOYW1lXS5pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgIG1vZHVsZURhdGFbbW9kdWxlTmFtZV0uaW5zdGFuY2UgPSBudWxsO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc3RvcCgpOiBtb2R1bGUgZG9lc1xcJ3QgaGF2ZSBcImRlc3Ryb3kgbWV0aG9kXCInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0b3AoKTogbW9kdWxlIHNob3VsZCBiZSBzdGFydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCBhcHBsaWNhdGlvbiBjb250cm9sbGVyXG4gICAqIEBwYXJhbSBleHRlbnNpb25OYW1lXG4gICAqIEBwYXJhbSBleHRlbnNpb25PYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIGV4dGVuZChleHRlbnNpb25OYW1lLCBleHRlbnNpb25PYmplY3QpIHtcbiAgICBpZih0eXBlb2YgZXh0ZW5zaW9uTmFtZSA9PT0gJ3N0cmluZycgJiYgZXh0ZW5zaW9uT2JqZWN0IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICB0aGlzW2V4dGVuc2lvbk5hbWVdID0gZXh0ZW5zaW9uT2JqZWN0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignZXh0ZW5kJywgJ2ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiLCAnICtcbiAgICAgICAnc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYW4gXCJPYmplY3RcIicpO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gc3RhcnRBbGwoKSB7XG4gICAgT2JqZWN0LmtleXMobW9kdWxlRGF0YSkuZm9yRWFjaCgobW9kdWxlTmFtZSkgPT4gdGhpcy5zdGFydChtb2R1bGVOYW1lKSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHN0b3BBbGwoKSB7XG4gICAgT2JqZWN0LmtleXMobW9kdWxlRGF0YSkuZm9yRWFjaCgobW9kdWxlTmFtZSkgPT4gdGhpcy5zdG9wKG1vZHVsZU5hbWUpKTtcbiAgfVxufSkoKTtcblxuXG5leHBvcnQgZGVmYXVsdCBjb3JlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvY29yZS5qc1xuICoqLyIsInVuZGVmaW5lZFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIFxuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IHNhbmRib3ggZnJvbSAnLi9zYW5kYm94JztcblxuZXhwb3J0IGRlZmF1bHQgc2FuZGJveDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9zYW5kYm94L2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgRG9tTWFuaXB1bGF0b3IgZnJvbSAnaGVscGVycy9kb20tbWFuaXB1bGF0b3InO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbmRBbGwsXG4gICAgZmluZE9uZSAgXG4gIH07XG5cbiAgZnVuY3Rpb24gZmluZEFsbChzZWxlY3Rvcikge1xuICAgIHJldHVybiBEb21NYW5pcHVsYXRvci5maW5kQWxsKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRPbmUoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gRG9tTWFuaXB1bGF0b3IuZmluZE9uZShzZWxlY3Rvcik7XG4gIH1cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvZG9tLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgRG9tRWxlbWVudERlY29yYXRvciBmcm9tICcuL2RvbS1lbGVtZW50LmRlY29yYXRvcic7XG5cbmNvbnN0IERvbU1hbmlwdWxhdG9yID0gKCgpID0+IHtcblxuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gbmV3IERvbUVsZW1lbnREZWNvcmF0b3IoZG9jdW1lbnQpO1xuICBcbiAgcmV0dXJuIHtcbiAgICBmaW5kQWxsLFxuICAgIGZpbmRPbmVcbiAgfTtcblxuICAvKipcbiAgICogY3JlYXRlIG5ldyBkb20gZWxlbWVudFxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7RG9tRWxlbWVudERlY29yYXRvcn1cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIG5ldyBEb21FbGVtZW50RGVjb3JhdG9yKGVsZW1lbnQpXG4gIH1cblxuICAvKipcbiAgICog0JpldHVybnMgb25lIHJlbGV2YW50aW5nIGVsZW1lbnQgZm9yIHRoaXMgc2VsZWN0b3JcbiAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtEb21FbGVtZW50RGVjb3JhdG9yfVxuICAgKi9cbiAgZnVuY3Rpb24gZmluZE9uZShzZWxlY3Rvcikge1xuICAgIHJldHVybiBkb2N1bWVudEVsZW1lbnQuZmluZE9uZShzZWxlY3Rvcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcmVsZXZhbnRpbmcgZWxlbWVudHMgZm9yIHRoaXMgc2VsZWN0b3JcbiAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGZ1bmN0aW9uIGZpbmRBbGwoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRFbGVtZW50LmZpbmRBbGwoc2VsZWN0b3IpO1xuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBEb21NYW5pcHVsYXRvclxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2RvbS1tYW5pcHVsYXRvci5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IEludmFsaWRBcmd1bWVudHNFcnJvciBmcm9tICcuL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanMnO1xuXG5jbGFzcyBEb21FbGVtZW50RGVjb3JhdG9yIHtcblxuICAvKipcbiAgICogY2xhc3MgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignY29uc3RydWN0b3InLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwiSFRNTEVsZW1lbnRcIiBvciBhIFwiSFRNTERvY3VtZW50XCInKTtcbiAgICB9XG4gIH1cblxuICAvLyBjc3MgY2xhc3MgbWFuaXB1bGF0aW9uc1xuXG4gIC8qKlxuICAgKiBDaGVjayBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZih0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPT0gLTFcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdoYXNDbGFzcycsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY3NzIGNsYXNzIHRvIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NOYW1lICs9IGAgJHtjbGFzc05hbWV9YFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2FkZENsYXNzJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjc3MgY2xhc3MgZnJvbSBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuX2VsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoYCAke2NsYXNzTmFtZX1gLCAnJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcigncmVtb3ZlQ2xhc3MnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKTtcbiAgICB9XG4gIH1cblxuICAvLyBldmVudHNcblxuICAvKipcbiAgICogYWRkIGNsaWNrIGV2ZW50IGhhbmRsZXIgdG8gZWxlbWVudFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIGNsaWNrKGNhbGxiYWNrKSB7XG4gICAgaWYoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5vbignY2xpY2snLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignY2xpY2snLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgbW91c2VlbnRlciBhbmQgbW91c2VsZWF2ZSBldmVudCBoYW5kbGVycyB0byBlbGVtZW50XG4gICAqIEBwYXJhbSBtb3VzZUVudGVyQ2FsbGJhY2tcbiAgICogQHBhcmFtIG1vdXNlTGVhdmVDYWxsYmFja1xuICAgKi9cbiAgaG92ZXIobW91c2VFbnRlckNhbGxiYWNrLCBtb3VzZUxlYXZlQ2FsbGJhY2spIHtcbiAgICBpZihtb3VzZUVudGVyQ2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBtb3VzZUxlYXZlQ2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5vbignbW91c2VlbnRlcicsIG1vdXNlRW50ZXJDYWxsYmFjayk7XG4gICAgICB0aGlzLm9uKCdtb3VzZWxlYXZlJywgbW91c2VMZWF2ZUNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdob3ZlcicsICdmaXJzdCBhbmQgc2Vjb25kIGFyZ3VtZW50cyBtdXN0IGJlIGEgXCJmdW5jdGlvblwiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBldmVudCBoYW5kbGVyIHRvIGVsZW1lbnRcbiAgICogQHBhcmFtIGV2ZW50TmFtZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICBpZih0eXBlb2YgZXZlbnROYW1lID09PSAnc3RyaW5nJyAmJiBjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignb24nLCAnZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCIsICcgK1xuICAgICAgICAnc2Vjb25kIGFyZ3VtZW50cyBtdXN0IGJlIGEgXCJmdW5jdGlvblwiJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gaHRtbFxuXG4gIC8qKlxuICAgKiBjaGFuZ2UgZWxlbWVudCBpbm5lciBodG1sXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxuICAgKi9cbiAgaHRtbCh0ZW1wbGF0ZSkge1xuICAgIGlmKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignaHRtbCcsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gZG9tXG5cbiAgLyoqXG4gICAqIFJldHVybnMgb25lIHJlbGV2YW50aW5nIGVsZW1lbnQgZm9yIHRoaXMgc2VsZWN0b3JcbiAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtEb21FbGVtZW50RGVjb3JhdG9yfVxuICAgKi9cbiAgZmluZE9uZShzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgRG9tRWxlbWVudERlY29yYXRvcih0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdmaW5kT25lJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcmVsZXZhbnRpbmcgZWxlbWVudHMgZm9yIHRoaXMgc2VsZWN0b3JcbiAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGZpbmRBbGwoc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlXG4gICAgICAgIC5tYXAuY2FsbCh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAoZWxlbWVudCkgPT5cbiAgICAgICAgICBuZXcgRG9tRWxlbWVudERlY29yYXRvcihlbGVtZW50KSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdmaW5kQWxsJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJylcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9tRWxlbWVudERlY29yYXRvcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaGVscGVycy9kb20tZWxlbWVudC5kZWNvcmF0b3IuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMi8xMC8yMDE2LlxuICovXG5cbmltcG9ydCB3aWRnZXQgZnJvbSAnLi93aWRnZXQnO1xuXG5leHBvcnQgZGVmYXVsdCAoYXBwbGljYXRpb25Db250cm9sbGVyKSA9PiBcbiAgd2lkZ2V0KGFwcGxpY2F0aW9uQ29udHJvbGxlcik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29tcG9uZW50cy90b2RvLWZpbHRlci9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEyLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG5jb25zdCBXSURHRVRfTkFNRSA9ICd0b2RvLWZpbHRlcic7XG5cbmNvbnN0IHdpZGdldCA9IChzYW5kYm94KSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2FuZGJveC5pbml0aWFsaXplVGVtcGxhdGUodGVtcGxhdGUpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuXG4gIH1cbiAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCAoYXBwbGljYXRpb25Db250cm9sbGVyKSA9PiBcbiAgYXBwbGljYXRpb25Db250cm9sbGVyLnJlZ2lzdGVyKFdJREdFVF9OQU1FLCB3aWRnZXQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvd2lkZ2V0LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTIvMTAvMjAxNi5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gICc8c3Bhbj5GaWx0ZXIgRmllbGQ6PC9zcGFuPicsXG4gICc8YnI+JyxcbiAgJzxpbnB1dCBwbGFjZWhvbGRlcj1cImZpbHRlclwiPidcbl0uam9pbignJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvdGVtcGxhdGUuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCB3aWRnZXQgZnJvbSAnLi93aWRnZXQnO1xuXG5leHBvcnQgZGVmYXVsdCAoQXBwbGljYXRpb25Db250cm9sbGVyKSA9PiBcbiAgd2lkZ2V0KEFwcGxpY2F0aW9uQ29udHJvbGxlcik7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmNvbnN0IFdJREdFVF9OQU1FID0gJ3RvZG8tY3JlYXRpb24tZm9ybSc7XG5cbmNvbnN0IHdpZGdldCA9IChzYW5kYm94KSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNhbmRib3guaW5pdGlhbGl6ZVRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICBcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBzYW5kYm94LmZpbmRPbmUoYC5jcmVhdGUtYnV0dG9uYCk7XG4gICAgY3JlYXRlQnV0dG9uLmNsaWNrKCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnY3JlYXRlZCcpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcblxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoQXBwbGljYXRpb25Db250cm9sbGVyKSA9PlxuICBBcHBsaWNhdGlvbkNvbnRyb2xsZXIucmVnaXN0ZXIoV0lER0VUX05BTUUsIHdpZGdldClcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29tcG9uZW50cy90b2RvLWNyZWF0aW9uLWZvcm0vd2lkZ2V0LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gICc8bGFiZWw+Q3JlYXRlIHRhc2s8L2xhYmVsPicsXG4gICc8YnI+JyxcbiAgJzxpbnB1dCB0eXBlPVwidGV4dFwiPicsXG4gICc8YnI+JyxcbiAgJzxidXR0b24gY2xhc3M9XCJjcmVhdGUtYnV0dG9uXCI+Q3JlYXRlPC9idXR0b24+J1xuXG5dLmpvaW4oJycpXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL3RlbXBsYXRlLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTcvMTAvMjAxNi5cbiAqL1xuXG5jbGFzcyBJbnZhbGlkQXJndW1lbnRFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1ldGhvZE5hbWUsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSAnSW52YWxpZEFyZ3VtZW50RXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IGAke21ldGhvZE5hbWV9KCk6IG1ldGhvZCBnb3QgaW52YWxpZCBhcmd1bWVudHM6ICR7bWVzc2FnZX1gO1xuICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEludmFsaWRBcmd1bWVudEVycm9yO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxNy8xMC8yMDE2LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nXG4gIH07XG5cbiAgZnVuY3Rpb24gbG9nKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2hlbHBlcnMvbG9nZ2VyLnNlcnZpY2UuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxNy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBsb2dnZXJTZXJ2aWNlIGZyb20gJ2hlbHBlcnMvbG9nZ2VyLnNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCAoKGRlYnVnKSA9PiB7XG4gIGlmKGRlYnVnKSB7XG4gICAgd2luZG93Lm9uZXJyb3IgPSAobXNnLCB1cmwsIGxpbmUsIGNvbCwgZXJyb3IpID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH07XG4gIH1cbiAgZWxzZSB7XG4gICAgd2luZG93Lm9uZXJyb3IgPSAobXNnLCB1cmwsIGxpbmUsIGNvbCwgZXJyb3IpID0+IHtcbiAgICAgIGxvZ2dlclNlcnZpY2UubG9nKDIsIGAke2Vycm9yLm1lc3NhZ2V9XFxuJHtlcnJvci5zdGFja31gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH1cbn0pO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2Vycm9ycy5oYW5kbGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgSW52YWxpZEFyZ3VtZW50c0Vycm9yIGZyb20gJ2hlbHBlcnMvaW52YWxpZC1hcmd1bWVudC5lcnJvci5qcyc7ICBcbiAgXG5jbGFzcyBTYW5kYm94IHtcbiAgY29uc3RydWN0b3IoYXBwbGljYXRpb25Db250cm9sbGVyLCBtb2R1bGVTZWxlY3Rvcikge1xuICAgIHRoaXMuYXBwbGljYXRpb25Db250cm9sbGVyID0gYXBwbGljYXRpb25Db250cm9sbGVyO1xuICAgIHRoaXMuY29udGFpbmVyID1cbiAgICAgIGFwcGxpY2F0aW9uQ29udHJvbGxlci5kb20uZmluZE9uZShgIyR7bW9kdWxlU2VsZWN0b3J9YCk7XG4gIH1cbiAgXG4gIGZpbmRPbmUoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZmluZE9uZShzZWxlY3Rvcik7XG4gIH1cbiAgXG4gIGZpbmRBbGwoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZmluZEFsbChzZWxlY3Rvcik7XG4gIH1cblxuICBpbml0aWFsaXplVGVtcGxhdGUoaHRtbCkge1xuICAgIHRoaXMuY29udGFpbmVyLmh0bWwoaHRtbCk7XG4gIH1cblxuICAvLyBldmVudHNcbiAgY2xpY2soZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICBpZihlbGVtZW50LmNsaWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIGVsZW1lbnQuY2xpY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2NsaWNrKCk6JywgJ2FyZ3VtZW50IHNob3VsZCBiZSBET00gT2JqZWN0JylcbiAgICB9XG4gIH07XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBTYW5kYm94O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL3NhbmRib3gvc2FuZGJveC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbENBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBOzs7O0FBWUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBTkE7Ozs7QUFPQTtBQUNBO0FBQ0E7QUNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7OztBQ2hIQTtBQUNBOzs7OztBQUxBOzs7Ozs7Ozs7Ozs7OztBQ0lBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FGQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUdsQkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBSENBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FJM0NBOzs7O0FBSUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FKQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7O0FLeEpBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7Ozs7O0FBQ0E7Ozs7QUFFQTtBQUNBO0FOQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7OztBT3pCQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBOzs7OztBQUNBOzs7O0FBRUE7QUFDQTtBVENBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7O0FVN0JBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7OztBQ0pBOzs7O0FBSUE7QVhDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7QVliQTs7OztBQUlBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBWkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTs7Ozs7Ozs7Ozs7OztBYWpCQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBYkNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QWNsQkE7Ozs7QUFJQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBZEFBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQUtBOzs7Iiwic291cmNlUm9vdCI6IiJ9