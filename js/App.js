class App {
  constructor() {
    this.currentGraph = { nodes: [], edges: [] };
    this.currentState = APP_STATES.NONE;
    this.exampleGraphIdx = 0;

    this.graph = new WeightedGraph();
    this.algoStart = null;
    this.algoEnd = null;
    this.predictionMode = false;
    this.predictionInput = [];
    this.predictionCost = 0;

    this.dijkstras = null;
    this.processedResult = null;
    this.stepCounter = 0;
    this.stepMax = 0;

    this.autorunInterval = 500;
    this.showTips = true;

    this.ui = new UICtrl();
    this.initText = `
      <h5>Visualising Dijkstra's Algorithm</h5>
      <p>This is a tool for learners to understand Dijkstra's shortest path algorithm.</p><br />
      <h6>How to Use</h6>
      <p>- <span class="strong">Make your own graph</span> by adding nodes and edges with the buttons on the top left.</p>
      <p>- <span class="strong">Run the algorithm</span> to find the shortest path between two nodes.</p>
      <p>- <span class="strong">Watch and learn</span> as the algorithm finds the solution step-by-step.</p>
      <p>- <span class="strong">Adjust the step or speed</span> with the control buttons.</p>
      <p>- Try out some pre-made graphs with the <span class="strong">'Load Example'</span> button.</p><br />  
      <h6>About</h6>
      <p>Dijkstra's algorithm finds the shortest path between two given nodes in a graph, which can represent road networks or computer network architectures.</p><br />
      <p>
        This tool does not support directed graphs, although the algorithm works on both directed and undirected graphs. The generic algorithm does not work on negative weight values.
        <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" target="_blank">Wikipedia</a>
      </p><br />
    `;

    document.addEventListener('DOMContentLoaded', () => {
      this.ui.init();
      this.init();
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
    document.querySelector(this.ui.selectors.prevBtn).addEventListener('click', () => this.previousBtnHandler());
    document.querySelector(this.ui.selectors.nextBtn).addEventListener('click', () => this.nextBtnHandler());
    document.querySelector(this.ui.selectors.skipBtn).addEventListener('click', () => this.skipAlgorithm());
    document.querySelector(this.ui.selectors.stopBtn).addEventListener('click', () => this.stopRunning());
    document.querySelector(this.ui.selectors.autorunSlider).addEventListener('input', (e) => this.resetAutorun(e.target.value));
    document.querySelector(this.ui.selectors.dontShowTipsAgain).addEventListener('change', (e) => this.showTips = !e.target.checked);

    document.querySelector(this.ui.selectors.refreshBtn).addEventListener('click', () => this.refresh());
    document.querySelector(this.ui.selectors.loadExBtn).addEventListener('click', () => this.loadExampleGraph());

    // Press 'enter' to submit within modals
    document.querySelector(this.ui.selectors.addNodeModal).addEventListener('keydown', (e) => { if (e.key === 'Enter') this.ui.addNodeSubmitHandler(); });
    document.querySelector(this.ui.selectors.addEdgeModal).addEventListener('keydown', (e) => { if (e.key === 'Enter') this.ui.addEdgeSubmitHandler(); });
    document.querySelector(this.ui.selectors.runAlgoModal).addEventListener('keydown', (e) => { if (e.key === 'Enter') this.initAlgorithm(); });

    // Prevent entering non-numbers into number field
    document.querySelector(this.ui.selectors.addEdgeWeightInput).addEventListener('keydown', this.numberInputKeydown);

    window.addEventListener('keydown', this.globalKeyDown);
  }

  init = () => {
    this.currentState = APP_STATES.NONE;
    this.currentGraph = { nodes: [], edges: [] };
    this.graph.resetGraph();
    this.enableEdgeBtnLogic();
    this.enableDeleteBtnLogic();
    this.enableRunBtnLogic();
    this.ui.resetAll();
    this.ui.toggleButtonSet2(false);
    this.ui.drawTable([]);
    this.ui.initTextDescription(this.initText);
    this.resetAutorun(document.querySelector(this.ui.selectors.autorunSlider).value);
    this.showTips = !document.querySelector(this.ui.selectors.dontShowTipsAgain).checked;
  }

  refresh = () => {
    // init() but with an extra toast message
    this.ui.toast({ html: `Graph cleared`, displayLength: 1000 });
    this.init();
  }

  addNodeHandler = () => {
    this.ui.resetDrawButtons();
    if (this.currentState !== APP_STATES.NODE_EDIT) {
      this.currentState = APP_STATES.NODE_EDIT;
      this.ui.showGrid();
      this.ui.darkenButton(document.querySelector(this.ui.selectors.addNodeBtn));
      this.ui.toast({ html: `Add node mode`, displayLength: 1000 });
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

    this.enableDeleteBtnLogic();
    this.enableEdgeBtnLogic();
    this.enableRunBtnLogic();
  }

  addEdgeHandler = () => {
    this.ui.resetDrawButtons();
    this.ui.hideGrid();
    this.ui.resetValues();
    if (this.currentState !== APP_STATES.EDGE_EDIT) {
      this.currentState = APP_STATES.EDGE_EDIT;
      this.ui.darkenButton(document.querySelector(this.ui.selectors.addEdgeBtn));
      this.ui.toast({ html: `Add edge mode`, displayLength: 1000 });
    } else {
      this.currentState = APP_STATES.NONE;
    }
  }

  checkIfEdgeExists = (start, end) => {
    // Check that an edge with same start and end doesn't already exist in the currentGraph.
    let exists = false;
    for (let i = 0; i < this.currentGraph.edges.length; i++) {
      const edge = this.currentGraph.edges[i];
      if (
        (start === edge.start && end === edge.end) ||
        (start === edge.end && end === edge.start)
      ) {
        // [TODO] Here we exit if it exists, but maybe instead just update the weight value.
        // console.log('edge alr exists');
        exists = true;
      }
      if (exists) break;
    }
    // console.log('edge doesnt exist');
    return exists;
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
    // this.graph.printAdjList();

    // Redraw UI
    this.ui.drawGraph(this.currentGraph.nodes, this.currentGraph.edges);
    this.ui.drawTable(this.currentGraph.nodes);

    this.enableEdgeBtnLogic();
    this.enableDeleteBtnLogic();
    this.enableRunBtnLogic();
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
    if (this.algoIsRunning() && this.stepCounter === this.stepMax) {
      return;
    }
    if (this.currentState === APP_STATES.RUNNING) {
      this.stopAutorun();
      return;
    }
    if (this.currentState === APP_STATES.PAUSED) {
      this.startAutorun();
      return;
    }
    if (this.currentState === APP_STATES.PREDICTING) {
      this.calculatePredictionCost();
      this.processAlgorithm();
      return;
    }

    // Open run-algo-modal.
    // Select start and end nodes for the algorithm.
    this.ui.resetDrawButtons();
    this.ui.hideGrid();
    this.ui.resetValues();
    this.initSelects();
    M.Modal.getInstance(document.querySelector(this.ui.selectors.runAlgoModal)).open();
  }

  previousBtnHandler = () => {
    this.stopAutorun();
    this.previousStep()
  }

  nextBtnHandler = () => {
    this.stopAutorun();
    this.nextStep()
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

    M.FormSelect.init(selects, { classes: 'mb-3' });
    document.querySelector(this.ui.selectors.runAlgoModal + ' .helper-text').classList.add('hidden');
  }

  initAlgorithm = () => {
    // Get start and end values from selects
    const startInstance = M.FormSelect.getInstance(document.getElementById('algo-start'));
    const endInstance = M.FormSelect.getInstance(document.getElementById('algo-end'));
    const startLabel = startInstance.input.value;
    const endLabel = endInstance.input.value;

    if (startLabel === endLabel) {
      document.querySelector(this.ui.selectors.runAlgoModal + ' .helper-text').classList.remove('hidden');
      return;
    }

    // Set global state to the start and end nodes' IDs
    this.algoStart = this.currentGraph.nodes.find(node => node.label === startLabel);
    this.algoEnd = this.currentGraph.nodes.find(node => node.label === endLabel);
    // console.log(`run: start=${this.algoStart.id}, end=${this.algoEnd.id}`);

    M.Modal.getInstance(document.querySelector(this.ui.selectors.runAlgoModal)).close();

    this.predictionMode = document.querySelector(this.ui.selectors.runAlgoGuess).checked;
    if (this.predictionMode) {
      this.currentState = APP_STATES.PREDICTING;
      if (this.showTips) {
        M.Modal.getInstance(document.querySelector(this.ui.selectors.predictTipsModal)).open();
      }
      this.getUserPrediction();
    } else {
      this.processAlgorithm();
    }
  }

  getUserPrediction = () => {
    // User will start running the algorithm by pressing run-btn again.
    this.ui.toggleButtonSet1(false);
    this.ui.removeHighlightfromAllEdges();
    this.ui.removeHighlightfromAllNodes();
    this.predictionInput = [];
    this.predictionInput.push(this.algoStart);
    this.updatePrediction();
  }

  updatePrediction = () => {
    this.calculatePredictionCost();

    this.ui.removeHighlightfromAllNodes();

    this.currentPredSelection = this.predictionInput[this.predictionInput.length - 1];
    document.querySelector(`[data-node-id='${this.currentPredSelection.id}']`).classList.add('current-node');
    document.querySelector(`[data-node-id='${this.algoEnd.id}']`).classList.add('special-node');

    this.predSelectionNeighbours = [];
    const neighbourIds = Object.keys(this.graph.adjacencyList[this.currentPredSelection.id]);
    neighbourIds.forEach(id => {
      const node = this.currentGraph.nodes.find(node => parseInt(id) === node.id);
      this.predSelectionNeighbours.push(node);
    });

    this.predSelectionNeighbours.forEach((node) => {
      document.querySelector(`[data-node-id='${node.id}']`).classList.add('neighbour-node');
    });

    let predStr = '';
    this.predictionInput.forEach(node => {
      predStr += `<p>(#${node.id}) ${node.label}</p>`;
    });

    this.ui.initTextDescription(`
      <h5>From ${this.algoStart.label} to ${this.algoEnd.label}</h5>
      <p class="strong">Predict the shortest path:</p>
      <p>Compare your human intuition to the algorithm's result!</p><br />
      <p>Click on a <span class="strong neighbour-node">neighbouring node</span> to add to your predicted path.</p>
      <p>Click on the <span class="strong current-node">source node</span> to remove it from your predicted path.</p>
      <p>Click on the <span class="strong">run button</span> again to run the algorithm.</p><br />
      <p class="strong">Selected path (cost = ${this.predictionCost}):</p>
    ` + predStr);
  }

  calculatePredictionCost = () => {
    this.predictionCost = 0;
    for (let i = 1; i < this.predictionInput.length; i++) {
      const prevId = this.predictionInput[i-1].id;
      const nextId = this.predictionInput[i].id;
      this.predictionCost += this.graph.adjacencyList[prevId][nextId];
    }
  }

  processAlgorithm = () => {
    this.currentState = APP_STATES.RUNNING;
    this.ui.toggleRunBtn('pause');
    this.ui.toggleButtonSet1(false);
    this.ui.toggleButtonSet2(true);

    // Disable other buttons
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

    this.stepCounter = 0;
    this.stepMax = this.dijkstras.algoSteps.length - 1;
    this.updateStep();
    this.startAutorun();
  }

  updateStep = () => {
    this.ui.updateTextDescription(this.currentGraph.nodes, this.dijkstras.algoSteps[this.stepCounter]);
    this.ui.updateTable(this.currentGraph.nodes, this.dijkstras.algoSteps[this.stepCounter]);
    if (this.stepCounter === this.stepMax) {
      // Special action for final step
      this.ui.updateGraphLast(this.processedResult);
      this.ui.toggleButtonSet3(false);
      this.stopAutorun();
    } else {
      this.ui.updateGraph(this.currentGraph, this.dijkstras.algoSteps[this.stepCounter]);
      this.ui.toggleButtonSet3(true);
    }
    // ... others ...
  }

  previousStep = () => {
    if (!(this.algoIsRunning())) { return; }
    if (this.stepCounter <= 0) { return; }

    this.stepCounter--;
    this.updateStep();
  }

  nextStep = () => {
    if (!(this.algoIsRunning())) { return; }
    if (this.stepCounter >= this.stepMax) { return; }

    this.stepCounter++;
    this.updateStep();
  }

  skipAlgorithm = () => {
    if (!(this.algoIsRunning())) { return; }

    this.stopAutorun();
    this.stepCounter = this.stepMax;
    this.updateStep();
  }

  stopRunning = () => {
    if (!(this.algoIsRunning())) { return; }

    this.stopAutorun();
    this.currentState = APP_STATES.NONE;
    this.ui.toggleButtonSet3(true);
    this.ui.toggleButtonSet1(true);
    this.ui.toggleButtonSet2(false);
    this.algoStart = null;
    this.algoEnd = null;
  }

  startAutorun = () => {
    this.currentState = APP_STATES.RUNNING;
    this.autorunInstance = setInterval(this.nextStep, this.autorunInterval);
    this.ui.toggleRunBtn('pause');
  }

  stopAutorun = () => {
    clearInterval(this.autorunInstance);
    this.currentState = APP_STATES.PAUSED;
    this.ui.toggleRunBtn('play');
  }

  resetAutorun = (value) => {
    switch (value) {
      case '0': this.autorunInterval = 2000; break;
      case '1': this.autorunInterval = 1250; break;
      case '2': this.autorunInterval = 800; break;
      case '3': this.autorunInterval = 500; break;
      case '4': this.autorunInterval = 250; break;
      case '5': this.autorunInterval = 100; break;
      case '6': this.autorunInterval = 65; break;
      default: break;
    }

    if (this.currentState === APP_STATES.RUNNING) {
      clearInterval(this.autorunInstance);
      this.autorunInstance = setInterval(
        this.nextStep,
        this.autorunInterval
      );
    }
  }

  loadExampleGraph = () => {
    this.currentState = APP_STATES.NONE;

    // Copy example graph:
    let randomGraphIdx = this.exampleGraphIdx;
    while (randomGraphIdx === this.exampleGraphIdx) {
      randomGraphIdx = Math.floor(Math.random() * EXAMPLE_GRAPHS.length);
    }
    this.exampleGraphIdx = randomGraphIdx;
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
    this.enableDeleteBtnLogic();
    this.enableEdgeBtnLogic();
    this.enableRunBtnLogic();

    this.ui.drawGraph(nodes, edges);
    this.ui.initTextDescription(this.initText);
    this.ui.drawTable(nodes);
    this.ui.toast({ html: `Graph loaded`, displayLength: 1000 });
  }

  enableEdgeBtnLogic = () => {
    if (this.currentGraph.nodes.length >= 2) {
      this.ui.toggleButtons([document.querySelector(this.ui.selectors.addEdgeBtn)], true);
    } else {
      // if num_nodes is 0 or 1, we can't add an edge
      this.ui.toggleButtons([document.querySelector(this.ui.selectors.addEdgeBtn)], false);
    }
  }

  enableDeleteBtnLogic = () => {
    if (this.currentGraph.nodes.length >= 1) {
      this.ui.toggleButtons([document.querySelector(this.ui.selectors.deleteBtn)], true);
    } else {
      // if num_nodes is 0, get out of DELETE mode
      this.ui.toggleButtons([document.querySelector(this.ui.selectors.deleteBtn)], false);
      this.currentState = APP_STATES.NONE;
    }
  }

  enableRunBtnLogic = () => {
    if (this.currentGraph.nodes.length >= 2) {
      this.ui.toggleButtons([document.querySelector(this.ui.selectors.runBtn)], true);
    } else {
      this.ui.toggleButtons([document.querySelector(this.ui.selectors.runBtn)], false);
    }
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

  globalKeyDown = (e) => {
    if (this.algoIsRunning()) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousBtnHandler();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextBtnHandler();
          break;
        default: break;
      } 
    }
  }

  algoIsRunning = () => {
    return (
      this.currentState === APP_STATES.RUNNING ||
      this.currentState === APP_STATES.PAUSED
    );
  }
}

const app = new App();
