class Arraylist {
    constructor() {
        this.length = 0;
        this.data = {};
    }

    push(value) {
        this.data[this.length] = value;
        this.length++;
    }

    pop() {
        const value = this.data[this.length - 1];
        delete this.data[this.length];
        this.length--
        return value;
    }

    shift() {
        const value = this.data[0];
        delete this.data[0];
        this.length--
        return value;
    }

    unshift(value) {
        for (let i = this.length - 1; i >= 0; i--) {
            this.data[i + 1] = this.data[i];
        }

        this.data[0] = value;
    }

    delete(index) {
        const value = this.data[index];
        this._collapseTo(index);
        return value;
    }

    get(index) {
        return this.data[index];
    }

    _collapseTo(index) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        delete this.data[this.length - 1];
        this.length--;
    }
}

const test = new Arraylist()
test.push(10);
test.push(20);
test.push(30);
test.push(40);
test.unshift(100)
// test.delete(2)
test.pop()
test.shift()
console.log(test.data);


