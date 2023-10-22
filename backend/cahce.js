const cache = require('memory-cache');
class TempData{
    setTempData(key, data, ttlMilliseconds) {
    cache.put(key, data, ttlMilliseconds);
}
 getTempData(key) {
    return cache.get(key);
}
 removeTempData(key) {
    cache.del(key);
}
}

module.exports =TempData