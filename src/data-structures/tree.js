const Queue = require("./queue.js");
/**
 * Tree
 */
class Tree {
  constructor(value) {
    if (value) {
      this.value = value;
    }
    this.children = [];
    this.depth = 0;
  }

  addChild(value) {
    var tree =
      value instanceof this.constructor ? value : new this.constructor(value);
    tree.depth = this.depth + 1;

    this.children.push(tree);

    return tree;
  }

  isRoot() {
    return this.depth === 0;
  }

  hasChildren() {
    return !!this.children.length;
  }

  /**
   * Breath Methods
   */

  breathFirstEach(cb) {
    const queue = new Queue();
    queue.enqueue(this);

    while (queue.size() > 0) {
      const currentTree = queue.peek();

      if (cb(currentTree) === false) {
        break;
      }

      if (currentTree.hasChildren()) {
        currentTree.children.forEach(childTree => {
          queue.enqueue(childTree);
        });
      }

      queue.dequeue();
    }
  }

  breathFirstSelect(cb) {
    const filtered = [];

    this.breathFirstEach(function(tree) {
      if (cb(tree)) {
        filtered.push(tree);
      }
    });

    return filtered;
  }

  /**
   * Depth Methods
   */

  depthFirstEach(cb) {
    // change to stack
    function recurseChildren(tree) {
      cb(tree);
      return tree.hasChildren() && tree.children.forEach(recurseChildren);
    }
    recurseChildren(this);
  }

  depthFirstSelect(cb) {
    const filtered = [];

    this.depthFirstEach(function(tree) {
      if (cb(tree)) {
        filtered.push(tree);
      }
    });

    return filtered;
  }
}

// const root = new Tree(1);

// const _2 = root.addChild(2);
// const _3 = root.addChild(3);

// _2.addChild(4);

// root.depthFirstEach(node => {
//   console.log(node.value);
// });

module.exports = Tree;
