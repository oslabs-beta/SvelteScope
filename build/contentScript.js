const listenerList = [];

function add(node, anchorNode) {
  for (const listener of listenerList) listener.add(node, anchorNode);
}

function update(node) {
  if (!node) return

  for (const listener of listenerList) listener.update(node);
}

function remove(node) {
  for (const listener of listenerList) listener.remove(node);
}

function updateProfile(node, type, fn, ...args) {
  {
    fn(...args);
    return
  }
}

const nodeMap = new Map();
let _id = 0;
let currentBlock;

function getNode(id) {
  return nodeMap.get(id)
}

const rootNodes = [];
function getRootNodes() {
  return rootNodes
}

let svelteVersion = null;
function getSvelteVersion() {
  return svelteVersion
}

function addNode(node, target, anchor) {
  nodeMap.set(node.id, node);
  nodeMap.set(node.detail, node);

  let targetNode = nodeMap.get(target);
  if (!targetNode || targetNode.parentBlock != node.parentBlock) {
    targetNode = node.parentBlock;
  }

  node.parent = targetNode;

  const anchorNode = nodeMap.get(anchor);

  if (targetNode) {
    let index = -1;
    if (anchorNode) index = targetNode.children.indexOf(anchorNode);

    if (index != -1) {
      targetNode.children.splice(index, 0, node);
    } else {
      targetNode.children.push(node);
    }
  } else {
    rootNodes.push(node);
  }

  add(node, anchorNode);
}

function removeNode(node) {
  if (!node) return

  nodeMap.delete(node.id);
  nodeMap.delete(node.detail);

  const index = node.parent.children.indexOf(node);
  node.parent.children.splice(index, 1);
  node.parent = null;

  remove(node);
}

function updateElement(element) {
  const node = nodeMap.get(element);
  if (!node) return

  if (node.type == 'anchor') node.type = 'text';

  update(node);
}

function insert(element, target, anchor) {
  const node = {
    id: _id++,
    type:
      element.nodeType == 1
        ? 'element'
        : element.nodeValue && element.nodeValue != ' '
        ? 'text'
        : 'anchor',
    detail: element,
    tagName: element.nodeName.toLowerCase(),
    parentBlock: currentBlock,
    children: []
  };
  addNode(node, target, anchor);

  for (const child of element.childNodes) {
    if (!nodeMap.has(child)) insert(child, element);
  }
}

function svelteRegisterComponent (e) {
  const { component, tagName } = e.detail;

  const node = nodeMap.get(component.$$.fragment);
  if (node) {
    nodeMap.delete(component.$$.fragment);

    node.detail = component;
    node.tagName = tagName;

    update(node);
  } else {
    nodeMap.set(component.$$.fragment, {
      type: 'component',
      detail: component,
      tagName
    });
  }
}

// Ugly hack b/c promises are resolved/rejected outside of normal render flow
let lastPromiseParent = null;
function svelteRegisterBlock (e) {
  const { type, id, block, ...detail } = e.detail;
  const tagName = type == 'pending' ? 'await' : type;
  const nodeId = _id++;

  if (block.m) {
    const mountFn = block.m;
    block.m = (target, anchor) => {
      const parentBlock = currentBlock;
      let node = {
        id: nodeId,
        type: 'block',
        detail,
        tagName,
        parentBlock,
        children: []
      };

      switch (type) {
        case 'then':
        case 'catch':
          if (!node.parentBlock) node.parentBlock = lastPromiseParent;
          break

        case 'slot':
          node.type = 'slot';
          break

        case 'component':
          const componentNode = nodeMap.get(block);
          if (componentNode) {
            nodeMap.delete(block);
            Object.assign(node, componentNode);
          } else {
            Object.assign(node, {
              type: 'component',
              tagName: 'Unknown',
              detail: {}
            });
            nodeMap.set(block, node);
          }

          Promise.resolve().then(
            () =>
              node.detail.$$ &&
              Object.keys(node.detail.$$.bound).length &&
              update(node)
          );
          break
      }

      if (type == 'each') {
        let group = nodeMap.get(parentBlock.id + id);
        if (!group) {
          group = {
            id: _id++,
            type: 'block',
            detail: {
              ctx: {},
              source: detail.source
            },
            tagName: 'each',
            parentBlock,
            children: []
          };
          nodeMap.set(parentBlock.id + id, group);
          addNode(group, target, anchor);
        }
        node.parentBlock = group;
        node.type = 'iteration';
        addNode(node, group, anchor);
      } else {
        addNode(node, target, anchor);
      }

      currentBlock = node;
      updateProfile(node, 'mount', mountFn, target, anchor);
      currentBlock = parentBlock;
    };
  }

  if (block.p) {
    const patchFn = block.p;
    block.p = (changed, ctx) => {
      const parentBlock = currentBlock;
      currentBlock = nodeMap.get(nodeId);

      update(currentBlock);

      updateProfile(currentBlock, 'patch', patchFn, changed, ctx);

      currentBlock = parentBlock;
    };
  }

  if (block.d) {
    const detachFn = block.d;
    block.d = detaching => {
      const node = nodeMap.get(nodeId);

      if (node) {
        if (node.tagName == 'await') lastPromiseParent = node.parentBlock;

        removeNode(node);
      }

      updateProfile(node, 'detach', detachFn, detaching);
    };
  }
}

function svelteDOMInsert (e) {
  const { node: element, target, anchor } = e.detail;

  insert(element, target, anchor);
}

function svelteDOMRemove (e) {
  const node = nodeMap.get(e.detail.node);
  if (!node) return

  removeNode(node);
}

function svelteDOMAddEventListener (e) {
  const { node, ...detail } = e.detail;

  if (!node.__listeners) node.__listeners = [];

  node.__listeners.push(detail);
}

function svelteDOMRemoveEventListener (e) {
  const { node, event, handler, modifiers } = e.detail;

  if (!node.__listeners) return

  const index = node.__listeners.findIndex(
    o => o.event == event && o.handler == handler && o.modifiers == modifiers
  );

  if (index == -1) return

  node.__listeners.splice(index, 1);
}

function svelteUpdateNode (e) {
  updateElement(e.detail.node);
}

function setup (root) {
  root.addEventListener('SvelteRegisterBlock', e => svelteVersion = e.detail.version, { once: true });

  root.addEventListener('SvelteRegisterComponent', svelteRegisterComponent);
  root.addEventListener('SvelteRegisterBlock', svelteRegisterBlock);
  root.addEventListener('SvelteDOMInsert', svelteDOMInsert);
  root.addEventListener('SvelteDOMRemove', svelteDOMRemove);
  root.addEventListener('SvelteDOMAddEventListener', svelteDOMAddEventListener);
  root.addEventListener('SvelteDOMRemoveEventListener', svelteDOMRemoveEventListener);
  root.addEventListener('SvelteDOMSetData', svelteUpdateNode);
  root.addEventListener('SvelteDOMSetProperty', svelteUpdateNode);
  root.addEventListener('SvelteDOMSetAttribute', svelteUpdateNode);
  root.addEventListener('SvelteDOMRemoveAttribute', svelteUpdateNode);
}

setup(window.document);
for (let i = 0; i < window.frames.length; i++) {
  const frame = window.frames[i];
  const root = frame.document;
  setup(root);
  const timer = setInterval(() => {
    if (root == frame.document) return
    clearTimeout(timer);
    setup(frame.document);
  }, 0);
  root.addEventListener('readystatechange', e => clearTimeout(timer), { once: true });
}

console.log('Hello from contentScript!');

/*
  TODO:
  State injection with arrays
  Profiler tab
  Icon color change when using/not using Svelte
  Add types to the tree visualization files

  IGNORE THIS:
  webpack dev server gives us many ugly red errors when we load a page.
  Ignore them; they're harmless. flipping the https option to true in
  webserver.js fixes this problem, but creates a worse one where the webpage
  refreshes endlessly. This doesn't happen in production builds anyway, so it's
  safe to ignore
*/

// Stolen from another Svelte DevTool to access props
// I don't know how it works.
function clone(value, seen = new Map()) {
  switch (typeof value) {
    case 'function':
      return { __isFunction: true, source: value.toString(), name: value.name };
    case 'symbol':
      return { __isSymbol: true, name: value.toString() };
    case 'object': {
      if (value === window || value === null) return null;
      if (Array.isArray(value)) return value.map((o) => clone(o, seen));
      if (seen.has(value)) return {};
      const o = {};
      seen.set(value, o);
      for (const [key, v] of Object.entries(value)) {
        o[key] = clone(v, seen);
      }
      return o;
    }
    default:
      return value;
  }
}

function gte(major, minor, patch) {
  const version = (getSvelteVersion() || '0.0.0')
    .split('.')
    .map((n) => parseInt(n));
  return (
    version[0] > major ||
    (version[0] == major &&
      (version[1] > minor || (version[1] == minor && version[2] >= patch)))
  );
}

let _shouldUseCapture = null;
function shouldUseCapture() {
  return _shouldUseCapture == null
    ? (_shouldUseCapture = gte(3, 19, 2))
    : _shouldUseCapture;
}
// End of stolen code

// This is a global variable to let us know if the page has been loaded or not
let pageLoaded = false;
// At this time, this content script only gets Svelte component data once
window.addEventListener('load', (event) => {
  pageLoaded = true;
});



// Gets the root component from svelte listener and returns
// a component tree starting with the root component
function traverseComponent(node) {
  let components = [];
  node.children.forEach((child) => {
    if (child.type === 'component' && child.detail.$$) {
      const serialized = {
        id: child.id,
        type: child.type,
        tagName: child.tagName,
        children: traverseComponent(child),
      };
      // I stole this code from another Svelte DevTool because I didn't
      // know how to access props
      const internal = child.detail.$$;
      const props = Array.isArray(internal.props)
        ? internal.props // Svelte < 3.13.0 stored props names as an array
        : Object.keys(internal.props);
      let ctx = clone(
        shouldUseCapture() ? child.detail.$capture_state() : internal.ctx
      );
      if (ctx === undefined) ctx = {};
      serialized.detail = {
        attributes: props.flatMap((key) => {
          const value = ctx[key];
          delete ctx[key];
          return value === undefined
            ? []
            : { key, value, isBound: key in internal.bound };
        }),
        listeners: Object.entries(internal.callbacks).flatMap(
          ([event, value]) =>
            value.map((o) => ({ event, handler: o.toString() }))
        ),
        ctx: Object.entries(ctx).map(([key, value]) => ({ key, value })),
      };
      components.push(serialized);
      // End of stolen code
    } else {
      components = components.concat(traverseComponent(child));
    }
  });
  return components;
}

// Gets component tree using svelte listener and sends it to the dev tool panel
function sendRootNodeToExtension(messageType) {
  if (
    messageType !== 'updateRootComponent' &&
    messageType !== 'returnRootComponent' &&
    messageType !== 'returnTempRoot'
  ) {
    console.log(
      'You need a valid messageType in sendRootNodeToExtension() in ContentScriptMain/index.js'
    );
    return;
  }
  
  console.log(' I am in sendRootNodeToExtension Func');

  const rootNodes = getRootNodes();
  const newRootNodes = traverseComponent({
    children: rootNodes,
    type: 'component',
  });
  if (!newRootNodes) {
    return;
  }
  // As far as I know, Svelte can only have one root node at a time
  const newRootNode = newRootNodes[0];
  window.postMessage({
    type: messageType,
    rootComponent: newRootNode,
    source: 'contentScript.js',
  });
}

// Gets svelte version using svelte listener and sends it to
// the Popup box
function sendSvelteVersionToExtension() {
  console.log('sendSvelteVersionToExtension(): getSvelteVersion()');
  const svelteVersion = getSvelteVersion();
  if (!svelteVersion) {
    return;
  }  
  console.log('svelteVersion:', svelteVersion);
  // Sends a message to ContentScriptIsolated/index.js
  window.postMessage({
    type: 'returnSvelteVersion',
    svelteVersion: svelteVersion,
    source: 'contentScript.js',
  });
}

function injectState(id, newState) {
  recentlyUpdated = true;
  setTimeout(() => {
    recentlyUpdated = false;
  }, 0);
  const component = (id).detail;
  component.$inject_state(newState);

  /*
    Sends a new snapshot to the panel. If there is a state change that doesn't
    modify the DOM, the event listeners won't hear any events. Let's just send
    back a new updated root node for all state injections
  */
  sendRootNodeToExtension('updateRootComponent');
}

// When state is injected, an event is emitted by the Svelte app
// This forces the app to ignore those updates
let recentlyInjectedASnapshot = false;
function injectSnapshot(snapshot) {
  recentlyInjectedASnapshot = true;
  const listOfIds = [];
  const listOfStates = [];
  function getComponentData(component) {
    listOfIds.push(component.id);
    const newState = {};
    component.detail.ctx.forEach((i) => {
      newState[i.key] = i.value;
    });
    listOfStates.push(newState);
    component.children.forEach((child) => {
      getComponentData(child);
    });
  }
  getComponentData(snapshot);
  for (let i = 0; i < listOfIds.length; i++) {
    const component = getNode(listOfIds[i]);
    if (component) {
      const detail = component.detail;
      detail.$inject_state(listOfStates[i]);
    }
  }
  // When state is injected, an event is emitted by the Svelte app
  // This forces the app to ignore those updates
  recentlyUpdated = true;
  setTimeout(() => {
    recentlyUpdated = false;
    recentlyInjectedASnapshot = false;
  }, 0);
}


//--------------------------------------------------------------------------------------
let readyForUpdates = false;
// Listens to events from ContentScriptIsolated/index.js and responds based on
// the event's type
window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'contentScriptIsolate.js'
    ) {
      // console.log('msg not qualified from contentScript, msg:', msg)
      return;
    }
    
    const data = msg.data;
    console.log('trying to get data from msg.data:', msg.data);


  switch (data.type) {
    case 'getSvelteVersion':
      console.log('getSvelteVersion: invoke sendSvelteVersionToExtension()');
      sendSvelteVersionToExtension();
      break;
    case 'getRootComponent':
      console.log('I am listening from getRootComponent in contentScript');
      readyForUpdates = true;
      sendRootNodeToExtension('returnRootComponent');
      break;
    case 'handleClosedPanel':
      readyForUpdates = false;
      break;
    case 'injectState':
      injectState(data.componentId, data.newState);
      break;
    case 'injectSnapshot':
      injectSnapshot(data.snapshot);
      // Before this setTimeout was added, we were sending back
      // a snapshot that hadn't been updated yet
      setTimeout(() => {
        sendRootNodeToExtension('returnTempRoot');
      }, 0);
      break;
  }
});


//--------------------------------------------------------------------------------------






// Whenever nodes are updated, typically a bunch get updated at the same time
// I need to throttle updates so when I get a bunch at once, I only send the
// LATEST update
let recentlyUpdated = false;
function sendUpdateToPanel() {
  // console.log('sendUpdateToPanel is running')
  // This should only happen after the DOM is fully loaded
  // And after the Panel is loaded.
  if (!pageLoaded || !readyForUpdates) return;
  if (recentlyInjectedASnapshot) return;
  // This needs a setTimeout because it MUST run AFTER the svelte-listener events fire
  // Send the devtool panel an updated root component whenever the Svelte DOM changes
  if (recentlyUpdated === false) {
    setTimeout(() => {
      recentlyUpdated = false;
      sendRootNodeToExtension('updateRootComponent');
    }, 0);
    recentlyUpdated = true;
  }
}

window.document.addEventListener('SvelteRegisterComponent', sendUpdateToPanel);
window.document.addEventListener('SvelteRegisterBlock', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMInsert', (e) =>{
});
window.document.addEventListener('SvelteDOMRemove', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetData', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetProperty', sendUpdateToPanel);
window.document.addEventListener('SvelteDOMSetAttribute', sendUpdateToPanel);

// Here are some more Svelte listener events. Do we need them? Probably not,
// but they're here if you ever need them
// window.document.addEventListener('SvelteDOMAddEventListener', sendUpdateToPanel);
// window.document.addEventListener('SvelteDOMRemoveEventListener', sendUpdateToPanel);
// window.document.addEventListener('SvelteDOMRemoveAttribute', sendUpdateToPanel);
//# sourceMappingURL=contentScript.js.map
