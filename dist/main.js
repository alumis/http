/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@alumis/cancellationtoken/index.ts":
/*!*********************************************************!*\
  !*** ./node_modules/@alumis/cancellationtoken/index.ts ***!
  \*********************************************************/
/*! exports provided: CancellationToken, CancellationTokenNone, LinkedCancellationToken, OperationCancelledError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancellationToken", function() { return CancellationToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancellationTokenNone", function() { return CancellationTokenNone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedCancellationToken", function() { return LinkedCancellationToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperationCancelledError", function() { return OperationCancelledError; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CancellationToken {
  constructor() {
    _defineProperty(this, "isCancellationRequested", void 0);

    _defineProperty(this, "listeners", new Set());
  }

  addListener(listener) {
    if (this.isCancellationRequested) listener();else this.listeners.add(listener);
  }

  cancel() {
    if (!this.isCancellationRequested) {
      this.isCancellationRequested = true;

      for (var f of this.listeners) f();

      delete this.listeners;
    }
  }

  removeListener(listener) {
    if (this.listeners) this.listeners.delete(listener);
  }

  link(token) {
    return new LinkedCancellationToken([this, token]);
  }

}
class CancellationTokenNone extends CancellationToken {
  addListener(_listener) {}

  removeListener(_listener) {}

  cancel() {
    throw new Error();
  }

  static get singleton() {
    return CancellationTokenNone._singleton || (CancellationTokenNone._singleton = new CancellationTokenNone());
  }

}

_defineProperty(CancellationTokenNone, "_singleton", void 0);

class LinkedCancellationToken extends CancellationToken {
  constructor(tokens) {
    super();
    this.tokens = tokens;
    this.cancel = this.cancel.bind(this);

    for (var t of tokens) t.addListener(this.cancel);
  }

  dispose() {
    for (var t of this.tokens) t.removeListener(this.cancel);
  }

}
class OperationCancelledError {}

/***/ }),

/***/ "./node_modules/@alumis/observables/index.ts":
/*!***************************************************!*\
  !*** ./node_modules/@alumis/observables/index.ts ***!
  \***************************************************/
/*! exports provided: stack, Observable, ObservableSubscription, ObservableWithError, ComputedObservable, whenAsync, alwaysWhen, ObservableArray, MappedObservableArray, ObservableSet, MappedObservableSet, SortedObservableSet, FilteredObservableSet, o, co, LocalStorageObservable, SessionStorageObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Observable */ "./node_modules/@alumis/observables/src/Observable.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stack", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["stack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObservableSubscription", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["ObservableSubscription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObservableWithError", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["ObservableWithError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComputedObservable", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["ComputedObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whenAsync", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["whenAsync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "alwaysWhen", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["alwaysWhen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObservableArray", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["ObservableArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MappedObservableArray", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["MappedObservableArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObservableSet", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["ObservableSet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MappedObservableSet", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["MappedObservableSet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortedObservableSet", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["SortedObservableSet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilteredObservableSet", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["FilteredObservableSet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "o", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["o"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "co", function() { return _src_Observable__WEBPACK_IMPORTED_MODULE_0__["co"]; });

/* harmony import */ var _src_LocalStorageObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/LocalStorageObservable */ "./node_modules/@alumis/observables/src/LocalStorageObservable.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocalStorageObservable", function() { return _src_LocalStorageObservable__WEBPACK_IMPORTED_MODULE_1__["LocalStorageObservable"]; });

/* harmony import */ var _src_SessionStorageObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/SessionStorageObservable */ "./node_modules/@alumis/observables/src/SessionStorageObservable.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SessionStorageObservable", function() { return _src_SessionStorageObservable__WEBPACK_IMPORTED_MODULE_2__["SessionStorageObservable"]; });





/***/ }),

/***/ "./node_modules/@alumis/observables/src/LocalStorageObservable.ts":
/*!************************************************************************!*\
  !*** ./node_modules/@alumis/observables/src/LocalStorageObservable.ts ***!
  \************************************************************************/
/*! exports provided: LocalStorageObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageObservable", function() { return LocalStorageObservable; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable */ "./node_modules/@alumis/observables/src/Observable.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class LocalStorageObservable extends _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "key", void 0);
  }

  static createLocalStorage(key, defaultValue) {
    let result = cache.get(key);
    if (result) return result;
    cache.set(key, result = new LocalStorageObservable());
    result.key = key;
    let storageValue = localStorage.getItem(key);

    if (storageValue) {
      try {
        var parsed = JSON.parse(storageValue);
      } catch (e) {
        console.error(e);
        result.wrappedValue = defaultValue;
        return;
      }

      result.wrappedValue = parsed;
    } else result.wrappedValue = defaultValue;

    return result;
  }

  get value() {
    if (_Observable__WEBPACK_IMPORTED_MODULE_0__["stack"].length) {
      let computedObservable = _Observable__WEBPACK_IMPORTED_MODULE_0__["stack"][_Observable__WEBPACK_IMPORTED_MODULE_0__["stack"].length - 1];
      if (!computedObservable.observables.has(this)) computedObservable.observables.set(this, this.subscribeSneakInLine(computedObservable.refresh));
    }

    return this.wrappedValue;
  }

  set value(newValue) {
    let oldValue = this.wrappedValue;

    if (newValue !== oldValue) {
      this.wrappedValue = newValue;
      localStorage.setItem(this.key, JSON.stringify(newValue));
      this.notifySubscribers(newValue, oldValue);
    }
  }

  refresh() {
    let storageValue = localStorage.getItem(this.key);
    if (storageValue) this.value = JSON.parse(storageValue);
  }

  remove() {
    localStorage.removeItem(this.key);
  }

  dispose() {
    delete this.wrappedValue;
    let node = this._prioritizedHead;

    if (node) {
      for (node = node.next; node != this._prioritizedTail; node = node.next) node.recycle();

      this._prioritizedHead.recycle();

      delete this._prioritizedHead;

      this._prioritizedTail.recycle();

      delete this._prioritizedTail;
    }

    for (node = this._head.next; node != this._tail; node = node.next) node.recycle();

    this._head.recycle();

    delete this._head;

    this._tail.recycle();

    delete this._tail;
  }

}
let cache = new Map();

(function () {
  let hidden, visibilityChange;

  if (typeof window.document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof window.document["msHidden"] !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof window.document["webkitHidden"] !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  window.document.addEventListener(visibilityChange, () => {
    if (!window.document[hidden]) cache.forEach(v => {
      v.refresh();
    });
  }, false);
})();

/***/ }),

/***/ "./node_modules/@alumis/observables/src/Observable.ts":
/*!************************************************************!*\
  !*** ./node_modules/@alumis/observables/src/Observable.ts ***!
  \************************************************************/
/*! exports provided: stack, Observable, ObservableSubscription, ObservableWithError, ComputedObservable, whenAsync, alwaysWhen, ObservableArray, MappedObservableArray, ObservableSet, MappedObservableSet, SortedObservableSet, FilteredObservableSet, o, co */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stack", function() { return stack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return Observable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableSubscription", function() { return ObservableSubscription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableWithError", function() { return ObservableWithError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComputedObservable", function() { return ComputedObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenAsync", function() { return whenAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alwaysWhen", function() { return alwaysWhen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableArray", function() { return ObservableArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MappedObservableArray", function() { return MappedObservableArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableSet", function() { return ObservableSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MappedObservableSet", function() { return MappedObservableSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortedObservableSet", function() { return SortedObservableSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilteredObservableSet", function() { return FilteredObservableSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return o; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "co", function() { return co; });
/* harmony import */ var _alumis_semaphore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alumis/semaphore */ "./node_modules/@alumis/semaphore/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


let stack = [];
let observables = [];
let observablesLength = 0;
class Observable {
  constructor() {
    _defineProperty(this, "wrappedValue", void 0);

    _defineProperty(this, "_head", ObservableSubscription.create());

    _defineProperty(this, "_tail", ObservableSubscription.create());

    _defineProperty(this, "_prioritizedHead", void 0);

    _defineProperty(this, "_prioritizedTail", void 0);

    (this._head.next = this._tail).previous = this._head;
    this.dispose = this.dispose.bind(this);
  }

  static create(value) {
    if (observablesLength) {
      var result = observables[--observablesLength];
      observables[observablesLength] = null;
    } else var result = new Observable();

    result.wrappedValue = value;
    return result;
  }

  get value() {
    if (stack.length) {
      let computedObservable = stack[stack.length - 1];
      if (!computedObservable.observables.has(this)) computedObservable.observables.set(this, this.subscribeSneakInLine(computedObservable.refresh));
    }

    return this.wrappedValue;
  }

  set value(newValue) {
    let oldValue = this.wrappedValue;

    if (newValue !== oldValue) {
      this.wrappedValue = newValue;
      this.notifySubscribers(newValue, oldValue);
    }
  }

  toString() {
    return this.value;
  }

  setValueDontNotify(newValue, exemptedObservableSubscription) {
    let oldValue = this.wrappedValue;

    if (newValue !== oldValue) {
      this.wrappedValue = newValue;
      this.notifySubscribersExcept(newValue, oldValue, exemptedObservableSubscription);
    }
  }

  get prioritizedTail() {
    let value = this._prioritizedTail;
    if (value) return value;
    this._prioritizedHead = ObservableSubscription.create();
    this._prioritizedTail = value = ObservableSubscription.create();
    (this._prioritizedHead.next = this._prioritizedTail).previous = this._prioritizedHead;
    return value;
  }

  notifySubscribers(newValue, oldValue) {
    let node = this._prioritizedHead;

    if (node) {
      for (node = node.next; node !== this._prioritizedTail;) {
        let currentNode = node;
        node = node.next;
        currentNode.action(newValue, oldValue);
      }
    }

    for (node = this._head.next; node !== this._tail;) {
      let currentNode = node;
      node = node.next;
      currentNode.action(newValue, oldValue);
    }
  }

  notifySubscribersExcept(newValue, oldValue, exemptedObservableSubscription) {
    let node = this._prioritizedHead;

    if (node) {
      for (node = node.next; node !== this._prioritizedTail;) {
        let currentNode = node;
        node = node.next;
        if (currentNode !== exemptedObservableSubscription) currentNode.action(newValue, oldValue);
      }
    }

    for (node = this._head.next; node !== this._tail;) {
      let currentNode = node;
      node = node.next;
      if (currentNode !== exemptedObservableSubscription) currentNode.action(newValue, oldValue);
    }
  }

  invalidate() {
    let value = this.wrappedValue;
    this.notifySubscribers(value, value);
  }

  subscribe(action) {
    return ObservableSubscription.createFromTail(this._tail, action);
  }

  subscribeInvoke(action) {
    action(this.wrappedValue, void 0);
    let subscription = ObservableSubscription.createFromTail(this._tail, action);
    return subscription;
  }

  prioritizedSubscribe(action) {
    return ObservableSubscription.createFromTail(this.prioritizedTail, action);
  }

  prioritizedSubscribeInvoke(action) {
    action(this.wrappedValue, this.wrappedValue);
    let subscription = ObservableSubscription.createFromTail(this.prioritizedTail, action);
    return subscription;
  }

  subscribeSneakInLine(action) {
    return ObservableSubscription.createFromHead(this._head, action);
  }

  dispose(push = true) {
    delete this.wrappedValue;
    let node = this._prioritizedHead;

    if (node) {
      for (node = node.next; node !== this._prioritizedTail;) {
        let currentNode = node;
        node = node.next;
        currentNode.recycle();
      }

      this._prioritizedHead.recycle();

      delete this._prioritizedHead;

      this._prioritizedTail.recycle();

      delete this._prioritizedTail;
    }

    for (node = this._head.next; node !== this._tail;) {
      let currentNode = node;
      node = node.next;
      currentNode.recycle();
    }

    (this._head.next = this._tail).previous = this._head;

    if (push) {
      if (observables.length === observablesLength) observables.push(this);else observables[observablesLength] = this;
      ++observablesLength;
    }
  }

}
let observableSubscriptions = [];
let observableSubscriptionsLength = 0;
class ObservableSubscription {
  constructor() {
    _defineProperty(this, "previous", void 0);

    _defineProperty(this, "next", void 0);

    _defineProperty(this, "action", void 0);

    this.dispose = this.dispose.bind(this);
  }

  static create() {
    if (observableSubscriptionsLength) {
      let existing = observableSubscriptions[--observableSubscriptionsLength];
      observableSubscriptions[observableSubscriptionsLength] = null;
      return existing;
    } else return new ObservableSubscription();
  }

  static createFromTail(tail, action) {
    let result = ObservableSubscription.create();
    (result.previous = tail.previous).next = result;
    (result.next = tail).previous = result;
    result.action = action;
    return result;
  }

  static createFromHead(head, action) {
    let result = ObservableSubscription.create();
    (result.next = head.next).previous = result;
    (result.previous = head).next = result;
    result.action = action;
    return result;
  }

  recycle() {
    delete this.previous;
    delete this.next;
    delete this.action;
    if (observableSubscriptions.length === observableSubscriptionsLength) observableSubscriptions.push(this);else observableSubscriptions[observableSubscriptionsLength] = this;
    ++observableSubscriptionsLength;
  }

  dispose() {
    (this.previous.next = this.next).previous = this.previous;
    this.recycle();
  }

}
let observablesWithError = [];
let observablesWithErrorLength = 0;
class ObservableWithError extends Observable {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "error", Observable.create());
  }

  dispose() {
    delete this.wrappedValue;
    delete this.error.wrappedValue;
    let node = this._prioritizedHead;

    if (node) {
      for (node = node.next; node !== this._prioritizedTail;) {
        let currentNode = node;
        node = node.next;
        currentNode.recycle();
      }

      this._prioritizedHead.recycle();

      delete this._prioritizedHead;
      ;

      this._prioritizedTail.recycle();

      delete this._prioritizedTail;
      ;
    }

    for (node = this._head.next; node !== this._tail;) {
      let currentNode = node;
      node = node.next;
      currentNode.recycle();
    }

    (this._head.next = this._tail).previous = this._head;
    if (observablesWithError.length === observablesWithErrorLength) observablesWithError.push(this);else observablesWithError[observablesWithErrorLength] = this;
    ++observablesWithErrorLength;
  }

}
let computedObservables = [];
let computedObservablesLength = 0;
class ComputedObservable extends ObservableWithError {
  constructor() {
    super();

    _defineProperty(this, "expression", void 0);

    _defineProperty(this, "observables", new Map());

    this.refresh = this.refresh.bind(this);
  }

  static createComputed(expression, preEvaluate = true) {
    if (computedObservablesLength) {
      var result = computedObservables[--computedObservablesLength];
      computedObservables[computedObservablesLength] = null;
    } else var result = new ComputedObservable();

    result.expression = expression;
    if (preEvaluate) result.wrappedValue = result.evaluateExpression();
    return result;
  }

  evaluateExpression() {
    stack.push(this);
    var result;

    try {
      result = this.expression();
    } catch (e) {
      var oldStack = stack;
      stack = [];

      try {
        this.error.value = e;
      } finally {
        (stack = oldStack).pop();
        throw e;
      }
    }

    if (this.error.wrappedValue !== undefined) {
      var oldStack = stack;
      stack = [];

      try {
        this.error.value = undefined;
      } catch {}

      stack = oldStack;
    }

    stack.pop();
    return result;
  }

  postEvaluate() {
    this.wrappedValue = this.evaluateExpression();
  }

  refresh() {
    let observables = this.observables;
    observables.forEach(s => {
      s.dispose();
    });
    this.observables.clear();
    let oldValue = this.wrappedValue,
        newValue = this.evaluateExpression();

    if (newValue !== oldValue) {
      this.wrappedValue = newValue;
      this.notifySubscribers(newValue, oldValue);
    }
  }

  get value() {
    if (stack.length) {
      let computedObservable = stack[stack.length - 1];
      if (!computedObservable.observables.has(this)) computedObservable.observables.set(this, this.subscribeSneakInLine(computedObservable.refresh));
    }

    return this.wrappedValue;
  }

  set value(_) {
    throw new Error("Cannot set the value of a ComputedObservable");
  }

  dispose() {
    this.observables.forEach(s => {
      s.dispose();
    });
    delete this.expression;
    delete this.wrappedValue;
    this.observables.clear();
    let node = this._prioritizedHead;

    if (node) {
      for (node = node.next; node !== this._prioritizedTail;) {
        let currentNode = node;
        node = node.next;
        currentNode.recycle();
      }

      this._prioritizedHead.recycle();

      delete this._prioritizedHead;

      this._prioritizedTail.recycle();

      delete this._prioritizedTail;
    }

    for (node = this._head.next; node !== this._tail;) {
      let currentNode = node;
      node = node.next;
      currentNode.recycle();
    }

    (this._head.next = this._tail).previous = this._head;
    if (computedObservables.length === computedObservablesLength) computedObservables.push(this);else computedObservables[computedObservablesLength] = this;
    ++computedObservablesLength;
    this.error.dispose(false);
  }

}
function whenAsync(expression) {
  let value;

  try {
    value = expression();
  } catch (e) {
    return Promise.reject(value);
  }

  if (value) return Promise.resolve(value);
  return new Promise((resolve, reject) => {
    let computedObservable = ComputedObservable.createComputed(expression, false);
    computedObservable.wrappedValue = value;
    computedObservable.subscribe(n => {
      if (n) {
        computedObservable.dispose();
        resolve(n);
      }
    });
    computedObservable.error.subscribe(e => {
      computedObservable.dispose();
      reject(e);
    });
  });
}
function alwaysWhen(expression, resolve, reject) {
  let result = ComputedObservable.createComputed(expression);
  result.subscribeInvoke(n => {
    if (n) resolve();
  });
  result.error.subscribeInvoke(e => {
    if (e !== undefined) reject(e);
  });
  return result;
}
var _Symbol$iterator = Symbol.iterator;
class ObservableArray {
  constructor(wrappedCollection) {
    _defineProperty(this, "wrappedCollection", void 0);

    _defineProperty(this, "_head", ObservableSubscription.create());

    _defineProperty(this, "_tail", ObservableSubscription.create());

    this.dispose = this.dispose.bind(this);
    if (wrappedCollection) this.wrappedCollection = wrappedCollection;else this.wrappedCollection = [];
    (this._head.next = this._tail).previous = this._head;
  }

  get value() {
    if (stack.length) {
      let computedObservable = stack[stack.length - 1];
      if (!computedObservable.observables.has(this)) computedObservable.observables.set(this, this.subscribeSneakInLine(computedObservable.refresh));
    }

    return this.wrappedCollection;
  }

  notifySubscribers(addedItems, removedItems, index, move) {
    for (let node = this._head.next; node != this._tail; node = node.next) node.action(addedItems, removedItems, index, move);
  }

  subscribe(action) {
    return ObservableSubscription.createFromTail(this._tail, action);
  }

  subscribeSneakInLine(action) {
    return ObservableSubscription.createFromHead(this._head, action);
  }

  [_Symbol$iterator]() {
    return this.value[Symbol.iterator]();
  }

  remove(item) {
    let array = this.wrappedCollection;

    for (let fromIndex = 0;;) {
      fromIndex = array.indexOf(item, fromIndex);
      if (fromIndex === -1) break;
      let removedItem = array[fromIndex];
      array.splice(fromIndex, 1);
      this.notifySubscribers(null, [removedItem], fromIndex);
    }
  }

  removeAt(index) {
    let array = this.wrappedCollection,
        removedItems = [array[index]];
    array.splice(index, 1);
    this.notifySubscribers(null, removedItems, index);
  }

  removeRange(index, count) {
    let array = this.wrappedCollection,
        removedItems = array.splice(index, count);
    if (removedItems.length) this.notifySubscribers(null, removedItems, index);
  }

  clear() {
    let removedItems = this.wrappedCollection;

    if (removedItems.length) {
      this.wrappedCollection = [];
      this.notifySubscribers(null, removedItems, 0);
    }
  }

  add(item) {
    let array = this.wrappedCollection;
    array.push(item);
    this.notifySubscribers([item], null, this.wrappedCollection.length - 1);
  }

  addRange(items) {
    if (items.length) {
      let array = this.wrappedCollection,
          index = array.length;
      array.push.apply(array, items);
      this.notifySubscribers(items, null, index);
    }
  }

  insert(index, item) {
    let array = this.wrappedCollection;
    array.splice(index, 0, item);
    this.notifySubscribers([item], null, index);
  }

  insertRange(index, items) {
    if (items.length) {
      let array = this.wrappedCollection;
      array.splice.apply(array, [index, 0].concat(items));
      this.notifySubscribers(items, null, index);
    }
  }

  reconcile(items) {
    // TODO
    this.clear();
    this.addRange(items);
  }

  contains(item) {
    for (let i of this.wrappedCollection) if (i === item) return true;

    return false;
  }

  map(callbackfn) {
    return new MappedObservableArray(this, callbackfn, false, true);
  }

  dispose() {
    delete this.wrappedCollection;

    for (let node = this._head.next; node != this._tail;) {
      let currentNode = node;
      node = node.next;
      currentNode.recycle();
    }

    this._head.recycle();

    delete this._head;

    this._tail.recycle();

    delete this._tail;
  }

}
class MappedObservableArray extends ObservableArray {
  constructor(sourceCollection, callbackfn, disposeSourceCollection, disposeChildren) {
    super(sourceCollection.wrappedCollection.map(callbackfn));
    this.sourceCollection = sourceCollection;
    this.callbackfn = callbackfn;
    this.disposeSourceCollection = disposeSourceCollection;
    this.disposeChildren = disposeChildren;

    _defineProperty(this, "_sourceCollectionSubscription", void 0);

    let moveMap = new Map();
    this._sourceCollectionSubscription = sourceCollection.subscribe((addedItems, removedItems, index, move) => {
      if (move) {
        if (addedItems) {
          let mappedAddedItems = addedItems.map(t => {
            let uFifo = moveMap.get(t);

            if (uFifo.length === 1) {
              let result = uFifo[0];
              moveMap.delete(t);
              return result;
            }

            return uFifo.shift();
          });
          this.wrappedCollection.splice.apply(this.wrappedCollection, [index, 0].concat(mappedAddedItems));
          this.notifySubscribers(mappedAddedItems, null, index, true);
        } else {
          // Removed items
          let mappedRemovedItems = this.wrappedCollection.splice(index, removedItems.length);

          for (let i = 0; i < removedItems.length; ++i) {
            let t = removedItems[i];
            let u = mappedRemovedItems[i];
            let existingUFifo = moveMap.get(t);
            if (existingUFifo) existingUFifo.push(u);else moveMap.set(t, [u]);
          }

          this.notifySubscribers(null, mappedRemovedItems, index, true);
        }
      } else {
        if (addedItems) {
          let mappedAddedItems = addedItems.map(t => this.callbackfn(t));
          this.wrappedCollection.splice.apply(this.wrappedCollection, [index, 0].concat(mappedAddedItems));
          this.notifySubscribers(mappedAddedItems, null, index, false);
        } else {
          // Removed items
          let mappedRemovedItems = this.wrappedCollection.splice(index, removedItems.length);

          if (this.disposeChildren) {
            for (let u of mappedRemovedItems) {
              if (u.dispose) u.dispose();
            }
          }

          this.notifySubscribers(null, mappedRemovedItems, index, false);
        }
      }
    });
  }

  map(callbackfn) {
    return new MappedObservableArray(this, callbackfn, true, true);
  }

  dispose() {
    if (this.disposeChildren) {
      for (let u of this.wrappedCollection) {
        if (u.dispose) u.dispose();
      }
    }

    super.dispose();

    if (this.disposeSourceCollection) {
      this.sourceCollection.dispose();
      delete this.sourceCollection;
    } else this._sourceCollectionSubscription.dispose();

    delete this._sourceCollectionSubscription;
  }

}
class ObservableSet {
  constructor(wrappedSet) {
    this.wrappedSet = wrappedSet;

    _defineProperty(this, "_head", ObservableSubscription.create());

    _defineProperty(this, "_tail", ObservableSubscription.create());

    this.dispose = this.dispose.bind(this);
    if (!wrappedSet) this.wrappedSet = new Set();
    (this._head.next = this._tail).previous = this._head;
  }

  get value() {
    if (stack.length) {
      let computedObservable = stack[stack.length - 1];
      if (!computedObservable.observables.has(this)) computedObservable.observables.set(this, this.subscribeSneakInLine(computedObservable.refresh));
    }

    return this.wrappedSet;
  }

  add(value) {
    if (!this.wrappedSet.has(value)) {
      this.wrappedSet.add(value);
      this.notifySubscribers([value], null);
      return true;
    }

    return false;
  }

  addItems(items) {
    let addedItems = [];

    for (let i of items) {
      if (!this.wrappedSet.has(i)) {
        this.wrappedSet.add(i);
        addedItems.push(i);
      }
    }

    if (addedItems.length) this.notifySubscribers(addedItems, null);
  }

  reconcile(items) {
    let removedItems = [];

    for (let i of this.wrappedSet) if (!items.has(i)) removedItems.push(i);

    if (removedItems.length) {
      for (let i of removedItems) this.wrappedSet.delete(i);

      this.notifySubscribers(null, removedItems);
    }

    let addedItems = [];

    for (let i of items) {
      if (!this.wrappedSet.has(i)) {
        this.wrappedSet.add(i);
        addedItems.push(i);
      }
    }

    if (addedItems.length) this.notifySubscribers(addedItems, null);
  }

  remove(value) {
    if (this.wrappedSet.has(value)) {
      this.wrappedSet.delete(value);
      this.notifySubscribers(null, [value]);
      return true;
    }

    return false;
  }

  removeItems(items) {
    let removedItems = [];

    for (let i of items) {
      if (this.wrappedSet.has(i)) {
        this.wrappedSet.delete(i);
        removedItems.push(i);
      }
    }

    if (removedItems.length) this.notifySubscribers(null, removedItems);
  }

  clear() {
    let removedItems = [];

    for (let i of this.wrappedSet) removedItems.push(i);

    if (removedItems.length) {
      this.wrappedSet.clear();
      this.notifySubscribers(null, removedItems);
    }
  }

  contains(value) {
    return this.wrappedSet.has(value);
  }

  subscribe(action) {
    return ObservableSubscription.createFromTail(this._tail, action);
  }

  subscribeSneakInLine(action) {
    return ObservableSubscription.createFromHead(this._head, action);
  }

  notifySubscribers(addedItems, removedItems) {
    for (let node = this._head.next; node != this._tail; node = node.next) node.action(addedItems, removedItems);
  }

  filter(callbackfn) {
    return new FilteredObservableSet(this, callbackfn, false);
  }

  sort(comparefn) {
    return new SortedObservableSet(this, comparefn, false);
  }

  map(callbackfn) {
    return new MappedObservableSet(this, callbackfn, false, true);
  }

  dispose() {
    delete this.wrappedSet;

    for (let node = this._head.next; node != this._tail;) {
      let currentNode = node;
      node = node.next;
      currentNode.recycle();
    }

    this._head.recycle();

    delete this._head;

    this._tail.recycle();

    delete this._tail;
  }

}
class MappedObservableSet extends ObservableSet {
  constructor(sourceCollection, callbackfn, disposeSourceCollection, disposeChildren) {
    super(undefined);
    this.sourceCollection = sourceCollection;
    this.callbackfn = callbackfn;
    this.disposeSourceCollection = disposeSourceCollection;
    this.disposeChildren = disposeChildren;

    _defineProperty(this, "_map", new Map());

    _defineProperty(this, "_sourceCollectionSubscription", void 0);

    for (let t of this.sourceCollection.wrappedSet) {
      let u = this.callbackfn(t);

      this._map.set(t, u);

      this.wrappedSet.add(u);
    }

    this._sourceCollectionSubscription = sourceCollection.subscribe((addedItems, removedItems) => {
      let uItems = [];

      if (addedItems) {
        for (let t of addedItems) {
          let u = this.callbackfn(t);

          this._map.set(t, u);

          uItems.push(u);
        }

        this.addItems(uItems);
      } else if (removedItems) {
        for (let t of removedItems) {
          this._map.delete(t);

          uItems.push(this._map.get(t));
        }

        this.removeItems(uItems);

        if (disposeChildren) {
          for (let u of uItems) {
            if (u.dispose) u.dispose();
          }
        }
      }
    });
  }

  filter(callbackfn) {
    return new FilteredObservableSet(this, callbackfn, true);
  }

  sort(comparefn) {
    return new SortedObservableSet(this, comparefn, true);
  }

  map(callbackfn) {
    return new MappedObservableSet(this, callbackfn, true, true);
  }

  dispose() {
    if (this.disposeChildren) {
      for (let u of this.wrappedSet) {
        if (u.dispose) u.dispose();
      }
    }

    super.dispose();
    delete this._map;

    if (this.disposeSourceCollection) {
      this.sourceCollection.dispose();
      delete this.sourceCollection;
    } else this._sourceCollectionSubscription.dispose();

    delete this._sourceCollectionSubscription;
  }

}
class SortedObservableSet extends ObservableArray {
  constructor(sourceCollection, comparefn, disposeSourceCollection) {
    super(sortSet(sourceCollection.wrappedSet, comparefn));
    this.sourceCollection = sourceCollection;
    this.comparefn = comparefn;
    this.disposeSourceCollection = disposeSourceCollection;

    _defineProperty(this, "_comparisons", new Map());

    _defineProperty(this, "_sourceCollectionSubscription", void 0);

    _defineProperty(this, "_semaphore", new _alumis_semaphore__WEBPACK_IMPORTED_MODULE_0__["Semaphore"]());

    _defineProperty(this, "_reflowHandle", void 0);

    this.reflow = this.reflow.bind(this);

    for (let i = 0; i < this.wrappedCollection.length; ++i) this.createComparison(this.wrappedCollection[i], i);

    this._sourceCollectionSubscription = sourceCollection.subscribe(async (addedItems, removedItems) => {
      await this._semaphore.waitOneAsync();

      try {
        let wrappedCollection = this.wrappedCollection;

        if (addedItems) {
          for (let item of addedItems) {
            let sortOrder = binarySearch(wrappedCollection, item, this.comparefn); // Binary search

            sortOrder = ~sortOrder;
            wrappedCollection.splice(sortOrder, 0, item);

            for (let i = sortOrder + 1; i < wrappedCollection.length; ++i) ++this._comparisons.get(wrappedCollection[i])["__sortOrder"];

            this.createComparison(item, sortOrder);
            if (sortOrder + 1 < wrappedCollection.length) this._comparisons.get(wrappedCollection[sortOrder + 1]).refresh();
            if (0 <= sortOrder - 1) this._comparisons.get(wrappedCollection[sortOrder - 1]).refresh();
            this.notifySubscribers([item], null, sortOrder);
          }
        } else if (removedItems) {
          for (let item of removedItems) {
            let comparison = this._comparisons.get(item);

            let sortOrder = comparison["__sortOrder"];
            comparison.dispose();

            this._comparisons.delete(item);

            wrappedCollection.splice(sortOrder, 1);

            for (let i = sortOrder; i < wrappedCollection.length; ++i) --this._comparisons.get(wrappedCollection[i])["__sortOrder"];

            if (sortOrder < wrappedCollection.length) this._comparisons.get(wrappedCollection[sortOrder]).refresh();
            if (0 <= sortOrder - 1) this._comparisons.get(wrappedCollection[sortOrder - 1]).refresh();
            this.notifySubscribers(null, [item], sortOrder);
          }
        }
      } finally {
        this._semaphore.release();
      }
    });
  }

  createComparison(item, sortOrder) {
    let comparison = ComputedObservable.createComputed(() => {
      let sortOrder = comparison["__sortOrder"];

      if (0 < sortOrder) {
        if (sortOrder + 1 < this.wrappedCollection.length) return SortedObservableSet.normalizeCompare(this.comparefn(item, this.wrappedCollection[sortOrder - 1])) + " " + SortedObservableSet.normalizeCompare(this.comparefn(this.wrappedCollection[sortOrder + 1], item));
        return SortedObservableSet.normalizeCompare(this.comparefn(item, this.wrappedCollection[sortOrder - 1])) + " 1";
      } else if (1 < this.wrappedCollection.length) return "1 " + SortedObservableSet.normalizeCompare(this.comparefn(this.wrappedCollection[1], item));

      return "1 1";
    }, false);
    comparison["__sortOrder"] = sortOrder;
    comparison.postEvaluate();
    this.subscribeToComparison(item, comparison);

    this._comparisons.set(item, comparison);
  }

  static normalizeCompare(n) {
    if (n < 0) return -1;
    if (n === 0) return 0;
    if (0 < n) return 1;
    throw new Error("n is not a number");
  }

  reflow() {
    if (this._reflowHandle) return;

    let semaphorePromise = this._semaphore.waitOneAsync();

    this._reflowHandle = setTimeout(async () => {
      await semaphorePromise;

      try {
        let wrappedCollection = this.wrappedCollection;
        let wrappedCollectionToBe = wrappedCollection.map(i => i).sort(this.comparefn);
        let wrappedCollectionToBeSortOrders = new Map();

        for (let i = 0; i < wrappedCollectionToBe.length; ++i) wrappedCollectionToBeSortOrders.set(wrappedCollectionToBe[i], i);

        let sortOrders = [];
        let processedItems = new Set();

        for (let i = 0, sortOrder = 0; i < wrappedCollectionToBe.length && sortOrder < wrappedCollection.length;) {
          let itemThatEndedUpHere = wrappedCollectionToBe[i];

          if (processedItems.has(itemThatEndedUpHere)) {
            ++i;
            continue;
          }

          let itemThatWasHere = wrappedCollection[sortOrder];

          if (itemThatEndedUpHere !== itemThatWasHere) {
            let itemThatEndedUpHereOldSortOrder = this._comparisons.get(itemThatEndedUpHere)["__sortOrder"];

            let itemThatWasHereNewSortOrder = wrappedCollectionToBeSortOrders.get(itemThatWasHere);

            if (Math.abs(itemThatEndedUpHereOldSortOrder - sortOrder) < Math.abs(itemThatWasHereNewSortOrder - sortOrder)) {
              sortOrders.push({
                item: itemThatWasHere,
                oldSortOrder: this._comparisons.get(itemThatWasHere)["__sortOrder"],
                newSortOrder: itemThatWasHereNewSortOrder
              });
              processedItems.add(itemThatWasHere);
              ++sortOrder;
              continue;
            } else sortOrders.push({
              item: itemThatEndedUpHere,
              oldSortOrder: itemThatEndedUpHereOldSortOrder,
              newSortOrder: i
            });
          } else ++sortOrder;

          ++i;
        }

        let comparisonsToRefresh = new Set();
        let lengthOneArray = [null];

        for (let i of sortOrders.sort((a, b) => b.oldSortOrder - a.oldSortOrder)) {
          let comparison = this._comparisons.get(i.item);

          let sortOrder = i.oldSortOrder;
          comparison.dispose();

          this._comparisons.delete(i.item);

          wrappedCollection.splice(sortOrder, 1);
          if (sortOrder < wrappedCollection.length) comparisonsToRefresh.add(this._comparisons.get(wrappedCollection[sortOrder]));
          if (0 <= sortOrder - 1) comparisonsToRefresh.add(this._comparisons.get(wrappedCollection[sortOrder - 1]));
          lengthOneArray[0] = i.item;
          this.notifySubscribers(null, lengthOneArray, sortOrder, true);
        }

        for (let i of sortOrders.sort((a, b) => a.newSortOrder - b.newSortOrder)) {
          let sortOrder = i.newSortOrder;
          wrappedCollection.splice(sortOrder, 0, i.item);
          this.createComparison(i.item, sortOrder);
          if (sortOrder + 1 < wrappedCollection.length) comparisonsToRefresh.add(this._comparisons.get(wrappedCollection[sortOrder + 1]));
          if (0 <= sortOrder - 1) comparisonsToRefresh.add(this._comparisons.get(wrappedCollection[sortOrder - 1]));
          lengthOneArray[0] = i.item;
          this.notifySubscribers(lengthOneArray, null, sortOrder, true);
        }

        for (let i = 0; i < wrappedCollectionToBe.length; ++i) this._comparisons.get(wrappedCollection[i])["__sortOrder"] = i;

        for (var c of comparisonsToRefresh) c.refresh();

        delete this._reflowHandle;
      } finally {
        this._semaphore.release();
      }
    }, 0);
  }

  subscribeToComparison(_item, observable) {
    observable.subscribe(this.reflow);
  }

  remove(_item) {
    throw new Error("Not supported");
  }

  removeAt(_index) {
    throw new Error("Not supported");
  }

  removeRange(_index, _count) {
    throw new Error("Not supported");
  }

  clear() {
    throw new Error("Not supported");
  }

  add(_item) {
    throw new Error("Not supported");
  }

  addRange(_items) {
    throw new Error("Not supported");
  }

  insert(_index, _item) {
    throw new Error("Not supported");
  }

  insertRange(_index, _items) {
    throw new Error("Not supported");
  }

  map(callbackfn) {
    return new MappedObservableArray(this, callbackfn, true, true);
  }

  dispose() {
    super.dispose();

    this._comparisons.forEach(c => {
      c.dispose();
    });

    delete this._comparisons;

    if (this.disposeSourceCollection) {
      this.sourceCollection.dispose();
      delete this.sourceCollection;
    } else this._sourceCollectionSubscription.dispose();

    delete this._sourceCollectionSubscription;
  }

}

function sortSet(set, sortFunction) {
  let result = [];

  for (let i of set) result.push(i);

  return result.sort(sortFunction);
}

function binarySearch(array, item, comparefn) {
  let l = 0,
      h = array.length - 1,
      m,
      comparison;

  comparefn = comparefn || ((a, b) => a < b ? -1 : a > b ? 1 : 0);

  while (l <= h) {
    m = l + h >>> 1;
    comparison = comparefn(array[m], item);
    if (comparison < 0) l = m + 1;else if (comparison > 0) h = m - 1;else return m;
  }

  return ~l;
}

class FilteredObservableSet extends ObservableSet {
  constructor(sourceCollection, callbackfn, disposeSourceCollection) {
    super(undefined);
    this.sourceCollection = sourceCollection;
    this.callbackfn = callbackfn;
    this.disposeSourceCollection = disposeSourceCollection;

    _defineProperty(this, "_observables", new Map());

    _defineProperty(this, "_sourceCollectionSubscription", void 0);

    let original = sourceCollection.wrappedSet;
    let filtered = this.wrappedSet;

    for (let i of original) {
      if (this.createObservable(i)) filtered.add(i);
    }

    this._sourceCollectionSubscription = sourceCollection.subscribe((addedItems, removedItems) => {
      if (addedItems) {
        for (let i of addedItems) {
          if (this.createObservable(i)) this.add(i);
        }
      } else if (removedItems) {
        for (let i of removedItems) {
          this._observables.get(i).dispose();

          this._observables.delete(i);

          this.remove(i);
        }
      }
    });
  }

  createObservable(item) {
    let computedObservable = ComputedObservable.createComputed(() => this.callbackfn(item));

    this._observables.set(item, computedObservable);

    computedObservable.subscribe(n => {
      if (n) this.add(item);else this.remove(item);
    });
    return computedObservable.value;
  }

  filter(callbackfn) {
    return new FilteredObservableSet(this, callbackfn, true);
  }

  sort(comparefn) {
    return new SortedObservableSet(this, comparefn, true);
  }

  map(callbackfn) {
    return new MappedObservableSet(this, callbackfn, true, true);
  }

  dispose() {
    super.dispose();

    this._observables.forEach(o => {
      o.dispose();
    });

    delete this._observables;

    if (this.disposeSourceCollection) {
      this.sourceCollection.dispose();
      delete this.sourceCollection;
    } else this._sourceCollectionSubscription.dispose();

    delete this._sourceCollectionSubscription;
  }

}
function o(value) {
  return Observable.create(value);
}
function co(expression) {
  return ComputedObservable.createComputed(expression);
}

/***/ }),

/***/ "./node_modules/@alumis/observables/src/SessionStorageObservable.ts":
/*!**************************************************************************!*\
  !*** ./node_modules/@alumis/observables/src/SessionStorageObservable.ts ***!
  \**************************************************************************/
/*! exports provided: SessionStorageObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionStorageObservable", function() { return SessionStorageObservable; });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable */ "./node_modules/@alumis/observables/src/Observable.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class SessionStorageObservable extends _Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "key", void 0);
  }

  static createSessionStorage(key, defaultValue) {
    let result = cache.get(key);
    if (result) return result;
    cache.set(key, result = new SessionStorageObservable());
    result.key = key;
    let storageValue = sessionStorage.getItem(key);

    if (storageValue) {
      try {
        var parsed = JSON.parse(storageValue);
      } catch (e) {
        console.error(e);
        result.wrappedValue = defaultValue;
        return;
      }

      result.wrappedValue = parsed;
    } else result.wrappedValue = defaultValue;

    return result;
  }

  get value() {
    if (_Observable__WEBPACK_IMPORTED_MODULE_0__["stack"].length) {
      let computedObservable = _Observable__WEBPACK_IMPORTED_MODULE_0__["stack"][_Observable__WEBPACK_IMPORTED_MODULE_0__["stack"].length - 1];
      if (!computedObservable.observables.has(this)) computedObservable.observables.set(this, this.subscribeSneakInLine(computedObservable.refresh));
    }

    return this.wrappedValue;
  }

  set value(newValue) {
    let oldValue = this.wrappedValue;

    if (newValue !== oldValue) {
      this.wrappedValue = newValue;
      sessionStorage.setItem(this.key, JSON.stringify(newValue));
      this.notifySubscribers(newValue, oldValue);
    }
  }

  refresh() {
    let storageValue = sessionStorage.getItem(this.key);
    if (storageValue) this.value = JSON.parse(storageValue);
  }

  remove() {
    sessionStorage.removeItem(this.key);
  }

  dispose() {
    delete this.wrappedValue;
    let node = this._prioritizedHead;

    if (node) {
      for (node = node.next; node != this._prioritizedTail; node = node.next) node.recycle();

      this._prioritizedHead.recycle();

      delete this._prioritizedHead;

      this._prioritizedTail.recycle();

      delete this._prioritizedTail;
    }

    for (node = this._head.next; node != this._tail; node = node.next) node.recycle();

    this._head.recycle();

    delete this._head;

    this._tail.recycle();

    delete this._tail;
  }

}
let cache = new Map();

/***/ }),

/***/ "./node_modules/@alumis/semaphore/index.ts":
/*!*************************************************!*\
  !*** ./node_modules/@alumis/semaphore/index.ts ***!
  \*************************************************/
/*! exports provided: Semaphore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Semaphore", function() { return Semaphore; });
/* harmony import */ var _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alumis/cancellationtoken */ "./node_modules/@alumis/cancellationtoken/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Semaphore {
  constructor() {
    _defineProperty(this, "_head", void 0);

    _defineProperty(this, "_tail", void 0);

    let head = {};
    let tail = {};
    (head.next = tail).previous = head;
    this._head = head;
    this._tail = tail;
  }

  waitOneAsync(cancellationtoken) {
    if (cancellationtoken) {
      if (cancellationtoken.isCancellationRequested) return Promise.reject(new _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__["OperationCancelledError"]());
    }

    return new Promise((resolve, reject) => {
      let current = {
        resolve: resolve,
        previous: this._tail.previous,
        next: this._tail
      };
      current.previous.next = current;
      current.next.previous = current;
      if (this._head.next === current) resolve();else if (cancellationtoken) {
        current.cancellationToken = cancellationtoken;
        cancellationtoken.addListener(current.cancellationTokenListener = () => {
          (current.previous.next = current.next).previous = current.previous;
          reject(new _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__["OperationCancelledError"]());
        });
      }
    });
  }

  release() {
    let head = this._head,
        next = head.next.next;
    (head.next = next).previous = head;

    if (next !== this._tail) {
      if (next.cancellationToken) {
        next.cancellationToken.removeListener(next.cancellationTokenListener);
        delete next.cancellationToken;
        delete next.cancellationTokenListener;
      }

      let resolve = next.resolve;
      delete next.resolve;
      resolve();
    }
  }

}

/***/ }),

/***/ "./src/enums/HttpStatusCode.ts":
/*!*************************************!*\
  !*** ./src/enums/HttpStatusCode.ts ***!
  \*************************************/
/*! exports provided: HttpStatusCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpStatusCode", function() { return HttpStatusCode; });
let HttpStatusCode;

(function (HttpStatusCode) {
  HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
  HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
  HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
  HttpStatusCode[HttpStatusCode["PartialInformation"] = 203] = "PartialInformation";
  HttpStatusCode[HttpStatusCode["NoResponse"] = 204] = "NoResponse";
  HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
  HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
  HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
  HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
  HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
  HttpStatusCode[HttpStatusCode["InternalError"] = 500] = "InternalError";
  HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
})(HttpStatusCode || (HttpStatusCode = {}));

/***/ }),

/***/ "./src/errors/HttpRequestError.ts":
/*!****************************************!*\
  !*** ./src/errors/HttpRequestError.ts ***!
  \****************************************/
/*! exports provided: HttpRequestError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpRequestError", function() { return HttpRequestError; });
class HttpRequestError extends Error {
  constructor(xhr, event) {
    super(``);
  }

}

/***/ }),

/***/ "./src/http/getJsonAsync.ts":
/*!**********************************!*\
  !*** ./src/http/getJsonAsync.ts ***!
  \**********************************/
/*! exports provided: getJsonAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJsonAsync", function() { return getJsonAsync; });
/* harmony import */ var _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alumis/cancellationtoken */ "./node_modules/@alumis/cancellationtoken/index.ts");
/* harmony import */ var _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/HttpRequestError */ "./src/errors/HttpRequestError.ts");
/* harmony import */ var _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums/HttpStatusCode */ "./src/enums/HttpStatusCode.ts");
/* harmony import */ var _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/PromiseWithProgress */ "./src/utils/PromiseWithProgress.ts");




function getJsonAsync(url, cancellationToken) {
  return new _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_3__["PromiseWithProgress"]((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var cancellationListener;

    xhr.onload = e => {
      if (cancellationToken) cancellationToken.removeListener(cancellationListener);
      if (xhr.status === _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_2__["HttpStatusCode"].Ok) resolve(xhr.response);else reject(new _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_1__["HttpRequestError"](xhr, e));
    };

    xhr.onerror = e => {
      if (cancellationToken) cancellationToken.removeListener(cancellationListener);
      reject(new _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_1__["HttpRequestError"](xhr, e));
    };

    xhr.onprogress = e => {};

    if (cancellationToken) cancellationToken.addListener(cancellationListener = () => {
      xhr.abort();
      reject(new _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__["OperationCancelledError"]());
    });
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.send();
  });
}

/***/ }),

/***/ "./src/http/postAsync.ts":
/*!*******************************!*\
  !*** ./src/http/postAsync.ts ***!
  \*******************************/
/*! exports provided: postAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postAsync", function() { return postAsync; });
/* harmony import */ var _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alumis/cancellationtoken */ "./node_modules/@alumis/cancellationtoken/index.ts");
/* harmony import */ var _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/HttpStatusCode */ "./src/enums/HttpStatusCode.ts");
/* harmony import */ var _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/HttpRequestError */ "./src/errors/HttpRequestError.ts");
/* harmony import */ var _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/PromiseWithProgress */ "./src/utils/PromiseWithProgress.ts");




function postAsync(url, data, cancellationToken) {
  return new _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_3__["PromiseWithProgress"]((resolve, reject, progressObservable) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    var cancellationListener;

    xhr.onload = e => {
      if (cancellationToken) cancellationToken.removeListener(cancellationListener);
      if (xhr.status === _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_1__["HttpStatusCode"].Ok) resolve(xhr.response);else reject(new _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_2__["HttpRequestError"](xhr, e));
    };

    xhr.onerror = e => {
      if (cancellationToken) cancellationToken.removeListener(cancellationListener);
      reject(new _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_2__["HttpRequestError"](xhr, e));
    };

    xhr.onprogress = e => progressObservable.value = e.loaded / e.total;

    if (cancellationToken) cancellationToken.addListener(cancellationListener = () => {
      xhr.abort();
      reject(new _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__["OperationCancelledError"]());
    });

    if (data) {
      var formData = new FormData();

      for (var p in data) {
        var value = data[p];
        if (Object.prototype.toString.call(value) === "[object Date]") value = value.toISOString();
        formData.append(p, value);
      }

      xhr.send(formData);
    } else xhr.send();
  });
}

/***/ }),

/***/ "./src/http/postParseJsonAsync.ts":
/*!****************************************!*\
  !*** ./src/http/postParseJsonAsync.ts ***!
  \****************************************/
/*! exports provided: postParseJsonAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postParseJsonAsync", function() { return postParseJsonAsync; });
/* harmony import */ var _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alumis/cancellationtoken */ "./node_modules/@alumis/cancellationtoken/index.ts");
/* harmony import */ var _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/HttpStatusCode */ "./src/enums/HttpStatusCode.ts");
/* harmony import */ var _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/HttpRequestError */ "./src/errors/HttpRequestError.ts");
/* harmony import */ var _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/PromiseWithProgress */ "./src/utils/PromiseWithProgress.ts");




function postParseJsonAsync(url, data, cancellationToken) {
  return new _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_3__["PromiseWithProgress"]((resolve, reject, progressObservable) => {
    var xhr = new XMLHttpRequest();
    var cancellationListener;

    xhr.onload = e => {
      if (cancellationToken) cancellationToken.removeListener(cancellationListener);
      if (xhr.status === _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_1__["HttpStatusCode"].Ok) resolve(xhr.response);else reject(new _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_2__["HttpRequestError"](xhr, e));
    };

    xhr.onerror = e => {
      if (cancellationToken) cancellationToken.removeListener(cancellationListener);
      reject(new _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_2__["HttpRequestError"](xhr, e));
    };

    xhr.onprogress = e => progressObservable.value = e.loaded / e.total;

    if (cancellationToken) cancellationToken.addListener(cancellationListener = () => {
      xhr.abort();
      reject(new _alumis_cancellationtoken__WEBPACK_IMPORTED_MODULE_0__["OperationCancelledError"]());
    });
    xhr.open("POST", url, true);
    xhr.responseType = "json";

    if (data) {
      var formData = new FormData();

      for (var p in data) {
        var value = data[p];
        if (Object.prototype.toString.call(value) === "[object Date]") value = value.toISOString();
        formData.append(p, value);
      }

      xhr.send(formData);
    } else xhr.send();
  });
}

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: HttpRequestError, HttpStatusCode, PromiseWithProgress, getJsonAsync, postAsync, postParseJsonAsync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/HttpRequestError */ "./src/errors/HttpRequestError.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpRequestError", function() { return _errors_HttpRequestError__WEBPACK_IMPORTED_MODULE_0__["HttpRequestError"]; });

/* harmony import */ var _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/HttpStatusCode */ "./src/enums/HttpStatusCode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpStatusCode", function() { return _enums_HttpStatusCode__WEBPACK_IMPORTED_MODULE_1__["HttpStatusCode"]; });

/* harmony import */ var _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/PromiseWithProgress */ "./src/utils/PromiseWithProgress.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PromiseWithProgress", function() { return _utils_PromiseWithProgress__WEBPACK_IMPORTED_MODULE_2__["PromiseWithProgress"]; });

/* harmony import */ var _http_getJsonAsync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http/getJsonAsync */ "./src/http/getJsonAsync.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getJsonAsync", function() { return _http_getJsonAsync__WEBPACK_IMPORTED_MODULE_3__["getJsonAsync"]; });

/* harmony import */ var _http_postAsync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./http/postAsync */ "./src/http/postAsync.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postAsync", function() { return _http_postAsync__WEBPACK_IMPORTED_MODULE_4__["postAsync"]; });

/* harmony import */ var _http_postParseJsonAsync__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http/postParseJsonAsync */ "./src/http/postParseJsonAsync.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postParseJsonAsync", function() { return _http_postParseJsonAsync__WEBPACK_IMPORTED_MODULE_5__["postParseJsonAsync"]; });








/***/ }),

/***/ "./src/utils/PromiseWithProgress.ts":
/*!******************************************!*\
  !*** ./src/utils/PromiseWithProgress.ts ***!
  \******************************************/
/*! exports provided: PromiseWithProgress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromiseWithProgress", function() { return PromiseWithProgress; });
/* harmony import */ var _alumis_observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alumis/observables */ "./node_modules/@alumis/observables/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var progress;
class PromiseWithProgress extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      executor(resolve, reject, progress = Object(_alumis_observables__WEBPACK_IMPORTED_MODULE_0__["o"])(0));
    });

    _defineProperty(this, "progress", progress);
  }

}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhbHVtaXMvY2FuY2VsbGF0aW9udG9rZW4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhbHVtaXMvb2JzZXJ2YWJsZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhbHVtaXMvb2JzZXJ2YWJsZXMvc3JjL0xvY2FsU3RvcmFnZU9ic2VydmFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhbHVtaXMvb2JzZXJ2YWJsZXMvc3JjL09ic2VydmFibGUudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhbHVtaXMvb2JzZXJ2YWJsZXMvc3JjL1Nlc3Npb25TdG9yYWdlT2JzZXJ2YWJsZS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFsdW1pcy9zZW1hcGhvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudW1zL0h0dHBTdGF0dXNDb2RlLnRzIiwid2VicGFjazovLy8uL3NyYy9lcnJvcnMvSHR0cFJlcXVlc3RFcnJvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaHR0cC9nZXRKc29uQXN5bmMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2h0dHAvcG9zdEFzeW5jLnRzIiwid2VicGFjazovLy8uL3NyYy9odHRwL3Bvc3RQYXJzZUpzb25Bc3luYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL1Byb21pc2VXaXRoUHJvZ3Jlc3MudHMiXSwibmFtZXMiOlsiQ2FuY2VsbGF0aW9uVG9rZW4iLCJTZXQiLCJhZGRMaXN0ZW5lciIsImxpc3RlbmVyIiwiaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQiLCJsaXN0ZW5lcnMiLCJhZGQiLCJjYW5jZWwiLCJmIiwicmVtb3ZlTGlzdGVuZXIiLCJkZWxldGUiLCJsaW5rIiwidG9rZW4iLCJMaW5rZWRDYW5jZWxsYXRpb25Ub2tlbiIsIkNhbmNlbGxhdGlvblRva2VuTm9uZSIsIl9saXN0ZW5lciIsIkVycm9yIiwic2luZ2xldG9uIiwiX3NpbmdsZXRvbiIsImNvbnN0cnVjdG9yIiwidG9rZW5zIiwiYmluZCIsInQiLCJkaXNwb3NlIiwiT3BlcmF0aW9uQ2FuY2VsbGVkRXJyb3IiLCJMb2NhbFN0b3JhZ2VPYnNlcnZhYmxlIiwiT2JzZXJ2YWJsZSIsImNyZWF0ZUxvY2FsU3RvcmFnZSIsImtleSIsImRlZmF1bHRWYWx1ZSIsInJlc3VsdCIsImNhY2hlIiwiZ2V0Iiwic2V0Iiwic3RvcmFnZVZhbHVlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhcnNlZCIsIkpTT04iLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJ3cmFwcGVkVmFsdWUiLCJ2YWx1ZSIsInN0YWNrIiwibGVuZ3RoIiwiY29tcHV0ZWRPYnNlcnZhYmxlIiwib2JzZXJ2YWJsZXMiLCJoYXMiLCJzdWJzY3JpYmVTbmVha0luTGluZSIsInJlZnJlc2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIm5vdGlmeVN1YnNjcmliZXJzIiwicmVtb3ZlIiwicmVtb3ZlSXRlbSIsIm5vZGUiLCJfcHJpb3JpdGl6ZWRIZWFkIiwibmV4dCIsIl9wcmlvcml0aXplZFRhaWwiLCJyZWN5Y2xlIiwiX2hlYWQiLCJfdGFpbCIsIk1hcCIsImhpZGRlbiIsInZpc2liaWxpdHlDaGFuZ2UiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb3JFYWNoIiwidiIsIm9ic2VydmFibGVzTGVuZ3RoIiwiT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbiIsImNyZWF0ZSIsInByZXZpb3VzIiwidG9TdHJpbmciLCJzZXRWYWx1ZURvbnROb3RpZnkiLCJleGVtcHRlZE9ic2VydmFibGVTdWJzY3JpcHRpb24iLCJub3RpZnlTdWJzY3JpYmVyc0V4Y2VwdCIsInByaW9yaXRpemVkVGFpbCIsImN1cnJlbnROb2RlIiwiYWN0aW9uIiwiaW52YWxpZGF0ZSIsInN1YnNjcmliZSIsImNyZWF0ZUZyb21UYWlsIiwic3Vic2NyaWJlSW52b2tlIiwic3Vic2NyaXB0aW9uIiwicHJpb3JpdGl6ZWRTdWJzY3JpYmUiLCJwcmlvcml0aXplZFN1YnNjcmliZUludm9rZSIsImNyZWF0ZUZyb21IZWFkIiwicHVzaCIsIm9ic2VydmFibGVTdWJzY3JpcHRpb25zIiwib2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnNMZW5ndGgiLCJleGlzdGluZyIsInRhaWwiLCJoZWFkIiwib2JzZXJ2YWJsZXNXaXRoRXJyb3IiLCJvYnNlcnZhYmxlc1dpdGhFcnJvckxlbmd0aCIsIk9ic2VydmFibGVXaXRoRXJyb3IiLCJjb21wdXRlZE9ic2VydmFibGVzIiwiY29tcHV0ZWRPYnNlcnZhYmxlc0xlbmd0aCIsIkNvbXB1dGVkT2JzZXJ2YWJsZSIsImNyZWF0ZUNvbXB1dGVkIiwiZXhwcmVzc2lvbiIsInByZUV2YWx1YXRlIiwiZXZhbHVhdGVFeHByZXNzaW9uIiwib2xkU3RhY2siLCJwb3AiLCJ1bmRlZmluZWQiLCJwb3N0RXZhbHVhdGUiLCJzIiwiY2xlYXIiLCJfIiwid2hlbkFzeW5jIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJuIiwiYWx3YXlzV2hlbiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiT2JzZXJ2YWJsZUFycmF5Iiwid3JhcHBlZENvbGxlY3Rpb24iLCJhZGRlZEl0ZW1zIiwicmVtb3ZlZEl0ZW1zIiwiaW5kZXgiLCJtb3ZlIiwiaXRlbSIsImFycmF5IiwiZnJvbUluZGV4IiwiaW5kZXhPZiIsInJlbW92ZWRJdGVtIiwic3BsaWNlIiwicmVtb3ZlQXQiLCJyZW1vdmVSYW5nZSIsImNvdW50IiwiYWRkUmFuZ2UiLCJpdGVtcyIsImFwcGx5IiwiaW5zZXJ0IiwiaW5zZXJ0UmFuZ2UiLCJjb25jYXQiLCJyZWNvbmNpbGUiLCJjb250YWlucyIsImkiLCJtYXAiLCJjYWxsYmFja2ZuIiwiTWFwcGVkT2JzZXJ2YWJsZUFycmF5Iiwic291cmNlQ29sbGVjdGlvbiIsImRpc3Bvc2VTb3VyY2VDb2xsZWN0aW9uIiwiZGlzcG9zZUNoaWxkcmVuIiwibW92ZU1hcCIsIl9zb3VyY2VDb2xsZWN0aW9uU3Vic2NyaXB0aW9uIiwibWFwcGVkQWRkZWRJdGVtcyIsInVGaWZvIiwic2hpZnQiLCJtYXBwZWRSZW1vdmVkSXRlbXMiLCJ1IiwiZXhpc3RpbmdVRmlmbyIsIk9ic2VydmFibGVTZXQiLCJ3cmFwcGVkU2V0IiwiYWRkSXRlbXMiLCJyZW1vdmVJdGVtcyIsImZpbHRlciIsIkZpbHRlcmVkT2JzZXJ2YWJsZVNldCIsInNvcnQiLCJjb21wYXJlZm4iLCJTb3J0ZWRPYnNlcnZhYmxlU2V0IiwiTWFwcGVkT2JzZXJ2YWJsZVNldCIsIl9tYXAiLCJ1SXRlbXMiLCJzb3J0U2V0IiwiU2VtYXBob3JlIiwicmVmbG93IiwiY3JlYXRlQ29tcGFyaXNvbiIsIl9zZW1hcGhvcmUiLCJ3YWl0T25lQXN5bmMiLCJzb3J0T3JkZXIiLCJiaW5hcnlTZWFyY2giLCJfY29tcGFyaXNvbnMiLCJjb21wYXJpc29uIiwicmVsZWFzZSIsIm5vcm1hbGl6ZUNvbXBhcmUiLCJzdWJzY3JpYmVUb0NvbXBhcmlzb24iLCJfcmVmbG93SGFuZGxlIiwic2VtYXBob3JlUHJvbWlzZSIsInNldFRpbWVvdXQiLCJ3cmFwcGVkQ29sbGVjdGlvblRvQmUiLCJ3cmFwcGVkQ29sbGVjdGlvblRvQmVTb3J0T3JkZXJzIiwic29ydE9yZGVycyIsInByb2Nlc3NlZEl0ZW1zIiwiaXRlbVRoYXRFbmRlZFVwSGVyZSIsIml0ZW1UaGF0V2FzSGVyZSIsIml0ZW1UaGF0RW5kZWRVcEhlcmVPbGRTb3J0T3JkZXIiLCJpdGVtVGhhdFdhc0hlcmVOZXdTb3J0T3JkZXIiLCJNYXRoIiwiYWJzIiwib2xkU29ydE9yZGVyIiwibmV3U29ydE9yZGVyIiwiY29tcGFyaXNvbnNUb1JlZnJlc2giLCJsZW5ndGhPbmVBcnJheSIsImEiLCJiIiwiYyIsIl9pdGVtIiwib2JzZXJ2YWJsZSIsIl9pbmRleCIsIl9jb3VudCIsIl9pdGVtcyIsInNvcnRGdW5jdGlvbiIsImwiLCJoIiwibSIsIm9yaWdpbmFsIiwiZmlsdGVyZWQiLCJjcmVhdGVPYnNlcnZhYmxlIiwiX29ic2VydmFibGVzIiwibyIsImNvIiwiU2Vzc2lvblN0b3JhZ2VPYnNlcnZhYmxlIiwiY3JlYXRlU2Vzc2lvblN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImNhbmNlbGxhdGlvbnRva2VuIiwiY3VycmVudCIsImNhbmNlbGxhdGlvblRva2VuIiwiY2FuY2VsbGF0aW9uVG9rZW5MaXN0ZW5lciIsIkh0dHBTdGF0dXNDb2RlIiwiSHR0cFJlcXVlc3RFcnJvciIsInhociIsImV2ZW50IiwiZ2V0SnNvbkFzeW5jIiwidXJsIiwiUHJvbWlzZVdpdGhQcm9ncmVzcyIsIlhNTEh0dHBSZXF1ZXN0IiwiY2FuY2VsbGF0aW9uTGlzdGVuZXIiLCJvbmxvYWQiLCJzdGF0dXMiLCJPayIsInJlc3BvbnNlIiwib25lcnJvciIsIm9ucHJvZ3Jlc3MiLCJhYm9ydCIsIm9wZW4iLCJyZXNwb25zZVR5cGUiLCJzZW5kIiwicG9zdEFzeW5jIiwiZGF0YSIsInByb2dyZXNzT2JzZXJ2YWJsZSIsImxvYWRlZCIsInRvdGFsIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsInAiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidG9JU09TdHJpbmciLCJhcHBlbmQiLCJwb3N0UGFyc2VKc29uQXN5bmMiLCJwcm9ncmVzcyIsImV4ZWN1dG9yIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtB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UUFBSjtBQUVPLE1BQU0zQixtQkFBTixTQUFxQ3RILE9BQXJDLENBQWdEO0FBRW5EbEcsYUFBVyxDQUFDb1AsUUFBRCxFQUE0STtBQUVuSixVQUFNLENBQUNoSixPQUFELEVBQWdERCxNQUFoRCxLQUFtRjtBQUVyRmlKLGNBQVEsQ0FBQ2hKLE9BQUQsRUFBVUQsTUFBVixFQUFtQmdKLFFBQVEsR0FBRzFDLDZEQUFDLENBQUMsQ0FBRCxDQUEvQixDQUFSO0FBQ0gsS0FIRDs7QUFGbUosc0NBUTVJMEMsUUFSNEk7QUFNdEo7O0FBUmtELEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIENhbmNlbGxhdGlvblRva2VuIHtcblxuICAgIGlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkOiBib29sZWFuO1xuICAgIGxpc3RlbmVycyA9IG5ldyBTZXQ8KCkgPT4gYW55PigpO1xuXG4gICAgYWRkTGlzdGVuZXIobGlzdGVuZXI6ICgpID0+IGFueSkge1xuXG4gICAgICAgIGlmICh0aGlzLmlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKVxuICAgICAgICAgICAgbGlzdGVuZXIoKTtcblxuICAgICAgICBlbHNlIHRoaXMubGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5pc0NhbmNlbGxhdGlvblJlcXVlc3RlZCkge1xuXG4gICAgICAgICAgICB0aGlzLmlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgZiBvZiB0aGlzLmxpc3RlbmVycylcbiAgICAgICAgICAgICAgICBmKCk7XG5cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyOiAoKSA9PiBhbnkpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnMpXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGxpbmsodG9rZW46IENhbmNlbGxhdGlvblRva2VuKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBMaW5rZWRDYW5jZWxsYXRpb25Ub2tlbihbdGhpcywgdG9rZW5dKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW5jZWxsYXRpb25Ub2tlbk5vbmUgZXh0ZW5kcyBDYW5jZWxsYXRpb25Ub2tlbiB7XG5cbiAgICBhZGRMaXN0ZW5lcihfbGlzdGVuZXI6ICgpID0+IGFueSkge1xuICAgIH1cblxuICAgIHJlbW92ZUxpc3RlbmVyKF9saXN0ZW5lcjogKCkgPT4gYW55KSB7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc2luZ2xldG9uKCkge1xuXG4gICAgICAgIHJldHVybiBDYW5jZWxsYXRpb25Ub2tlbk5vbmUuX3NpbmdsZXRvbiB8fCAoQ2FuY2VsbGF0aW9uVG9rZW5Ob25lLl9zaW5nbGV0b24gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW5Ob25lKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIF9zaW5nbGV0b246IENhbmNlbGxhdGlvblRva2VuTm9uZTtcbn1cblxuZXhwb3J0IGNsYXNzIExpbmtlZENhbmNlbGxhdGlvblRva2VuIGV4dGVuZHMgQ2FuY2VsbGF0aW9uVG9rZW4ge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRva2VuczogQ2FuY2VsbGF0aW9uVG9rZW5bXSkge1xuXG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5jYW5jZWwgPSB0aGlzLmNhbmNlbC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGZvciAodmFyIHQgb2YgdG9rZW5zKVxuICAgICAgICAgICAgdC5hZGRMaXN0ZW5lcih0aGlzLmNhbmNlbCk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcblxuICAgICAgICBmb3IgKHZhciB0IG9mIHRoaXMudG9rZW5zKVxuICAgICAgICAgICAgdC5yZW1vdmVMaXN0ZW5lcih0aGlzLmNhbmNlbCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3BlcmF0aW9uQ2FuY2VsbGVkRXJyb3Ige1xuXG59IiwiZXhwb3J0ICogZnJvbSBcIi4vc3JjL09ic2VydmFibGVcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NyYy9Mb2NhbFN0b3JhZ2VPYnNlcnZhYmxlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zcmMvU2Vzc2lvblN0b3JhZ2VPYnNlcnZhYmxlXCI7IiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgc3RhY2sgfSBmcm9tIFwiLi9PYnNlcnZhYmxlXCI7XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG5cbiAgICBrZXk6IHN0cmluZztcblxuICAgIHN0YXRpYyBjcmVhdGVMb2NhbFN0b3JhZ2U8VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IFQpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gPExvY2FsU3RvcmFnZU9ic2VydmFibGU8VD4+Y2FjaGUuZ2V0KGtleSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgY2FjaGUuc2V0KGtleSwgcmVzdWx0ID0gbmV3IExvY2FsU3RvcmFnZU9ic2VydmFibGUoKSk7XG5cbiAgICAgICAgcmVzdWx0LmtleSA9IGtleTtcblxuICAgICAgICBsZXQgc3RvcmFnZVZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgICBpZiAoc3RvcmFnZVZhbHVlKSB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VkID0gSlNPTi5wYXJzZShzdG9yYWdlVmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICByZXN1bHQud3JhcHBlZFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQud3JhcHBlZFZhbHVlID0gcGFyc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSByZXN1bHQud3JhcHBlZFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCkge1xuXG4gICAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcblxuICAgICAgICAgICAgbGV0IGNvbXB1dGVkT2JzZXJ2YWJsZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBpZiAoIWNvbXB1dGVkT2JzZXJ2YWJsZS5vYnNlcnZhYmxlcy5oYXModGhpcykpXG4gICAgICAgICAgICAgICAgY29tcHV0ZWRPYnNlcnZhYmxlLm9ic2VydmFibGVzLnNldCh0aGlzLCB0aGlzLnN1YnNjcmliZVNuZWFrSW5MaW5lKGNvbXB1dGVkT2JzZXJ2YWJsZS5yZWZyZXNoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkVmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBUKSB7XG5cbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy53cmFwcGVkVmFsdWU7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXG4gICAgICAgICAgICB0aGlzLndyYXBwZWRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5rZXksIEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuXG4gICAgICAgIGxldCBzdG9yYWdlVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSk7XG5cbiAgICAgICAgaWYgKHN0b3JhZ2VWYWx1ZSlcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBKU09OLnBhcnNlKHN0b3JhZ2VWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMua2V5KTtcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLndyYXBwZWRWYWx1ZTtcblxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICBpZiAobm9kZSkge1xuXG4gICAgICAgICAgICBmb3IgKG5vZGUgPSBub2RlLm5leHQ7IG5vZGUgIT0gdGhpcy5fcHJpb3JpdGl6ZWRUYWlsOyBub2RlID0gbm9kZS5uZXh0KVxuICAgICAgICAgICAgICAgIG5vZGUucmVjeWNsZSgpO1xuXG4gICAgICAgICAgICB0aGlzLl9wcmlvcml0aXplZEhlYWQucmVjeWNsZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdGl6ZWRUYWlsLnJlY3ljbGUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmlvcml0aXplZFRhaWw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKG5vZGUgPSB0aGlzLl9oZWFkLm5leHQ7IG5vZGUgIT0gdGhpcy5fdGFpbDsgbm9kZSA9IG5vZGUubmV4dClcbiAgICAgICAgICAgIG5vZGUucmVjeWNsZSgpO1xuXG4gICAgICAgIHRoaXMuX2hlYWQucmVjeWNsZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy5faGVhZDtcblxuICAgICAgICB0aGlzLl90YWlsLnJlY3ljbGUoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3RhaWw7XG4gICAgfVxufVxuXG5sZXQgY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgTG9jYWxTdG9yYWdlT2JzZXJ2YWJsZTxhbnk+PigpO1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IGhpZGRlbiwgdmlzaWJpbGl0eUNoYW5nZTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93LmRvY3VtZW50LmhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikgeyAvLyBPcGVyYSAxMi4xMCBhbmQgRmlyZWZveCAxOCBhbmQgbGF0ZXIgc3VwcG9ydFxuXG4gICAgICAgIGhpZGRlbiA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcInZpc2liaWxpdHljaGFuZ2VcIjtcbiAgICB9XG5cbiAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmRvY3VtZW50W1wibXNIaWRkZW5cIl0gIT09IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICBoaWRkZW4gPSBcIm1zSGlkZGVuXCI7XG4gICAgICAgIHZpc2liaWxpdHlDaGFuZ2UgPSBcIm1zdmlzaWJpbGl0eWNoYW5nZVwiO1xuICAgIH1cblxuICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZG9jdW1lbnRbXCJ3ZWJraXRIaWRkZW5cIl0gIT09IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICBoaWRkZW4gPSBcIndlYmtpdEhpZGRlblwiO1xuICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlID0gXCJ3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlXCI7XG4gICAgfVxuXG4gICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodmlzaWJpbGl0eUNoYW5nZSwgKCkgPT4ge1xuXG4gICAgICAgIGlmICghd2luZG93LmRvY3VtZW50W2hpZGRlbl0pXG4gICAgICAgICAgICBjYWNoZS5mb3JFYWNoKHYgPT4geyB2LnJlZnJlc2goKTsgfSk7XG5cbiAgICB9LCBmYWxzZSk7XG5cbn0pKCk7IiwiaW1wb3J0IHsgU2VtYXBob3JlIH0gZnJvbSBcIkBhbHVtaXMvc2VtYXBob3JlXCI7XG5cbmV4cG9ydCBsZXQgc3RhY2sgPSBbXTtcblxubGV0IG9ic2VydmFibGVzOiBPYnNlcnZhYmxlPGFueT5bXSA9IFtdO1xubGV0IG9ic2VydmFibGVzTGVuZ3RoID0gMDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGU8VD4ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgKHRoaXMuX2hlYWQubmV4dCA9IHRoaXMuX3RhaWwpLnByZXZpb3VzID0gdGhpcy5faGVhZDtcblxuICAgICAgICB0aGlzLmRpc3Bvc2UgPSB0aGlzLmRpc3Bvc2UuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlPFQ+KHZhbHVlPzogVCkge1xuXG4gICAgICAgIGlmIChvYnNlcnZhYmxlc0xlbmd0aCkge1xuXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gPE9ic2VydmFibGU8VD4+b2JzZXJ2YWJsZXNbLS1vYnNlcnZhYmxlc0xlbmd0aF07XG5cbiAgICAgICAgICAgIG9ic2VydmFibGVzW29ic2VydmFibGVzTGVuZ3RoXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHZhciByZXN1bHQgPSBuZXcgT2JzZXJ2YWJsZTxUPigpO1xuXG4gICAgICAgIHJlc3VsdC53cmFwcGVkVmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHdyYXBwZWRWYWx1ZTogVDtcblxuICAgIF9oZWFkID0gT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbi5jcmVhdGUoKTtcbiAgICBfdGFpbCA9IE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlKCk7XG5cbiAgICBfcHJpb3JpdGl6ZWRIZWFkOiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uO1xuICAgIF9wcmlvcml0aXplZFRhaWw6IE9ic2VydmFibGVTdWJzY3JpcHRpb247XG5cbiAgICBnZXQgdmFsdWUoKSB7XG5cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBsZXQgY29tcHV0ZWRPYnNlcnZhYmxlID0gPENvbXB1dGVkT2JzZXJ2YWJsZTxUPj5zdGFja1tzdGFjay5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgaWYgKCFjb21wdXRlZE9ic2VydmFibGUub2JzZXJ2YWJsZXMuaGFzKHRoaXMpKVxuICAgICAgICAgICAgICAgIGNvbXB1dGVkT2JzZXJ2YWJsZS5vYnNlcnZhYmxlcy5zZXQodGhpcywgdGhpcy5zdWJzY3JpYmVTbmVha0luTGluZShjb21wdXRlZE9ic2VydmFibGUucmVmcmVzaCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZFZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogVCkge1xuXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMud3JhcHBlZFZhbHVlO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcblxuICAgICAgICAgICAgdGhpcy53cmFwcGVkVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHNldFZhbHVlRG9udE5vdGlmeShuZXdWYWx1ZTogVCwgZXhlbXB0ZWRPYnNlcnZhYmxlU3Vic2NyaXB0aW9uOiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uKSB7XG5cbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy53cmFwcGVkVmFsdWU7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXG4gICAgICAgICAgICB0aGlzLndyYXBwZWRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVyc0V4Y2VwdChuZXdWYWx1ZSwgb2xkVmFsdWUsIGV4ZW1wdGVkT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBwcmlvcml0aXplZFRhaWwoKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fcHJpb3JpdGl6ZWRUYWlsO1xuXG4gICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgICAgICB0aGlzLl9wcmlvcml0aXplZEhlYWQgPSBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLl9wcmlvcml0aXplZFRhaWwgPSB2YWx1ZSA9IE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlKCk7XG5cbiAgICAgICAgKHRoaXMuX3ByaW9yaXRpemVkSGVhZC5uZXh0ID0gdGhpcy5fcHJpb3JpdGl6ZWRUYWlsKS5wcmV2aW91cyA9IHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgbm90aWZ5U3Vic2NyaWJlcnMobmV3VmFsdWU6IFQsIG9sZFZhbHVlOiBUKSB7XG5cbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9wcmlvcml0aXplZEhlYWQ7XG5cbiAgICAgICAgaWYgKG5vZGUpIHtcblxuICAgICAgICAgICAgZm9yIChub2RlID0gbm9kZS5uZXh0OyBub2RlICE9PSB0aGlzLl9wcmlvcml0aXplZFRhaWw7KSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE5vZGUgPSBub2RlO1xuXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5hY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobm9kZSA9IHRoaXMuX2hlYWQubmV4dDsgbm9kZSAhPT0gdGhpcy5fdGFpbDspIHtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gbm9kZTtcblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLmFjdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbm90aWZ5U3Vic2NyaWJlcnNFeGNlcHQobmV3VmFsdWU6IFQsIG9sZFZhbHVlOiBULCBleGVtcHRlZE9ic2VydmFibGVTdWJzY3JpcHRpb246IE9ic2VydmFibGVTdWJzY3JpcHRpb24pIHtcblxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICBpZiAobm9kZSkge1xuXG4gICAgICAgICAgICBmb3IgKG5vZGUgPSBub2RlLm5leHQ7IG5vZGUgIT09IHRoaXMuX3ByaW9yaXRpemVkVGFpbDspIHtcblxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG5vZGU7XG5cbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlICE9PSBleGVtcHRlZE9ic2VydmFibGVTdWJzY3JpcHRpb24pXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLmFjdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChub2RlID0gdGhpcy5faGVhZC5uZXh0OyBub2RlICE9PSB0aGlzLl90YWlsOykge1xuXG4gICAgICAgICAgICBsZXQgY3VycmVudE5vZGUgPSBub2RlO1xuXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgIT09IGV4ZW1wdGVkT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbilcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5hY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGludmFsaWRhdGUoKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy53cmFwcGVkVmFsdWU7XG5cbiAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyh2YWx1ZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZShhY3Rpb246IChuZXdWYWx1ZTogVCwgb2xkVmFsdWU6IFQsICkgPT4gYW55KSB7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlRnJvbVRhaWwodGhpcy5fdGFpbCwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVJbnZva2UoYWN0aW9uOiAobmV3VmFsdWU6IFQsIG9sZFZhbHVlOiBULCApID0+IGFueSkge1xuXG4gICAgICAgIGFjdGlvbih0aGlzLndyYXBwZWRWYWx1ZSwgdm9pZCAwKTtcblxuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbi5jcmVhdGVGcm9tVGFpbCh0aGlzLl90YWlsLCBhY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfVxuXG4gICAgcHJpb3JpdGl6ZWRTdWJzY3JpYmUoYWN0aW9uOiAobmV3VmFsdWU6IFQsIG9sZFZhbHVlOiBULCApID0+IGFueSkge1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uLmNyZWF0ZUZyb21UYWlsKHRoaXMucHJpb3JpdGl6ZWRUYWlsLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIHByaW9yaXRpemVkU3Vic2NyaWJlSW52b2tlKGFjdGlvbjogKG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCwgKSA9PiBhbnkpIHtcblxuICAgICAgICBhY3Rpb24odGhpcy53cmFwcGVkVmFsdWUsIHRoaXMud3JhcHBlZFZhbHVlKTtcblxuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbi5jcmVhdGVGcm9tVGFpbCh0aGlzLnByaW9yaXRpemVkVGFpbCwgYWN0aW9uKTtcblxuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVNuZWFrSW5MaW5lKGFjdGlvbjogKG5ld1ZhbHVlOiBULCBvbGRWYWx1ZTogVCwgKSA9PiBhbnkpIHtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbi5jcmVhdGVGcm9tSGVhZCh0aGlzLl9oZWFkLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGRpc3Bvc2UocHVzaCA9IHRydWUpIHtcblxuICAgICAgICBkZWxldGUgdGhpcy53cmFwcGVkVmFsdWU7XG5cbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9wcmlvcml0aXplZEhlYWQ7XG5cbiAgICAgICAgaWYgKG5vZGUpIHtcblxuICAgICAgICAgICAgZm9yIChub2RlID0gbm9kZS5uZXh0OyBub2RlICE9PSB0aGlzLl9wcmlvcml0aXplZFRhaWw7KSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudE5vZGUgPSBub2RlO1xuXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5yZWN5Y2xlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ByaW9yaXRpemVkSGVhZC5yZWN5Y2xlKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fcHJpb3JpdGl6ZWRIZWFkO1xuXG4gICAgICAgICAgICB0aGlzLl9wcmlvcml0aXplZFRhaWwucmVjeWNsZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByaW9yaXRpemVkVGFpbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobm9kZSA9IHRoaXMuX2hlYWQubmV4dDsgbm9kZSAhPT0gdGhpcy5fdGFpbDspIHtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gbm9kZTtcblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnJlY3ljbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICh0aGlzLl9oZWFkLm5leHQgPSB0aGlzLl90YWlsKS5wcmV2aW91cyA9IHRoaXMuX2hlYWQ7XG5cbiAgICAgICAgaWYgKHB1c2gpIHtcblxuICAgICAgICAgICAgaWYgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gb2JzZXJ2YWJsZXNMZW5ndGgpXG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZXMucHVzaCh0aGlzKTtcblxuICAgICAgICAgICAgZWxzZSBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlc0xlbmd0aF0gPSB0aGlzO1xuXG4gICAgICAgICAgICArK29ic2VydmFibGVzTGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5sZXQgb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnM6IE9ic2VydmFibGVTdWJzY3JpcHRpb25bXSA9IFtdO1xubGV0IG9ic2VydmFibGVTdWJzY3JpcHRpb25zTGVuZ3RoID0gMDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVTdWJzY3JpcHRpb24ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy5kaXNwb3NlID0gdGhpcy5kaXNwb3NlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZSgpIHtcblxuICAgICAgICBpZiAob2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnNMZW5ndGgpIHtcblxuICAgICAgICAgICAgbGV0IGV4aXN0aW5nID0gb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnNbLS1vYnNlcnZhYmxlU3Vic2NyaXB0aW9uc0xlbmd0aF07XG5cbiAgICAgICAgICAgIG9ic2VydmFibGVTdWJzY3JpcHRpb25zW29ic2VydmFibGVTdWJzY3JpcHRpb25zTGVuZ3RoXSA9IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21UYWlsKHRhaWw6IE9ic2VydmFibGVTdWJzY3JpcHRpb24sIGFjdGlvbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbi5jcmVhdGUoKTtcblxuICAgICAgICAocmVzdWx0LnByZXZpb3VzID0gdGFpbC5wcmV2aW91cykubmV4dCA9IHJlc3VsdDtcbiAgICAgICAgKHJlc3VsdC5uZXh0ID0gdGFpbCkucHJldmlvdXMgPSByZXN1bHQ7XG5cbiAgICAgICAgcmVzdWx0LmFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVGcm9tSGVhZChoZWFkOiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uLCBhY3Rpb246ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSB7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlKCk7XG5cbiAgICAgICAgKHJlc3VsdC5uZXh0ID0gaGVhZC5uZXh0KS5wcmV2aW91cyA9IHJlc3VsdDtcbiAgICAgICAgKHJlc3VsdC5wcmV2aW91cyA9IGhlYWQpLm5leHQgPSByZXN1bHQ7XG5cbiAgICAgICAgcmVzdWx0LmFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByZXZpb3VzOiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uO1xuICAgIG5leHQ6IE9ic2VydmFibGVTdWJzY3JpcHRpb247XG5cbiAgICBhY3Rpb246ICgoLi4uYXJnczogYW55W10pID0+IGFueSk7XG5cbiAgICByZWN5Y2xlKCkge1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLnByZXZpb3VzO1xuICAgICAgICBkZWxldGUgdGhpcy5uZXh0O1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLmFjdGlvbjtcblxuICAgICAgICBpZiAob2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMubGVuZ3RoID09PSBvYnNlcnZhYmxlU3Vic2NyaXB0aW9uc0xlbmd0aClcbiAgICAgICAgICAgIG9ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2godGhpcyk7XG5cbiAgICAgICAgZWxzZSBvYnNlcnZhYmxlU3Vic2NyaXB0aW9uc1tvYnNlcnZhYmxlU3Vic2NyaXB0aW9uc0xlbmd0aF0gPSB0aGlzO1xuXG4gICAgICAgICsrb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnNMZW5ndGg7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcblxuICAgICAgICAodGhpcy5wcmV2aW91cy5uZXh0ID0gdGhpcy5uZXh0KS5wcmV2aW91cyA9IHRoaXMucHJldmlvdXM7XG4gICAgICAgIHRoaXMucmVjeWNsZSgpO1xuICAgIH1cbn1cblxubGV0IG9ic2VydmFibGVzV2l0aEVycm9yOiBPYnNlcnZhYmxlV2l0aEVycm9yPGFueT5bXSA9IFtdO1xubGV0IG9ic2VydmFibGVzV2l0aEVycm9yTGVuZ3RoID0gMDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVXaXRoRXJyb3I8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICAgIGVycm9yID0gT2JzZXJ2YWJsZS5jcmVhdGU8YW55PigpO1xuXG4gICAgZGlzcG9zZSgpIHtcblxuICAgICAgICBkZWxldGUgdGhpcy53cmFwcGVkVmFsdWU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmVycm9yLndyYXBwZWRWYWx1ZTtcblxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICBpZiAobm9kZSkge1xuXG4gICAgICAgICAgICBmb3IgKG5vZGUgPSBub2RlLm5leHQ7IG5vZGUgIT09IHRoaXMuX3ByaW9yaXRpemVkVGFpbDspIHtcblxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG5vZGU7XG5cbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnJlY3ljbGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdGl6ZWRIZWFkLnJlY3ljbGUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmlvcml0aXplZEhlYWQ7O1xuXG4gICAgICAgICAgICB0aGlzLl9wcmlvcml0aXplZFRhaWwucmVjeWNsZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByaW9yaXRpemVkVGFpbDs7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKG5vZGUgPSB0aGlzLl9oZWFkLm5leHQ7IG5vZGUgIT09IHRoaXMuX3RhaWw7KSB7XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG5vZGU7XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5yZWN5Y2xlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAodGhpcy5faGVhZC5uZXh0ID0gdGhpcy5fdGFpbCkucHJldmlvdXMgPSB0aGlzLl9oZWFkO1xuXG4gICAgICAgIGlmIChvYnNlcnZhYmxlc1dpdGhFcnJvci5sZW5ndGggPT09IG9ic2VydmFibGVzV2l0aEVycm9yTGVuZ3RoKVxuICAgICAgICAgICAgb2JzZXJ2YWJsZXNXaXRoRXJyb3IucHVzaCh0aGlzKTtcblxuICAgICAgICBlbHNlIG9ic2VydmFibGVzV2l0aEVycm9yW29ic2VydmFibGVzV2l0aEVycm9yTGVuZ3RoXSA9IHRoaXM7XG5cbiAgICAgICAgKytvYnNlcnZhYmxlc1dpdGhFcnJvckxlbmd0aDtcbiAgICB9XG59XG5cbmxldCBjb21wdXRlZE9ic2VydmFibGVzOiBDb21wdXRlZE9ic2VydmFibGU8YW55PltdID0gW107XG5sZXQgY29tcHV0ZWRPYnNlcnZhYmxlc0xlbmd0aCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDb21wdXRlZE9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlV2l0aEVycm9yPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUNvbXB1dGVkPFQ+KGV4cHJlc3Npb246ICgpID0+IFQsIHByZUV2YWx1YXRlID0gdHJ1ZSkge1xuXG4gICAgICAgIGlmIChjb21wdXRlZE9ic2VydmFibGVzTGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSA8Q29tcHV0ZWRPYnNlcnZhYmxlPFQ+PmNvbXB1dGVkT2JzZXJ2YWJsZXNbLS1jb21wdXRlZE9ic2VydmFibGVzTGVuZ3RoXTtcblxuICAgICAgICAgICAgY29tcHV0ZWRPYnNlcnZhYmxlc1tjb21wdXRlZE9ic2VydmFibGVzTGVuZ3RoXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHZhciByZXN1bHQgPSBuZXcgQ29tcHV0ZWRPYnNlcnZhYmxlPFQ+KCk7XG5cbiAgICAgICAgcmVzdWx0LmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuXG4gICAgICAgIGlmIChwcmVFdmFsdWF0ZSlcbiAgICAgICAgICAgIHJlc3VsdC53cmFwcGVkVmFsdWUgPSByZXN1bHQuZXZhbHVhdGVFeHByZXNzaW9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBleHByZXNzaW9uOiAoKSA9PiBUO1xuXG4gICAgZXZhbHVhdGVFeHByZXNzaW9uKCkge1xuXG4gICAgICAgIHN0YWNrLnB1c2godGhpcyk7XG5cbiAgICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmV4cHJlc3Npb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgIHZhciBvbGRTdGFjayA9IHN0YWNrO1xuXG4gICAgICAgICAgICBzdGFjayA9IFtdO1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvci52YWx1ZSA9IGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpbmFsbHkge1xuXG4gICAgICAgICAgICAgICAgKHN0YWNrID0gb2xkU3RhY2spLnBvcCgpO1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lcnJvci53cmFwcGVkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgb2xkU3RhY2sgPSBzdGFjaztcblxuICAgICAgICAgICAgc3RhY2sgPSBbXTtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhdGNoIHsgfVxuXG4gICAgICAgICAgICBzdGFjayA9IG9sZFN0YWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhY2sucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBvYnNlcnZhYmxlczogTWFwPE9ic2VydmFibGU8VD4sIE9ic2VydmFibGVTdWJzY3JpcHRpb24+ID0gbmV3IE1hcCgpO1xuXG4gICAgcG9zdEV2YWx1YXRlKCkge1xuXG4gICAgICAgIHRoaXMud3JhcHBlZFZhbHVlID0gdGhpcy5ldmFsdWF0ZUV4cHJlc3Npb24oKTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuXG4gICAgICAgIGxldCBvYnNlcnZhYmxlcyA9IHRoaXMub2JzZXJ2YWJsZXM7XG5cbiAgICAgICAgb2JzZXJ2YWJsZXMuZm9yRWFjaChzID0+IHsgcy5kaXNwb3NlKCk7IH0pO1xuICAgICAgICB0aGlzLm9ic2VydmFibGVzLmNsZWFyKCk7XG5cbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy53cmFwcGVkVmFsdWUsIG5ld1ZhbHVlID0gdGhpcy5ldmFsdWF0ZUV4cHJlc3Npb24oKTtcblxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG5cbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKSB7XG5cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBsZXQgY29tcHV0ZWRPYnNlcnZhYmxlID0gPENvbXB1dGVkT2JzZXJ2YWJsZTxUPj5zdGFja1tzdGFjay5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgaWYgKCFjb21wdXRlZE9ic2VydmFibGUub2JzZXJ2YWJsZXMuaGFzKHRoaXMpKVxuICAgICAgICAgICAgICAgIGNvbXB1dGVkT2JzZXJ2YWJsZS5vYnNlcnZhYmxlcy5zZXQodGhpcywgdGhpcy5zdWJzY3JpYmVTbmVha0luTGluZShjb21wdXRlZE9ic2VydmFibGUucmVmcmVzaCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZFZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZShfOiBUKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNldCB0aGUgdmFsdWUgb2YgYSBDb21wdXRlZE9ic2VydmFibGVcIik7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcblxuICAgICAgICB0aGlzLm9ic2VydmFibGVzLmZvckVhY2gocyA9PiB7IHMuZGlzcG9zZSgpOyB9KTtcblxuICAgICAgICBkZWxldGUgdGhpcy5leHByZXNzaW9uO1xuICAgICAgICBkZWxldGUgdGhpcy53cmFwcGVkVmFsdWU7XG5cbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlcy5jbGVhcigpO1xuXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5fcHJpb3JpdGl6ZWRIZWFkO1xuXG4gICAgICAgIGlmIChub2RlKSB7XG5cbiAgICAgICAgICAgIGZvciAobm9kZSA9IG5vZGUubmV4dDsgbm9kZSAhPT0gdGhpcy5fcHJpb3JpdGl6ZWRUYWlsOykge1xuXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gbm9kZTtcblxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGUucmVjeWNsZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wcmlvcml0aXplZEhlYWQucmVjeWNsZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdGl6ZWRUYWlsLnJlY3ljbGUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmlvcml0aXplZFRhaWw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKG5vZGUgPSB0aGlzLl9oZWFkLm5leHQ7IG5vZGUgIT09IHRoaXMuX3RhaWw7KSB7XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG5vZGU7XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5yZWN5Y2xlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAodGhpcy5faGVhZC5uZXh0ID0gdGhpcy5fdGFpbCkucHJldmlvdXMgPSB0aGlzLl9oZWFkO1xuXG4gICAgICAgIGlmIChjb21wdXRlZE9ic2VydmFibGVzLmxlbmd0aCA9PT0gY29tcHV0ZWRPYnNlcnZhYmxlc0xlbmd0aClcbiAgICAgICAgICAgIGNvbXB1dGVkT2JzZXJ2YWJsZXMucHVzaCh0aGlzKTtcblxuICAgICAgICBlbHNlIGNvbXB1dGVkT2JzZXJ2YWJsZXNbY29tcHV0ZWRPYnNlcnZhYmxlc0xlbmd0aF0gPSB0aGlzO1xuXG4gICAgICAgICsrY29tcHV0ZWRPYnNlcnZhYmxlc0xlbmd0aDtcblxuICAgICAgICB0aGlzLmVycm9yLmRpc3Bvc2UoZmFsc2UpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW5Bc3luYyhleHByZXNzaW9uOiAoKSA9PiBib29sZWFuKSB7XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIHZhbHVlID0gZXhwcmVzc2lvbigpO1xuICAgIH1cblxuICAgIGNhdGNoIChlKSB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICBsZXQgY29tcHV0ZWRPYnNlcnZhYmxlID0gQ29tcHV0ZWRPYnNlcnZhYmxlLmNyZWF0ZUNvbXB1dGVkKGV4cHJlc3Npb24sIGZhbHNlKTtcblxuICAgICAgICBjb21wdXRlZE9ic2VydmFibGUud3JhcHBlZFZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgY29tcHV0ZWRPYnNlcnZhYmxlLnN1YnNjcmliZShuID0+IHtcblxuICAgICAgICAgICAgaWYgKG4pIHtcblxuICAgICAgICAgICAgICAgIGNvbXB1dGVkT2JzZXJ2YWJsZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29tcHV0ZWRPYnNlcnZhYmxlLmVycm9yLnN1YnNjcmliZShlID0+IHtcblxuICAgICAgICAgICAgY29tcHV0ZWRPYnNlcnZhYmxlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbHdheXNXaGVuKGV4cHJlc3Npb246ICgpID0+IGJvb2xlYW4sIHJlc29sdmU6ICgpID0+IGFueSwgcmVqZWN0OiAoZSkgPT4gYW55KSB7XG5cbiAgICBsZXQgcmVzdWx0ID0gQ29tcHV0ZWRPYnNlcnZhYmxlLmNyZWF0ZUNvbXB1dGVkKGV4cHJlc3Npb24pO1xuXG4gICAgcmVzdWx0LnN1YnNjcmliZUludm9rZShuID0+IHtcblxuICAgICAgICBpZiAobilcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcblxuICAgIHJlc3VsdC5lcnJvci5zdWJzY3JpYmVJbnZva2UoZSA9PiB7XG5cbiAgICAgICAgaWYgKGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JzZXJ2YWJsZUNvbGxlY3Rpb248VD4ge1xuXG4gICAgc3Vic2NyaWJlKGFjdGlvbjogKGFkZGVkSXRlbXM6IFRbXSwgcmVtb3ZlZEl0ZW1zOiBUW10pID0+IGFueSk6IE9ic2VydmFibGVTdWJzY3JpcHRpb247XG4gICAgZGlzcG9zZSgpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9yZGVyZWRPYnNlcnZhYmxlQ29sbGVjdGlvbjxUPiBleHRlbmRzIE9ic2VydmFibGVDb2xsZWN0aW9uPFQ+IHtcblxuICAgIHN1YnNjcmliZShhY3Rpb246IChhZGRlZEl0ZW1zOiBUW10sIHJlbW92ZWRJdGVtczogVFtdLCBpbmRleDogbnVtYmVyLCBtb3ZlOiBib29sZWFuKSA9PiBhbnkpOiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uO1xuICAgIHdyYXBwZWRDb2xsZWN0aW9uOiBUW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVyaXZlZE9ic2VydmFibGVDb2xsZWN0aW9uPFQsIFU+IGV4dGVuZHMgT2JzZXJ2YWJsZUNvbGxlY3Rpb248VT4ge1xuXG4gICAgc291cmNlQ29sbGVjdGlvbjogT2JzZXJ2YWJsZUNvbGxlY3Rpb248VD47XG4gICAgZGlzcG9zZVNvdXJjZUNvbGxlY3Rpb246IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlQXJyYXk8VD4gaW1wbGVtZW50cyBPcmRlcmVkT2JzZXJ2YWJsZUNvbGxlY3Rpb248VD4ge1xuXG4gICAgY29uc3RydWN0b3Iod3JhcHBlZENvbGxlY3Rpb24/OiBUW10pIHtcblxuICAgICAgICB0aGlzLmRpc3Bvc2UgPSB0aGlzLmRpc3Bvc2UuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAod3JhcHBlZENvbGxlY3Rpb24pXG4gICAgICAgICAgICB0aGlzLndyYXBwZWRDb2xsZWN0aW9uID0gd3JhcHBlZENvbGxlY3Rpb247XG5cbiAgICAgICAgZWxzZSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uID0gW107XG5cbiAgICAgICAgKHRoaXMuX2hlYWQubmV4dCA9IHRoaXMuX3RhaWwpLnByZXZpb3VzID0gdGhpcy5faGVhZDtcbiAgICB9XG5cbiAgICB3cmFwcGVkQ29sbGVjdGlvbjogVFtdO1xuXG4gICAgcHJpdmF0ZSBfaGVhZCA9IE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlKCk7XG4gICAgcHJpdmF0ZSBfdGFpbCA9IE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlKCk7XG5cbiAgICBnZXQgdmFsdWUoKSB7XG5cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBsZXQgY29tcHV0ZWRPYnNlcnZhYmxlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIGlmICghY29tcHV0ZWRPYnNlcnZhYmxlLm9ic2VydmFibGVzLmhhcyh0aGlzKSlcbiAgICAgICAgICAgICAgICBjb21wdXRlZE9ic2VydmFibGUub2JzZXJ2YWJsZXMuc2V0KHRoaXMsIHRoaXMuc3Vic2NyaWJlU25lYWtJbkxpbmUoY29tcHV0ZWRPYnNlcnZhYmxlLnJlZnJlc2gpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZWRDb2xsZWN0aW9uO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBub3RpZnlTdWJzY3JpYmVycyhhZGRlZEl0ZW1zOiBUW10sIHJlbW92ZWRJdGVtczogVFtdLCBpbmRleDogbnVtYmVyLCBtb3ZlPzogYm9vbGVhbikge1xuXG4gICAgICAgIGZvciAobGV0IG5vZGUgPSB0aGlzLl9oZWFkLm5leHQ7IG5vZGUgIT0gdGhpcy5fdGFpbDsgbm9kZSA9IG5vZGUubmV4dClcbiAgICAgICAgICAgIG5vZGUuYWN0aW9uKGFkZGVkSXRlbXMsIHJlbW92ZWRJdGVtcywgaW5kZXgsIG1vdmUpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZShhY3Rpb246IChhZGRlZEl0ZW1zOiBUW10sIHJlbW92ZWRJdGVtczogVFtdLCBpbmRleDogbnVtYmVyLCBtb3ZlOiBib29sZWFuKSA9PiBhbnkpIHtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbi5jcmVhdGVGcm9tVGFpbCh0aGlzLl90YWlsLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVNuZWFrSW5MaW5lKGFjdGlvbjogKGFkZGVkSXRlbXM6IFRbXSwgcmVtb3ZlZEl0ZW1zOiBUW10sIGluZGV4OiBudW1iZXIsIG1vdmU6IGJvb2xlYW4pID0+IGFueSkge1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uLmNyZWF0ZUZyb21IZWFkKHRoaXMuX2hlYWQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGl0ZW06IFQpIHtcblxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uO1xuXG4gICAgICAgIGZvciAobGV0IGZyb21JbmRleCA9IDA7IDspIHtcblxuICAgICAgICAgICAgZnJvbUluZGV4ID0gYXJyYXkuaW5kZXhPZihpdGVtLCBmcm9tSW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAoZnJvbUluZGV4ID09PSAtMSlcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gYXJyYXlbZnJvbUluZGV4XTtcblxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKG51bGwsIFtyZW1vdmVkSXRlbV0sIGZyb21JbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVBdChpbmRleDogbnVtYmVyKSB7XG5cbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy53cmFwcGVkQ29sbGVjdGlvbiwgcmVtb3ZlZEl0ZW1zID0gW2FycmF5W2luZGV4XV07XG5cbiAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhudWxsLCByZW1vdmVkSXRlbXMsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZW1vdmVSYW5nZShpbmRleDogbnVtYmVyLCBjb3VudDogbnVtYmVyKSB7XG5cbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy53cmFwcGVkQ29sbGVjdGlvbiwgcmVtb3ZlZEl0ZW1zID0gYXJyYXkuc3BsaWNlKGluZGV4LCBjb3VudCk7XG5cbiAgICAgICAgaWYgKHJlbW92ZWRJdGVtcy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKG51bGwsIHJlbW92ZWRJdGVtcywgaW5kZXgpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuXG4gICAgICAgIGxldCByZW1vdmVkSXRlbXMgPSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uO1xuXG4gICAgICAgIGlmIChyZW1vdmVkSXRlbXMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIHRoaXMud3JhcHBlZENvbGxlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMobnVsbCwgcmVtb3ZlZEl0ZW1zLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChpdGVtOiBUKSB7XG5cbiAgICAgICAgbGV0IGFycmF5ID0gdGhpcy53cmFwcGVkQ29sbGVjdGlvbjtcblxuICAgICAgICBhcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFtpdGVtXSwgbnVsbCwgdGhpcy53cmFwcGVkQ29sbGVjdGlvbi5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBhZGRSYW5nZShpdGVtczogVFtdKSB7XG5cbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uLCBpbmRleCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgICAgICAgYXJyYXkucHVzaC5hcHBseShhcnJheSwgaXRlbXMpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhpdGVtcywgbnVsbCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0KGluZGV4OiBudW1iZXIsIGl0ZW06IFQpIHtcblxuICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uO1xuXG4gICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoW2l0ZW1dLCBudWxsLCBpbmRleCk7XG4gICAgfVxuXG4gICAgaW5zZXJ0UmFuZ2UoaW5kZXg6IG51bWJlciwgaXRlbXM6IFRbXSkge1xuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgbGV0IGFycmF5ID0gdGhpcy53cmFwcGVkQ29sbGVjdGlvbjtcblxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlLmFwcGx5KGFycmF5LCAoPGFueVtdPltpbmRleCwgMF0pLmNvbmNhdChpdGVtcykpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhpdGVtcywgbnVsbCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjb25jaWxlKGl0ZW1zOiBUW10pIHtcblxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5hZGRSYW5nZShpdGVtcyk7XG4gICAgfVxuXG4gICAgY29udGFpbnMoaXRlbTogVCkge1xuXG4gICAgICAgIGZvciAobGV0IGkgb2YgdGhpcy53cmFwcGVkQ29sbGVjdGlvbilcbiAgICAgICAgICAgIGlmIChpID09PSBpdGVtKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBtYXA8VT4oY2FsbGJhY2tmbjogKHg6IFQpID0+IFUpIHtcblxuICAgICAgICByZXR1cm4gbmV3IE1hcHBlZE9ic2VydmFibGVBcnJheSh0aGlzLCBjYWxsYmFja2ZuLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcblxuICAgICAgICBkZWxldGUgdGhpcy53cmFwcGVkQ29sbGVjdGlvbjtcblxuICAgICAgICBmb3IgKGxldCBub2RlID0gdGhpcy5faGVhZC5uZXh0OyBub2RlICE9IHRoaXMuX3RhaWw7KSB7XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG5vZGU7XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5yZWN5Y2xlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9oZWFkLnJlY3ljbGUoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2hlYWQ7XG5cbiAgICAgICAgdGhpcy5fdGFpbC5yZWN5Y2xlKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl90YWlsO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hcHBlZE9ic2VydmFibGVBcnJheTxULCBVPiBleHRlbmRzIE9ic2VydmFibGVBcnJheTxVPiBpbXBsZW1lbnRzIERlcml2ZWRPYnNlcnZhYmxlQ29sbGVjdGlvbjxULCBVPiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlQ29sbGVjdGlvbjogT3JkZXJlZE9ic2VydmFibGVDb2xsZWN0aW9uPFQ+LCBwcm90ZWN0ZWQgY2FsbGJhY2tmbjogKHg6IFQpID0+IFUsIHB1YmxpYyBkaXNwb3NlU291cmNlQ29sbGVjdGlvbjogYm9vbGVhbiwgcHJvdGVjdGVkIGRpc3Bvc2VDaGlsZHJlbjogYm9vbGVhbikge1xuXG4gICAgICAgIHN1cGVyKHNvdXJjZUNvbGxlY3Rpb24ud3JhcHBlZENvbGxlY3Rpb24ubWFwKGNhbGxiYWNrZm4pKTtcblxuICAgICAgICBsZXQgbW92ZU1hcCA9IG5ldyBNYXA8VCwgVVtdPigpO1xuXG4gICAgICAgIHRoaXMuX3NvdXJjZUNvbGxlY3Rpb25TdWJzY3JpcHRpb24gPSBzb3VyY2VDb2xsZWN0aW9uLnN1YnNjcmliZSgoYWRkZWRJdGVtczogVFtdLCByZW1vdmVkSXRlbXM6IFRbXSwgaW5kZXg6IG51bWJlciwgbW92ZTogYm9vbGVhbikgPT4ge1xuXG4gICAgICAgICAgICBpZiAobW92ZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGFkZGVkSXRlbXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFwcGVkQWRkZWRJdGVtcyA9IGFkZGVkSXRlbXMubWFwKHQgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdUZpZm8gPSBtb3ZlTWFwLmdldCh0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVGaWZvLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHVGaWZvWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZU1hcC5kZWxldGUodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdUZpZm8uc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkQ29sbGVjdGlvbi5zcGxpY2UuYXBwbHkodGhpcy53cmFwcGVkQ29sbGVjdGlvbiwgKDxhbnlbXT5baW5kZXgsIDBdKS5jb25jYXQobWFwcGVkQWRkZWRJdGVtcykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKG1hcHBlZEFkZGVkSXRlbXMsIG51bGwsIGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbHNlIHsgLy8gUmVtb3ZlZCBpdGVtc1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXBwZWRSZW1vdmVkSXRlbXMgPSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uLnNwbGljZShpbmRleCwgcmVtb3ZlZEl0ZW1zLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW1vdmVkSXRlbXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSByZW1vdmVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdSA9IG1hcHBlZFJlbW92ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ1VGaWZvID0gbW92ZU1hcC5nZXQodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VGaWZvKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nVUZpZm8ucHVzaCh1KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBtb3ZlTWFwLnNldCh0LCBbdV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhudWxsLCBtYXBwZWRSZW1vdmVkSXRlbXMsIGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKGFkZGVkSXRlbXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFwcGVkQWRkZWRJdGVtcyA9IGFkZGVkSXRlbXMubWFwKHQgPT4gdGhpcy5jYWxsYmFja2ZuKHQpKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRDb2xsZWN0aW9uLnNwbGljZS5hcHBseSh0aGlzLndyYXBwZWRDb2xsZWN0aW9uLCAoPGFueVtdPltpbmRleCwgMF0pLmNvbmNhdChtYXBwZWRBZGRlZEl0ZW1zKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMobWFwcGVkQWRkZWRJdGVtcywgbnVsbCwgaW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbHNlIHsgLy8gUmVtb3ZlZCBpdGVtc1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXBwZWRSZW1vdmVkSXRlbXMgPSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uLnNwbGljZShpbmRleCwgcmVtb3ZlZEl0ZW1zLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcG9zZUNoaWxkcmVuKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHUgb2YgbWFwcGVkUmVtb3ZlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCg8YW55PnUpLmRpc3Bvc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8YW55PnUpLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMobnVsbCwgbWFwcGVkUmVtb3ZlZEl0ZW1zLCBpbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc291cmNlQ29sbGVjdGlvblN1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbjtcblxuICAgIG1hcDxWPihjYWxsYmFja2ZuOiAoeDogVSkgPT4gVikge1xuXG4gICAgICAgIHJldHVybiBuZXcgTWFwcGVkT2JzZXJ2YWJsZUFycmF5KHRoaXMsIGNhbGxiYWNrZm4sIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzcG9zZUNoaWxkcmVuKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHUgb2YgdGhpcy53cmFwcGVkQ29sbGVjdGlvbikge1xuXG4gICAgICAgICAgICAgICAgaWYgKCg8YW55PnUpLmRpc3Bvc2UpXG4gICAgICAgICAgICAgICAgICAgICg8YW55PnUpLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcblxuICAgICAgICBpZiAodGhpcy5kaXNwb3NlU291cmNlQ29sbGVjdGlvbikge1xuXG4gICAgICAgICAgICB0aGlzLnNvdXJjZUNvbGxlY3Rpb24uZGlzcG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc291cmNlQ29sbGVjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgdGhpcy5fc291cmNlQ29sbGVjdGlvblN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG5cbiAgICAgICAgZGVsZXRlIHRoaXMuX3NvdXJjZUNvbGxlY3Rpb25TdWJzY3JpcHRpb247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVNldDxUPiBpbXBsZW1lbnRzIE9ic2VydmFibGVDb2xsZWN0aW9uPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB3cmFwcGVkU2V0PzogU2V0PFQ+KSB7XG5cbiAgICAgICAgdGhpcy5kaXNwb3NlID0gdGhpcy5kaXNwb3NlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKCF3cmFwcGVkU2V0KVxuICAgICAgICAgICAgdGhpcy53cmFwcGVkU2V0ID0gbmV3IFNldCgpO1xuXG4gICAgICAgICh0aGlzLl9oZWFkLm5leHQgPSB0aGlzLl90YWlsKS5wcmV2aW91cyA9IHRoaXMuX2hlYWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGVhZCA9IE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlKCk7XG4gICAgcHJpdmF0ZSBfdGFpbCA9IE9ic2VydmFibGVTdWJzY3JpcHRpb24uY3JlYXRlKCk7XG5cbiAgICBnZXQgdmFsdWUoKSB7XG5cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBsZXQgY29tcHV0ZWRPYnNlcnZhYmxlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIGlmICghY29tcHV0ZWRPYnNlcnZhYmxlLm9ic2VydmFibGVzLmhhcyh0aGlzKSlcbiAgICAgICAgICAgICAgICBjb21wdXRlZE9ic2VydmFibGUub2JzZXJ2YWJsZXMuc2V0KHRoaXMsIHRoaXMuc3Vic2NyaWJlU25lYWtJbkxpbmUoY29tcHV0ZWRPYnNlcnZhYmxlLnJlZnJlc2gpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZWRTZXQ7XG4gICAgfVxuXG4gICAgYWRkKHZhbHVlOiBUKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLndyYXBwZWRTZXQuaGFzKHZhbHVlKSkge1xuXG4gICAgICAgICAgICB0aGlzLndyYXBwZWRTZXQuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoW3ZhbHVlXSwgbnVsbCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGFkZEl0ZW1zKGl0ZW1zOiBUW10pIHtcblxuICAgICAgICBsZXQgYWRkZWRJdGVtczogVFtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSBvZiBpdGVtcykge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMud3JhcHBlZFNldC5oYXMoaSkpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFNldC5hZGQoaSk7XG4gICAgICAgICAgICAgICAgYWRkZWRJdGVtcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFkZGVkSXRlbXMubGVuZ3RoKVxuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhhZGRlZEl0ZW1zLCBudWxsKTtcbiAgICB9XG5cbiAgICByZWNvbmNpbGUoaXRlbXM6IFNldDxUPikge1xuXG4gICAgICAgIGxldCByZW1vdmVkSXRlbXM6IFRbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgb2YgdGhpcy53cmFwcGVkU2V0KVxuICAgICAgICAgICAgaWYgKCFpdGVtcy5oYXMoaSkpXG4gICAgICAgICAgICAgICAgcmVtb3ZlZEl0ZW1zLnB1c2goaSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZWRJdGVtcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSBvZiByZW1vdmVkSXRlbXMpXG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkU2V0LmRlbGV0ZShpKTtcblxuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhudWxsLCByZW1vdmVkSXRlbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFkZGVkSXRlbXM6IFRbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgb2YgaXRlbXMpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLndyYXBwZWRTZXQuaGFzKGkpKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRTZXQuYWRkKGkpO1xuICAgICAgICAgICAgICAgIGFkZGVkSXRlbXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhZGRlZEl0ZW1zLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMoYWRkZWRJdGVtcywgbnVsbCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKHZhbHVlOiBUKSB7XG5cbiAgICAgICAgaWYgKHRoaXMud3JhcHBlZFNldC5oYXModmFsdWUpKSB7XG5cbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFNldC5kZWxldGUodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhudWxsLCBbdmFsdWVdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVtb3ZlSXRlbXMoaXRlbXM6IFRbXSkge1xuXG4gICAgICAgIGxldCByZW1vdmVkSXRlbXM6IFRbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgb2YgaXRlbXMpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlZFNldC5oYXMoaSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRTZXQuZGVsZXRlKGkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWRJdGVtcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbW92ZWRJdGVtcy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKG51bGwsIHJlbW92ZWRJdGVtcyk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG5cbiAgICAgICAgbGV0IHJlbW92ZWRJdGVtczogVFtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSBvZiB0aGlzLndyYXBwZWRTZXQpXG4gICAgICAgICAgICByZW1vdmVkSXRlbXMucHVzaChpKTtcblxuICAgICAgICBpZiAocmVtb3ZlZEl0ZW1zLmxlbmd0aCkge1xuXG4gICAgICAgICAgICB0aGlzLndyYXBwZWRTZXQuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMobnVsbCwgcmVtb3ZlZEl0ZW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRhaW5zKHZhbHVlOiBUKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZFNldC5oYXModmFsdWUpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZShhY3Rpb246IChhZGRlZEl0ZW1zOiBUW10sIHJlbW92ZWRJdGVtczogVFtdKSA9PiBhbnkpIHtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbi5jcmVhdGVGcm9tVGFpbCh0aGlzLl90YWlsLCBhY3Rpb24pO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVNuZWFrSW5MaW5lKGFjdGlvbjogKGFkZGVkSXRlbXM6IFRbXSwgcmVtb3ZlZEl0ZW1zOiBUW10pID0+IGFueSkge1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uLmNyZWF0ZUZyb21IZWFkKHRoaXMuX2hlYWQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG5vdGlmeVN1YnNjcmliZXJzKGFkZGVkSXRlbXM6IFRbXSwgcmVtb3ZlZEl0ZW1zOiBUW10pIHtcblxuICAgICAgICBmb3IgKGxldCBub2RlID0gdGhpcy5faGVhZC5uZXh0OyBub2RlICE9IHRoaXMuX3RhaWw7IG5vZGUgPSBub2RlLm5leHQpXG4gICAgICAgICAgICBub2RlLmFjdGlvbihhZGRlZEl0ZW1zLCByZW1vdmVkSXRlbXMpO1xuICAgIH1cblxuICAgIGZpbHRlcihjYWxsYmFja2ZuOiAoaXRlbTogVCkgPT4gYm9vbGVhbik6IEZpbHRlcmVkT2JzZXJ2YWJsZVNldDxUPiB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJlZE9ic2VydmFibGVTZXQodGhpcywgY2FsbGJhY2tmbiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHNvcnQoY29tcGFyZWZuOiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBTb3J0ZWRPYnNlcnZhYmxlU2V0PFQ+KHRoaXMsIGNvbXBhcmVmbiwgZmFsc2UpO1xuICAgIH1cblxuICAgIG1hcDxVPihjYWxsYmFja2ZuOiAoeDogVCkgPT4gVSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgTWFwcGVkT2JzZXJ2YWJsZVNldCh0aGlzLCBjYWxsYmFja2ZuLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcblxuICAgICAgICBkZWxldGUgdGhpcy53cmFwcGVkU2V0O1xuXG4gICAgICAgIGZvciAobGV0IG5vZGUgPSB0aGlzLl9oZWFkLm5leHQ7IG5vZGUgIT0gdGhpcy5fdGFpbDspIHtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gbm9kZTtcblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnJlY3ljbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hlYWQucmVjeWNsZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy5faGVhZDtcblxuICAgICAgICB0aGlzLl90YWlsLnJlY3ljbGUoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3RhaWw7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFwcGVkT2JzZXJ2YWJsZVNldDxULCBVPiBleHRlbmRzIE9ic2VydmFibGVTZXQ8VT4gaW1wbGVtZW50cyBEZXJpdmVkT2JzZXJ2YWJsZUNvbGxlY3Rpb248VCwgVT4ge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUNvbGxlY3Rpb246IE9ic2VydmFibGVTZXQ8VD4sIHByb3RlY3RlZCBjYWxsYmFja2ZuOiAoeDogVCkgPT4gVSwgcHVibGljIGRpc3Bvc2VTb3VyY2VDb2xsZWN0aW9uOiBib29sZWFuLCBwcm90ZWN0ZWQgZGlzcG9zZUNoaWxkcmVuOiBib29sZWFuKSB7XG5cbiAgICAgICAgc3VwZXIodW5kZWZpbmVkKTtcblxuICAgICAgICBmb3IgKGxldCB0IG9mIHRoaXMuc291cmNlQ29sbGVjdGlvbi53cmFwcGVkU2V0KSB7XG5cbiAgICAgICAgICAgIGxldCB1ID0gdGhpcy5jYWxsYmFja2ZuKHQpO1xuXG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KHQsIHUpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkU2V0LmFkZCh1KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NvdXJjZUNvbGxlY3Rpb25TdWJzY3JpcHRpb24gPSBzb3VyY2VDb2xsZWN0aW9uLnN1YnNjcmliZSgoYWRkZWRJdGVtcywgcmVtb3ZlZEl0ZW1zKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB1SXRlbXM6IFVbXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoYWRkZWRJdGVtcykge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdCBvZiBhZGRlZEl0ZW1zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHUgPSB0aGlzLmNhbGxiYWNrZm4odCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNldCh0LCB1KTtcbiAgICAgICAgICAgICAgICAgICAgdUl0ZW1zLnB1c2godSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtcyh1SXRlbXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmIChyZW1vdmVkSXRlbXMpIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IHQgb2YgcmVtb3ZlZEl0ZW1zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwLmRlbGV0ZSh0KTtcbiAgICAgICAgICAgICAgICAgICAgdUl0ZW1zLnB1c2godGhpcy5fbWFwLmdldCh0KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtcyh1SXRlbXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpc3Bvc2VDaGlsZHJlbikge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHUgb2YgdUl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDxhbnk+dSkuZGlzcG9zZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPGFueT51KS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21hcCA9IG5ldyBNYXA8VCwgVT4oKTtcbiAgICBwcml2YXRlIF9zb3VyY2VDb2xsZWN0aW9uU3Vic2NyaXB0aW9uOiBPYnNlcnZhYmxlU3Vic2NyaXB0aW9uO1xuXG4gICAgZmlsdGVyKGNhbGxiYWNrZm46IChpdGVtOiBVKSA9PiBib29sZWFuKTogRmlsdGVyZWRPYnNlcnZhYmxlU2V0PFU+IHtcblxuICAgICAgICByZXR1cm4gbmV3IEZpbHRlcmVkT2JzZXJ2YWJsZVNldCh0aGlzLCBjYWxsYmFja2ZuLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzb3J0KGNvbXBhcmVmbjogKGE6IFUsIGI6IFUpID0+IG51bWJlcikge1xuXG4gICAgICAgIHJldHVybiBuZXcgU29ydGVkT2JzZXJ2YWJsZVNldDxVPih0aGlzLCBjb21wYXJlZm4sIHRydWUpO1xuICAgIH1cblxuICAgIG1hcDxWPihjYWxsYmFja2ZuOiAoeDogVSkgPT4gVikge1xuXG4gICAgICAgIHJldHVybiBuZXcgTWFwcGVkT2JzZXJ2YWJsZVNldCh0aGlzLCBjYWxsYmFja2ZuLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VDaGlsZHJlbikge1xuXG4gICAgICAgICAgICBmb3IgKGxldCB1IG9mIHRoaXMud3JhcHBlZFNldCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCg8YW55PnUpLmRpc3Bvc2UpXG4gICAgICAgICAgICAgICAgICAgICg8YW55PnUpLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcblxuICAgICAgICBkZWxldGUgdGhpcy5fbWFwO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VTb3VyY2VDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc291cmNlQ29sbGVjdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zb3VyY2VDb2xsZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB0aGlzLl9zb3VyY2VDb2xsZWN0aW9uU3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcblxuICAgICAgICBkZWxldGUgdGhpcy5fc291cmNlQ29sbGVjdGlvblN1YnNjcmlwdGlvbjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTb3J0ZWRPYnNlcnZhYmxlU2V0PFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZUFycmF5PFQ+IGltcGxlbWVudHMgRGVyaXZlZE9ic2VydmFibGVDb2xsZWN0aW9uPFQsIFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VDb2xsZWN0aW9uOiBPYnNlcnZhYmxlU2V0PFQ+LCBwcm90ZWN0ZWQgY29tcGFyZWZuOiAoYTogVCwgYjogVCkgPT4gbnVtYmVyLCBwdWJsaWMgZGlzcG9zZVNvdXJjZUNvbGxlY3Rpb246IGJvb2xlYW4pIHtcblxuICAgICAgICBzdXBlcihzb3J0U2V0KHNvdXJjZUNvbGxlY3Rpb24ud3JhcHBlZFNldCwgY29tcGFyZWZuKSk7XG5cbiAgICAgICAgdGhpcy5yZWZsb3cgPSB0aGlzLnJlZmxvdy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53cmFwcGVkQ29sbGVjdGlvbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tcGFyaXNvbih0aGlzLndyYXBwZWRDb2xsZWN0aW9uW2ldLCBpKTtcblxuICAgICAgICB0aGlzLl9zb3VyY2VDb2xsZWN0aW9uU3Vic2NyaXB0aW9uID0gc291cmNlQ29sbGVjdGlvbi5zdWJzY3JpYmUoYXN5bmMgKGFkZGVkSXRlbXMsIHJlbW92ZWRJdGVtcykgPT4ge1xuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zZW1hcGhvcmUud2FpdE9uZUFzeW5jKCk7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgd3JhcHBlZENvbGxlY3Rpb24gPSB0aGlzLndyYXBwZWRDb2xsZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFkZGVkSXRlbXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFkZGVkSXRlbXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNvcnRPcmRlciA9IGJpbmFyeVNlYXJjaCh3cmFwcGVkQ29sbGVjdGlvbiwgaXRlbSwgdGhpcy5jb21wYXJlZm4pOyAvLyBCaW5hcnkgc2VhcmNoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IH5zb3J0T3JkZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVkQ29sbGVjdGlvbi5zcGxpY2Uoc29ydE9yZGVyLCAwLCBpdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNvcnRPcmRlciArIDE7IGkgPCB3cmFwcGVkQ29sbGVjdGlvbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK3RoaXMuX2NvbXBhcmlzb25zLmdldCh3cmFwcGVkQ29sbGVjdGlvbltpXSlbXCJfX3NvcnRPcmRlclwiXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21wYXJpc29uKGl0ZW0sIHNvcnRPcmRlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3J0T3JkZXIgKyAxIDwgd3JhcHBlZENvbGxlY3Rpb24ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBhcmlzb25zLmdldCh3cmFwcGVkQ29sbGVjdGlvbltzb3J0T3JkZXIgKyAxXSkucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA8PSBzb3J0T3JkZXIgLSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBhcmlzb25zLmdldCh3cmFwcGVkQ29sbGVjdGlvbltzb3J0T3JkZXIgLSAxXSkucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKFtpdGVtXSwgbnVsbCwgc29ydE9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlbW92ZWRJdGVtcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcmVtb3ZlZEl0ZW1zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wYXJpc29uID0gdGhpcy5fY29tcGFyaXNvbnMuZ2V0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNvcnRPcmRlcjogbnVtYmVyID0gY29tcGFyaXNvbltcIl9fc29ydE9yZGVyXCJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJpc29uLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBhcmlzb25zLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZWRDb2xsZWN0aW9uLnNwbGljZShzb3J0T3JkZXIsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gc29ydE9yZGVyOyBpIDwgd3JhcHBlZENvbGxlY3Rpb24ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLS10aGlzLl9jb21wYXJpc29ucy5nZXQod3JhcHBlZENvbGxlY3Rpb25baV0pW1wiX19zb3J0T3JkZXJcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3J0T3JkZXIgPCB3cmFwcGVkQ29sbGVjdGlvbi5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcGFyaXNvbnMuZ2V0KHdyYXBwZWRDb2xsZWN0aW9uW3NvcnRPcmRlcl0pLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPD0gc29ydE9yZGVyIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wYXJpc29ucy5nZXQod3JhcHBlZENvbGxlY3Rpb25bc29ydE9yZGVyIC0gMV0pLnJlZnJlc2goKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhudWxsLCBbaXRlbV0sIHNvcnRPcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpbmFsbHkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VtYXBob3JlLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29tcGFyaXNvbnM6IE1hcDxULCBDb21wdXRlZE9ic2VydmFibGU8c3RyaW5nPj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBfc291cmNlQ29sbGVjdGlvblN1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIF9zZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKCk7XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvbXBhcmlzb24oaXRlbTogVCwgc29ydE9yZGVyOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgY29tcGFyaXNvbiA9IENvbXB1dGVkT2JzZXJ2YWJsZS5jcmVhdGVDb21wdXRlZDxzdHJpbmc+KCgpID0+IHtcblxuICAgICAgICAgICAgbGV0IHNvcnRPcmRlciA9IGNvbXBhcmlzb25bXCJfX3NvcnRPcmRlclwiXTtcblxuICAgICAgICAgICAgaWYgKDAgPCBzb3J0T3JkZXIpIHtcblxuICAgICAgICAgICAgICAgIGlmIChzb3J0T3JkZXIgKyAxIDwgdGhpcy53cmFwcGVkQ29sbGVjdGlvbi5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTb3J0ZWRPYnNlcnZhYmxlU2V0Lm5vcm1hbGl6ZUNvbXBhcmUodGhpcy5jb21wYXJlZm4oaXRlbSwgdGhpcy53cmFwcGVkQ29sbGVjdGlvbltzb3J0T3JkZXIgLSAxXSkpICsgXCIgXCIgKyBTb3J0ZWRPYnNlcnZhYmxlU2V0Lm5vcm1hbGl6ZUNvbXBhcmUodGhpcy5jb21wYXJlZm4odGhpcy53cmFwcGVkQ29sbGVjdGlvbltzb3J0T3JkZXIgKyAxXSwgaXRlbSkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNvcnRlZE9ic2VydmFibGVTZXQubm9ybWFsaXplQ29tcGFyZSh0aGlzLmNvbXBhcmVmbihpdGVtLCB0aGlzLndyYXBwZWRDb2xsZWN0aW9uW3NvcnRPcmRlciAtIDFdKSkgKyBcIiAxXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKDEgPCB0aGlzLndyYXBwZWRDb2xsZWN0aW9uLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIxIFwiICsgU29ydGVkT2JzZXJ2YWJsZVNldC5ub3JtYWxpemVDb21wYXJlKHRoaXMuY29tcGFyZWZuKHRoaXMud3JhcHBlZENvbGxlY3Rpb25bMV0sIGl0ZW0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIFwiMSAxXCI7XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGNvbXBhcmlzb25bXCJfX3NvcnRPcmRlclwiXSA9IHNvcnRPcmRlcjtcblxuICAgICAgICBjb21wYXJpc29uLnBvc3RFdmFsdWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9Db21wYXJpc29uKGl0ZW0sIGNvbXBhcmlzb24pO1xuXG4gICAgICAgIHRoaXMuX2NvbXBhcmlzb25zLnNldChpdGVtLCBjb21wYXJpc29uKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBub3JtYWxpemVDb21wYXJlKG46IG51bWJlcikge1xuXG4gICAgICAgIGlmIChuIDwgMClcbiAgICAgICAgICAgIHJldHVybiAtMTtcblxuICAgICAgICBpZiAobiA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiAwO1xuXG4gICAgICAgIGlmICgwIDwgbilcbiAgICAgICAgICAgIHJldHVybiAxO1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm4gaXMgbm90IGEgbnVtYmVyXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlZmxvd0hhbmRsZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSByZWZsb3coKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JlZmxvd0hhbmRsZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgc2VtYXBob3JlUHJvbWlzZSA9IHRoaXMuX3NlbWFwaG9yZS53YWl0T25lQXN5bmMoKTtcblxuICAgICAgICB0aGlzLl9yZWZsb3dIYW5kbGUgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblxuICAgICAgICAgICAgYXdhaXQgc2VtYXBob3JlUHJvbWlzZTtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVkQ29sbGVjdGlvbiA9IHRoaXMud3JhcHBlZENvbGxlY3Rpb247XG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZWRDb2xsZWN0aW9uVG9CZSA9IHdyYXBwZWRDb2xsZWN0aW9uLm1hcChpID0+IGkpLnNvcnQodGhpcy5jb21wYXJlZm4pO1xuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVkQ29sbGVjdGlvblRvQmVTb3J0T3JkZXJzID0gbmV3IE1hcDxULCBudW1iZXI+KCk7IGZvciAobGV0IGkgPSAwOyBpIDwgd3JhcHBlZENvbGxlY3Rpb25Ub0JlLmxlbmd0aDsgKytpKSB3cmFwcGVkQ29sbGVjdGlvblRvQmVTb3J0T3JkZXJzLnNldCh3cmFwcGVkQ29sbGVjdGlvblRvQmVbaV0sIGkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNvcnRPcmRlcnM6IHsgaXRlbTogVDsgb2xkU29ydE9yZGVyOiBudW1iZXI7IG5ld1NvcnRPcmRlcjogbnVtYmVyOyB9W10gPSBbXTtcblxuICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRJdGVtcyA9IG5ldyBTZXQ8VD4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBzb3J0T3JkZXIgPSAwOyBpIDwgd3JhcHBlZENvbGxlY3Rpb25Ub0JlLmxlbmd0aCAmJiBzb3J0T3JkZXIgPCB3cmFwcGVkQ29sbGVjdGlvbi5sZW5ndGg7KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1UaGF0RW5kZWRVcEhlcmUgPSB3cmFwcGVkQ29sbGVjdGlvblRvQmVbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NlZEl0ZW1zLmhhcyhpdGVtVGhhdEVuZGVkVXBIZXJlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtVGhhdFdhc0hlcmUgPSB3cmFwcGVkQ29sbGVjdGlvbltzb3J0T3JkZXJdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtVGhhdEVuZGVkVXBIZXJlICE9PSBpdGVtVGhhdFdhc0hlcmUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1UaGF0RW5kZWRVcEhlcmVPbGRTb3J0T3JkZXIgPSA8bnVtYmVyPnRoaXMuX2NvbXBhcmlzb25zLmdldChpdGVtVGhhdEVuZGVkVXBIZXJlKVtcIl9fc29ydE9yZGVyXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1UaGF0V2FzSGVyZU5ld1NvcnRPcmRlciA9IHdyYXBwZWRDb2xsZWN0aW9uVG9CZVNvcnRPcmRlcnMuZ2V0KGl0ZW1UaGF0V2FzSGVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhpdGVtVGhhdEVuZGVkVXBIZXJlT2xkU29ydE9yZGVyIC0gc29ydE9yZGVyKSA8IE1hdGguYWJzKGl0ZW1UaGF0V2FzSGVyZU5ld1NvcnRPcmRlciAtIHNvcnRPcmRlcikpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRPcmRlcnMucHVzaCh7IGl0ZW06IGl0ZW1UaGF0V2FzSGVyZSwgb2xkU29ydE9yZGVyOiA8bnVtYmVyPnRoaXMuX2NvbXBhcmlzb25zLmdldChpdGVtVGhhdFdhc0hlcmUpW1wiX19zb3J0T3JkZXJcIl0sIG5ld1NvcnRPcmRlcjogaXRlbVRoYXRXYXNIZXJlTmV3U29ydE9yZGVyIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW1zLmFkZChpdGVtVGhhdFdhc0hlcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsrc29ydE9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHNvcnRPcmRlcnMucHVzaCh7IGl0ZW06IGl0ZW1UaGF0RW5kZWRVcEhlcmUsIG9sZFNvcnRPcmRlcjogaXRlbVRoYXRFbmRlZFVwSGVyZU9sZFNvcnRPcmRlciwgbmV3U29ydE9yZGVyOiBpIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZSArK3NvcnRPcmRlcjtcblxuICAgICAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGNvbXBhcmlzb25zVG9SZWZyZXNoID0gbmV3IFNldDxDb21wdXRlZE9ic2VydmFibGU8c3RyaW5nPj4oKTtcbiAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoT25lQXJyYXkgPSBbbnVsbF07XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIG9mIHNvcnRPcmRlcnMuc29ydCgoYSwgYikgPT4gYi5vbGRTb3J0T3JkZXIgLSBhLm9sZFNvcnRPcmRlcikpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcGFyaXNvbiA9IHRoaXMuX2NvbXBhcmlzb25zLmdldChpLml0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc29ydE9yZGVyID0gaS5vbGRTb3J0T3JkZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgY29tcGFyaXNvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBhcmlzb25zLmRlbGV0ZShpLml0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVkQ29sbGVjdGlvbi5zcGxpY2Uoc29ydE9yZGVyLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc29ydE9yZGVyIDwgd3JhcHBlZENvbGxlY3Rpb24ubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyaXNvbnNUb1JlZnJlc2guYWRkKHRoaXMuX2NvbXBhcmlzb25zLmdldCh3cmFwcGVkQ29sbGVjdGlvbltzb3J0T3JkZXJdKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPD0gc29ydE9yZGVyIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb25zVG9SZWZyZXNoLmFkZCh0aGlzLl9jb21wYXJpc29ucy5nZXQod3JhcHBlZENvbGxlY3Rpb25bc29ydE9yZGVyIC0gMV0pKTtcblxuICAgICAgICAgICAgICAgICAgICBsZW5ndGhPbmVBcnJheVswXSA9IGkuaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlTdWJzY3JpYmVycyhudWxsLCBsZW5ndGhPbmVBcnJheSwgc29ydE9yZGVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIG9mIHNvcnRPcmRlcnMuc29ydCgoYSwgYikgPT4gYS5uZXdTb3J0T3JkZXIgLSBiLm5ld1NvcnRPcmRlcikpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc29ydE9yZGVyID0gaS5uZXdTb3J0T3JkZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZENvbGxlY3Rpb24uc3BsaWNlKHNvcnRPcmRlciwgMCwgaS5pdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21wYXJpc29uKGkuaXRlbSwgc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc29ydE9yZGVyICsgMSA8IHdyYXBwZWRDb2xsZWN0aW9uLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb25zVG9SZWZyZXNoLmFkZCh0aGlzLl9jb21wYXJpc29ucy5nZXQod3JhcHBlZENvbGxlY3Rpb25bc29ydE9yZGVyICsgMV0pKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8PSBzb3J0T3JkZXIgLSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyaXNvbnNUb1JlZnJlc2guYWRkKHRoaXMuX2NvbXBhcmlzb25zLmdldCh3cmFwcGVkQ29sbGVjdGlvbltzb3J0T3JkZXIgLSAxXSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aE9uZUFycmF5WzBdID0gaS5pdGVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeVN1YnNjcmliZXJzKGxlbmd0aE9uZUFycmF5LCBudWxsLCBzb3J0T3JkZXIsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd3JhcHBlZENvbGxlY3Rpb25Ub0JlLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wYXJpc29ucy5nZXQod3JhcHBlZENvbGxlY3Rpb25baV0pW1wiX19zb3J0T3JkZXJcIl0gPSBpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYyBvZiBjb21wYXJpc29uc1RvUmVmcmVzaClcbiAgICAgICAgICAgICAgICAgICAgYy5yZWZyZXNoKCk7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fcmVmbG93SGFuZGxlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaW5hbGx5IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbWFwaG9yZS5yZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb0NvbXBhcmlzb24oX2l0ZW06IFQsIG9ic2VydmFibGU6IENvbXB1dGVkT2JzZXJ2YWJsZTxhbnk+KSB7XG5cbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUodGhpcy5yZWZsb3cpO1xuICAgIH1cblxuICAgIHJlbW92ZShfaXRlbTogVCkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgcmVtb3ZlQXQoX2luZGV4OiBudW1iZXIpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIHJlbW92ZVJhbmdlKF9pbmRleDogbnVtYmVyLCBfY291bnQ6IG51bWJlcikge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBhZGQoX2l0ZW06IFQpIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGFkZFJhbmdlKF9pdGVtczogVFtdKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBpbnNlcnQoX2luZGV4OiBudW1iZXIsIF9pdGVtOiBUKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICBpbnNlcnRSYW5nZShfaW5kZXg6IG51bWJlciwgX2l0ZW1zOiBUW10pIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIG1hcDxVPihjYWxsYmFja2ZuOiAoeDogVCkgPT4gVSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgTWFwcGVkT2JzZXJ2YWJsZUFycmF5KHRoaXMsIGNhbGxiYWNrZm4sIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG5cbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuXG4gICAgICAgIHRoaXMuX2NvbXBhcmlzb25zLmZvckVhY2goYyA9PiB7IGMuZGlzcG9zZSgpOyB9KTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbXBhcmlzb25zO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VTb3VyY2VDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc291cmNlQ29sbGVjdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zb3VyY2VDb2xsZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB0aGlzLl9zb3VyY2VDb2xsZWN0aW9uU3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcblxuICAgICAgICBkZWxldGUgdGhpcy5fc291cmNlQ29sbGVjdGlvblN1YnNjcmlwdGlvbjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNvcnRTZXQ8VD4oc2V0OiBTZXQ8VD4sIHNvcnRGdW5jdGlvbjogKGE6IFQsIGI6IFQpID0+IG51bWJlcikge1xuXG4gICAgbGV0IHJlc3VsdDogVFtdID0gW107XG5cbiAgICBmb3IgKGxldCBpIG9mIHNldClcbiAgICAgICAgcmVzdWx0LnB1c2goaSk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoc29ydEZ1bmN0aW9uKTtcbn1cblxuZnVuY3Rpb24gYmluYXJ5U2VhcmNoPFQ+KGFycmF5OiBUW10sIGl0ZW06IFQsIGNvbXBhcmVmbj86IChhOiBULCBiOiBUKSA9PiBudW1iZXIpIHtcblxuICAgIGxldCBsID0gMCwgaCA9IGFycmF5Lmxlbmd0aCAtIDEsIG0sIGNvbXBhcmlzb247XG5cbiAgICBjb21wYXJlZm4gPSBjb21wYXJlZm4gfHwgKChhOiBULCBiOiBUKSA9PiBhIDwgYiA/IC0xIDogKGEgPiBiID8gMSA6IDApKTtcblxuICAgIHdoaWxlIChsIDw9IGgpIHtcblxuICAgICAgICBtID0gKGwgKyBoKSA+Pj4gMTtcbiAgICAgICAgY29tcGFyaXNvbiA9IGNvbXBhcmVmbihhcnJheVttXSwgaXRlbSk7XG5cbiAgICAgICAgaWYgKGNvbXBhcmlzb24gPCAwKVxuICAgICAgICAgICAgbCA9IG0gKyAxO1xuXG4gICAgICAgIGVsc2UgaWYgKGNvbXBhcmlzb24gPiAwKVxuICAgICAgICAgICAgaCA9IG0gLSAxO1xuXG4gICAgICAgIGVsc2UgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgcmV0dXJuIH5sO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyZWRPYnNlcnZhYmxlU2V0PFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZVNldDxUPiBpbXBsZW1lbnRzIERlcml2ZWRPYnNlcnZhYmxlQ29sbGVjdGlvbjxULCBUPiB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlQ29sbGVjdGlvbjogT2JzZXJ2YWJsZVNldDxUPiwgcHJvdGVjdGVkIGNhbGxiYWNrZm46ICh2YWx1ZTogVCkgPT4gYm9vbGVhbiwgcHVibGljIGRpc3Bvc2VTb3VyY2VDb2xsZWN0aW9uOiBib29sZWFuKSB7XG5cbiAgICAgICAgc3VwZXIodW5kZWZpbmVkKTtcblxuICAgICAgICBsZXQgb3JpZ2luYWwgPSBzb3VyY2VDb2xsZWN0aW9uLndyYXBwZWRTZXQ7XG4gICAgICAgIGxldCBmaWx0ZXJlZCA9IHRoaXMud3JhcHBlZFNldDtcblxuICAgICAgICBmb3IgKGxldCBpIG9mIG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNyZWF0ZU9ic2VydmFibGUoaSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWQuYWRkKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc291cmNlQ29sbGVjdGlvblN1YnNjcmlwdGlvbiA9IHNvdXJjZUNvbGxlY3Rpb24uc3Vic2NyaWJlKChhZGRlZEl0ZW1zLCByZW1vdmVkSXRlbXMpID0+IHtcblxuICAgICAgICAgICAgaWYgKGFkZGVkSXRlbXMpIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgb2YgYWRkZWRJdGVtcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNyZWF0ZU9ic2VydmFibGUoaSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHJlbW92ZWRJdGVtcykge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBvZiByZW1vdmVkSXRlbXMpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vYnNlcnZhYmxlcy5nZXQoaSkuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vYnNlcnZhYmxlcy5kZWxldGUoaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vYnNlcnZhYmxlczogTWFwPFQsIENvbXB1dGVkT2JzZXJ2YWJsZTxib29sZWFuPj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSBfc291cmNlQ29sbGVjdGlvblN1YnNjcmlwdGlvbjogT2JzZXJ2YWJsZVN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgY3JlYXRlT2JzZXJ2YWJsZShpdGVtOiBUKSB7XG5cbiAgICAgICAgbGV0IGNvbXB1dGVkT2JzZXJ2YWJsZSA9IENvbXB1dGVkT2JzZXJ2YWJsZS5jcmVhdGVDb21wdXRlZCgoKSA9PiB0aGlzLmNhbGxiYWNrZm4oaXRlbSkpO1xuXG4gICAgICAgIHRoaXMuX29ic2VydmFibGVzLnNldChpdGVtLCBjb21wdXRlZE9ic2VydmFibGUpO1xuXG4gICAgICAgIGNvbXB1dGVkT2JzZXJ2YWJsZS5zdWJzY3JpYmUobiA9PiB7XG5cbiAgICAgICAgICAgIGlmIChuKVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGl0ZW0pO1xuXG4gICAgICAgICAgICBlbHNlIHRoaXMucmVtb3ZlKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tcHV0ZWRPYnNlcnZhYmxlLnZhbHVlO1xuICAgIH1cblxuICAgIGZpbHRlcihjYWxsYmFja2ZuOiAoaXRlbTogVCkgPT4gYm9vbGVhbik6IEZpbHRlcmVkT2JzZXJ2YWJsZVNldDxUPiB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJlZE9ic2VydmFibGVTZXQodGhpcywgY2FsbGJhY2tmbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc29ydChjb21wYXJlZm46IChhOiBULCBiOiBUKSA9PiBudW1iZXIpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFNvcnRlZE9ic2VydmFibGVTZXQ8VD4odGhpcywgY29tcGFyZWZuLCB0cnVlKTtcbiAgICB9XG5cbiAgICBtYXA8VT4oY2FsbGJhY2tmbjogKHg6IFQpID0+IFUpIHtcblxuICAgICAgICByZXR1cm4gbmV3IE1hcHBlZE9ic2VydmFibGVTZXQodGhpcywgY2FsbGJhY2tmbiwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcblxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG5cbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZXMuZm9yRWFjaChvID0+IHsgby5kaXNwb3NlKCk7IH0pO1xuICAgICAgICBkZWxldGUgdGhpcy5fb2JzZXJ2YWJsZXM7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzcG9zZVNvdXJjZUNvbGxlY3Rpb24pIHtcblxuICAgICAgICAgICAgdGhpcy5zb3VyY2VDb2xsZWN0aW9uLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNvdXJjZUNvbGxlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHRoaXMuX3NvdXJjZUNvbGxlY3Rpb25TdWJzY3JpcHRpb24uZGlzcG9zZSgpO1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9zb3VyY2VDb2xsZWN0aW9uU3Vic2NyaXB0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG88VD4odmFsdWU/OiBUKSB7XG5cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGU8VD4odmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY288VD4oZXhwcmVzc2lvbjogKCkgPT4gVCkge1xuXG4gICAgcmV0dXJuIENvbXB1dGVkT2JzZXJ2YWJsZS5jcmVhdGVDb21wdXRlZChleHByZXNzaW9uKTtcbn0iLCJpbXBvcnQgeyBPYnNlcnZhYmxlLCBzdGFjayB9IGZyb20gXCIuL09ic2VydmFibGVcIjtcblxuZXhwb3J0IGNsYXNzIFNlc3Npb25TdG9yYWdlT2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuXG4gICAga2V5OiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgY3JlYXRlU2Vzc2lvblN0b3JhZ2U8VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IFQpIHtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gPFNlc3Npb25TdG9yYWdlT2JzZXJ2YWJsZTxUPj5jYWNoZS5nZXQoa2V5KTtcblxuICAgICAgICBpZiAocmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICBjYWNoZS5zZXQoa2V5LCByZXN1bHQgPSBuZXcgU2Vzc2lvblN0b3JhZ2VPYnNlcnZhYmxlKCkpO1xuXG4gICAgICAgIHJlc3VsdC5rZXkgPSBrZXk7XG5cbiAgICAgICAgbGV0IHN0b3JhZ2VWYWx1ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgICBpZiAoc3RvcmFnZVZhbHVlKSB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VkID0gSlNPTi5wYXJzZShzdG9yYWdlVmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICByZXN1bHQud3JhcHBlZFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQud3JhcHBlZFZhbHVlID0gcGFyc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSByZXN1bHQud3JhcHBlZFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCkge1xuXG4gICAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcblxuICAgICAgICAgICAgbGV0IGNvbXB1dGVkT2JzZXJ2YWJsZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBpZiAoIWNvbXB1dGVkT2JzZXJ2YWJsZS5vYnNlcnZhYmxlcy5oYXModGhpcykpXG4gICAgICAgICAgICAgICAgY29tcHV0ZWRPYnNlcnZhYmxlLm9ic2VydmFibGVzLnNldCh0aGlzLCB0aGlzLnN1YnNjcmliZVNuZWFrSW5MaW5lKGNvbXB1dGVkT2JzZXJ2YWJsZS5yZWZyZXNoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkVmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBUKSB7XG5cbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy53cmFwcGVkVmFsdWU7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuXG4gICAgICAgICAgICB0aGlzLndyYXBwZWRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U3Vic2NyaWJlcnMobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG5cbiAgICAgICAgbGV0IHN0b3JhZ2VWYWx1ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xuXG4gICAgICAgIGlmIChzdG9yYWdlVmFsdWUpXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gSlNPTi5wYXJzZShzdG9yYWdlVmFsdWUpO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMua2V5KTtcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLndyYXBwZWRWYWx1ZTtcblxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICBpZiAobm9kZSkge1xuXG4gICAgICAgICAgICBmb3IgKG5vZGUgPSBub2RlLm5leHQ7IG5vZGUgIT0gdGhpcy5fcHJpb3JpdGl6ZWRUYWlsOyBub2RlID0gbm9kZS5uZXh0KVxuICAgICAgICAgICAgICAgIG5vZGUucmVjeWNsZSgpO1xuXG4gICAgICAgICAgICB0aGlzLl9wcmlvcml0aXplZEhlYWQucmVjeWNsZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByaW9yaXRpemVkSGVhZDtcblxuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdGl6ZWRUYWlsLnJlY3ljbGUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmlvcml0aXplZFRhaWw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKG5vZGUgPSB0aGlzLl9oZWFkLm5leHQ7IG5vZGUgIT0gdGhpcy5fdGFpbDsgbm9kZSA9IG5vZGUubmV4dClcbiAgICAgICAgICAgIG5vZGUucmVjeWNsZSgpO1xuXG4gICAgICAgIHRoaXMuX2hlYWQucmVjeWNsZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy5faGVhZDtcblxuICAgICAgICB0aGlzLl90YWlsLnJlY3ljbGUoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3RhaWw7XG4gICAgfVxufVxuXG5sZXQgY2FjaGUgPSBuZXcgTWFwPHN0cmluZywgU2Vzc2lvblN0b3JhZ2VPYnNlcnZhYmxlPGFueT4+KCk7IiwiaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW4sIE9wZXJhdGlvbkNhbmNlbGxlZEVycm9yIH0gZnJvbSBcIkBhbHVtaXMvY2FuY2VsbGF0aW9udG9rZW5cIjtcblxuZXhwb3J0IGNsYXNzIFNlbWFwaG9yZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBsZXQgaGVhZCA9IDxTZW1hcGhvcmVRdWV1ZUVudHJ5Pnt9O1xuICAgICAgICBsZXQgdGFpbCA9IDxTZW1hcGhvcmVRdWV1ZUVudHJ5Pnt9O1xuXG4gICAgICAgIChoZWFkLm5leHQgPSB0YWlsKS5wcmV2aW91cyA9IGhlYWQ7XG5cbiAgICAgICAgdGhpcy5faGVhZCA9IGhlYWQ7XG4gICAgICAgIHRoaXMuX3RhaWwgPSB0YWlsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hlYWQ6IFNlbWFwaG9yZVF1ZXVlRW50cnk7XG4gICAgcHJpdmF0ZSBfdGFpbDogU2VtYXBob3JlUXVldWVFbnRyeTtcblxuICAgIHdhaXRPbmVBc3luYyhjYW5jZWxsYXRpb250b2tlbj86IENhbmNlbGxhdGlvblRva2VuKSB7XG5cbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvbnRva2VuKSB7XG5cbiAgICAgICAgICAgIGlmIChjYW5jZWxsYXRpb250b2tlbi5pc0NhbmNlbGxhdGlvblJlcXVlc3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IE9wZXJhdGlvbkNhbmNlbGxlZEVycm9yKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSA8U2VtYXBob3JlUXVldWVFbnRyeT57IHJlc29sdmU6IHJlc29sdmUsIHByZXZpb3VzOiB0aGlzLl90YWlsLnByZXZpb3VzLCBuZXh0OiB0aGlzLl90YWlsIH07XG5cbiAgICAgICAgICAgIGN1cnJlbnQucHJldmlvdXMubmV4dCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBjdXJyZW50Lm5leHQucHJldmlvdXMgPSBjdXJyZW50O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faGVhZC5uZXh0ID09PSBjdXJyZW50KVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgZWxzZSBpZiAoY2FuY2VsbGF0aW9udG9rZW4pIHtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnQuY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb250b2tlbjtcblxuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvbnRva2VuLmFkZExpc3RlbmVyKGN1cnJlbnQuY2FuY2VsbGF0aW9uVG9rZW5MaXN0ZW5lciA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAoY3VycmVudC5wcmV2aW91cy5uZXh0ID0gY3VycmVudC5uZXh0KS5wcmV2aW91cyA9IGN1cnJlbnQucHJldmlvdXM7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgT3BlcmF0aW9uQ2FuY2VsbGVkRXJyb3IoKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbGVhc2UoKSB7XG5cbiAgICAgICAgbGV0IGhlYWQgPSB0aGlzLl9oZWFkLCBuZXh0ID0gaGVhZC5uZXh0Lm5leHQ7XG4gICAgICAgIFxuICAgICAgICAoaGVhZC5uZXh0ID0gbmV4dCkucHJldmlvdXMgPSBoZWFkO1xuXG4gICAgICAgIGlmIChuZXh0ICE9PSB0aGlzLl90YWlsKSB7XG5cbiAgICAgICAgICAgIGlmIChuZXh0LmNhbmNlbGxhdGlvblRva2VuKSB7XG5cbiAgICAgICAgICAgICAgICBuZXh0LmNhbmNlbGxhdGlvblRva2VuLnJlbW92ZUxpc3RlbmVyKG5leHQuY2FuY2VsbGF0aW9uVG9rZW5MaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgbmV4dC5jYW5jZWxsYXRpb25Ub2tlbjtcbiAgICAgICAgICAgICAgICBkZWxldGUgbmV4dC5jYW5jZWxsYXRpb25Ub2tlbkxpc3RlbmVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcmVzb2x2ZSA9IG5leHQucmVzb2x2ZTtcblxuICAgICAgICAgICAgZGVsZXRlIG5leHQucmVzb2x2ZTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuaW50ZXJmYWNlIFNlbWFwaG9yZVF1ZXVlRW50cnkge1xuXG4gICAgcmVzb2x2ZTogKCkgPT4gdm9pZDtcbiAgICBwcmV2aW91czogU2VtYXBob3JlUXVldWVFbnRyeTtcbiAgICBuZXh0OiBTZW1hcGhvcmVRdWV1ZUVudHJ5O1xuICAgIGNhbmNlbGxhdGlvblRva2VuOiBDYW5jZWxsYXRpb25Ub2tlbjtcbiAgICBjYW5jZWxsYXRpb25Ub2tlbkxpc3RlbmVyOiAoKSA9PiB2b2lkO1xufSIsImV4cG9ydCBlbnVtIEh0dHBTdGF0dXNDb2RlIHtcbiAgICBPayA9IDIwMCxcbiAgICBDcmVhdGVkID0gMjAxLFxuICAgIEFjY2VwdGVkID0gMjAyLFxuICAgIFBhcnRpYWxJbmZvcm1hdGlvbiA9IDIwMyxcbiAgICBOb1Jlc3BvbnNlID0gMjA0LFxuICAgIEJhZFJlcXVlc3QgPSA0MDAsXG4gICAgVW5hdXRob3JpemVkID0gNDAxLFxuICAgIFBheW1lbnRSZXF1aXJlZCA9IDQwMixcbiAgICBGb3JiaWRkZW4gPSA0MDMsXG4gICAgTm90Rm91bmQgPSA0MDQsXG4gICAgSW50ZXJuYWxFcnJvciA9IDUwMCxcbiAgICBOb3RJbXBsZW1lbnRlZCA9IDUwMVxufSIsIlxuZXhwb3J0IGNsYXNzIEh0dHBSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih4aHI6IFhNTEh0dHBSZXF1ZXN0LCBldmVudDogUHJvZ3Jlc3NFdmVudCkge1xuXG4gICAgICAgIHN1cGVyKGBgKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW4sIE9wZXJhdGlvbkNhbmNlbGxlZEVycm9yIH0gZnJvbSAnQGFsdW1pcy9jYW5jZWxsYXRpb250b2tlbic7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzL0h0dHBSZXF1ZXN0RXJyb3InO1xuaW1wb3J0IHsgSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLi9lbnVtcy9IdHRwU3RhdHVzQ29kZSc7XG5pbXBvcnQgeyBQcm9taXNlV2l0aFByb2dyZXNzIH0gZnJvbSAnLi4vdXRpbHMvUHJvbWlzZVdpdGhQcm9ncmVzcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRKc29uQXN5bmM8VD4odXJsOiBzdHJpbmcsIGNhbmNlbGxhdGlvblRva2VuPzogQ2FuY2VsbGF0aW9uVG9rZW4pIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZVdpdGhQcm9ncmVzczxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB2YXIgY2FuY2VsbGF0aW9uTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgICAgICAgeGhyLm9ubG9hZCA9IGUgPT4ge1xuXG4gICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pXG4gICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4ucmVtb3ZlTGlzdGVuZXIoY2FuY2VsbGF0aW9uTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gSHR0cFN0YXR1c0NvZGUuT2spXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBlbHNlIHJlamVjdChuZXcgSHR0cFJlcXVlc3RFcnJvcih4aHIsIGUpKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25lcnJvciA9IGUgPT4ge1xuXG4gICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pXG4gICAgICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4ucmVtb3ZlTGlzdGVuZXIoY2FuY2VsbGF0aW9uTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICByZWplY3QobmV3IEh0dHBSZXF1ZXN0RXJyb3IoeGhyLCBlKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBlID0+IHtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbilcbiAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLmFkZExpc3RlbmVyKGNhbmNlbGxhdGlvbkxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgT3BlcmF0aW9uQ2FuY2VsbGVkRXJyb3IoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gXCJqc29uXCI7XG5cbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiwgT3BlcmF0aW9uQ2FuY2VsbGVkRXJyb3IgfSBmcm9tIFwiQGFsdW1pcy9jYW5jZWxsYXRpb250b2tlblwiO1xuaW1wb3J0IHsgSHR0cFN0YXR1c0NvZGUgfSBmcm9tIFwiLi4vZW51bXMvSHR0cFN0YXR1c0NvZGVcIjtcbmltcG9ydCB7IEh0dHBSZXF1ZXN0RXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzL0h0dHBSZXF1ZXN0RXJyb3JcIjtcbmltcG9ydCB7IFByb21pc2VXaXRoUHJvZ3Jlc3MgfSBmcm9tIFwiLi4vdXRpbHMvUHJvbWlzZVdpdGhQcm9ncmVzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcG9zdEFzeW5jKHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBjYW5jZWxsYXRpb25Ub2tlbj86IENhbmNlbGxhdGlvblRva2VuKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2VXaXRoUHJvZ3Jlc3M8YW55PigocmVzb2x2ZSwgcmVqZWN0LCBwcm9ncmVzc09ic2VydmFibGUpID0+IHtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGNhbmNlbGxhdGlvbkxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gICAgICAgIHhoci5vbmxvYWQgPSBlID0+IHtcblxuICAgICAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKVxuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLnJlbW92ZUxpc3RlbmVyKGNhbmNlbGxhdGlvbkxpc3RlbmVyKTtcblxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IEh0dHBTdGF0dXNDb2RlLk9rKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblxuICAgICAgICAgICAgZWxzZSByZWplY3QobmV3IEh0dHBSZXF1ZXN0RXJyb3IoeGhyLCBlKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9uZXJyb3IgPSBlID0+IHtcblxuICAgICAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKVxuICAgICAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLnJlbW92ZUxpc3RlbmVyKGNhbmNlbGxhdGlvbkxpc3RlbmVyKTtcblxuICAgICAgICAgICAgcmVqZWN0KG5ldyBIdHRwUmVxdWVzdEVycm9yKHhociwgZSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbnByb2dyZXNzID0gZSA9PiBwcm9ncmVzc09ic2VydmFibGUudmFsdWUgPSBlLmxvYWRlZCAvIGUudG90YWw7XG5cbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKVxuICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4uYWRkTGlzdGVuZXIoY2FuY2VsbGF0aW9uTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBPcGVyYXRpb25DYW5jZWxsZWRFcnJvcigpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG5cbiAgICAgICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGFbcF07XG5cbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKDxEYXRlPnZhbHVlKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKHAsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB4aHIuc2VuZCgpO1xuICAgIH0pO1xufSIsImltcG9ydCB7IENhbmNlbGxhdGlvblRva2VuLCBPcGVyYXRpb25DYW5jZWxsZWRFcnJvciB9IGZyb20gXCJAYWx1bWlzL2NhbmNlbGxhdGlvbnRva2VuXCI7XG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZSB9IGZyb20gXCIuLi9lbnVtcy9IdHRwU3RhdHVzQ29kZVwiO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3RFcnJvciB9IGZyb20gXCIuLi9lcnJvcnMvSHR0cFJlcXVlc3RFcnJvclwiO1xuaW1wb3J0IHsgUHJvbWlzZVdpdGhQcm9ncmVzcyB9IGZyb20gXCIuLi91dGlscy9Qcm9taXNlV2l0aFByb2dyZXNzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0UGFyc2VKc29uQXN5bmM8VD4odXJsOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNhbmNlbGxhdGlvblRva2VuPzogQ2FuY2VsbGF0aW9uVG9rZW4pIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZVdpdGhQcm9ncmVzczxUPigocmVzb2x2ZSwgcmVqZWN0LCBwcm9ncmVzc09ic2VydmFibGUpID0+IHtcblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHZhciBjYW5jZWxsYXRpb25MaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICAgICAgICB4aHIub25sb2FkID0gZSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbilcbiAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbi5yZW1vdmVMaXN0ZW5lcihjYW5jZWxsYXRpb25MaXN0ZW5lcik7XG5cbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSBIdHRwU3RhdHVzQ29kZS5PaylcbiAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cbiAgICAgICAgICAgIGVsc2UgcmVqZWN0KG5ldyBIdHRwUmVxdWVzdEVycm9yKHhociwgZSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vbmVycm9yID0gZSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbilcbiAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbi5yZW1vdmVMaXN0ZW5lcihjYW5jZWxsYXRpb25MaXN0ZW5lcik7XG5cbiAgICAgICAgICAgIHJlamVjdChuZXcgSHR0cFJlcXVlc3RFcnJvcih4aHIsIGUpKTtcbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub25wcm9ncmVzcyA9IGUgPT4gcHJvZ3Jlc3NPYnNlcnZhYmxlLnZhbHVlID0gZS5sb2FkZWQgLyBlLnRvdGFsO1xuXG4gICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbilcbiAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLmFkZExpc3RlbmVyKGNhbmNlbGxhdGlvbkxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgT3BlcmF0aW9uQ2FuY2VsbGVkRXJyb3IoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwianNvblwiO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG5cbiAgICAgICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGFbcF07XG5cbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKDxEYXRlPnZhbHVlKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKHAsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB4aHIuc2VuZCgpO1xuICAgIH0pO1xufSIsIlxuZXhwb3J0ICogZnJvbSAnLi9lcnJvcnMvSHR0cFJlcXVlc3RFcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL2VudW1zL0h0dHBTdGF0dXNDb2RlJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUHJvbWlzZVdpdGhQcm9ncmVzcyc7XG5leHBvcnQgKiBmcm9tICcuL2h0dHAvZ2V0SnNvbkFzeW5jJztcbmV4cG9ydCAqIGZyb20gJy4vaHR0cC9wb3N0QXN5bmMnO1xuZXhwb3J0ICogZnJvbSAnLi9odHRwL3Bvc3RQYXJzZUpzb25Bc3luYyc7IiwiaW1wb3J0IHsgbywgT2JzZXJ2YWJsZSB9IGZyb20gJ0BhbHVtaXMvb2JzZXJ2YWJsZXMnO1xuXG52YXIgcHJvZ3Jlc3M6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuZXhwb3J0IGNsYXNzIFByb21pc2VXaXRoUHJvZ3Jlc3M8VD4gZXh0ZW5kcyBQcm9taXNlPFQ+IHtcblxuICAgIGNvbnN0cnVjdG9yKGV4ZWN1dG9yOiAocmVzb2x2ZTogKHZhbHVlPzogVCB8IFByb21pc2VMaWtlPFQ+KSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQsIHByb2dyZXNzT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxudW1iZXI+KSA9PiB2b2lkKSB7XG5cbiAgICAgICAgc3VwZXIoKHJlc29sdmU6ICh2YWx1ZT86IFQgfCBQcm9taXNlTGlrZTxUPikgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKSA9PiB7XG5cbiAgICAgICAgICAgIGV4ZWN1dG9yKHJlc29sdmUsIHJlamVjdCwgKHByb2dyZXNzID0gbygwKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9ncmVzcyA9IHByb2dyZXNzO1xufSJdLCJzb3VyY2VSb290IjoiIn0=