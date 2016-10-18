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

	var _error = __webpack_require__(17);

	var _error2 = _interopRequireDefault(_error);

	var _todoFilter = __webpack_require__(11);

	var _todoFilter2 = _interopRequireDefault(_todoFilter);

	var _todoCreationForm = __webpack_require__(14);

	var _todoCreationForm2 = _interopRequireDefault(_todoCreationForm);

	var _todoList = __webpack_require__(21);

	var _todoList2 = _interopRequireDefault(_todoList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _error2.default)(_applicationController2.default.debug); /**
	                                                              * Created by ridel1e on 12/10/2016.
	                                                              */

	(0, _todoCreationForm2.default)(_applicationController2.default);
	(0, _todoFilter2.default)(_applicationController2.default);
	(0, _todoList2.default)(_applicationController2.default);

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

	var _state = __webpack_require__(18);

	var _state2 = _interopRequireDefault(_state);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// extensions
	_core2.default.extend('dom', _dom2.default); /**
	                                              * Created by ridel1e on 13/10/2016.
	                                              */

	_core2.default.extend('state', _state2.default);

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
	      throw new _invalidArgumentError2.default('register', 'first argument must be a "string", second argument must be a "function")');
	    }
	  }

	  /**
	   * Start concrete module
	   * @param moduleName
	   */
	  function start(moduleName) {

	    if (typeof moduleName === 'string') {

	      moduleData[moduleName].instance = moduleData[moduleName].creator(new _sandbox2.default(this, moduleName));

	      try {
	        moduleData[moduleName].instance.init();
	      } catch (e) {
	        _loggerService2.default.log(2, 'start(): module "' + moduleName + '" can\'t be started. ' + e.message);
	      }
	    } else {
	      throw new _invalidArgumentError2.default('start', 'argument must be a "string"');
	    }
	  }

	  /**
	   * Stop concrete module
	   * @param moduleName
	   */
	  function stop(moduleName) {

	    if (typeof moduleName === 'string') {
	      var module = moduleData[moduleName];
	      try {
	        module.instance.destroy();
	        module.instance = null;
	      } catch (e) {
	        _loggerService2.default.log(2, 'stop(): module "' + moduleName + '" can\'t be stopped. ' + e.message);
	      }
	    } else {
	      throw new _invalidArgumentError2.default('stop', 'argument must be a "string"');
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
	      throw new _invalidArgumentError2.default('extend', 'first argument must be a "string",' + 'second argument must be an "Object"');
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

	    // element attributes

	  }, {
	    key: 'getValue',
	    value: function getValue(element) {
	      return element.getValue();
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
	  }, {
	    key: 'notify',


	    // state
	    value: function notify(action) {
	      this.applicationController.state.notify(action);
	    }
	  }, {
	    key: 'listen',
	    value: function listen(name, callback) {
	      this.applicationController.state.listen(name, callback);
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

	var _domManipulator = __webpack_require__(8);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _domElementDecorator = __webpack_require__(9);

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
/* 9 */
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

	    /**
	     * Returns value if element is input
	     * @returns {*}
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this._element.value;
	    }
	  }]);

	  return DomElementDecorator;
	}();

		exports.default = DomElementDecorator;

/***/ },
/* 10 */,
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

	  var componentState = {};

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

	    var createButton = sandbox.findOne('.task-creation-form__create-button');
	    var titleInput = sandbox.findOne('.task-creation-form__title-input');

	    createButton.click(function () {
	      createTask(sandbox.getValue(titleInput));
	    });
	  }

	  function createTask(title) {
	    sandbox.notify({
	      type: 'SAVE_TASK',
	      payload: {
	        title: title,
	        completed: false
	      }
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

		exports.default = ['<div class="task-creation-form">', '<label class="task-creation-form__label">Create task</label>', '<br>', '<input type="text" class="task-creation-form__title-input">', '<br>', '<button class="task-creation-form__create-button">Create</button>', '</div>'].join('');

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(6);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (debug) {
	  window.onerror = function (msg, url, line, col, error) {
	    if (!debug) {
	      _logger2.default.log(2, error.message + '\n' + error.stack);
	      return true;
	    } else {
	      throw error;
	    }
	  };
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

	var _core = __webpack_require__(19);

	var _core2 = _interopRequireDefault(_core);

	var _todos = __webpack_require__(20);

	var _todos2 = _interopRequireDefault(_todos);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by ridel1e on 18/10/2016.
	 */

	_core2.default.addReducer('todos', _todos2.default);

	exports.default = _core2.default;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _invalidArgumentError = __webpack_require__(5);

	var _invalidArgumentError2 = _interopRequireDefault(_invalidArgumentError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {

	  var state = {};
	  var reducers = {};
	  var listeners = {};

	  return {
	    addReducer: addReducer,
	    listen: listen,
	    notify: notify
	  };

	  /**
	   * 
	   * @param name
	   * @param reducer
	   */
	  function addReducer(name, reducer) {
	    if (typeof name === 'string' && reducer instanceof Object) {
	      reducers[name] = reducer;
	      state[name] = reducer(state[name], {});
	      listeners[name] = [];
	    } else {
	      throw new _invalidArgumentError2.default('addReducer', 'first argument must be an Object' + 'second argument must be a string');
	    }
	  }

	  /**
	   * 
	   * @param action
	   */
	  function notify(action) {
	    if (action instanceof Object) {
	      Object.keys(reducers).forEach(function (name) {
	        state[name] = reducers[name](state[name], action);
	        listeners[name].forEach(function (listener) {
	          return listener(state[name]);
	        });
	      });
	    } else {
	      throw new _invalidArgumentError2.default('notify', 'argument must be an Object');
	    }
	  }

	  /**
	   *
	   * @param name
	   * @param callback
	   * @returns {Function}
	   */
	  function listen(name, callback) {
	    if (typeof name === 'string' && callback instanceof Function) {
	      listeners[name].push(callback);
	    } else {
	      throw new _invalidArgumentError2.default('getFromState', 'first argument must be a string,' + ' second argument must be a Function');
	    }
	  }
	}(); /**
	      * Created by ridel1e on 18/10/2016.
	      */

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Created by ridel1e on 18/10/2016.
	 */

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'SAVE_TASK':
	      return [].concat(_toConsumableArray(state), [action.payload]);
	    default:
	      return state;
	  }
		};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _widget = __webpack_require__(22);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (applicationController) {
	  return (0, _widget2.default)(applicationController);
	}; /**
	    * Created by ridel1e on 18/10/2016.
	    */

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _template = __webpack_require__(23);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WIDGET_NAME = 'todo-list'; /**
	                                * Created by ridel1e on 18/10/2016.
	                                */

	var widget = function widget(sandbox) {
	  return {
	    init: init,
	    destroy: destroy
	  };

	  function init() {
	    sandbox.initializeTemplate(_template2.default);

	    var taskList = sandbox.findOne('.task-list');

	    sandbox.listen('todos', function (todos) {
	      addTodo(todos[todos.length - 1]);
	    });
	  }

	  function destroy() {}

	  function addTodo(todos) {}
	};

	exports.default = function (ApplicationController) {
	  return ApplicationController.register(WIDGET_NAME, widget);
		};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by ridel1e on 18/10/2016.
	 */

		exports.default = ['<div class="task-list">', '</div>'].join('');

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDQ3YTUxNjNmM2VhZmY3OGRlMTIwIiwid2VicGFjazovLy9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvY29yZS5qcyIsIndlYnBhY2s6Ly8vIiwid2VicGFjazovLy9hcHAvY29yZS9zYW5kYm94L2luZGV4LmpzIiwid2VicGFjazovLy9hcHAvY29yZS9zYW5kYm94L3NhbmRib3guanMiLCJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2xvZ2dlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy9hcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL2RvbS5qcyIsIndlYnBhY2s6Ly8vYXBwL2hlbHBlcnMvZG9tL2RvbS1tYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vYXBwL2hlbHBlcnMvZG9tL2RvbS1lbGVtZW50LmRlY29yYXRvci5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tZmlsdGVyL3dpZGdldC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL3dpZGdldC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy9hcHAvaGVscGVycy9lcnJvci5oYW5kbGVyLmpzIiwid2VicGFjazovLy9hcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL3N0YXRlL2luZGV4LmpzIiwid2VicGFjazovLy9hcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL3N0YXRlL2NvcmUuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvc3RhdGUvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vL2FwcC9jb21wb25lbnRzL3RvZG8tbGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1saXN0L3dpZGdldC5qcyIsIndlYnBhY2s6Ly8vYXBwL2NvbXBvbmVudHMvdG9kby1saXN0L3RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRjb21wb25lbnRzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIGNvbXBvbmVudHMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gY29tcG9uZW50cztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDdhNTE2M2YzZWFmZjc4ZGUxMjBcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMi8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBBcHBsaWNhdGlvbkNvbnRyb2xsZXIgZnJvbSAnY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyJztcbmltcG9ydCBlcnJvckhhbmRsZXIgZnJvbSAnaGVscGVycy9lcnJvci5oYW5kbGVyJztcblxuaW1wb3J0IHRvZG9GaWx0ZXJXaWRnZXQgZnJvbSAnY29tcG9uZW50cy90b2RvLWZpbHRlcic7XG5pbXBvcnQgdG9kb0NyZWF0aW9uRm9ybVdpZGdldCBmcm9tICdjb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnY29tcG9uZW50cy90b2RvLWxpc3QnO1xuXG5lcnJvckhhbmRsZXIoQXBwbGljYXRpb25Db250cm9sbGVyLmRlYnVnKTtcblxudG9kb0NyZWF0aW9uRm9ybVdpZGdldChBcHBsaWNhdGlvbkNvbnRyb2xsZXIpO1xudG9kb0ZpbHRlcldpZGdldChBcHBsaWNhdGlvbkNvbnRyb2xsZXIpO1xudG9kb0xpc3QoQXBwbGljYXRpb25Db250cm9sbGVyKTtcblxuXG5BcHBsaWNhdGlvbkNvbnRyb2xsZXIuc3RhcnRBbGwoKTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBDb3JlIGZyb20gJy4vY29yZS5qcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3N0YXRlJztcblxuLy8gZXh0ZW5zaW9uc1xuQ29yZS5leHRlbmQoJ2RvbScsIGRvbSk7XG5Db3JlLmV4dGVuZCgnc3RhdGUnLCBzdGF0ZSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvcmU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvcmUvYXBwbGljYXRpb24tY29udHJvbGxlci9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IFNhbmRib3ggZnJvbSAnY29yZS9zYW5kYm94JztcbmltcG9ydCBJbnZhbGlkQXJndW1lbnRzRXJyb3IgZnJvbSAnaGVscGVycy9pbnZhbGlkLWFyZ3VtZW50LmVycm9yLmpzJztcbmltcG9ydCBsb2dnZXJTZXJ2aWNlIGZyb20gJ2hlbHBlcnMvbG9nZ2VyLnNlcnZpY2UuanMnO1xuXG5jb25zdCBjb3JlID0gKCgpID0+IHtcbiAgXG4gIGNvbnN0IG1vZHVsZURhdGEgPSB7fTtcbiAgY29uc3QgZGVidWcgPSBmYWxzZTtcbiAgXG4gIHJldHVybiB7XG4gICAgZ2V0IGRlYnVnKCkge1xuICAgICAgcmV0dXJuIGRlYnVnO1xuICAgIH0sXG4gICAgZXh0ZW5kLFxuICAgIHJlZ2lzdGVyLFxuICAgIHN0YXJ0LFxuICAgIHN0YXJ0QWxsLFxuICAgIHN0b3AsXG4gICAgc3RvcEFsbFxuICB9O1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBtb2R1bGUgaW4gYXBwXG4gICAqIEBwYXJhbSBtb2R1bGVOYW1lXG4gICAqIEBwYXJhbSBjcmVhdG9yXG4gICAqL1xuICBmdW5jdGlvbiByZWdpc3Rlcihtb2R1bGVOYW1lLCBjcmVhdG9yKSB7XG4gICAgaWYodHlwZW9mIG1vZHVsZU5hbWUgPT09ICdzdHJpbmcnICYmIGNyZWF0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgbW9kdWxlRGF0YVttb2R1bGVOYW1lXSA9IHtcbiAgICAgICAgY3JlYXRvcixcbiAgICAgICAgaW5zdGFuY2U6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdyZWdpc3RlcicsXG4gICAgICAgICdmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIiwgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBcImZ1bmN0aW9uXCIpJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGNvbmNyZXRlIG1vZHVsZVxuICAgKiBAcGFyYW0gbW9kdWxlTmFtZVxuICAgKi9cbiAgZnVuY3Rpb24gc3RhcnQobW9kdWxlTmFtZSkge1xuXG4gICAgaWYodHlwZW9mIG1vZHVsZU5hbWUgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgIG1vZHVsZURhdGFbbW9kdWxlTmFtZV0uaW5zdGFuY2UgPVxuICAgICAgICBtb2R1bGVEYXRhW21vZHVsZU5hbWVdLmNyZWF0b3IobmV3IFNhbmRib3godGhpcywgbW9kdWxlTmFtZSkpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBtb2R1bGVEYXRhW21vZHVsZU5hbWVdLmluc3RhbmNlLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGxvZ2dlclNlcnZpY2UubG9nKDIsIGBzdGFydCgpOiBtb2R1bGUgXCIke21vZHVsZU5hbWV9XCIgY2FuJ3QgYmUgc3RhcnRlZC4gJHtlLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignc3RhcnQnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBjb25jcmV0ZSBtb2R1bGVcbiAgICogQHBhcmFtIG1vZHVsZU5hbWVcbiAgICovXG4gIGZ1bmN0aW9uIHN0b3AobW9kdWxlTmFtZSkge1xuXG4gICAgaWYodHlwZW9mIG1vZHVsZU5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBtb2R1bGUgPSBtb2R1bGVEYXRhW21vZHVsZU5hbWVdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbW9kdWxlLmluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgbW9kdWxlLmluc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGxvZ2dlclNlcnZpY2UubG9nKDIsIGBzdG9wKCk6IG1vZHVsZSBcIiR7bW9kdWxlTmFtZX1cIiBjYW4ndCBiZSBzdG9wcGVkLiAke2UubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdzdG9wJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCBhcHBsaWNhdGlvbiBjb250cm9sbGVyXG4gICAqIEBwYXJhbSBleHRlbnNpb25OYW1lXG4gICAqIEBwYXJhbSBleHRlbnNpb25PYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIGV4dGVuZChleHRlbnNpb25OYW1lLCBleHRlbnNpb25PYmplY3QpIHtcbiAgICBpZih0eXBlb2YgZXh0ZW5zaW9uTmFtZSA9PT0gJ3N0cmluZycgJiYgZXh0ZW5zaW9uT2JqZWN0IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICB0aGlzW2V4dGVuc2lvbk5hbWVdID0gZXh0ZW5zaW9uT2JqZWN0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignZXh0ZW5kJywgJ2ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiLCcgK1xuICAgICAgICdzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhbiBcIk9iamVjdFwiJyk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBzdGFydEFsbCgpIHtcbiAgICBPYmplY3Qua2V5cyhtb2R1bGVEYXRhKS5mb3JFYWNoKChtb2R1bGVOYW1lKSA9PiB0aGlzLnN0YXJ0KG1vZHVsZU5hbWUpKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gc3RvcEFsbCgpIHtcbiAgICBPYmplY3Qua2V5cyhtb2R1bGVEYXRhKS5mb3JFYWNoKChtb2R1bGVOYW1lKSA9PiB0aGlzLnN0b3AobW9kdWxlTmFtZSkpO1xuICB9XG59KSgpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvcmU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvcmUvYXBwbGljYXRpb24tY29udHJvbGxlci9jb3JlLmpzXG4gKiovIiwidW5kZWZpbmVkXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgc2FuZGJveCBmcm9tICcuL3NhbmRib3gnO1xuXG5leHBvcnQgZGVmYXVsdCBzYW5kYm94O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL3NhbmRib3gvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBJbnZhbGlkQXJndW1lbnRzRXJyb3IgZnJvbSAnaGVscGVycy9pbnZhbGlkLWFyZ3VtZW50LmVycm9yLmpzJzsgIFxuICBcbmNsYXNzIFNhbmRib3gge1xuICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbkNvbnRyb2xsZXIsIG1vZHVsZVNlbGVjdG9yKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvbkNvbnRyb2xsZXIgPSBhcHBsaWNhdGlvbkNvbnRyb2xsZXI7XG4gICAgdGhpcy5jb250YWluZXIgPVxuICAgICAgYXBwbGljYXRpb25Db250cm9sbGVyLmRvbS5maW5kT25lKGAjJHttb2R1bGVTZWxlY3Rvcn1gKTtcbiAgfVxuICBcbiAgZmluZE9uZShzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5maW5kT25lKHNlbGVjdG9yKTtcbiAgfVxuICBcbiAgZmluZEFsbChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5maW5kQWxsKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGluaXRpYWxpemVUZW1wbGF0ZShodG1sKSB7XG4gICAgdGhpcy5jb250YWluZXIuaHRtbChodG1sKTtcbiAgfVxuXG4gIC8vIGVsZW1lbnQgYXR0cmlidXRlc1xuICBnZXRWYWx1ZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0VmFsdWUoKVxuICB9XG5cbiAgLy8gZXZlbnRzXG4gIGNsaWNrKGVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgaWYoZWxlbWVudC5jbGljayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBlbGVtZW50LmNsaWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdjbGljaygpOicsICdmaXJzdCBhcmd1bWVudCBzaG91bGQgYmUgYSBET00gT2JqZWN0JylcbiAgICB9XG4gIH07XG5cbiAgLy8gc3RhdGVcbiAgbm90aWZ5KGFjdGlvbikge1xuICAgIHRoaXMuYXBwbGljYXRpb25Db250cm9sbGVyLnN0YXRlLm5vdGlmeShhY3Rpb24pO1xuICB9XG5cbiAgbGlzdGVuKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvbkNvbnRyb2xsZXIuc3RhdGUubGlzdGVuKG5hbWUsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgU2FuZGJveDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9zYW5kYm94L3NhbmRib3guanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxNy8xMC8yMDE2LlxuICovXG5cbmNsYXNzIEludmFsaWRBcmd1bWVudEVycm9yIHtcbiAgY29uc3RydWN0b3IobWV0aG9kTmFtZSwgbWVzc2FnZSkge1xuICAgIHRoaXMubmFtZSA9ICdJbnZhbGlkQXJndW1lbnRFcnJvcic7XG4gICAgdGhpcy5tZXNzYWdlID0gYCR7bWV0aG9kTmFtZX0oKTogbWV0aG9kIGdvdCBpbnZhbGlkIGFyZ3VtZW50czogJHttZXNzYWdlfWA7XG4gICAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgSW52YWxpZEFyZ3VtZW50RXJyb3I7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2hlbHBlcnMvaW52YWxpZC1hcmd1bWVudC5lcnJvci5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDE3LzEwLzIwMTYuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIGxvZyh0eXBlLCBtZXNzYWdlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2xvZ2dlci5zZXJ2aWNlLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgRG9tTWFuaXB1bGF0b3IgZnJvbSAnaGVscGVycy9kb20vZG9tLW1hbmlwdWxhdG9yJztcblxuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaW5kQWxsLFxuICAgIGZpbmRPbmUgIFxuICB9O1xuXG4gIGZ1bmN0aW9uIGZpbmRBbGwoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gRG9tTWFuaXB1bGF0b3IuZmluZEFsbChzZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kT25lKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIERvbU1hbmlwdWxhdG9yLmZpbmRPbmUoc2VsZWN0b3IpO1xuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvcmUvYXBwbGljYXRpb24tY29udHJvbGxlci9kb20uanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBEb21FbGVtZW50RGVjb3JhdG9yIGZyb20gJy4vZG9tLWVsZW1lbnQuZGVjb3JhdG9yLmpzJztcblxuY29uc3QgRG9tTWFuaXB1bGF0b3IgPSAoKCkgPT4ge1xuXG4gIHZhciBkb2N1bWVudEVsZW1lbnQgPSBuZXcgRG9tRWxlbWVudERlY29yYXRvcihkb2N1bWVudCk7XG4gIFxuICByZXR1cm4ge1xuICAgIGZpbmRBbGwsXG4gICAgZmluZE9uZVxuICB9O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgbmV3IGRvbSBlbGVtZW50XG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtEb21FbGVtZW50RGVjb3JhdG9yfVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gbmV3IERvbUVsZW1lbnREZWNvcmF0b3IoZWxlbWVudClcbiAgfVxuXG4gIC8qKlxuICAgKiDQmmV0dXJucyBvbmUgcmVsZXZhbnRpbmcgZWxlbWVudCBmb3IgdGhpcyBzZWxlY3RvclxuICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge0RvbUVsZW1lbnREZWNvcmF0b3J9XG4gICAqL1xuICBmdW5jdGlvbiBmaW5kT25lKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50RWxlbWVudC5maW5kT25lKHNlbGVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCByZWxldmFudGluZyBlbGVtZW50cyBmb3IgdGhpcyBzZWxlY3RvclxuICAgKiBAcGFyYW0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgZnVuY3Rpb24gZmluZEFsbChzZWxlY3Rvcikge1xuICAgIHJldHVybiBkb2N1bWVudEVsZW1lbnQuZmluZEFsbChzZWxlY3Rvcik7XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERvbU1hbmlwdWxhdG9yXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2hlbHBlcnMvZG9tL2RvbS1tYW5pcHVsYXRvci5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDEzLzEwLzIwMTYuXG4gKi9cblxuaW1wb3J0IEludmFsaWRBcmd1bWVudHNFcnJvciBmcm9tICcuLy4uL2ludmFsaWQtYXJndW1lbnQuZXJyb3IuanMnO1xuXG5jbGFzcyBEb21FbGVtZW50RGVjb3JhdG9yIHtcblxuICAvKipcbiAgICogY2xhc3MgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignY29uc3RydWN0b3InLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwiSFRNTEVsZW1lbnRcIiBvciBhIFwiSFRNTERvY3VtZW50XCInKTtcbiAgICB9XG4gIH1cblxuICAvLyBjc3MgY2xhc3MgbWFuaXB1bGF0aW9uc1xuXG4gIC8qKlxuICAgKiBDaGVjayBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZih0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPT0gLTFcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdoYXNDbGFzcycsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY3NzIGNsYXNzIHRvIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NOYW1lICs9IGAgJHtjbGFzc05hbWV9YFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2FkZENsYXNzJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjc3MgY2xhc3MgZnJvbSBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuX2VsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoYCAke2NsYXNzTmFtZX1gLCAnJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcigncmVtb3ZlQ2xhc3MnLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCInKTtcbiAgICB9XG4gIH1cblxuICAvLyBldmVudHNcblxuICAvKipcbiAgICogYWRkIGNsaWNrIGV2ZW50IGhhbmRsZXIgdG8gZWxlbWVudFxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIGNsaWNrKGNhbGxiYWNrKSB7XG4gICAgaWYoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5vbignY2xpY2snLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignY2xpY2snLCAnYXJndW1lbnQgbXVzdCBiZSBhIFwiZnVuY3Rpb25cIicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgbW91c2VlbnRlciBhbmQgbW91c2VsZWF2ZSBldmVudCBoYW5kbGVycyB0byBlbGVtZW50XG4gICAqIEBwYXJhbSBtb3VzZUVudGVyQ2FsbGJhY2tcbiAgICogQHBhcmFtIG1vdXNlTGVhdmVDYWxsYmFja1xuICAgKi9cbiAgaG92ZXIobW91c2VFbnRlckNhbGxiYWNrLCBtb3VzZUxlYXZlQ2FsbGJhY2spIHtcbiAgICBpZihtb3VzZUVudGVyQ2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBtb3VzZUxlYXZlQ2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5vbignbW91c2VlbnRlcicsIG1vdXNlRW50ZXJDYWxsYmFjayk7XG4gICAgICB0aGlzLm9uKCdtb3VzZWxlYXZlJywgbW91c2VMZWF2ZUNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdob3ZlcicsICdmaXJzdCBhbmQgc2Vjb25kIGFyZ3VtZW50cyBtdXN0IGJlIGEgXCJmdW5jdGlvblwiJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBldmVudCBoYW5kbGVyIHRvIGVsZW1lbnRcbiAgICogQHBhcmFtIGV2ZW50TmFtZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICBpZih0eXBlb2YgZXZlbnROYW1lID09PSAnc3RyaW5nJyAmJiBjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignb24nLCAnZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFwic3RyaW5nXCIsICcgK1xuICAgICAgICAnc2Vjb25kIGFyZ3VtZW50cyBtdXN0IGJlIGEgXCJmdW5jdGlvblwiJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gaHRtbFxuXG4gIC8qKlxuICAgKiBjaGFuZ2UgZWxlbWVudCBpbm5lciBodG1sXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxuICAgKi9cbiAgaHRtbCh0ZW1wbGF0ZSkge1xuICAgIGlmKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignaHRtbCcsICdhcmd1bWVudCBtdXN0IGJlIGEgXCJzdHJpbmdcIicpO1xuICAgIH1cbiAgfVxuICBcbiAgLy8gZG9tXG5cbiAgLyoqXG4gICAqIFJldHVybnMgb25lIHJlbGV2YW50aW5nIGVsZW1lbnQgZm9yIHRoaXMgc2VsZWN0b3JcbiAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtEb21FbGVtZW50RGVjb3JhdG9yfVxuICAgKi9cbiAgZmluZE9uZShzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgRG9tRWxlbWVudERlY29yYXRvcih0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdmaW5kT25lJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgcmVsZXZhbnRpbmcgZWxlbWVudHMgZm9yIHRoaXMgc2VsZWN0b3JcbiAgICogQHBhcmFtIHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGZpbmRBbGwoc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlXG4gICAgICAgIC5tYXAuY2FsbCh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAoZWxlbWVudCkgPT5cbiAgICAgICAgICBuZXcgRG9tRWxlbWVudERlY29yYXRvcihlbGVtZW50KSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50c0Vycm9yKCdmaW5kQWxsJywgJ2FyZ3VtZW50IG11c3QgYmUgYSBcInN0cmluZ1wiJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB2YWx1ZSBpZiBlbGVtZW50IGlzIGlucHV0XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQudmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9tRWxlbWVudERlY29yYXRvcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaGVscGVycy9kb20vZG9tLWVsZW1lbnQuZGVjb3JhdG9yLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTIvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgd2lkZ2V0IGZyb20gJy4vd2lkZ2V0JztcblxuZXhwb3J0IGRlZmF1bHQgKGFwcGxpY2F0aW9uQ29udHJvbGxlcikgPT4gXG4gIHdpZGdldChhcHBsaWNhdGlvbkNvbnRyb2xsZXIpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMi8xMC8yMDE2LlxuICovXG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcblxuY29uc3QgV0lER0VUX05BTUUgPSAndG9kby1maWx0ZXInO1xuXG5jb25zdCB3aWRnZXQgPSAoc2FuZGJveCkgPT4ge1xuXG4gIGNvbnN0IGNvbXBvbmVudFN0YXRlID0ge307XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2FuZGJveC5pbml0aWFsaXplVGVtcGxhdGUodGVtcGxhdGUpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuXG4gIH1cbiAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCAoYXBwbGljYXRpb25Db250cm9sbGVyKSA9PiBcbiAgYXBwbGljYXRpb25Db250cm9sbGVyLnJlZ2lzdGVyKFdJREdFVF9OQU1FLCB3aWRnZXQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvd2lkZ2V0LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTIvMTAvMjAxNi5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gICc8c3Bhbj5GaWx0ZXIgRmllbGQ6PC9zcGFuPicsXG4gICc8YnI+JyxcbiAgJzxpbnB1dCBwbGFjZWhvbGRlcj1cImZpbHRlclwiPidcbl0uam9pbignJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1maWx0ZXIvdGVtcGxhdGUuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCB3aWRnZXQgZnJvbSAnLi93aWRnZXQnO1xuXG5leHBvcnQgZGVmYXVsdCAoQXBwbGljYXRpb25Db250cm9sbGVyKSA9PiBcbiAgd2lkZ2V0KEFwcGxpY2F0aW9uQ29udHJvbGxlcik7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1jcmVhdGlvbi1mb3JtL2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTMvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmNvbnN0IFdJREdFVF9OQU1FID0gJ3RvZG8tY3JlYXRpb24tZm9ybSc7XG5cbmNvbnN0IHdpZGdldCA9IChzYW5kYm94KSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNhbmRib3guaW5pdGlhbGl6ZVRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICBcbiAgICBjb25zdCBjcmVhdGVCdXR0b24gPSBzYW5kYm94LmZpbmRPbmUoYC50YXNrLWNyZWF0aW9uLWZvcm1fX2NyZWF0ZS1idXR0b25gKTtcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gc2FuZGJveC5maW5kT25lKGAudGFzay1jcmVhdGlvbi1mb3JtX190aXRsZS1pbnB1dGApO1xuXG4gICAgY3JlYXRlQnV0dG9uLmNsaWNrKCAoKSA9PiB7XG4gICAgICBjcmVhdGVUYXNrKHNhbmRib3guZ2V0VmFsdWUodGl0bGVJbnB1dCkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGFzayh0aXRsZSkge1xuICAgIHNhbmRib3gubm90aWZ5KHtcbiAgICAgIHR5cGU6ICdTQVZFX1RBU0snLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgY29tcGxldGVkOiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IChBcHBsaWNhdGlvbkNvbnRyb2xsZXIpID0+XG4gIEFwcGxpY2F0aW9uQ29udHJvbGxlci5yZWdpc3RlcihXSURHRVRfTkFNRSwgd2lkZ2V0KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb21wb25lbnRzL3RvZG8tY3JlYXRpb24tZm9ybS93aWRnZXQuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxMy8xMC8yMDE2LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgJzxkaXYgY2xhc3M9XCJ0YXNrLWNyZWF0aW9uLWZvcm1cIj4nLFxuICAgICc8bGFiZWwgY2xhc3M9XCJ0YXNrLWNyZWF0aW9uLWZvcm1fX2xhYmVsXCI+Q3JlYXRlIHRhc2s8L2xhYmVsPicsXG4gICAgJzxicj4nLFxuICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRhc2stY3JlYXRpb24tZm9ybV9fdGl0bGUtaW5wdXRcIj4nLFxuICAgICc8YnI+JyxcbiAgICAnPGJ1dHRvbiBjbGFzcz1cInRhc2stY3JlYXRpb24tZm9ybV9fY3JlYXRlLWJ1dHRvblwiPkNyZWF0ZTwvYnV0dG9uPicsXG4gICc8L2Rpdj4nXG5cbl0uam9pbignJylcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29tcG9uZW50cy90b2RvLWNyZWF0aW9uLWZvcm0vdGVtcGxhdGUuanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxNy8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBsb2dnZXJTZXJ2aWNlIGZyb20gJ2hlbHBlcnMvbG9nZ2VyLnNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCAoKGRlYnVnKSA9PiB7XG4gICAgd2luZG93Lm9uZXJyb3IgPSAobXNnLCB1cmwsIGxpbmUsIGNvbCwgZXJyb3IpID0+IHtcbiAgICAgIGlmKCFkZWJ1Zykge1xuICAgICAgICBsb2dnZXJTZXJ2aWNlLmxvZygyLCBgJHtlcnJvci5tZXNzYWdlfVxcbiR7ZXJyb3Iuc3RhY2t9YCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yOyAgXG4gICAgICB9XG4gICAgfTtcbn0pO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaGVscGVycy9lcnJvci5oYW5kbGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTgvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgY29yZSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHRvZG9zIGZyb20gJy4vdG9kb3MnO1xuXG5jb3JlLmFkZFJlZHVjZXIoJ3RvZG9zJywgdG9kb3MpO1xuXG5leHBvcnQgZGVmYXVsdCBjb3JlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvc3RhdGUvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxOC8xMC8yMDE2LlxuICovXG5cbmltcG9ydCBJbnZhbGlkQXJndW1lbnRzRXJyb3IgZnJvbSAnaGVscGVycy9pbnZhbGlkLWFyZ3VtZW50LmVycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKCgpID0+IHtcblxuICBjb25zdCBzdGF0ZSA9IHt9O1xuICBjb25zdCByZWR1Y2VycyA9IHt9O1xuICBjb25zdCBsaXN0ZW5lcnMgPSB7fTtcblxuICByZXR1cm4ge1xuICAgIGFkZFJlZHVjZXIsXG4gICAgbGlzdGVuLFxuICAgIG5vdGlmeVxuICB9O1xuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIHJlZHVjZXJcbiAgICovXG4gIGZ1bmN0aW9uIGFkZFJlZHVjZXIobmFtZSwgcmVkdWNlcikge1xuICAgIGlmKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJyAmJiByZWR1Y2VyIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICByZWR1Y2Vyc1tuYW1lXSA9IHJlZHVjZXI7XG4gICAgICBzdGF0ZVtuYW1lXSA9IHJlZHVjZXIoc3RhdGVbbmFtZV0sIHt9KTtcbiAgICAgIGxpc3RlbmVyc1tuYW1lXSA9IFtdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRzRXJyb3IoJ2FkZFJlZHVjZXInLCAnZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhbiBPYmplY3QnICtcbiAgICAgICAgJ3NlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gYWN0aW9uXG4gICAqL1xuICBmdW5jdGlvbiBub3RpZnkoYWN0aW9uKSB7XG4gICAgaWYoYWN0aW9uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgIHN0YXRlW25hbWVdID0gcmVkdWNlcnNbbmFtZV0oc3RhdGVbbmFtZV0sIGFjdGlvbik7XG4gICAgICAgICBsaXN0ZW5lcnNbbmFtZV0uZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcihzdGF0ZVtuYW1lXSkpO1xuICAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignbm90aWZ5JywgJ2FyZ3VtZW50IG11c3QgYmUgYW4gT2JqZWN0JylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGxpc3RlbihuYW1lLCBjYWxsYmFjaykge1xuICAgIGlmKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJyAmJiBjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBsaXN0ZW5lcnNbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRBcmd1bWVudHNFcnJvcignZ2V0RnJvbVN0YXRlJywgJ2ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsJyArXG4gICAgICAgICcgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBGdW5jdGlvbicpXG4gICAgfVxuICB9XG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb3JlL2FwcGxpY2F0aW9uLWNvbnRyb2xsZXIvc3RhdGUvY29yZS5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDE4LzEwLzIwMTYuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0gW10sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnU0FWRV9UQVNLJzpcbiAgICAgIHJldHVybiBbXG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhY3Rpb24ucGF5bG9hZFxuXG4gICAgICBdO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29yZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyL3N0YXRlL3RvZG9zLmpzXG4gKiovIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IHJpZGVsMWUgb24gMTgvMTAvMjAxNi5cbiAqL1xuXG5pbXBvcnQgd2lkZ2V0IGZyb20gJy4vd2lkZ2V0JztcblxuZXhwb3J0IGRlZmF1bHQgKGFwcGxpY2F0aW9uQ29udHJvbGxlcikgPT5cbiAgd2lkZ2V0KGFwcGxpY2F0aW9uQ29udHJvbGxlcik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29tcG9uZW50cy90b2RvLWxpc3QvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIENyZWF0ZWQgYnkgcmlkZWwxZSBvbiAxOC8xMC8yMDE2LlxuICovXG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcblxuY29uc3QgV0lER0VUX05BTUUgPSAndG9kby1saXN0JztcblxuY29uc3Qgd2lkZ2V0ID0gKHNhbmRib3gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNhbmRib3guaW5pdGlhbGl6ZVRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICBcbiAgICBjb25zdCB0YXNrTGlzdCA9IHNhbmRib3guZmluZE9uZSgnLnRhc2stbGlzdCcpO1xuICAgIFxuICAgIHNhbmRib3gubGlzdGVuKCd0b2RvcycsICh0b2RvcykgPT4ge1xuICAgICAgYWRkVG9kbyh0b2Rvc1t0b2Rvcy5sZW5ndGggLSAxXSk7XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRvZG8odG9kb3MpIHtcbiAgICBcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKEFwcGxpY2F0aW9uQ29udHJvbGxlcikgPT5cbiAgQXBwbGljYXRpb25Db250cm9sbGVyLnJlZ2lzdGVyKFdJREdFVF9OQU1FLCB3aWRnZXQpXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2NvbXBvbmVudHMvdG9kby1saXN0L3dpZGdldC5qc1xuICoqLyIsIi8qKlxuICogQ3JlYXRlZCBieSByaWRlbDFlIG9uIDE4LzEwLzIwMTYuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAnPGRpdiBjbGFzcz1cInRhc2stbGlzdFwiPicsXG4gICc8L2Rpdj4nXG5dLmpvaW4oJycpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb21wb25lbnRzL3RvZG8tbGlzdC90ZW1wbGF0ZS5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbENBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7QUNkQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7Ozs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUM1R0E7QUFDQTs7Ozs7QUFMQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUlBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUNBO0FGQUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQUtBOzs7Ozs7Ozs7Ozs7OztBR3BEQTs7OztBQUlBO0FIQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7O0FJYkE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUpDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7Ozs7Ozs7Ozs7Ozs7QUtqQkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUxDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBTWpCQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FOQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QU8zQ0E7Ozs7QUFJQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QVBBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7O0FRaEtBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7Ozs7O0FBQ0E7Ozs7QUFFQTtBQUNBO0FUQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7QVUzQkE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTs7Ozs7QUFDQTs7OztBQUVBO0FBQ0E7QVpDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7OztBYXpDQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QWRDQTtBY0NBO0FkQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBZVpBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBTkE7Ozs7QUFPQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBaEJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QWlCbEVBOzs7O0FBSUE7QUFBQTtBQUFBO0FBQ0E7QWpCQUE7QUFDQTtBQUNBO0FBS0E7QUFDQTtBaUJSQTtBQVVBOzs7Ozs7Ozs7Ozs7QUNYQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBOzs7OztBQUNBOzs7O0FBRUE7QW5CQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7QW9CakNBOzs7O0FBSUE7OzsiLCJzb3VyY2VSb290IjoiIn0=