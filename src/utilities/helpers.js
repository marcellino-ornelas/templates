/**
 * Turn a regular node style callback function into a promise
 * @param   {Function} func - Function to turn into promise
 * @param   {Object} [_this=null] - Object to use as this object when calling `func`
 * @returns {Function} - promisified function
 */
export function promisify(func, _this = null) {
  return function() {
    const args = arguments;
    return new Promise(function(resolve, reject) {
      Array.prototype.push.call(args, function(err, data) {
        err ? reject(err) : resolve(data);
      });

      func.apply(_this, args);
    });
  };
}

/**
 * Loop through a object property. Will break out of loop if `cb` returns false
 * @param {Object} obj - object to loop through
 * @param {function(*, String):(void|boolean)} cb - Function to call on every property
 */
export function eachObj(obj, cb) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    const val = obj[key];
    if (cb(val, key) === false) {
      break;
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
    return (matched = val === obj[key]);
  });

  return matched;
}

/**
 * Makes `options` inherit all properties it doesnt have from `default`
 * @param {Object} [options={}]
 * @param {Object} defaults - default properties that you want `options` to have
 * @returns {Object} - options with all default properties
 */
export function defaults(options = {}, defaults) {
  eachObj(defaults, (val, key) => {
    if (!options.hasOwnProperty(key)) {
      options[key] = val;
    }
  });

  return options;
}

export function cliLog(str) {
  const string = str
    .split(/\n/)
    .map(s => s.trim())
    .join('\n');
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