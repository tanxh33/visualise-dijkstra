class UICtrl {
  constructor() {
    this.selectors = {
      addNodeBtn: '#add-node-btn',
      addNodeModal: '#add-node-modal',
      addNodeLabel: '#add-node-label',
      addNodeSubmitBtn: '#add-node-submit-btn',
      addEdgeBtn: '#add-edge-btn',
      addEdgeModal: '#add-edge-modal',
      addEdgeWeightInput: '#add-edge-weight',
      addEdgeSubmitBtn: '#add-edge-submit-btn',
      deleteBtn: '#delete-btn',

      runBtn: '#run-btn',
      runStartBtn: '#run-start-btn',
      runAlgoModal: '#run-algo-modal',
      runAlgoGuess: '#run-algo-guess',
      predictTipsModal: '#predict-tips-modal',
      dontShowTipsAgain: '#dont-show-tips-again',
      prevBtn: '#prev-btn',
      nextBtn: '#next-btn',
      skipBtn: '#skip-btn',
      stopBtn: '#stop-btn',
      autorunSlider: '#autorun-slider',

      refreshBtn: '#refresh-btn',
      loadExBtn: '#load-ex-btn',
      infoBtn: '#info-btn',
      infoModal: '#info-modal',

      algoOutputContent: '#algo-output-content',
      graphTable: '#graph-table'
    };

    this.canvas = document.getElementById('canvas');

    this.config = {
      canvasWidth: 800,
      canvasHeight: 600,
      circleRadius: 16,
      gridCircleRadius: 8,
      canvasWidth: 850,
      canvasHeight: 600,
      gridCols: 20,
      gridRows: 16
    };

    this.addNodeX = null;
    this.addNodeY = null;
    this.addEdgeStart = null;
    this.addEdgeEnd = null;
  }

  init = () => {
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
      inDuration: 250,
      outDuration: 150,
      transitionMovement: 3
    });

    M.Modal.init(document.querySelector(this.selectors.addNodeModal), {});
    M.Modal.init(document.querySelector(this.selectors.addEdgeModal), {
      onCloseEnd: this.deselectEdge
    });
    M.Modal.init(document.querySelector(this.selectors.runAlgoModal), {});
    M.Modal.init(document.querySelector(this.selectors.predictTipsModal), {});
    M.Modal.init(document.querySelector(this.selectors.infoModal), {});

    this.createGrid();
    this.hideGrid();
    console.log('UI initialised.');
  }

  drawGraph = (nodes, edges) => {
    // Reset SVG layer
    this.resetCanvas();

    const svgns = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgns, 'g');
    group.id = 'graph-group';
    this.canvas.appendChild(group);
    group.addEventListener('click', this.graphClickHandler);

    // Draw the edges, then the nodes
    edges.forEach(edge => {
      const startNode = nodes.find(node => node.id === edge.start);
      const endNode = nodes.find(node => node.id === edge.end);
      this.drawEdge(startNode, endNode, edge);
    });

    nodes.forEach(node => this.drawNode(node));

  }

  drawNode = (node) => {
    const svgns = "http://www.w3.org/2000/svg";
    const nodeGroup = document.createElementNS(svgns, 'g');
    const circle = document.createElementNS(svgns, 'circle');
    const text = document.createElementNS(svgns, 'text');

    const { id, label, x, y } = node;
    const [x_pos, y_pos] = this.getGridPos(y, x);

    circle.setAttributeNS(null, 'cx', x_pos);
    circle.setAttributeNS(null, 'cy', y_pos);
    circle.setAttributeNS(null, 'r', this.config.circleRadius);

    text.setAttributeNS(null, 'x', x_pos);
    text.setAttributeNS(null, 'y', y_pos + 6);
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.innerHTML = label;

    nodeGroup.classList.add('graph-node');
    // if (focus) nodeGroup.classList.add('focus');
    nodeGroup.appendChild(circle);
    nodeGroup.appendChild(text);
    nodeGroup.dataset.nodeId = id;

    document.getElementById('graph-group').appendChild(nodeGroup);
  }

  drawEdge = (start, end, edge) => {
    const svgns = "http://www.w3.org/2000/svg";
    const edgeGroup = document.createElementNS(svgns, 'g');
    const line = document.createElementNS(svgns, 'line');
    const text = document.createElementNS(svgns, 'text');

    const [x1, y1] = this.getGridPos(start.y, start.x);
    const [x2, y2] = this.getGridPos(end.y, end.x);
    const weight = edge.weight;
    // const focus = edge.focus;

    line.setAttributeNS(null, 'x1', x1);
    line.setAttributeNS(null, 'y1', y1);
    line.setAttributeNS(null, 'x2', x2);
    line.setAttributeNS(null, 'y2', y2);

    // Draw text labels 5/13 = 38% the distance along the edge line:
    text.setAttributeNS(null, 'x', ((8*x1 + 5*x2) / 13));
    text.setAttributeNS(null, 'y', ((8*y1 + 5*y2) / 13) + 6);
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.innerHTML = weight;

    edgeGroup.classList.add('graph-edge');
    // if (focus) edgeGroup.classList.add('focus');
    edgeGroup.appendChild(line);
    edgeGroup.appendChild(text);
    edgeGroup.dataset.startId = start.id;
    edgeGroup.dataset.endId = end.id;

    document.getElementById('graph-group').appendChild(edgeGroup);
  }

  createGrid = () => {
    const svgns = "http://www.w3.org/2000/svg";
    const group = document.createElementNS(svgns, 'g');
    group.id = 'grid-group';
    group.addEventListener('click', this.gridClickHandler);

    for (let i = 0; i < this.config.gridRows; i++) {  // rows
      for (let j = 0; j < this.config.gridCols; j++) {  // cols
        const [x, y] = this.getGridPos(i, j);

        const circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', this.config.gridCircleRadius);
        circle.classList.add('grid-circle');
        circle.dataset.gridX = j;
        circle.dataset.gridY = i;

        group.appendChild(circle);
      }
    }

    this.canvas.appendChild(group, this.canvas.childNodes[0]);
  }

  getGridPos = (row, col) => {
    // Pass in zero-indexed x/y grid position
    // const x = (row%2 == 0) ? (col+1)*88 - 5 : (col+1)*88 + 5;
    // const y = (col%2 == 0) ? (row+1)*88 - 5 : (row+1)*88 + 5;
    const x = (col+1) * this.config.canvasWidth / (this.config.gridCols + 1);
    const y = (row+1) * this.config.canvasHeight / (this.config.gridRows + 1);
    // const x = (col+1)*70;
    // const y = (row+1)*60;
    return [x, y];
  }

  showGrid = () => {
    document.getElementById('grid-group').style.display = 'block';
  }

  hideGrid = () => {
    document.getElementById('grid-group').style.display = 'none';
  }

  getLabelOfNodeFromId = (nodes, id) => {
    return nodes.find(node => node.id === parseInt(id)).label;
  }

  initTextDescription = (html='') => {
    const algoOutputElem = document.querySelector(this.selectors.algoOutputContent);
    algoOutputElem.innerHTML = html;
  }

  updateTextDescription = (nodes, step) => {
    // Change the heading above the graph-table.
    const algoOutputElem = document.querySelector(this.selectors.algoOutputContent)
    algoOutputElem.innerHTML = `<h5>From ${app.algoStart.label} to ${app.algoEnd.label}</h5>`;
    algoOutputElem.innerHTML += this.algoStateToTextDescription(nodes, step);
  }

  algoStateToTextDescription = (nodes, step) => {
    // Output different HTML strings based on which state.flag is specified
    const { costFromStartTo, current, state } = step;
    const currentLabel = current ? this.getLabelOfNodeFromId(nodes, current) : null;
    let outStr = '';

    switch (state.flag) {
      case 0:
        return `
          <p>Initialised lists.</p>
          <p>Costs for all nodes initialised as Infinity.</p>
        `;
      case 1:
        return `
          <p>
            Evaluating the next node with lowest "priority" value:
            <span class="current-node">${currentLabel} (#${current})</span>
          </p>
        `;
      case 6:
        return `
          <p>
            Current node:
            <span class="current-node">${currentLabel}</span>
            = destination node, so we've found a solution!
          </p>
        `;
      case 7:
        outStr = `
          <p>From the destination node, we go back to the starting node through the closest neighbours, and add them to a list.</p>
          <br />
          <p>
            Current node:
            <span class="current-node">${currentLabel}</span>
            (#${current})
          </p>
          <br />
          <p>Shortest path result:</p>
        `;
        state.result.forEach((nodeId) => {
          const nodeLabel = this.getLabelOfNodeFromId(nodes, nodeId)
          if (nodeId === current) {
            outStr += `<p>(#${nodeId}) <span class="current-node">${nodeLabel}</span></p>`;
          } else {
            outStr += `<p>(#${nodeId}) ${nodeLabel}</p>`;
          }
        });
        return outStr;
      case 8:
        outStr = `
          <p>Reverse the list, and we have the solution!</p>
          <br />
          <p class="strong">Shortest path result (cost = ${state.bestCost}):</p>
        `;
        app.processedResult.forEach((node, i) => {
          let classname = '';
          if (i === 0) {
            classname = 'current-node';
          } else if (i === app.processedResult.length - 1) {
            classname = 'special-node';
          } else {
            classname = 'neighbour-node'
          }
          outStr += `<p>(#${node.id}) <span class="${classname}">${node.label}</span></p>`;
        });
        if (app.predictionMode) {
          outStr += `
            <br/>
            <p class="strong">Your predicted path (cost = ${app.predictionCost}):</p>
          `;
          app.predictionInput.forEach(node => {
            outStr += `<p>(#${node.id}) ${node.label}</p>`;
          });
        }
        return outStr;
      case 9:
        // No result case
        return `
          <p>
            The algorithm has searched through all the neighbours connected by edges, but couldn't find any edges that connect to the destination.
          </p>
          <br />
          <p>
            We couldn't find a shortest path because there is no path. Too bad...
          </p>
          `;
      default: break;
    }

    const neighbourLabel = state.neighbour ? this.getLabelOfNodeFromId(nodes, state.neighbour): null;
    const isNeighbourSameAsStart = parseInt(current) === app.algoStart.id;
    const costFromStartToNeighbourNode = costFromStartTo[state.neighbour] === null ? Infinity : costFromStartTo[state.neighbour];

    outStr = `
      <p>Current node:
        <span class="current-node">${currentLabel} (#${current})</span>
      </p>
      <br />
      <p>Loop through the neighbouring nodes of the current node and evaluate their cost.</p>
      <br />
      <p>1. Neighbour node:
        <span class="neighbour-node">${neighbourLabel} (#${state.neighbour})</span>
      </p>
      <p>2. Cost from start (${app.algoStart.label}) to 
        ${isNeighbourSameAsStart ? '' :
          `<span class="current-node">${currentLabel}</span> to`
        }
        <span class="neighbour-node">${neighbourLabel}</span>
        = ${state.costToNeighbour}
      </p>
      ${isNeighbourSameAsStart ? '' :
      `<p>
        3. Cost from start (${app.algoStart.label}) to
        <span class="neighbour-node">${neighbourLabel}</span>
        = ${costFromStartToNeighbourNode}
        ${state.flag === 4 ? '<span class="neighbour-node">(updated)</span>' : ''}
        </p>`
      }
      <br />
    `;

    switch (state.flag) {
      case 2: break;
      case 3:
        outStr += `
          <p>
            Since ${state.costToNeighbour} < ${costFromStartToNeighbourNode}, we should update the information for
            <span class="neighbour-node">${neighbourLabel}</span>.
          </p>
          `;
        break;
      case 4:
        outStr += `
          <p>
            Updated information for
            <span class="neighbour-node">${neighbourLabel}</span> in the table.
          </p>`;
        break;
      case 5:
        outStr += `
          <p>
            Since ${state.costToNeighbour} is not < ${costFromStartToNeighbourNode}, we don't update the lists.
          </p>
        `;
        break;
      default: return 'Error with state.flag';
    }

    return outStr;
  }

  drawTable = (nodes) => {
    // This is only for populating the table with the id and labels of nodes.
    const tbody = document.querySelector(this.selectors.graphTable + ' tbody');
    tbody.innerHTML = '';
    nodes.forEach(node => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${node.id}</td>
        <td>${node.label}</td>
        <td></td>
        <td></td>
        <td></td>
      `;
      tbody.appendChild(tableRow);
    });
  }

  updateTable = (nodes, step) => {
    // Extract the required data from the dijkstra algo step:
    const { costFromStartTo, checkList, prevVisited, current, state } = step;
    const priorities = {};
    checkList.values.forEach(valPrio => priorities[valPrio.val] = valPrio);

    const tbody = document.querySelector(this.selectors.graphTable + ' tbody');
    tbody.innerHTML = '';
    nodes.forEach((node) => {
      const { id, label } = node;
      // console.log(priorities[id]);
      const cost = id === app.algoStart.id ? 0 : costFromStartTo[id] || Infinity;
      const priority = priorities[id] ? priorities[id].priority : '';
      const prevIdStr = prevVisited[id] ? `(#${prevVisited[id]})` : '';
      const prevLabel = prevVisited[id] ? this.getLabelOfNodeFromId(nodes, prevVisited[id]) : '';

      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${id}</td>
        <td>${label}</td>
        <td>${cost}</td>
        <td>${priority}</td>
        <td>${prevIdStr} ${prevLabel}</td>
      `;
      if (parseInt(current) === id) {
        tableRow.classList.add('current-node');
      }
      if (state.neighbour && parseInt(state.neighbour) === id) {
        tableRow.classList.add('neighbour-node');
      }
      tbody.appendChild(tableRow);
    });
  }

  updateGraph = (graph, step) => {
    const { nodes, edges } = graph;
    const { current, state } = step;

    this.removeHighlightfromAllNodes();
    this.removeHighlightfromAllEdges();

    // Highlight nodes
    nodes.forEach((node) => {
      const { id } = node;
      if (parseInt(current) === id) {
        const nodeElement = document.querySelector(`[data-node-id='${id}']`);
        nodeElement.classList.add('current-node');
      }
      if (state.neighbour && parseInt(state.neighbour) === id) {
        const nodeElement = document.querySelector(`[data-node-id='${id}']`);
        nodeElement.classList.add('neighbour-node');
      }
    });

    if (!state.neighbour) {
      return;
    }

    // Highlight edges
    edges.forEach((edge) => {
      const neighbourId = parseInt(state.neighbour);
      const currentId = parseInt(current);
      if (currentId === edge.start && neighbourId === edge.end) {
        this.addGraphEdgeHighlight(currentId, neighbourId);
      } else if (currentId === edge.end && neighbourId === edge.start) {
        this.addGraphEdgeHighlight(neighbourId, currentId);
      }
    });
  }

  updateGraphLast = (result) => {
    this.removeHighlightfromAllNodes();
    this.removeHighlightfromAllEdges();

    // Highlight nodes
    result.forEach((node, index) => {
      const { id } = node;
      const nodeElement = document.querySelector(`[data-node-id='${id}']`);
      if (index === 0) {
        nodeElement.classList.add('current-node');
      } else if (index === result.length - 1) {
        nodeElement.classList.add('special-node');
      } else {
        nodeElement.classList.add('neighbour-node');
      }
    });

    // Highlight edges
    for (let i = 0; i < result.length - 1; i++) {
      const id1 = result[i].id;
      const id2 = result[i+1].id;

      this.addGraphEdgeHighlight(id1, id2);
      this.addGraphEdgeHighlight(id2, id1);
    }
  }

  removeHighlightfromAllNodes = () => {
    const nodeElements = document.querySelectorAll('.graph-node');
    nodeElements.forEach((nodeElem) => {
      nodeElem.classList.remove('current-node');
      nodeElem.classList.remove('neighbour-node');
      nodeElem.classList.remove('special-node');
    });
  }

  removeHighlightfromAllEdges = () => {
    const edgeElements = document.querySelectorAll('.graph-edge');
    edgeElements.forEach((edgeElem) => {
      edgeElem.classList.remove('connection');
    });
  }

  addGraphEdgeHighlight = (start, end) => {
    const edgeElement = document.querySelector(`[data-start-id='${start}'][data-end-id='${end}']`);
    if (edgeElement) {
      edgeElement.classList.add('connection');
    }
  }

  toast = (options) => {
    M.toast(options);
  }

  darkenButton = (button) => {
    button.classList.add('darken-3');
  }

  resetButton = (button) => {
    button.classList.remove('darken-3');
  }

  toggleButtonSet1 = (enable) => {
    // Drawing functions
    this.toggleButtons([
      document.querySelector(this.selectors.addNodeBtn),
      document.querySelector(this.selectors.addEdgeBtn),
      document.querySelector(this.selectors.deleteBtn),
      document.querySelector(this.selectors.refreshBtn),
      document.querySelector(this.selectors.loadExBtn),
      document.querySelector(this.selectors.infoBtn)
    ], enable);
  }

  toggleButtonSet2 = (enable) => {
    // Non-play algo running buttons
    this.toggleButtons([
      document.querySelector(this.selectors.prevBtn),
      document.querySelector(this.selectors.nextBtn),
      document.querySelector(this.selectors.skipBtn),
      document.querySelector(this.selectors.stopBtn)
    ], enable);
  }

  toggleButtonSet3 = (enable) => {
    // Play button and skip button, disabled for the "last step"
    this.toggleButtons([
      document.querySelector(this.selectors.runBtn),
      document.querySelector(this.selectors.skipBtn),
    ], enable);
  }

  toggleButtons = (btnElements, enable) => {
    if (enable) {
      btnElements.forEach((button) => {
        button.classList.remove('disabled');
      });
    } else {
      btnElements.forEach((button) => {
        button.classList.add('disabled');
      });
    }
  }

  toggleRunBtn = (mode) => {
    const runBtn = document.querySelector(this.selectors.runBtn);

    if (mode === 'play') {
      runBtn.children[0].innerHTML = 'play_arrow';
      this.resetButton(runBtn);
    } else if (mode === 'pause') {
      runBtn.children[0].innerHTML = 'pause';
      this.darkenButton(runBtn);
    }
  }

  resetAll = () => {
    this.resetCanvas();
    this.resetDrawButtons();
    this.resetValues();
  }

  resetCanvas = () => {
    this.canvas.innerHTML = '';
    this.createGrid();
    if (app.currentState !== APP_STATES.NODE_EDIT) {
      this.hideGrid();
    }
    this.selectedGraphObject = null;
  }

  resetDrawButtons = () => {
    document.querySelector(this.selectors.addNodeBtn).classList.remove('darken-3');
    document.querySelector(this.selectors.addEdgeBtn).classList.remove('darken-3');
    document.querySelector(this.selectors.deleteBtn).classList.remove('darken-3');
  }

  resetValues = () => {
    this.addEdgeStart = null;
    this.addEdgeEnd = null;
    this.addNodeX = null;
    this.addNodeY = null;
  }

  // Handle add-node state. This function is called only from the add-node grid.
  gridClickHandler = (e) => {
    if (e.target.classList.contains('grid-circle')) {
      this.addNodeX = parseInt(e.target.dataset.gridX);
      this.addNodeY = parseInt(e.target.dataset.gridY);

      M.Modal.getInstance(document.querySelector(this.selectors.addNodeModal)).open();
      document.querySelector(this.selectors.addNodeLabel).focus();
      // Remaining code occurs at addNodeSubmitHandler()
    }
  };

  addNodeSubmitHandler = () => {
    const labelInput = document.querySelector(this.selectors.addNodeLabel);
    const label = labelInput.value.trim();
    if (label === '') return;
    if (app.checkIfNodeExists(label)) return;

    labelInput.value = '';
    M.updateTextFields();

    M.Modal.getInstance(document.querySelector(this.selectors.addNodeModal)).close();
    app.addNode(this.addNodeX, this.addNodeY, label);
    this.addNodeX = null;
    this.addNodeY = null;
  }

  // Handle add-edge and delete-object states.
  graphClickHandler = (e) => {
    // Get which element in the canvas was clicked.
    const getClickedObject = (e) => {
      if (e.target.parentNode.classList.contains('graph-node') ||
          e.target.parentNode.classList.contains('graph-edge')) {
        return e.target.parentNode;
      } else {
        return null;
      }
    }  // end inner-func

    if (!(app.currentState === APP_STATES.EDGE_EDIT ||
          app.currentState === APP_STATES.DELETE_OBJ ||
          app.currentState === APP_STATES.PREDICTING)) {
      return;
    }

    const clickedObject = getClickedObject(e);
    if (!clickedObject) return;

    // Actions when app in add-edge state.
    if (app.currentState === APP_STATES.EDGE_EDIT) {
      // Exit if null or 'graph-edge'
      if (!clickedObject.classList.contains('graph-node')) {
        return;
      }

      clickedObject.classList.add('focus');

      // Pick node 1
      if (this.addEdgeStart === null) {
        this.addEdgeStart = parseInt(clickedObject.dataset.nodeId);
        return;
      }

      // Pick node 2
      if (this.addEdgeEnd === null) {
        this.addEdgeEnd = parseInt(clickedObject.dataset.nodeId);

        // If n1 == n2, reset state and exit
        if (this.addEdgeStart === this.addEdgeEnd) {
          this.deselectEdge();
          return;
        }
      }

      // Add edge to app data structure, and draw to UI.
      if (!app.checkIfEdgeExists(this.addEdgeStart, this.addEdgeEnd)) {
        // Open modal:
        M.Modal.getInstance(document.querySelector(this.selectors.addEdgeModal)).open();
        const edgeWeightInput = document.querySelector(this.selectors.addEdgeWeightInput);
        edgeWeightInput.focus();
        // const currVal = edgeWeightInput.value;
        // edgeWeightInput.value = '';
        // edgeWeightInput.value = currVal;
        edgeWeightInput.select();
        // Remaining code occurs at addEdgeSubmitHandler()
      } else {
        // Reset states:
        this.deselectEdge();
      }
      return;
    } // end if-edge-edit

    // Actions when app in delete-object state.
    if (app.currentState === APP_STATES.DELETE_OBJ) {
      if (clickedObject.classList.contains('graph-node')) {
        const nodeId = parseInt(clickedObject.dataset.nodeId);
        app.deleteNode(nodeId);
        return;
      }
      else if (clickedObject.classList.contains('graph-edge')) {
        const start = parseInt(clickedObject.dataset.startId);
        const end = parseInt(clickedObject.dataset.endId);
        app.deleteEdge(start, end);
        return;
      }
    }  // end if-delete-obj

    if (app.currentState === APP_STATES.PREDICTING) {
      if (!clickedObject.classList.contains('graph-node')) {
        return;
      }
      const clickedNodeId = parseInt(clickedObject.dataset.nodeId);
      if (clickedNodeId === app.currentPredSelection.id && 
          clickedNodeId !== app.algoStart.id) {
        app.predictionInput.pop();
        app.updatePrediction();
        return;
      }
      app.predSelectionNeighbours.forEach(node => {
        if (clickedNodeId === node.id) {
          app.predictionInput.push(node);
          app.updatePrediction();
          return;
        }
      });
    }  // end if-predicting
  };

  addEdgeSubmitHandler = () => {
    const weightInput = document.getElementById('add-edge-weight');
    const weight = parseInt(weightInput.value);
    if (!weight || weight <= 0) {
      return;
    }
    weightInput.value = 1;
    M.updateTextFields();

    M.Modal.getInstance(document.querySelector(this.selectors.addEdgeModal)).close();

    // console.log(this.addEdgeStart, this.addEdgeEnd, weight);
    app.addEdge(this.addEdgeStart, this.addEdgeEnd, weight);
  }

  deselectEdge = () => {
    document.querySelector(`[data-node-id='${this.addEdgeStart}']`).classList.remove('focus');
    document.querySelector(`[data-node-id='${this.addEdgeEnd}']`).classList.remove('focus');
    this.resetValues();
  }
}
