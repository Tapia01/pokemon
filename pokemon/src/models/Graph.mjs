import LinkedList from "./LinkendList.mjs";

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            if (!this.#map.has(value)) {
                this.#matrizAdyacencia.push(new LinkedList());
                this.#map.set(value, this.#matrizAdyacencia.length - 1);
            }
        }
    }

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1);
            return true;
        }
        return false;
    }

    addEdge(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) {
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight);
            return true;
        }
        return false;
    }
//profundiad
dfs(startVertex, callback) {
    if (!this.#map.has(startVertex)) {
        return;
    }

    const visited = {};
    const stack = [];
    stack.push(startVertex);

    while (stack.length > 0) {
        const currentVertex = stack.pop();
        if (!visited[currentVertex]) {
            callback(currentVertex);
            visited[currentVertex] = true;
            const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
            let current = neighborsLinkedList.head;
            while (current) {
                const neighborVertex = current.value.node;
                if (!visited[neighborVertex]) {
                    stack.push(neighborVertex);
                }
                current = current.next;
            }
        }
    }
}
//anchura

bfs(startVertex, callback) {
    if (!this.#map.has(startVertex)) {
        return;
    }

    const visited = {};
    const queue = [];
    queue.push(startVertex);

    while (queue.length > 0) {
        const currentVertex = queue.shift();
        if (!visited[currentVertex]) {
            callback(currentVertex);
            visited[currentVertex] = true;
            const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
            let current = neighborsLinkedList.head;
            while (current !== null) {
                const neighborVertex = current.value.node;
                if (!visited[neighborVertex]) {
                    queue.push(neighborVertex);
                }
                current = current.next;
            }
        }
    }
}




    getVertices() {
        return this.#map.keys();
    }

    getNeighbors(vertex) {
        const index = this.#map.get(vertex);
        if (index !== undefined) {
            return this.#matrizAdyacencia[index];
        }
        return null;
    }

    numVertices() {
        return this.#map.size;
    }
}
