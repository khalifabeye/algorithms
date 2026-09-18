class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }
  addNode(node) {
    this.nodes.push(node);
  }
  addEdge(node1, node2) {
    this.edges.push([node1, node2]);
  }

  findFirstDegreeRole(me) {
    const visited = [me];
    const result = [];
    for (let i = 0; i <= me.connections.length - 1; i++) {
      const node = me.connections[i];
      if (visited.includes(node)) continue;
      visited.push(node);
      result.push(node.role);
    }
    return result;
  }

  findRoles(me, degree, r=[]) {
    if (degree <= 0) return r;

    r.push(...this.findFirstDegreeRole(me));
    let connections = [...me.connections]

    connections.forEach((person)=>{
      this.findRoles(person, degree-1, r);
    })
    return r;
  }

  mostCommonRole(r) {
    const roles = {};
    let max = 0;
    let winner = '';

    for (let i = 0; i < r.length; i++) {
      const role = r[i]
      roles[role] = roles[role] ? roles[role] + 1 : 1;
    }

    for (const role in roles) {
        if (roles[role] > max) {
            max = roles[role];
            winner = role;
        }
    }
    return [winner, roles[winner]]
  }
}

class Node {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.connections = [];
  }
}

const network = new Graph();
const me = new Node('khalifa', 'software engineer');
const alice = new Node('alice', 'designer');
const bob = new Node('bob', 'software engineer');
const charlie = new Node('charlie', 'program manager');
me.connections.push(alice, bob, charlie);
alice.connections.push(me, bob, new Node('laurent', 'program manager'), new Node('kana', 'community manager'));
bob.connections.push(charlie, new Node('atesh', 'product owner'));
charlie.connections.push(new Node('julia', 'hr'), new Node('fatima', 'sales'));
network.addNode(me, alice, bob, charlie);

// console.log(network.findFirstDegreeRole(me));
const r = network.findRoles(me, 2);
// console.log(r);
console.log(network.mostCommonRole(r));





// CHAT GPT DOUBTING MY CODE WANTED A TEST : I WON YOU WON'T BREAK IT😂
// const network = new Graph();

// const me = new Node('khalifa', 'software engineer');

// const alice = new Node('alice', 'designer');
// const bob = new Node('bob', 'software engineer');
// const charlie = new Node('charlie', 'program manager');

// const david = new Node('david', 'designer');
// const fatima = new Node('fatima', 'product owner');
// const george = new Node('george', 'software engineer');

// const hanna = new Node('hanna', 'program manager');
// const ibrahima = new Node('ibrahima', 'designer');


// // 1st degree
// me.connections.push(alice, bob, charlie);


// // Alice's connections
// alice.connections.push(
//   me,
//   bob,
//   david,
//   fatima
// );


// // Bob's connections
// bob.connections.push(
//   me,
//   alice,
//   charlie,
//   david,
//   george
// );


// // Charlie's connections
// charlie.connections.push(
//   me,
//   bob,
//   fatima,
//   george
// );


// // 2nd-degree nodes
// david.connections.push(
//   alice,
//   bob,
//   hanna
// );

// fatima.connections.push(
//   alice,
//   charlie,
//   hanna,
//   ibrahima
// );

// george.connections.push(
//   bob,
//   charlie,
//   ibrahima
// );


// // 3rd-degree cross-connections
// hanna.connections.push(
//   david,
//   fatima,
//   ibrahima
// );

// ibrahima.connections.push(
//   fatima,
//   george,
//   hanna
// );


// network.addNode(
//   me,
//   alice,
//   bob,
//   charlie,
//   david,
//   fatima,
//   george,
//   hanna,
//   ibrahima
// );


// // TEST
// const r = network.findRoles(me, 3);

// console.log(r);
// console.log(network.mostCommonRole(r));
