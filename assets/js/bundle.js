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
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/assets/js/main.js":
/*!********************************!*\
  !*** ../src/assets/js/main.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('load', function () {
  var long;
  var lat;
  var weatherSummary = document.querySelector('.weather .weather__summary p');
  var weatherTempSection = document.querySelector('.weather .weather__temp');
  var weatherTemp = document.querySelector('.weather .weather__temp strong');
  var weatherTempC = document.querySelector('.weather .weather__temp span ');
  var weatherLocation = document.querySelector('.weather .weather__location');
  var weatherIcon = document.querySelector('.weather .weather__icon canvas');
  var weatherDays = document.querySelectorAll('.daily-weathers .daily-weather__day');
  var weatherMinTemp = document.querySelectorAll('.daily-weathers .daily-weather__temp .min');
  var weatherMaxTemp = document.querySelectorAll('.daily-weathers .daily-weather__temp .max');
  var weatherSummarys = document.querySelectorAll('.daily-weathers .daily-weather__summary');
  var weatherIcons = document.querySelectorAll('.daily-weathers .daily-weather canvas');
  var splashScreen = document.querySelector('.splash-screen');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      var proxy = 'https://cors-anywhere.herokuapp.com/';
      var api = "".concat(proxy, "https://api.darksky.net/forecast/d090ad71e840a71b480a0e2443977dab/").concat(lat, ",").concat(long, "?units=auto ");
      var reverseLocation = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=".concat(lat, "&lon=").concat(long, "&zoom=18&addressdetails=1");
      fetch(api).then(function (response) {
        return response.json();
      }).then(function (data) {
        setTimeout(function () {
          splashScreen.classList.add('hide');
        }, 1000);
        var _data$currently = data.currently,
            temperature = _data$currently.temperature,
            summary = _data$currently.summary,
            icon = _data$currently.icon;
        weatherTemp.textContent = Math.floor(temperature);
        weatherSummary.textContent = summary;
        setIcons(icon, weatherIcon);
        weatherTempSection.addEventListener('click', function () {});
        var a = new Date();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayOfWeek;

        for (var i = 0; i < days.length; i++) {
          var _dayOfWeek = days[(a.getDay() + 1 + i) % 7];
          weatherDays[i].textContent = _dayOfWeek;
        }

        for (var x = 1; x < data.daily.data.length; x++) {
          weatherMinTemp[x - 1].textContent = Math.floor(data.daily.data[x].temperatureLow);
          weatherMaxTemp[x - 1].textContent = Math.floor(data.daily.data[x].temperatureHigh);
          weatherSummarys[x - 1].textContent = data.daily.data[x].summary;
          setIcons(data.daily.data[x].icon, weatherIcons[x - 1]);
        }
      });
      fetch(reverseLocation).then(function (responseCity) {
        return responseCity.json();
      }).then(function (dataCity) {
        weatherLocation.textContent = "".concat(dataCity.address.city, " / ").concat(dataCity.address.country);
      });
    });
  }

  function setIcons(icon, iconID) {
    var skycons = new Skycons({
      color: 'white'
    });
    var currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

/***/ })

/******/ });