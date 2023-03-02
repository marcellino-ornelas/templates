import { Queue } from './queue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AnyTree extends Tree {}

/**
 * Tree
 */
// export class Tree<TData = any, TChildren extends AnyTree = AnyTree> {
export class Tree<TData = any> {
  public value: TData | null = null;

  public children: Tree[];

  public depth: number;

  ['constructor']: new (value: TData) => this;

  constructor(value?: TData) {
    if (value) {
      this.value = value;
    }
    this.children = [] as unknown as Tree[];
    this.depth = 0;
  }

  addChild(value: TData | Tree): Tree {
    const tree: Tree =
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

  breathFirstEach(cb: (tree: Tree) => boolean | void): void {
    const queue = new Queue<Tree>();
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

  breathFirstSelect(cb: (tree: Tree) => boolean): Tree[] {
    const filtered: Tree[] = [];

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

  depthFirstSelect(cb: (tree: this) => boolean): Tree[] {
    const filtered: Tree[] = [];

    this.depthFirstEach((tree) => {
      if (cb(tree)) {
        filtered.push(tree);
      }
    });

    return filtered;
  }
}

// export default Tree;

// const tree = new Tree<string>();

// tree.addChild('hey');
// tree.addChild(3);

// const children = tree.children;
