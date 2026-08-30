class LinkedList {
    constructor () {
        this.length = 0;
        this.head = null;
    }
    
    push (value) {
        const node = new Node(value);
    
        if(!this.head) {
            this.head = node;
        } else {
            const last = this._find(this.length - 1);
            last.next = node; 
        }
        
        this.length++;
    }

    pop () {
        let current = this._find(this.length - 2)
        let last = current.next;
        current.next = null;
        this.length--;
        return last.value;
    }

    delete (index) {
        if (index == this.length - 1) {
            const element = pop();
            this.length--;
            return element;
        } else if (index == 0) {
            const node = this.head
            this.head = node.next;
            node.next = null;
            this.length--;
            return node.value;
        } else {
            const previous = this._find(index - 1);
            const toDelete = previous.next;
            previous.next = toDelete.next;
            this.length--;
            return toDelete.value
        }
    }
    
    get (index) {
        const node = this._find(index);
        return node.value;
    }

    _find (index) {
        if (index >= this.length) return null;
        let current = this.head;
        for (let i = 1; i <= index; i++) {
               current = current.next
        }

        return current;
    }
}

class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}







