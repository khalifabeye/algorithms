class Tree {
  constructor() {
    this.root = null;
  }

  dfsPreorder() {
    if (!this.root) return;
    // create stack
    const stack = [this.root];
    let current = this.root;
    let result = [];

    // while there is elements in the stack
    while (stack.length) {
      current = stack.pop();
      result.push(current.value);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
    return result;
  }

  dfsInorder(node, result = []) {
    if (!node) return result;
    // while there is elements in the stack
    this.dfsInorder(node.left, result);
    result.push(node.value);
    this.dfsInorder(node.right, result);
    return result;
  }

  dfsPostorder(node, result = []) {
    if (!node) return result;

    this.dfsPostorder(node.left, result);
    this.dfsPostorder(node.right, result);
    result.push(node.value);
    return result;
  }

  add(value){
      const node = new Node(value);
      if (!this.root) {
          this.root = node;
          return;
      }

      let current = this.root;
      while (true) {
          if(value <= current.value) {
              if (!current.leftChild) break;
              current = this.goLeft(current);
          } else {
              if (!current.rightChild) break;
              current = this.goRight(current);
          }
      }

      if (value <= current.value) {
          current.leftChild = new Node(value);
      } else {
          current.rightChild = new Node(value);
      }

  }

  goLeft(node) {
      return node.leftChild;
  }
  goRight(node) {
      return node.rightChild;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

const tree = new Tree();
tree.add(10);
tree.add(5);
tree.add(9);
// tree.add(10);
tree.add(3);
tree.add(12);
tree.add(7);
tree.add(11);
tree.add(13);
// console.log(tree._find(12));
console.log(tree.dfsInorder(tree.root));
