import is from 'is';

/**
 * Turn a regular node style callback function into a promise
 * @param   {Function} func - Function to turn into promise
 * @param   {Object} [_this=null] - Object to use as this object when calling `func`
 * @returns {Function} - promisified function
 */
export function promisify(func, _this = null) {
  const fn = func.bind(_this);
  return (...args) => {
    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

      fn(...args);
    });
  };
}

export function hasProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Loop through a object property. Will break out of loop if `cb` returns false
 * @param {Object} obj - object to loop through
 * @param {function(*, String):(void|boolean)} cb - Function to call on every property
 */
export function eachObj(obj, cb) {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!is.undef(obj[key])) {
      const val = obj[key];
      if (cb(val, key) === false) {
        break;
      }
    }
  }
}

/**
 * Check to see if `obj` matches `matcher`
 * @param   {Object} matcher
 * @param   {Object} obj - object to match against `matcher`
 * @returns {boolean} - did match or not
 */
export function couldMatchObj(matcher, obj) {
  let matched = true;

  eachObj(matcher, (val, key) => {
    switch (typeof val) {
      case 'function':
        matched = val(obj[key]);
        break;
      case 'object':
        if (val.not) {
          matched = val.not !== obj[key];
          break;
        }
      default:
        matched = val === obj[key];
    }
    // matched = val === obj[key];
    return matched;
  });

  return matched;
}

/**
 * Makes `options` inherit all properties it doesnt have from `default`
 * @param {Object} [options={}]
 * @param {Object} defaultObj - default properties that you want `options` to have
 * @returns {Object} - options with all default properties
 */
export function defaults(options = {}, defaultObj) {
  const newObj = { ...options };

  eachObj(defaultObj, (val, key) => {
    if (!hasProp(options, key) || is.undefined(options[key])) {
      newObj[key] = val;
    }
  });

  return newObj;
}

export function cliLog(str) {
  const string = str
    .split(/\n/)
    .map(s => s.trim())
    .join('\n');
  // eslint-disable-next-line
  console.log(string);
}

// /**
//  * Capitalize the first character in the string
//  * @param   {string} name - name to capitalize
//  * @returns {string} - name with a capital first letter
//  */
// utils.capitalize = function capitalize(name) {
//   if (!name) {
//     throw new Error('Capitalize only accepts a non-empty string as a argument');
//   }

//   let firstCharCapitalized = name[0].toUpperCase();

//   // check to see if its already a capital letter
//   return firstCharCapitalized === name[0]
//     ? name
//     : firstCharCapitalized + name.slice(1);
// };

// /**
//  * Convert a filename into a valid filename. Replaces all bad characters with `-`
//  * @param   {string} fileName - Name of file
//  * @returns {string} - valid file name
//  */
// utils.normalizeFileName = function normalizeReactComponentName(fileName) {
//   return !validFilename(fileName)
//     ? filenamify(fileName, { replacement: '-' })
//     : fileName;
// };
