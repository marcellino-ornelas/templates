/**
 * Stack Class
 */
var Stack = function() {
  var storage = [];
  // var length = 0;

  // add an item to the top of the stack
  this.push = function() {
    storage.push.apply(storage, arguments);
  };

  // remove an item from the top of the stack
  this.pop = function() {
    if (storage.length) {
      var value = storage.pop();

      return value;
    }
  };

  this.stack = function() {
    return storage;
  };

  this.next = function() {
    if (!storage.length) {
      return void 0;
    }

    return storage[storage.length - 1];
  };

  // return the number of items in the stack
  this.size = function() {
    return storage.length;
  };
};

let s = new Stack();

module.exports = Stack;
