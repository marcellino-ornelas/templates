import { Queue } from './queue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AnyTree extends Tree {}

export interface TreeCallBack<TType, TReturn = void> {
  (tree: TType): TReturn;
}

/**
 * Tree
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Tree<TData = any, TType extends Tree = AnyTree> {
  public value: TData | null = null;

  public children: TType[];

  public depth: number;

  ['constructor']: new (value: TData) => this;

  constructor(value?: TData) {
    if (value) {
      this.value = value;
    }
    this.children = [] as unknown as TType[];
    this.depth = 0;
  }

  addChild(value: TType): TType {
    const tree: TType = value;

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
  breathFirstEach(cb: TreeCallBack<TType, boolean | void>): void {
    const queue = new Queue<Tree>();
    queue.enqueue(this);

    while (queue.size() > 0) {
      // if size is not zero then were good
      const currentTree = queue.dequeue() as TType;

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

  breathFirstSelect(cb: TreeCallBack<TType, boolean>): TType[] {
    const filtered: TType[] = [];

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

  depthFirstEach(cb: TreeCallBack<TType>): void {
    // change to stack
    function recurseChildren(tree) {
      cb(tree);
      return tree.hasChildren() && tree.children.forEach(recurseChildren);
    }
    recurseChildren(this);
  }

  depthFirstSelect(cb: TreeCallBack<TType, boolean>): TType[] {
    const filtered: TType[] = [];

    this.depthFirstEach((tree) => {
      if (cb(tree)) {
        filtered.push(tree);
      }
    });

    return filtered;
  }
}
