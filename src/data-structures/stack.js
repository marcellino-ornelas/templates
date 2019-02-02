/**
 * Stack Class
 */
var Stack = function() {
  var storage = [];
  var length = 0;

  // add an item to the top of the stack
  this.push = function() {
    storage[length++] = arguments[0];
  };

  // remove an item from the top of the stack
  this.pop = function() {
    if (length) {
      var value = storage[--length];
      delete storage[length];
      return value;
    }
  };

  this.next = function() {
    if (!length) {
      return void 0;
    }

    return storage[length - 1];
  };

  // return the number of items in the stack
  this.size = function() {
    return length;
  };
};

module.exports = Stack;
