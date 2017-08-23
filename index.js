function getInCache(map, key, ...path) {
  if (map == null || key == null) return null
  if (path.length === 0) return map.get(key)
  return getInCache(map.get(key), ...path)
}

function setInCache(map, x, key, ...path) {
  if (path.length === 0) return map.set(key, x)
  if (!map.has(key)) map.set(key, new Map())
  return setInCache(map.get(key), x, ...path)
}

export default function memoBind(cache, f, ...args) {
  if (cache.constructor.name !== "Map") throw "Please provide an ES6 Map as the cache"
  let existingFn = getInCache(this.memo_map, f, ...args)
  if (existingFn) return existingFn
  let newFn = (...extraArgs) => f(...args, ...extraArgs)
  setInCache(this.memo_map, newFn, f, ...args)
  return newFn
}