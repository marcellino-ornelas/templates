const Stack = require('./stack');

/**
 * Queue Class
 */
var Queue = function() {
  // Use two `stack` instances to implement your `queue` Class
  var inbox = new Stack();
  var outbox = new Stack();

  // called to add an item to the `queue`
  this.enqueue = function() {
    // inbox.push.apply(inbox, arguments);
    //
    Array.prototype.forEach.call(arguments, item => {
      inbox.push(item);
    });
    // TODO: implement `enqueue`
  };

  // called to remove an item from the `queue`
  this.dequeue = function() {
    if (outbox.size() === 0) {
      while (inbox.size() !== 0) {
        outbox.push(inbox.pop());
      }
    }
    return outbox.pop();
  };

  // should return the number of items in the queue
  this.size = function() {
    return inbox.size() + outbox.size();
    // TODO: implement `size`
  };

  this.peek = function() {
    return outbox.next() || inbox.next();
  };

  this.log = function() {
    console.log(
      'queue: ',
      inbox
        .stack()
        .reverse()
        .concat(outbox.stack())
        .map(c => c.name)
    );
  };
};

module.exports = Queue;
