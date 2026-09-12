 class BinarySearchTrees {
    constructor () {
        this.length = 0;
        this.root = null;
    }
    
    _find(value){
        if (!this.root) return;
        
        let current = this.root;
        while (true) {
            if (value === current.value) return current;
            if(value < current.value) {
                if (!current.leftChild) break;
                current = this.goLeft(current);
            } else { 
                if (!current.rightChild) break;
                current = this.goRight(current);
            }
        }
        
        if (value !== current.value) return null;
    }
    
    delete(value){
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
    
    findLeastRightChild (node) {
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
            
        return {winner: minNode, parent: parent};
    }
    
    findGreatestLeftChild (node){
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
            
        return {winner: maxNode, parent: parent};
        
    }
    
    placeLeft (toDelete, winner) {
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
    constructor (value) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}


const bst = new BinarySearchTrees();
bst.add(10);
bst.add(5);
bst.add(9);
// bst.add(10);
bst.add(3);
bst.add(12);
bst.add(7);
bst.add(11);
bst.add(13);
console.log(bst._find(12));
// bst.delete(10)
visualizeBST(bst.root)




// Super duper, so now I imported some code, so this is the direction I want to go, so use that UI and adapt it to the ideas we got, so for the dashboard I love it, just adapt it to what we are trying to build, and if you are building new pages the truth source should be that UI so you have to kind of build a kind of design system from that and there is also another page called mylearnings I love this page I don't know how we could adapt it to our goal just come up with something and let's discuss it 