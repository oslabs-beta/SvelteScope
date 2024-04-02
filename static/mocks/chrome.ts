//import { Component } from '../src/pages/Panel/slices/highlightedComponentSlice';
import initialData from './mockData'; //Set up mock data.Using mock data set from Svelte-DeveTools-Pus

let data = JSON.parse(JSON.stringify(initialData));

type ChromeMessageListener = (message: any) => void;

interface MockRuntime {
    onMessage: {
      addListener: (callback: ChromeMessageListener) => void;
      removeListener: (callback: ChromeMessageListener) => void;
      _triggerMessage: (message: any) => void;
    };
    sendMessage: (message: MockMessageType) => void;
  }

  //this describtes the shape of objects when sent for messaging. 
  //It seems that Svelte-DevTools-Plus only set up message type for injectSnapshot. 
  // If we look at how data is transfered, there are objects for other messages. Why is this being excluded?
  interface MockMessageType {
    message:
      | 'getRootComponent'
      | 'getSvelteVersion'
      | 'handleClosedPanel'
      //'handleBrowserRefresh'; DW - Don't think we need this but add this just in case.
      | 'injectState'
      | 'injectSnapshot';
    snapshot?: Component;
    componentId?: number;
    newState?: {
      [stateKey: string]: number | string;
    };
  }