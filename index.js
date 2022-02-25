// Slightly based on https://github.com/arve0/deep-reduce

/**
 * Given a collection (object or array of objects) and a path, it dives into the object tree trying to find
 * the leaf key, iterating over any array of object it finds
 * NOTE: differently from what may be expected based on the Array.reduce, it returns undefined instead of the initial value if the path is not found.
 * @param {object|object[]} collection
 * @param {function} reducer function (accumulator, item)
 * @param {*} initialValue
 * @param {string} path
 * @param {*} context reducer will be called to this context
 * @returns {*} the value that results from the reduction or undefined if the path is not found
 */
 function deepReduce(collection, reducer, initialValue, path, context = null) {

    function _deepReduce(obj, pathArr, accumulator) {
        if (Array.isArray(obj)) {
            return obj.reduce((innerAcc, item) => _deepReduce(item, [...pathArr], innerAcc), accumulator);
        }
        if (!pathArr.length) {
            // Arrived at the leaf path
            return reducer.call(context, accumulator, obj);
        }
        const key = pathArr.pop();
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            // throw new Error(`Path ${path} not found in object.`);
            // NOTE: maybe throw an error or an option to do something when path is not found
            return;
        }
        // Recursively dive into the collection's path
        return _deepReduce(obj[key], pathArr, accumulator);
    }

    return _deepReduce(collection, path.split('.').reverse(), initialValue);
}

module.exports = deepReduce;
