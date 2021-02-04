class App {
  constructor() {
    this.currentGraph = { nodes: [], edges: [] };
    this.currentState = APP_STATES.NONE;

    this.graph = new WeightedGraph();
    this.algoStart = null;
    this.algoEnd = null;

    this.ui = new UICtrl();

    document.addEventListener('DOMContentLoaded', () => {
      this.ui.init();
      this.refresh();
      // this.loadExampleGraph();
    });

    this.loadEventListeners();

    console.log('App initialised.');
  }

  loadEventListeners = () => {
    document.querySelector(this.ui.selectors.addNodeBtn).addEventListener('click', () => this.addNodeHandler());
    document.querySelector(this.ui.selectors.addNodeSubmitBtn).addEventListener('click', () => this.ui.addNodeSubmitHandler());
    document.querySelector(this.ui.selectors.addEdgeBtn).addEventListener('click', () => this.addEdgeHandler());
    document.querySelector(this.ui.selectors.addEdgeSubmitBtn).addEventListener('click', () => this.ui.addEdgeSubmitHandler());
    document.querySelector(this.ui.selectors.deleteBtn).addEventListener('click', () => this.deleteObjHandler());

    document.querySelector(this.ui.selectors.runBtn).addEventListener('click', () => this.runBtnHandler());
    document.querySelector(this.ui.selectors.runStartBtn).addEventListener('click', () => this.initAlgorithm());
    document.querySelector(this.ui.selectors.prevBtn).addEventListener('click', () => this.previousStep());
    document.querySelector(this.ui.selectors.nextBtn).addEventListener('click', () => this.nextStep());
    document.querySelector(this.ui.selectors.skipBtn).addEventListener('click', () => this.skipAlgorithm());
    document.querySelector(this.ui.selectors.stopBtn).addEventListener('click', () => this.stopRunning());

    document.querySelector(this.ui.selectors.refreshBtn).addEventListener('click', () => this.refresh());
    document.querySelector(this.ui.selectors.loadExBtn).addEventListener('click', () => this.loadExampleGraph());

    // Prevent entering non-numbers into number field
    document.querySelector(this.ui.selectors.addEdgeWeightInput).addEventListener('keydown', this.numberInputKeydown);
  }

  refresh = () => {
    this.currentState = APP_STATES.NONE;
    this.currentGraph = { nodes: [], edges: [] };
    this.graph.resetGraph();
    this.ui.resetAll();
    this.ui.toggleButtonSet2(false);
    this.ui.toast({ html: `Graph reset`, displayLength: 1000 });
    this.ui.drawTable([]);
    this.ui.initTextDescription();
  }

  addNodeHandler = () => {
    this.ui.resetDrawButtons();
    if (this.currentState !== APP_STATES.NODE_EDIT) {
      this.currentState = APP_STATES.NODE_EDIT;
      this.ui.showGrid();
      this.ui.darkenButton(document.querySelector(this.ui.selectors.addNodeBtn));
      this.ui.toast({ html: `Add Node`, displayLength: 1000 });
    } else {
      this.currentState = APP_STATES.NONE;
      this.ui.hideGrid();
    }
  }

  checkIfNodeExists = (label) => {
    const currentNodes = [...this.currentGraph.nodes.map(node => node.label)];
    for (let i = 0; i < currentNodes.length; i++) {
      if (label === currentNodes[i]) {
        return true;
      }
    }
    return false;
  }

  addNode = (x, y, label) => {
    // Get the highest of the ids in the currentGraph, then add 1
    const id = Math.max(...this.currentGraph.nodes.map(node => node.id), -1) + 1;

    const newNode = {id, label, x, y};

    // Add to currentGraph
    this.currentGraph.nodes.push(newNode);

    // Add to data structure
    this.graph.addNode(id);

    // Redraw UI
    this.ui.drawGraph(this.currentGraph.nodes, this.currentGraph.edges);
    this.ui.drawTable(this.currentGraph.nodes);
  }

  addEdgeHandler = () => {
    this.ui.resetDrawButtons();
    this.ui.hideGrid();
    this.ui.resetValues();
    if (this.currentState !== APP_STATES.EDGE_EDIT &&
        this.currentGraph.nodes.length >= 2) {
      this.currentState = APP_STATES.EDGE_EDIT;
      this.ui.darkenButton(document.querySelector(this.ui.selectors.addEdgeBtn));
      this.ui.toast({ html: `Add Edge`, displayLength: 1000 });
    } else {
      this.currentState = APP_STATES.NONE;
    }
  }

  checkIfEdgeExists = (start, end) => {
    // Check that an edge with same start and end doesn't 
    // already exist in the currentGraph.
    this.currentGraph.edges.forEach((edge) => {
      if (
        (start === edge.start && end === edge.end) ||
        (start === edge.end && end === edge.start)
      ) {
        // [TODO] Here we exit if it exists, but maybe instead just update the weight value.
        // console.log('edge alr exists');
        return true;
      }
    });
    return false;
  }


  addEdge = (start, end, weight) => {
    // Add to currentGraph
    const newEdge = {start, end, weight};
    this.currentGraph.edges.push(newEdge);

    // Add to data structure
    this.graph.addEdge(start, end, weight);

    // Draw on UI
    this.ui.drawGraph(this.currentGraph.nodes, this.currentGraph.edges);
    this.ui.drawTable(this.currentGraph.nodes);
  }

  deleteObjHandler = () => {
    this.ui.resetDrawButtons();
    this.ui.hideGrid();
    this.ui.resetValues();
    if (this.currentState !== APP_STATES.DELETE_OBJ) {
      this.currentState = APP_STATES.DELETE_OBJ;
      this.ui.darkenButton(document.querySelector(this.ui.selectors.deleteBtn));
      this.ui.toast({ html: `Delete mode`, displayLength: 1000 });
    } else {
      this.currentState = APP_STATES.NONE;
      this.ui.hideGrid();
    }
  }

  deleteNode = (id) => {
    // Deleting a Node also removes all the edges attached to it.
    this.currentGraph.edges = this.currentGraph.edges.filter((edge) =>
      edge.start !== id && edge.end !== id
    );
    this.currentGraph.nodes = this.currentGraph.nodes.filter((node) =>
      node.id !== id
    );

    // Remove from data structure
    this.graph.removeNode(id);
    this.graph.printAdjList();

    // Redraw UI
    this.ui.drawGraph(this.currentGraph.nodes, this.currentGraph.edges);
    this.ui.drawTable(this.currentGraph.nodes);
  }

  deleteEdge = (start, end) => {
    // Remove from app state
    this.currentGraph.edges = this.currentGraph.edges.filter((edge) =>
      !(edge.start === start && edge.end === end) &&
      !(edge.end === start && edge.start === end)
    );

    // Remove from data structure
    this.graph.removeEdge(start, end);

    // Redraw UI
    this.ui.drawGraph(this.currentGraph.nodes, this.currentGraph.edges);
    this.ui.drawTable(this.currentGraph.nodes);
  }

  runBtnHandler = () => {
    console.log('Run btn');

    if (this.currentState === APP_STATES.RUNNING) {
      this.currentState = APP_STATES.PAUSED;
      this.ui.toggleRunBtn('play');
    }
    else if (this.currentState === APP_STATES.PAUSED) {
      this.currentState = APP_STATES.RUNNING;
      this.ui.toggleRunBtn('pause');
    }
    else {
      // Select start and end nodes for the algorithm using modal
      this.ui.resetDrawButtons();
      this.ui.hideGrid();
      this.ui.resetValues();
      this.initSelects();
      M.Modal.getInstance(document.querySelector('#run-algo-modal')).open();
    }
  }

  initSelects = () => {
    const selects = document.querySelectorAll('select');

    selects.forEach(select => {
      while (select.options.length > 1) {
        select.options.remove(1);
      }

      for (let i = 0; i < this.currentGraph.nodes.length; i++) {
        const option = document.createElement("option");
        // option.value = this.currentGraph.nodes[i].id;s
        option.text = this.currentGraph.nodes[i].label;
        select.options.add(option);
      }
    });

    const instances = M.FormSelect.init(selects, { classes: 'mb-3' });
    // console.log(instances);
    document.querySelector('#run-algo-modal .helper-text').classList.add('hidden');
  }

  initAlgorithm = () => {
    // Get start and end values from selects
    const startInstance = M.FormSelect.getInstance(document.getElementById('algo-start'));
    const endInstance = M.FormSelect.getInstance(document.getElementById('algo-end'));
    const startLabel = startInstance.input.value;
    const endLabel = endInstance.input.value;

    if (startLabel === endLabel) {
      document.querySelector('#run-algo-modal .helper-text').classList.remove('hidden');
      return;
    }

    // Set global state to the start and end nodes' IDs
    this.algoStart = this.currentGraph.nodes.find(node => node.label === startLabel);
    this.algoEnd = this.currentGraph.nodes.find(node => node.label === endLabel);
    console.log(`run: start=${this.algoStart.id}, end=${this.algoEnd.id}`);

    M.Modal.getInstance(document.querySelector('#run-algo-modal')).close();

    this.currentState = APP_STATES.RUNNING;
    this.ui.toggleRunBtn('pause');
    this.ui.toggleButtonSet1(false);
    this.ui.toggleButtonSet2(true);

    this.processAlgorithm();
  }

  processAlgorithm = () => {
    // Disable other buttons
    this.ui.toggleButtonSet1(false);
    this.ui.drawGraph(this.currentGraph.nodes, this.currentGraph.edges);
    this.ui.initTextDescription();
    this.ui.drawTable(this.currentGraph.nodes);

    this.dijkstras = new DijkstraCustom(
      this.graph.adjacencyList,
      String(this.algoStart.id),
      String(this.algoEnd.id)
    );

    this.processedResult = this.dijkstras.run().map((item) => {
      item = parseInt(item);
      return this.currentGraph.nodes.find(node => node.id === item);
    });
    // console.log("Ran algo:");
    // console.log('Result', this.processedResult);
    // console.log('CurrentGraphNodes', this.currentGraph.nodes);
    // console.log('AlgoSteps', this.dijkstras.algoSteps);
    // console.log("End output");

    this.stepCounter = 0;
    this.stepMax = this.dijkstras.algoSteps.length - 1;
    this.updateStep();
  }

  updateStep = () => {
    this.ui.updateTextDescription(this.currentGraph.nodes, this.dijkstras.algoSteps[this.stepCounter]);
    this.ui.updateTable(this.currentGraph.nodes, this.dijkstras.algoSteps[this.stepCounter]);
    if (this.stepCounter === this.stepMax) {
      // Special action for final step
      this.ui.updateGraphLast(this.processedResult);
    } else {
      this.ui.updateGraph(this.currentGraph, this.dijkstras.algoSteps[this.stepCounter]);
    }
    // ... others ...
  }

  previousStep = () => {
    if (!(this.algoIsRunning())) { return; }
    if (this.stepCounter <= 0) { return; }

    console.log('Prev btn');
    this.stepCounter--;
    this.updateStep();
  }

  nextStep = () => {
    if (!(this.algoIsRunning())) { return; }
    if (this.stepCounter >= this.stepMax) { return; }

    console.log('Next btn');
    this.stepCounter++;
    this.updateStep();
  }

  skipAlgorithm = () => {
    if (!(this.algoIsRunning())) { return; }

    console.log('Skip btn');
    this.currentState = APP_STATES.PAUSED;
    this.ui.toggleRunBtn('play');
    this.stepCounter = this.stepMax;
    this.updateStep();
  }

  stopRunning = () => {
    if (!(this.algoIsRunning())) { return; }

    console.log('Stop btn');
    this.currentState = APP_STATES.NONE;
    this.ui.toggleRunBtn('play');
    this.ui.toggleButtonSet1(true);
    this.ui.toggleButtonSet2(false);
    this.algoStart = null;
    this.algoEnd = null;
  }

  loadExampleGraph = () => {
    console.log('Load graph btn');
    this.currentState = APP_STATES.NONE;

    // Copy example graph:
    const randomGraphIdx = Math.floor(Math.random() * EXAMPLE_GRAPHS.length);
    this.currentGraph = JSON.parse(JSON.stringify(EXAMPLE_GRAPHS[randomGraphIdx]));  // Deep copy

    const { nodes, edges } = this.currentGraph;

    // Reset then add to the Weighted Graph data structure:
    this.graph.resetGraph();
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i].id;
      this.graph.addNode(node);
    }
    for (let i = 0; i < edges.length; i++) {
      const {start, end, weight} = edges[i];
      this.graph.addEdge(start, end, weight);
    }

    // Reset UI, then draw to UI:
    this.ui.resetAll();
    this.ui.drawGraph(nodes, edges);
    this.ui.initTextDescription();
    this.ui.drawTable(nodes);
    this.ui.toast({ html: `Graph loaded`, displayLength: 1000 });

    // Log to console
    // this.graph.printAdjList();
  }

  numberInputKeydown = (e) => {
    const allowedChars = '0123456789';
    const contains = (stringValue, charValue) => {
      return stringValue.indexOf(charValue) > -1;
    }
    let invalidKey = 
      e.key.length === 1 && !contains(allowedChars, e.key) ||
      e.key === '.' && contains(e.target.value, '.');
      invalidKey && e.preventDefault();
  }

  algoIsRunning = () => {
    return (
      this.currentState === APP_STATES.RUNNING ||
      this.currentState === APP_STATES.PAUSED
    );
  }
}

const app = new App();
