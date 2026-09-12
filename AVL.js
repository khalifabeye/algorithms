class AVL {
    constructor() {
        this.root = null;
    }

    _find(value) {
        if (!this.root) return;

        let current = this.root;
        while (true) {
            if (value === current.value) return current;
            if (value < current.value) {
                if (!current.leftChild) break;
                current = this.goLeft(current);
            } else {
                if (!current.rightChild) break;
                current = this.goRight(current);
            }
        }

        if (value !== current.value) return null;
    }

    delete(value) {
        //trouver le noeud a supprimer
        let toDelete = this._find(value)
        if (!toDelete) return;
        let winner = null;

        // verifier si il a left
        if (toDelete.leftChild) {
            // appliquer find Greatest left child
            let find = this.findGreatestLeftChild(toDelete)
            winner = find.winner;
            return this.placeLeft(toDelete, winner);

        } else if (toDelete.rightChild) { // sinon verifier si il a right
            // appliquer find Greatest right
            let find = this.findLeastRightChild(toDelete)
            winner = find.winner;
            return this.placeRight(toDelete, winner);
        } else { // sinon supprimer
            toDelete.value = null;
            toDelete = null;
        }



    } //greatest left child or least right child

    findLeastRightChild(node) {
        //a partir du noeud faire droite, et sauvegarder sa valeur comme valeur min
        let parent = node;
        let minNode = node.rightChild;
        let current = minNode;
        let minValue = minNode.value;
        // tant que l'enfant de gauche n'est pas nul faire gauche
        while (current.leftChild) {
            // comparer cette valeur avec min
            parent = current
            current = current.rightChild
            if (current.value <= minValue) {
                // si min plus grand update min
                // garder le noeud avec la plus petite valeur dans minNode
                minValue = current.value;
                minNode = current;
            }
        }

        return { winner: minNode, parent: parent };
    }

    findGreatestLeftChild(node) {
        //a partir du noeud faire gauche, et sauvegarder sa valeur comme valeur max
        let parent = node
        let maxNode = node.leftChild;
        let current = maxNode;
        let maxValue = maxNode.value
        // tant que l'enfant de droite n'est pas nul faire droite
        while (current.rightChild) {
            // comparer cette valeur avec max
            parent = current;
            current = current.rightChild
            if (current.value >= maxValue) {
                // si max plus petit update max
                // garder le noeud avec la plus grande valeur dans maxNode
                maxValue = current.value;
                maxNode = current;
            }
        }

        return { winner: maxNode, parent: parent };

    }

    placeLeft(toDelete, winner) {
        if (winner.value == toDelete.leftChild.value && !toDelete.rightChild) {
            toDelete.value = winner.value
            toDelete.leftChild = winner.leftChild
            toDelete.rightChild = winner.rightChild
            return winner;
        }

        // donner la valeur de maxNode au node a delete
        toDelete.value = winner.value
        // verifier si winner n'a pas d'enfants
        if (!winner.leftChild && !winner.rightChild) {
            toDelete.leftChild = null;
        } else {
            // donner la valeur du left de maxNode a maxNode
            winner.value = winner.leftChild?.value
            // si maxNode.right a des enfants lier ses enfants a max node
            if (winner.leftChild.rightChild) {
                winner.rightChild = winner.leftChild.rightChild
            } else if (winner.leftChild.leftChild) {
                winner.leftChild = winner.leftChild.leftChild
            } else {
                winner.leftChild = null;
            }
        }


        return winner;
    }

    placeRight(toDelete, winner) {
        if (winner.value == toDelete.rightChild.value && !toDelete.leftChild) {
            toDelete.value = winner.value
            toDelete.leftChild = winner.leftChild
            toDelete.rightChild = winner.rightChild
            return winner;
        }

        // donner la valeur de minNode au node a delete
        toDelete.value = winner.value
        // verifier si winner n'a pas d'enfants
        if (!winner.leftChild && !winner.rightChild) {
            toDelete.rightChild = null;
        } else {
            // donner la valeur du right de minNode a minNode
            winner.value = winner.rightChild?.value
            // si minNode.right a des enfants lier ses enfants a min node
            if (winner.rightChild.rightChild) {
                winner.rightChild = winner.rightChild.rightChild
            } else if (winner.rightChild.leftChild) {
                winner.leftChild = winner.rightChild.leftChild
            } else {
                winner.rightChild = null;
            }
        }
    }


    add(value) {
        this.root = this._addRecursive(this.root, value)
    }

    _addRecursive(node, value) {
        if (node === null) return new Node(value);

        if (value < node.value) {
            node.leftChild = this._addRecursive(node.leftChild, value);
        } else if (value > node.value) {
            node.rightChild = this._addRecursive(node.rightChild, value);
        }

      this.getHeight(node);

      if (this.balanceFactor(node) > 1) {
        if (!node.rightChild.rightChild) this.rotateLL(node.rightChild);
        this.rotateRR(node);
      } else if (this.balanceFactor(node) < -1) {
        if (!node.leftChild.leftChild) this.rotateRR(node.leftChild);
        this.rotateLL(node);
      }
        return node;
    }

    goLeft(node) {
        return node.leftChild;
    }
    goRight(node) {
        return node.rightChild;
    }

    getHeight(node) {
      if (!node) return 0;
      node.height = 1 + Math.max(this.getHeight(node.leftChild), this.getHeight(node.rightChild));
      return node.height;
    }

    balanceFactor(node) {
      return this.getHeight(node.rightChild) - this.getHeight(node.leftChild);
    }

    rotateLL(node) {
      const val = node.value;
      const al = node.rightChild;
      const bl = node.leftChild.rightChild;
      node.value = node.leftChild.value;
      node.leftChild.value = val;
      node.rightChild = node.leftChild;
      node.leftChild = node.rightChild.leftChild;
      node.rightChild.rightChild = al;
      node.rightChild.leftChild = bl;

      // update heights
      this.getHeight(node.rightChild);
      this.getHeight(node);
    }

    rotateRR(node) {
      // swap node et node.rightChild's values
      const val = node.value;
      const al = node.leftChild;
      const bl = node.rightChild.leftChild;
      node.value = node.rightChild.value;
      node.rightChild.value = val;
      // make node.rightChild the left child of node
      node.leftChild = node.rightChild;
      // make node.rightChild.rightChild, the right child of node
      node.rightChild = node.leftChild.rightChild;
      // move node's original left child to the left child of node.leftChild
      node.leftChild.leftChild = al;
      // move node.leftChild's leftChild to his right child
      node.leftChild.rightChild = bl;

      // update heights
      this.getHeight(node.leftChild);
      this.getHeight(node);
    }
}

class Node {
    constructor(value) {
      this.value = value;
      this.leftChild = null;
      this.rightChild = null;
      this.height = 1;
    }
}

function visualizeBST(root) {
    const container = document.getElementById("tree");

    container.innerHTML = "";

    if (!root) {
        container.textContent = "Empty tree";
        return;
    }

    const nodes = [];
    const edges = [];
    const positions = new Map();

    // Find every node and every connection
    function collect(node, depth = 0) {
        if (!node) return;

        collect(node.leftChild, depth + 1);

        positions.set(node, {
            depth
        });

        nodes.push(node);

        if (node.leftChild) {
            edges.push([node, node.leftChild]);
        }

        if (node.rightChild) {
            edges.push([node, node.rightChild]);
        }

        collect(node.rightChild, depth + 1);
    }

    collect(root);

    // Assign horizontal positions using in-order traversal
    let x = 0;

    function setPositions(node, depth = 0) {
        if (!node) return;

        setPositions(node.leftChild, depth + 1);

        positions.set(node, {
            x: x++ * 100 + 50,
            y: depth * 100 + 50
        });

        setPositions(node.rightChild, depth + 1);
    }

    setPositions(root);

    const width = Math.max(nodes.length * 100 + 100, 800);
    const height =
        Math.max(...nodes.map(node => positions.get(node).y)) + 100;

    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    // Draw edges
    for (const [parent, child] of edges) {
        const parentPosition = positions.get(parent);
        const childPosition = positions.get(child);

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        line.setAttribute("x1", parentPosition.x);
        line.setAttribute("y1", parentPosition.y);

        line.setAttribute("x2", childPosition.x);
        line.setAttribute("y2", childPosition.y);

        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");

        svg.appendChild(line);
    }

    // Draw nodes
    for (const node of nodes) {
        const { x, y } = positions.get(node);

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 25);

        circle.setAttribute("fill", "white");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "2");

        svg.appendChild(circle);

        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        text.setAttribute("x", x);
        text.setAttribute("y", y);

        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");

        text.textContent = node.value;

        svg.appendChild(text);
    }

    container.appendChild(svg);
}

const avl = new AVL();
avl.add(10);
avl.add(5);
avl.add(9);
// bst.add(10);
avl.add(3);
avl.add(12);
avl.add(7);
avl.add(11);
avl.add(13);
avl.add(6);
console.log(avl);
visualizeBST(avl.root)
