"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partial = partial;
exports.bind = bind;
function getInCache(map, key) {
  if (map == null || key == null) return null;

  for (var _len = arguments.length, path = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    path[_key - 2] = arguments[_key];
  }

  if (path.length === 0) return map.get(key);
  return getInCache.apply(undefined, [map.get(key)].concat(path));
}

function setInCache(map, x, key) {
  for (var _len2 = arguments.length, path = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    path[_key2 - 3] = arguments[_key2];
  }

  if (path.length === 0) return map.set(key, x);
  if (!map.has(key)) map.set(key, new Map());
  return setInCache.apply(undefined, [map.get(key), x].concat(path));
}

function partial(cache, f) {
  for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  if (cache.constructor.name !== "Map") throw "Please provide an ES6 Map as the cache";
  var existingFn = getInCache.apply(undefined, [cache, f].concat(args));
  if (existingFn) return existingFn;
  var newFn = function newFn() {
    for (var _len4 = arguments.length, extraArgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      extraArgs[_key4] = arguments[_key4];
    }

    return f.apply(undefined, args.concat(extraArgs));
  };
  setInCache.apply(undefined, [cache, newFn, f].concat(args));
  return newFn;
}

function bind(cache, f, self) {
  if (cache.constructor.name !== "Map") throw "Please provide an ES6 Map as the cache";

  for (var _len5 = arguments.length, args = Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }

  var existingFn = getInCache.apply(undefined, [cache, f, self].concat(args));
  if (existingFn) return existingFn;
  var newFn = f.bind.apply(f, [self].concat(args));
  setInCache.apply(undefined, [cache, newFn, f, self].concat(args));
  return newFn;
}
