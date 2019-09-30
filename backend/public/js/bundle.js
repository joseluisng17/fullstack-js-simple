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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/UI.js":
/*!************************!*\
  !*** ./frontend/UI.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_BookService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/BookService */ "./frontend/services/BookService.js");
/* harmony import */ var timeago_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! timeago.js */ "./node_modules/timeago.js/lib/index.js");
/* harmony import */ var timeago_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(timeago_js__WEBPACK_IMPORTED_MODULE_1__);

const bookService = new _services_BookService__WEBPACK_IMPORTED_MODULE_0__["default"]();




class UI {

    async renderBooks() {
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = ` 
            <div class="card m-2">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="http://localhost:3000${book.imagePath}" class="img-fluid" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-block px-2">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                    </div>
                </div>
            </div>
            <div class="card-footer w-100 text-muted">
              ${Object(timeago_js__WEBPACK_IMPORTED_MODULE_1__["format"])(book.created_at)}
            </div>
            </div>
            `;
            booksCardContainer.appendChild(div);
        });
    }

    async addANewBook(book) {
        await bookService.postBook(book);
        this.clearBookform();
        this.renderBooks();
    }

    clearBookform() {
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        // Creating a div
        const div = document.createElement('div');
        // Styling the div
        div.className = `message ${colorMessage} alert`;
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));
        // Puting in the documnet
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);
        // Removing the div after some secconds
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }

}

/* harmony default export */ __webpack_exports__["default"] = (UI);

/***/ }),

/***/ "./frontend/app.js":
/*!*************************!*\
  !*** ./frontend/app.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.css */ "./frontend/styles/app.css");
/* harmony import */ var _styles_app_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_app_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./frontend/UI.js");


//import Book from './models/Book.js';


document.addEventListener('DOMContentLoaded', () => {
    const ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();
    ui.renderBooks();

});

document.getElementById('book-form').addEventListener('submit', (e) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;


    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();

    // Validating User Input
    if (title === '' || author === '' || isbn === '') {
        ui.renderMessage('Please fill all the fields', 'alert-danger', 3000);
    } else {
        // Pass the new book to the UI
        ui.addANewBook(formData);
        ui.renderMessage('New Book Added Successfully', 'alert-success', 2000);
    }
    // ui.addANewBook(formData);
    // ui.renderMessage('New Book Added Successfully', 'success', 2000);

    e.preventDefault();
});

document.getElementById('books-cards')
    .addEventListener('click', e => {
        if (e.target.classList.contains('delete')) {
            const ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();
            ui.deleteBook(e.target.getAttribute('_id'));
            ui.renderMessage('Book Deleted Successfully', 'alert-info', 3000);
        }
        e.preventDefault();
    });

/***/ }),

/***/ "./frontend/services/BookService.js":
/*!******************************************!*\
  !*** ./frontend/services/BookService.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class BookService {

    constructor() {
        this.URI = 'http://localhost:3000/api/books';
    }

    async getBooks() {
        const response = await fetch(this.URI);
        const books = await response.json();
        return books;
    }

    async postBook(book) {
        const res = await fetch(this.URI, {
            method: 'POST',
            body: book
        });
        const data = await res.json();
        console.log(data);
    }

    async deleteBook(bookId) {
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });

        const data = await res.json();

    }

}

/* harmony default export */ __webpack_exports__["default"] = (BookService);

/***/ }),

/***/ "./frontend/styles/app.css":
/*!*********************************!*\
  !*** ./frontend/styles/app.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/timeago.js/lib/format.js":
/*!***********************************************!*\
  !*** ./node_modules/timeago.js/lib/format.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = void 0;

var _date = __webpack_require__(/*! ./utils/date */ "./node_modules/timeago.js/lib/utils/date.js");

var _locales = __webpack_require__(/*! ./locales.js */ "./node_modules/timeago.js/lib/locales.js");

var format = function format(date, locale, nowDate) {
  // diff seconds
  var sec = (0, _date.diffSec)(date, nowDate); // format it with locale

  return (0, _date.formatDiff)(sec, (0, _locales.getLocale)(locale));
};

exports.format = format;

/***/ }),

/***/ "./node_modules/timeago.js/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/timeago.js/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function get() {
    return _format.format;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _realtime.render;
  }
});
Object.defineProperty(exports, "cancel", {
  enumerable: true,
  get: function get() {
    return _realtime.cancel;
  }
});
Object.defineProperty(exports, "register", {
  enumerable: true,
  get: function get() {
    return _locales.register;
  }
});
exports.version = void 0;

var _format = __webpack_require__(/*! ./format */ "./node_modules/timeago.js/lib/format.js");

var _realtime = __webpack_require__(/*! ./realtime */ "./node_modules/timeago.js/lib/realtime.js");

var _locales = __webpack_require__(/*! ./locales */ "./node_modules/timeago.js/lib/locales.js");

/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */
var version = "4.0.0-beta.2";
exports.version = version;

/***/ }),

/***/ "./node_modules/timeago.js/lib/locales.js":
/*!************************************************!*\
  !*** ./node_modules/timeago.js/lib/locales.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocale = exports.register = void 0;

/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */
var EN = 'second_minute_hour_day_week_month_year'.split('_');
var ZH = '秒_分钟_小时_天_周_个月_年'.split('_');

var zh_CN = function zh_CN(number, index) {
  if (index === 0) return ['刚刚', '片刻后'];
  var unit = ZH[parseInt(index / 2)];
  return ["".concat(number, " ").concat(unit, "\u524D"), "".concat(number, " ").concat(unit, "\u540E")];
};

var en_US = function en_US(number, index) {
  if (index === 0) return ['just now', 'right now'];
  var unit = EN[parseInt(index / 2)];
  if (number > 1) unit += 's';
  return ["".concat(number, " ").concat(unit, " ago"), "in ".concat(number, " ").concat(unit)];
};
/**
 * 所有的语言
 * @type {{en: function(*, *), zh_CN: function(*, *)}}
 */


var Locales = {
  en_US: en_US,
  zh_CN: zh_CN
};
/**
 * 注册语言
 * @param locale
 * @param func
 */

var register = function register(locale, func) {
  Locales[locale] = func;
};
/**
 * 获取语言函数
 * @param locale
 * @returns {*}
 */


exports.register = register;

var getLocale = function getLocale(locale) {
  return Locales[locale] || en_US;
};

exports.getLocale = getLocale;

/***/ }),

/***/ "./node_modules/timeago.js/lib/realtime.js":
/*!*************************************************!*\
  !*** ./node_modules/timeago.js/lib/realtime.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.cancel = void 0;

var _dom = __webpack_require__(/*! ./utils/dom */ "./node_modules/timeago.js/lib/utils/dom.js");

var _date = __webpack_require__(/*! ./utils/date */ "./node_modules/timeago.js/lib/utils/date.js");

var _locales = __webpack_require__(/*! ./locales */ "./node_modules/timeago.js/lib/locales.js");

// 所有的 timer
var TimerPool = {};

var clear = function clear(tid) {
  clearTimeout(tid);
  delete TimerPool[tid];
}; // 定时运行


var run = function run(node, date, localeFunc, nowDate) {
  // 先清理掉之前的
  clear((0, _dom.getTimerId)(node)); // get diff seconds

  var diff = (0, _date.diffSec)(date, nowDate); // render

  node.innerHTML = (0, _date.formatDiff)(diff, localeFunc);
  var tid = setTimeout(function () {
    run(node, date, localeFunc, nowDate);
  }, (0, _date.nextInterval)(diff) * 1000, 0x7FFFFFFF); // there is no need to save node in object. Just save the key

  TimerPool[tid] = 0;
  (0, _dom.saveTimerId)(node, tid);
}; // 取消一个 node 的实时渲染


var cancel = function cancel(node) {
  if (node) clear((0, _dom.getTimerId)(node)); // get the timer of DOM node(native / jq).
  else for (var tid in TimerPool) {
      clear(tid);
    }
}; // 实时渲染一系列节点


exports.cancel = cancel;

var render = function render(nodes, locale, nowDate) {
  // by .length
  if (nodes.length === undefined) nodes = [nodes];
  var node;

  for (var i = 0; i < nodes.length; i++) {
    node = nodes[i];
    var date = (0, _dom.getDateAttribute)(node);
    var localeFunc = (0, _locales.getLocale)(locale);
    run(node, date, localeFunc, nowDate);
  }

  return nodes;
};

exports.render = render;

/***/ }),

/***/ "./node_modules/timeago.js/lib/utils/date.js":
/*!***************************************************!*\
  !*** ./node_modules/timeago.js/lib/utils/date.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextInterval = exports.diffSec = exports.formatDiff = exports.toDate = exports.toInt = void 0;

/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */
var SEC_ARRAY = [60, 60, 24, 7, 365 / 7 / 12, 12];
/**
 * change f into int, remove decimal. Just for code compression
 * @param f
 * @returns {number}
 */

var toInt = function toInt(f) {
  return parseInt(f);
};
/**
 * format Date / string / timestamp to Date instance.
 * @param input
 * @returns {*}
 */


exports.toInt = toInt;

var toDate = function toDate(input) {
  if (input instanceof Date) return input;
  if (!isNaN(input) || /^\d+$/.test(input)) return new Date(toInt(input));
  input = (input || '').trim().replace(/\.\d+/, '') // remove milliseconds
  .replace(/-/, '/').replace(/-/, '/').replace(/(\d)T(\d)/, '$1 $2').replace(/Z/, ' UTC') // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
  .replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400

  return new Date(input);
};
/**
 * format the diff second to *** time ago, with setting locale
 * @param diff
 * @param localeFunc
 * @returns {string | void | *}
 */


exports.toDate = toDate;

var formatDiff = function formatDiff(diff, localeFunc) {
  // if locale is not exist, use defaultLocale.
  // if defaultLocale is not exist, use build-in `en`.
  // be sure of no error when locale is not exist.
  var i = 0,
      agoin = diff < 0 ? 1 : 0,
      // timein or timeago
  total_sec = diff = Math.abs(diff);

  for (; diff >= SEC_ARRAY[i] && i < SEC_ARRAY.length; i++) {
    diff /= SEC_ARRAY[i];
  }

  diff = toInt(diff);
  i *= 2;
  if (diff > (i === 0 ? 9 : 1)) i += 1;
  return localeFunc(diff, i, total_sec)[agoin].replace('%s', diff);
};
/**
 * calculate the diff second between date to be formatted an now date.
 * @param date
 * @param nowDate
 * @returns {number}
 */


exports.formatDiff = formatDiff;

var diffSec = function diffSec(date, nowDate) {
  nowDate = nowDate ? toDate(nowDate) : new Date();
  return (nowDate - toDate(date)) / 1000;
};
/**
 * nextInterval: calculate the next interval time.
 * - diff: the diff sec between now and date to be formatted.
 *
 * What's the meaning?
 * diff = 61 then return 59
 * diff = 3601 (an hour + 1 second), then return 3599
 * make the interval with high performance.
 **/


exports.diffSec = diffSec;

var nextInterval = function nextInterval(diff) {
  var rst = 1,
      i = 0,
      d = Math.abs(diff);

  for (; diff >= SEC_ARRAY[i] && i < SEC_ARRAY.length; i++) {
    diff /= SEC_ARRAY[i];
    rst *= SEC_ARRAY[i];
  }

  d = d % rst;
  d = d ? rst - d : rst;
  return Math.ceil(d);
};

exports.nextInterval = nextInterval;

/***/ }),

/***/ "./node_modules/timeago.js/lib/utils/dom.js":
/*!**************************************************!*\
  !*** ./node_modules/timeago.js/lib/utils/dom.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimerId = exports.saveTimerId = exports.getDateAttribute = void 0;
var ATTR_TIMEAGO_TID = 'timeago-tid';
var ATTR_DATETIME = 'datetime';
/**
 * get the node attribute, native DOM and jquery supported.
 * @param node
 * @param name
 * @returns {*}
 */

var getAttribute = function getAttribute(node, name) {
  if (node.getAttribute) return node.getAttribute(name); // native dom

  if (node.attr) return node.attr(name); // jquery dom
};
/**
 * get the datetime attribute, `data-timeagp` / `datetime` are supported.
 * @param node
 * @returns {*}
 */


var getDateAttribute = function getDateAttribute(node) {
  return getAttribute(node, ATTR_DATETIME);
};
/**
 * set the node attribute, native DOM and jquery supported.
 * @param node
 * @param timerId
 * @returns {*}
 */


exports.getDateAttribute = getDateAttribute;

var saveTimerId = function saveTimerId(node, timerId) {
  if (node.setAttribute) return node.setAttribute(ATTR_TIMEAGO_TID, timerId);
  if (node.attr) return node.attr(ATTR_TIMEAGO_TID, timerId);
};

exports.saveTimerId = saveTimerId;

var getTimerId = function getTimerId(node) {
  return getAttribute(node, ATTR_TIMEAGO_TID);
};

exports.getTimerId = getTimerId;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map