class Tree {
  constructor() {
    this.root = null;
  }

  bfs() {
    if (!this.root) return;
    let result = [];
    const queue = [this.root];

    while (queue.length) {
      const current = queue.shift();
      result.push(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
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
console.log(tree.bfs(tree.root));
