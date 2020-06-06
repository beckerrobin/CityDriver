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

/***/ "./src/car.ts":
/*!********************!*\
  !*** ./src/car.ts ***!
  \********************/
/*! exports provided: Car */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Car\", function() { return Car; });\nclass Car {\r\n    constructor(x, y, dir) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.dir = dir;\r\n        this.speed = Car.BASE_SPEED;\r\n    }\r\n    static CarFromSpawnPoint(spawnPoint) {\r\n        return new Car(spawnPoint.x, spawnPoint.y, spawnPoint.dir);\r\n    }\r\n    drawCar(ctx) {\r\n        ctx.save();\r\n        ctx.translate(this.x, this.y);\r\n        ctx.rotate((this.dir * 90) * Math.PI / 180);\r\n        ctx.fillStyle = Car.BASE_COLOR;\r\n        ctx.fillRect(-(Car.LENGTH / 2), -(Car.WIDTH / 2), Car.LENGTH, Car.WIDTH);\r\n        ctx.restore();\r\n    }\r\n}\r\nCar.BASE_COLOR = \"#7cc775\";\r\nCar.BASE_SPEED = 3.5;\r\n\n\n//# sourceURL=webpack:///./src/car.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./car */ \"./src/car.ts\");\n\r\n// Constant values\r\nconst BG_COLOR = \"#133263\";\r\nconst BUILDING_COLOR = \"#88a8db\";\r\nconst BUILDING_SIZE_MIN = 75;\r\nconst BUILDING_SIZE_MAX = 110;\r\nconst ROAD_SIZE = 30;\r\n_car__WEBPACK_IMPORTED_MODULE_0__[\"Car\"].WIDTH = Math.floor(ROAD_SIZE / 2 - 4);\r\n_car__WEBPACK_IMPORTED_MODULE_0__[\"Car\"].LENGTH = ROAD_SIZE;\r\nconst canvas = document.querySelector('#screen');\r\nconst ctx = canvas.getContext(\"2d\");\r\ncanvas.height = document.body.clientHeight - document.querySelector(\"header\").getBoundingClientRect().height;\r\ncanvas.width = document.querySelector(\"main\").getBoundingClientRect().width;\r\ndocument.body.style.backgroundColor = BG_COLOR;\r\nvar buildingDimensions = { \"heights\": Array(), \"widths\": Array() };\r\nvar cars = [];\r\ngenerateCity();\r\nspawnACar();\r\nwindow.requestAnimationFrame(loop);\r\nfunction loop() {\r\n    tick();\r\n    draw();\r\n    window.requestAnimationFrame(loop);\r\n}\r\nfunction tick() {\r\n    // Move cars\r\n    cars.forEach(car => {\r\n        // Collission detection\r\n        let otherCars = cars.filter(filterCar => filterCar !== car);\r\n        let activeCollision = otherCars.find(otherCar => {\r\n            if (car.y >= otherCar.y && car.y <= otherCar.y + _car__WEBPACK_IMPORTED_MODULE_0__[\"Car\"].WIDTH)\r\n                if (car.x >= otherCar.x && car.x <= otherCar.x + _car__WEBPACK_IMPORTED_MODULE_0__[\"Car\"].LENGTH)\r\n                    if (otherCar.speed != 0) {\r\n                        car.speed = 0;\r\n                        return true;\r\n                    }\r\n            car.speed = _car__WEBPACK_IMPORTED_MODULE_0__[\"Car\"].BASE_SPEED;\r\n            return false;\r\n        });\r\n        if (activeCollision == undefined)\r\n            // Move\r\n            switch (car.dir) {\r\n                case 1:\r\n                    car.y += car.speed;\r\n                    break;\r\n                case 2:\r\n                    car.x += car.speed;\r\n                    break;\r\n                case 3:\r\n                    car.y -= car.speed;\r\n                    break;\r\n                default:\r\n                    car.x -= car.speed;\r\n                    break;\r\n            }\r\n    });\r\n    cars = cars.filter(car => car.x > 0 &&\r\n        car.x < canvas.width &&\r\n        car.y > 0 &&\r\n        car.y < canvas.height);\r\n}\r\nfunction draw() {\r\n    // Clear\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    // Background\r\n    ctx.fillStyle = BG_COLOR;\r\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\r\n    drawCity();\r\n    drawCars();\r\n}\r\nfunction generateCity() {\r\n    // Randomize building size\r\n    for (let y = ROAD_SIZE; y < canvas.height - (BUILDING_SIZE_MIN + ROAD_SIZE);) {\r\n        let newHeight = Math.floor(Math.random() * (BUILDING_SIZE_MAX - BUILDING_SIZE_MIN) + BUILDING_SIZE_MIN);\r\n        buildingDimensions.heights.push(newHeight);\r\n        y += newHeight + ROAD_SIZE;\r\n        if (canvas.height - y < (BUILDING_SIZE_MAX + ROAD_SIZE) * 2) {\r\n            buildingDimensions.heights.push(BUILDING_SIZE_MIN);\r\n            buildingDimensions.heights.push(canvas.height - (y + BUILDING_SIZE_MIN + ROAD_SIZE) - ROAD_SIZE);\r\n            break;\r\n        }\r\n    }\r\n    for (let x = ROAD_SIZE; x < canvas.width - (BUILDING_SIZE_MIN + ROAD_SIZE);) {\r\n        let newWidth = Math.floor(Math.random() * (BUILDING_SIZE_MAX - BUILDING_SIZE_MIN) + BUILDING_SIZE_MIN);\r\n        buildingDimensions.widths.push(newWidth);\r\n        x += newWidth + ROAD_SIZE;\r\n        if (canvas.width - x < (BUILDING_SIZE_MIN + ROAD_SIZE) * 2) {\r\n            buildingDimensions.widths.push(canvas.width - x - ROAD_SIZE);\r\n            break;\r\n        }\r\n    }\r\n}\r\nfunction drawCity() {\r\n    var y = ROAD_SIZE;\r\n    buildingDimensions.heights.forEach(height => {\r\n        var x = ROAD_SIZE;\r\n        buildingDimensions.widths.forEach(width => {\r\n            drawBuilding(x, y, width, height);\r\n            x += width + ROAD_SIZE;\r\n        });\r\n        y += height + ROAD_SIZE;\r\n    });\r\n}\r\nfunction drawCars() {\r\n    cars.forEach(car => car.drawCar(ctx));\r\n}\r\nfunction spawnACar() {\r\n    let car = _car__WEBPACK_IMPORTED_MODULE_0__[\"Car\"].CarFromSpawnPoint(getRandomSpawnPoint());\r\n    cars.push(car);\r\n}\r\ndocument.querySelector(\"#spawn-button\").addEventListener(\"click\", spawnACar);\r\nfunction getRandomSpawnPoint() {\r\n    let y = 0;\r\n    let x = 0;\r\n    let dir = 0; // 0: Right, 1: Down, 2: Left, 3: Up\r\n    let spawnHoriz = Math.floor(Math.random() * 2);\r\n    if (spawnHoriz) {\r\n        // Car goes horizontally\r\n        // Random Height\r\n        let randHeight = Math.floor(Math.random() * (buildingDimensions.heights.length + 1));\r\n        let sumHeight = 0;\r\n        buildingDimensions.heights.slice(0, randHeight).forEach(h => sumHeight += h);\r\n        y = ROAD_SIZE * randHeight + sumHeight;\r\n        // Left or right\r\n        let goesRight = Math.floor(Math.random() * 2);\r\n        y += Math.round(ROAD_SIZE / 4) + Math.round(ROAD_SIZE / 2) * goesRight;\r\n        if (!goesRight)\r\n            x = canvas.width;\r\n        dir = 2 * goesRight;\r\n    }\r\n    else {\r\n        // Car goes vertically\r\n        // Random Width\r\n        let randWidth = Math.floor(Math.random() * (buildingDimensions.widths.length + 1));\r\n        let sumWidths = 0;\r\n        buildingDimensions.widths.slice(0, randWidth).forEach(w => sumWidths += w);\r\n        x = ROAD_SIZE * randWidth + sumWidths;\r\n        // Up or down\r\n        let goesUp = Math.floor(Math.random() * 2);\r\n        x += Math.round(ROAD_SIZE / 4) + Math.round(ROAD_SIZE / 2) * goesUp;\r\n        if (goesUp)\r\n            y = canvas.height;\r\n        dir = 1 + 2 * goesUp;\r\n    }\r\n    return { \"x\": x, \"y\": y, \"dir\": dir };\r\n}\r\nfunction isPointInSquare(point, square) {\r\n    if (point.x < square.x ||\r\n        point.y < square.y ||\r\n        point.x > square.x + square.width ||\r\n        point.y > square.y + square.height)\r\n        return false;\r\n    return true;\r\n}\r\nfunction drawBuilding(x, y, width, height) {\r\n    ctx.fillStyle = BUILDING_COLOR;\r\n    ctx.fillRect(x, y, width, height);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });