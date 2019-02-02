const Queue = require('./queue.js');
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

  hasChildren() {
    return !!this.children.length;
  }

  breathFirstEach(cb) {
    const queue = new Queue();
    queue.enqueue(this);

    while (queue.size() > 0) {
      const currentTree = queue.peek();

      cb(currentTree);

      if (currentTree.hasChildren()) {
        currentTree.children.forEach(childTree => {
          queue.enqueue(childTree);
        });
      }

      queue.dequeue();
    }
  }
}

// const root = new Tree(1);

// const _2 = root.addChild(2);
// const _3 = root.addChild(3);

// _2.addChild(4);

// root.breathFirstEach(node => {
//   console.log(node.value);
// });

module.exports = Tree;
