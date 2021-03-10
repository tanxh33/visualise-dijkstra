// Code implemented with reference from:
// Article by Maiko Miyazaki:
//     Completed JavaScript Data Structure Course, and Here is What I Learned About Graph (+ Dijkstra Algorithm)
// Article link:
//     https://dev.to/maikomiyazaki/completed-javascript-data-structure-course-and-here-is-what-i-learned-about-graph-dijkstra-algorithm-57n8

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addNode = (node) => {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = {};
    }
  }

  addEdge = (node1, node2, weight) => {
    if (!this.adjacencyList[node1]) { this.addNode(node1); }
    if (!this.adjacencyList[node2]) { this.addNode(node2); }

    this.adjacencyList[node1][node2] = weight;
    this.adjacencyList[node2][node1] = weight;
  }

  removeEdge = (node1, node2) => {
    delete this.adjacencyList[node1][node2];
    delete this.adjacencyList[node2][node1];
    // this.adjacencyList[node1] = this.adjacencyList[node1].filter(node => node !== node2);
    // this.adjacencyList[node2] = this.adjacencyList[node2].filter(node => node !== node1);
  }

  removeNode = (node) => {
    for (let i in this.adjacencyList[node]) {
      this.removeEdge(node, i);
    }
    // while (this.adjacencyList[node]) {
    //   const adjacentNode = this.adjacencyList[node].pop();
    //   this.removeEdge(node, adjacentNode);
    // }
    delete this.adjacencyList[node];
  }

  DFS = (target) => {
    const result = [];
    const visited = {};

    // Recursive function declaration:
    const helper = (node) => {
      if (!node) { return null; }

      visited[node] = true;
      result.push(node);

      Object.keys(this.adjacencyList[node]).forEach(neighbour => {
        if (!visited[neighbour]) {
          return helper(neighbour);
        }
      });
    }

    // Recursive function call:
    helper(target);
    return result;
  }

  BFS = (start) => {
    const queue = [start];
    const result = [];
    const visited = {};

    while (queue.length) {
      let current = queue.shift();
      visited[current] = true;
      result.push(current);

      Object.keys(this.adjacencyList[current]).forEach(neighbour => {
        if (!visited[neighbour]) {
          visited[neighbour] = true;
          queue.push(neighbour);
        }
      });
    }

    return result;
  }

  Dijkstras = (start, finish) => {
    // List 1 - Record vertices with numbers that represent total cost to start
    const costFromStartTo = {};
    // List 2 - tells you which node to check next
    const checkList = new PriorityQueue();
    // List 3 - Record vertices previously visited to find the vertex's current cost
    const prev = {};

    let current;
    let result = [];

    // Initialise lists with Infinity and null values
    for (const node in this.adjacencyList) {
      if (node === start) {
        costFromStartTo[node] = 0;
        checkList.enqueue(node, 0);
      } else {
        costFromStartTo[node] = Infinity;
      }
      prev[node] = null;
    };

    while (checkList.values.length) {
      current = checkList.dequeue().val;
      if (current === finish) {
        // Done
        while (prev[current]) {
          result.push(current);
          current = prev[current];
        }
        break;
      } else {
        for (const neighbour in this.adjacencyList[current]) {
          let costToNeighbour = costFromStartTo[current] + this.adjacencyList[current][neighbour];
          if (costToNeighbour < costFromStartTo[neighbour]) {
            costFromStartTo[neighbour] = costToNeighbour;
            prev[neighbour] = current;
            checkList.enqueue(neighbour, costToNeighbour);
          }
        };
      }  // end if-else
    }  // end-while

    return result.concat(current).reverse();
  }

  printAdjList = () => {
    console.log(this.adjacencyList);
  }

  resetGraph = () => {
    this.adjacencyList = {};
  }
}


class PriorityQueue {
  // Keeps track which route has the total cheapest cost
  constructor() {
    this.values = [];
  }

  enqueue = (val, priority) => {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue = () => {
    return this.values.shift();
  }

  sort = () => {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}


class DijkstraCustom {
  constructor(adjacencyList, start, finish) {
    // Note that JavaScript processes object keys as strings even if they're given integers.
    // Thus start and finish arguments should be passed in as strings.
    this.adjacencyList = adjacencyList;
    this.start = start;
    this.finish = finish;

    // List 1 - Record vertices with numbers that represent total cost to start
    this.costFromStartTo = {};
    // List 2 - tells you which node to check next
    this.checkList = new PriorityQueue();
    // List 3 - Record vertices previously visited to find the vertex's current cost
    this.prevVisited = {};

    this.current = null;
    this.result = [];
    this.algoSteps = [];
    /**
     * algoSteps.state.flag
     * 0: Initialised lists
     * 
     * 1: Top of while-loop
     *     Loop through neighbours
     *     2: Calculated cost to neighbour
     *         If better cost:
     *         3: Lists before update
     *         4: Updated lists
     *         Else:
     *         5: No update
     *     6: Solution found
     *     7: Push nodes to results array
     * 8: Return path solution
     * 9: No path solution found
     */

    this.initLists();
  }

  initLists = () => {
    // Initialise lists with Infinity and null values
    for (const node in this.adjacencyList) {
      if (node === this.start) {
        this.costFromStartTo[node] = 0;
        this.checkList.enqueue(node, 0);
      } else {
        this.costFromStartTo[node] = Infinity;
      }
      this.prevVisited[node] = null;
    };
    this.pushStateToSteps({ flag: 0 });
  }

  run = () => {
    while (this.checkList.values.length) {

      this.current = this.checkList.values[0].val;  // Read the value first to keep 'priority' in state

      this.pushStateToSteps({ flag: 1 });

      this.checkList.dequeue();  // Dequeue afterwards

      if (this.current === this.finish) {
        // Solution found
        this.pushStateToSteps({ flag: 6 });

        while (this.prevVisited[this.current]) {
          this.result.push(this.current);
          this.pushStateToSteps({ flag: 7, result: JSON.parse(JSON.stringify(this.result)) });
          this.current = this.prevVisited[this.current];
        }
        this.result.push(this.current);
        this.pushStateToSteps({ flag: 7, result: JSON.parse(JSON.stringify(this.result)) });
        this.result = this.result.reverse();
        break;
      } else {

        for (const neighbour in this.adjacencyList[this.current]) {
          let costToNeighbour = this.costFromStartTo[this.current] + this.adjacencyList[this.current][neighbour];
          this.pushStateToSteps({ flag: 2, neighbour, costToNeighbour });

          if (costToNeighbour < this.costFromStartTo[neighbour]) {
            // Update list values for the current-neighbour node.
            this.pushStateToSteps({ flag: 3, neighbour, costToNeighbour });
            this.costFromStartTo[neighbour] = costToNeighbour;
            this.prevVisited[neighbour] = this.current;
            this.checkList.enqueue(neighbour, costToNeighbour);
            this.pushStateToSteps({ flag: 4, neighbour, costToNeighbour });
          } else {
            // Don't update list values
            this.pushStateToSteps({ flag: 5, neighbour, costToNeighbour });
          }
        };
      }  // end if-else
    }  // end-while

    if (this.result.length === 0) {
      this.pushStateToSteps({ flag: 9 });
    } else {
      this.pushStateToSteps({ flag: 8, bestCost: this.costFromStartTo[this.finish] });
    }

    return this.result;
  }

  pushStateToSteps = (state) => {
    this.algoSteps.push({
      costFromStartTo: JSON.parse(JSON.stringify(this.costFromStartTo)),
      checkList: JSON.parse(JSON.stringify(this.checkList)),
      prevVisited: JSON.parse(JSON.stringify(this.prevVisited)),
      current: this.current,
      state: state
    });
  }
}
