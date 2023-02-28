import { Queue } from './queue';

/**
 * Tree
 */
export class Tree<TData> {
  public value: TData;

  public children: Tree<TData>[];

  public depth: number;

  ['constructor']: new (value: TData) => this;

  constructor(value?: TData) {
    if (value) {
      this.value = value;
    }
    this.children = [];
    this.depth = 0;
  }

  addChild(value: TData | this): this {
    const tree: this =
      value instanceof this.constructor
        ? value
        : new this.constructor(value as TData);

    tree.depth = this.depth + 1;

    this.children.push(tree);

    return tree;
  }

  isRoot(): boolean {
    return this.depth === 0;
  }

  hasChildren(): boolean {
    return !!this.children.length;
  }

  /**
   * Breath Methods
   */

  breathFirstEach(cb: (tree: this) => boolean | void): void {
    const queue = new Queue<this>();
    queue.enqueue(this);

    while (queue.size() > 0) {
      // if size is not zero then were good
      const currentTree = queue.dequeue() as this;

      if (cb(currentTree) === false) {
        break;
      }

      if (currentTree.hasChildren()) {
        currentTree.children.forEach((childTree) => {
          queue.enqueue(childTree);
        });
      }
    }
  }

  breathFirstSelect(cb: (tree: this) => boolean): this[] {
    const filtered: this[] = [];

    this.breathFirstEach((tree) => {
      if (cb(tree)) {
        filtered.push(tree);
      }
    });

    return filtered;
  }

  /**
   * Depth Methods
   */

  depthFirstEach(cb: (tree: this) => void) {
    // change to stack
    function recurseChildren(tree) {
      cb(tree);
      return tree.hasChildren() && tree.children.forEach(recurseChildren);
    }
    recurseChildren(this);
  }

  depthFirstSelect(cb: (tree: this) => boolean): this[] {
    const filtered: this[] = [];

    this.depthFirstEach((tree) => {
      if (cb(tree)) {
        filtered.push(tree);
      }
    });

    return filtered;
  }
}

// export default Tree;
