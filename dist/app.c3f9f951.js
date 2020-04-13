// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/app.js":[function(require,module,exports) {
function InitEdiyaUI() {
  // 지역 변수
  // var isSlideIn = false;
  // DOM 노드 참조 변수
  var specEnters = null;
  var specExits = null;
  var firstCard = null;
  var navClBtn = null;
  var navOpBtn = null;
  var topButton = null;
  var navigation = null;
  var firstElm = null;
  var lastElm = null;
  var details = null; // UI 인터랙션 초기화

  var init = function init() {
    // 문서 객체를 찾아 지역 변수에 참조하는 함수 실행
    findDomElement();
    addEventButtonBugger();
    addEventCardButton();
    addEventFirstCard();
    hideAllDetail();
  }; // DOM 요소 변수 할당


  var findDomElement = function findDomElement() {
    specEnters = document.querySelectorAll('.menuItem');
    specExits = document.querySelectorAll('.menuDetail > button');
    Cards = document.querySelectorAll('.menuList a');
    navClBtn = document.querySelector('#navClBtn');
    navOpBtn = document.querySelector('.burgerButton');
    topButton = document.querySelector('.topButton');
    navigation = document.querySelector('.appNavigation');
    firstElm = document.querySelector('.navList > li:nth-child(1) h3');
    lastElm = document.querySelector('.navList > li:nth-child(6) h3');
    details = document.querySelectorAll('.closeDetail');
  };

  var hideAllDetail = function hideAllDetail() {
    console.log('all details gone');
    Array.from(details).forEach(function (det) {
      return det.tabIndex = '-1';
    });
  }; // 네비게이션 관련 이벤트 추가


  var addEventButtonBugger = function addEventButtonBugger() {
    navOpBtn.addEventListener('click', navOpen);
    navOpBtn.addEventListener('keydown', forceMenu); // 순환을위한 강제 포커싱

    navClBtn.addEventListener('click', navClose);
    navClBtn.addEventListener('keydown', forceNav);
    firstElm.addEventListener('keydown', forceCircular);
  }; // 메뉴카드에 이벤트 추가


  var addEventCardButton = function addEventCardButton() {
    Array.from(specEnters).forEach(function (button) {
      return button.addEventListener('click', openSpec, true);
    });
    Array.from(specEnters).forEach(function (button) {
      return button.addEventListener('keydown', isitEnter, true);
    });
    Array.from(specExits).forEach(function (button) {
      return button.addEventListener('click', closeSpec, true);
    });
  };

  var addEventFirstCard = function addEventFirstCard() {
    Cards[0].addEventListener('keydown', backtoH);
  };

  var addLastElm = function addLastElm() {
    lastElm.addEventListener('keydown', gotoCl);
  }; // 메뉴리스트
  // 메뉴리스트 슬라이드 인
  // 콜백 함수 정의


  var openSpec = function openSpec() {
    var target = this.parentElement.querySelector('.menuDetail');
    target.classList.add('isOpen');
    target.querySelector('.closeDetail').tabIndex = '0';
  };

  var isitEnter = function isitEnter(e) {
    if (e.keyCode === 13) {
      // 일단 오픈스펙과 동일한 함수 실행...
      var target = this.parentElement.querySelector('.menuDetail');
      target.classList.add('isOpen');
      target.querySelector('.closeDetail').tabIndex = '0';
    }
  };

  var closeSpec = function closeSpec(e) {
    console.log('close');
    e.preventDefault();
    this.parentElement.setAttribute('hidden', true); // setTimeout(() => {
    //   this.parentElement.classList.remove('open_spec');
    // }, 0);

    this.parentElement.classList.remove('isOpen');
  };

  var navOpen = function navOpen() {
    console.log('open'); // 만들기
    // navigation.removeAttribute('hidden');

    navigation.classList.add('isActive'); // 스크롤바 위치 돌려놓기

    navigation.parentElement.parentElement.style = 'transform: blur(2px)';
    navigation.parentElement.parentElement.style = 'overflow : hidden';
    navOpBtn.removeEventListener('click', navOpen);
    firstElm.focus();
    navigation.parentElement.querySelector('.appMain').style = 'filter:blur(2px)';
    navigation.parentElement.querySelector('.appHeader').style = 'filter:blur(2px)';
  };

  var navClose = function navClose() {
    console.log('close');
    navigation.classList.remove('isActive'); // 없애기
    // navigation.setAttribute('hidden', true);
    // 스크롤바 위치 바꾸기

    navigation.parentElement.parentElement.style = 'overflow : inherit';
    navOpBtn.addEventListener('click', navOpen);
    Cards[0].focus();
    navigation.parentElement.querySelector('.appMain').style = 'filter:none';
    navigation.parentElement.querySelector('.appHeader').style = 'filter:none';
  }; // 네비 끄는 버튼에서의 순환 함수


  var forceNav = function forceNav(e) {
    if (e.type === 'keydown') {
      if (!e.shiftKey && e.keyCode === 9) {
        console.log(e);
        e.preventDefault();
        firstElm.focus();
      } else if (e.keyCode === 13) {
        console.log('close');
        navigation.classList.remove('isActive'); // 없애기
        // navigation.setAttribute('hidden', true);
        // 스크롤바 위치 바꾸기

        navigation.parentElement.parentElement.style = 'overflow : inherit';
        navOpBtn.addEventListener('click', navOpen);
        Cards[0].focus();
        navigation.parentElement.querySelector('.appMain').style = 'filter:none';
        navigation.parentElement.querySelector('.appHeader').style = 'filter:none'; // 여기서이제
        // e.preventDefault();
        // Cards[0].focus();
      }
    }
  }; // else if (e.shiftKey && e.keyCode === 9) {
  //   // console.error('hey!');
  //   // lastElm.focus();
  // } else {
  // }
  // else(!e.shiftKey && e.keyCode === 9){
  //   lastElm.focus();
  // 메뉴리스트에 포커스받으면 색상클래스 주자.
  // Array.from(specEnters).forEach( buts => buts.addEventListener("focus",))
  // if(포커스 받으면 ){클래스추가해라}
  // 네비 켜는 버튼에서의 경로


  var forceMenu = function forceMenu(e) {
    if (e.keyCode === 13) {
      navOpen();
    } else if (!e.shiftKey && e.keyCode === 9) {
      console.log('first');
      e.preventDefault();
      Cards[0].focus();
    } else {}
  };

  var forceCircular = function forceCircular(e) {
    if (e.type === 'keydown') {
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        navClBtn.focus();
      }
    }
  };

  var backtoH = function backtoH(e) {
    if (e.type === 'keydown') {
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        navOpBtn.focus();
      }
    }
  };

  var gotoCl = function gotoCl() {
    if (e.type === 'keydown') {
      if (!e.shiftKey && e.keyCode === 9) {
        navClBtn.focus();
      }
    }
  }; // DOM 콘텐츠가 준비되면 init 이벤트 핸들러 연결


  window.addEventListener('DOMContentLoaded', init);
} // 이디야UI 기능입히기 초기화.


InitEdiyaUI();
},{}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64920" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map